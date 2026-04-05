# Service Workers & PWA Basics

A **Service Worker** is a type of Web Worker that acts as a **Proxy** between your browser and the network. It allows you to build **Progressive Web Apps (PWAs)** that work offline, handle push notifications, and sync data in the background.

---

## 🚀 1. The Service Worker Lifecycle

Service Workers have a strict lifecycle. They don't just "run" immediately.

1.  **Registration**: `navigator.serviceWorker.register('/sw.js')`.
2.  **Installation (`install`)**: Used to cache essential files (HTML, CSS, JS).
3.  **Activation (`activate`)**: Used for cleanup (deleting old caches).
4.  **Fetching (`fetch`)**: Intercepts every outgoing network request!

### Example: Basic Service Worker (`sw.js`)

```javascript
const CACHE_NAME = 'my-v1-cache';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js'];

// INSTALL: Cache essential assets
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// FETCH: Intercept network and serve from cache if available
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request); // Return cached or fetch fresh
    }),
  );
});
```

---

## 🏗️ 2. Caching Strategies (Modern Mastery)

How you cache data is a common senior interview question.

### A. Cache First, Network Fallback

- **Best for**: Static assets (images, CSS, JS).
- **User experience**: Lightning fast, works offline.

### B. Network First, Cache Fallback

- **Best for**: Frequently updated data (news feed, stock prices).
- **User experience**: Always fresh if online, fallback to old data if offline.

### C. Stale-While-Revalidate

- **Best for**: Non-critical but fresh data.
- **How?**: Serve from cache instantly, but fetch in the background to update the cache for next time.

---

## 🚫 3. Pitfalls & Security

1.  **HTTPS ONLY**: Service Workers are so powerful that they only run on HTTPS (or localhost for dev).
2.  **Strict Scoping**: A service worker in `/blog/sw.js` can only intercept requests starting with `/blog/`.
3.  **The "Update" Bug**: Browsers check for a new version of `sw.js` every 24 hours. If the file changes by even 1 byte, it updates. But users often see the "old" site until they reload twice!
    - **Fix**: Use `self.skipWaiting()` to force activation.

---

## 📱 4. What Makes it a PWA?

To be a PWA, you need three things:

1.  **HTTPS**: Security.
2.  **Service Worker**: Offline support.
3.  **Manifest File (`manifest.json`)**: Allows "Add to Home Screen" with an icon.

---

## 🎯 5. Use Cases

- **Offline Mode**: Allowing users to read previously fetched data.
- **Push Notifications**: Re-engaging users when the app is closed.
- **Background Sync**: Allowing a user to "Post" a message while offline; the SW sends it once the connection returns.

---

## 💡 Interview Tip: "Difference between Web Worker and Service Worker?"

**Answer**:

- **Web Worker**: Used for heavy computation. It's tied to a single tab.
- **Service Worker**: Used for network proxying/caching. It's shared across all tabs and stays alive even after the page is closed.
