# Service Workers & PWAs: Network Interception & Offline Architecture

A **Service Worker (SW)** is a programmable network proxy that runs in a background thread, separate from the main browser tab context. By intercepting network requests, it forms the architectural core of **Progressive Web Apps (PWAs)**, enabling offline experiences, asset caching, push notifications, and background data synchronization.

---

## 1. The Service Worker Lifecycle

Managing the lifecycle is the most common point of failure in PWA development.

```
[Register] ──► [Install] ──► [Wait] ──► [Activate] ──► [Active / Redundant]
```

1. **Registration:** Initiated in the main thread. Tells the browser where the SW file lives.
2. **Install (`install` event):** Fires when the SW is fetched for the first time. Used to cache core shell resources (static HTML, CSS, JS, entry assets).
3. **Waiting State:** If a previous version of the SW is already active, the new version remains in the "waiting" phase. It will not take control until all tabs running the old SW are closed.
4. **Activation (`activate` event):** Triggered when the old SW is purged. Used to sweep away legacy caches.
5. **Active/Control:** The SW now intercepts all page fetches.

### The Double-Reload Bug & How to Force Activation

In production, users often see old content because the new SW is stuck in the "waiting" state. To force a newly installed SW to immediately activate and claim all clients without waiting for tab restarts, use `self.skipWaiting()` and `clients.claim()`:

```javascript
// Inside sw.js

// 1. Immediately force installation cleanup and bypass waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open('core-assets-v2')
      .then((cache) => {
        return cache.addAll(['/', '/index.html', '/global.css', '/bundle.js']);
      })
      .then(() => self.skipWaiting()), // Force new SW to active
  );
});

// 2. Claim all open browser tabs immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== 'core-assets-v2') {
              console.log('Purging old cache:', cache);
              return caches.delete(cache); // Delete old version caches
            }
          }),
        );
      })
      .then(() => self.clients.claim()), // Immediately control all tabs
  );
});
```

---

## 2. Advanced Caching Strategies

A core interview requirement is translating specific app features into caching strategies.

```
            ┌──────────────────────────────────────────────┐
            │               Network Fetch                  │
            └──────────────┬────────────────┬──────────────┘
                           │                │
            ┌──────────────▼──────┐  ┌──────▼──────────────┐
            │    Cache Storage    │  │    Network Server   │
            └─────────────────────┘  └─────────────────────┘
```

### 2.1 Cache First, Network Fallback

- **Best For:** Static assets (fonts, images, style frameworks, hash-versioned JS bundles).
- **Behavior:** Searches Cache. If found, returns immediately. Otherwise, fetches from the network and caches the result for future requests.

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        // Must clone the response because stream can only be read once
        const responseToCache = networkResponse.clone();
        caches.open('runtime-cache').then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    }),
  );
});
```

### 2.2 Network First, Cache Fallback

- **Best For:** Dynamic data that changes frequently (news feeds, API reports, shopping cart items).
- **Behavior:** Always attempts to fetch from the network. If the connection fails or times out, it falls back to serving the last cached response.

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' || event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open('dynamic-data-cache').then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request); // Fallback to offline cache
        }),
    );
  }
});
```

### 2.3 Stale-While-Revalidate

- **Best For:** Non-critical data that updates regularly but benefits from instant loading (user avatars, dashboard statistics).
- **Behavior:** Instantly serves the cached asset, while simultaneously kicking off a network fetch in the background to silently update the cache.

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('dynamic-assets').then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        // Return immediately if cached, otherwise wait for network fetch
        return cachedResponse || fetchPromise;
      });
    }),
  );
});
```

---

## 3. Deep Dive: Navigation Preload

When a user navigates to a PWA, the browser has to launch the Service Worker thread before it can intercept the HTML document request. This startup cost (50-200ms) delay is called the **SW Boot Bootleneck**.

**Navigation Preload** solves this: it tells the browser to start downloading the HTML document request in parallel while the Service Worker is booting up.

```javascript
// sw.js activation hook
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async function () {
      if (self.registration.navigationPreload) {
        // Enable navigation preloading
        await self.registration.navigationPreload.enable();
      }
    })(),
  );
});

// Intercepting preloaded response
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        // Check if preloaded response is ready
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) return preloadResponse;

        // Fallback to standard network fetch
        try {
          return await fetch(event.request);
        } catch {
          return caches.match('/offline.html');
        }
      })(),
    );
  }
});
```

---

## 4. Interview Hot Corners

### Q1: How do you prompt the user for an update in a PWA?

Do not silently force updates as it might break page state during form completion.

1. Listen to `controllerchange` event in the main page.
2. In the registration phase, watch for the `updatefound` event.
3. Show a UI banner "New version available, reload?".
4. If clicked, post a message containing `{ action: 'skipWaiting' }` to the waiting service worker.

```javascript
// Main thread registration setup
navigator.serviceWorker.register('/sw.js').then((reg) => {
  reg.addEventListener('updatefound', () => {
    const newWorker = reg.installing;
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // Show update button / banner
        showUpdateBanner(() => {
          newWorker.postMessage({ type: 'SKIP_WAITING' });
        });
      }
    });
  });
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload(); // Reload page once control transitions to new SW
});
```

### Q2: What is the Background Sync API?

Allows actions executed while offline (e.g., submitting a comment form) to be postponed until connection is re-established.

- The main thread registers a sync tag:
  ```javascript
  navigator.serviceWorker.ready.then((swRegistration) => {
    return swRegistration.sync.register('sync-comments');
  });
  ```
- The service worker handles the event background-sync loop:
  ```javascript
  self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-comments') {
      event.waitUntil(sendPendingCommentsToServer());
    }
  });
  ```

### Q3: Why is Workbox used in enterprise PWAs?

Writing vanilla Service Workers is highly error-prone (race conditions, cache pollution, caching wrong static structures). **Workbox** is a library created by Google that encapsulates routing, precaching, lifecycle handlers, and cache expiration rules into declarative, tested API modules.
For example, in Workbox, Stale-While-Revalidate is simplified to:

```javascript
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

registerRoute(({ request }) => request.destination === 'script', new StaleWhileRevalidate());
```
