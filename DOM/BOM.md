# Browser Object Model (BOM): Advanced Architecture

The **Browser Object Model (BOM)** is a set of APIs exposed by the browser to interact with the environment surrounding the web page. While the DOM models the document structure, the BOM models window dimensions, navigation history, geolocation tracking, device specs, and cross-tab communication.

```
                  ┌────────────────────────────────────────┐
                  │                 Window                 │
                  └────┬──────┬─────────┬─────────┬────┬───┘
                       │      │         │         │    │
         ┌─────────────┘      │         │         │    └─────────────┐
   ┌─────▼────┐         ┌─────▼────┐  ┌─▼──┐  ┌───▼───┐         ┌────▼─────┐
   │ Document │         │ History  │  │Screen││Location│         │Navigator │
   │  (DOM)   │         │  (BOM)   │  │(BOM) ││ (BOM)  │         │  (BOM)   │
   └──────────┘         └──────────┘  └────┘  └───────┘         └──────────┘
```

---

## 1. Window Object: Global Host Context

The `window` object represents the browser window hosting the DOM document. It is the global object for client-side JavaScript execution.

### 1.1 Cross-Origin Window Messaging (`postMessage`)

Direct script references between windows from different origins (e.g. iframes, child tabs opened via `window.open`) are blocked by the **Same-Origin Policy**.

- **Solution:** Use `window.postMessage` to send serialized payloads safely across origins.

> [!CAUTION]
> Failing to validate `event.origin` when receiving messages allows malicious sites hosting your page inside an iframe to execute arbitrary code (XSS).

```javascript
// A. Emitter Window (Main Page)
const iframeElement = document.getElementById('sandbox-iframe');

// Send data only if target matches the origin exactly
iframeElement.contentWindow.postMessage({ action: 'syncState', payload: { userId: 99 } }, 'https://secure-sandbox.com');
```

```javascript
// B. Receiver Window (https://secure-sandbox.com)
window.addEventListener('message', (event) => {
  // CRITICAL: Always validate the sender's origin
  if (event.origin !== 'https://trusted-parent.com') {
    console.warn('Blocked unauthorized message from:', event.origin);
    return;
  }

  const { action, payload } = event.data;
  if (action === 'syncState') {
    handleStateSync(payload);
  }
});
```

---

## 2. History API & Client-Side SPA Routing

Single Page Application (SPA) routers use the History API to transition URLs without causing full-page document reloads.

### 2.1 State Pushes and Browser Back Navigation

- `history.pushState(state, title, url)`: Creates a new entry in the session history stack.
- `history.replaceState(state, title, url)`: Modifies the current history entry without pushing a new state.
- `popstate` event: Fires when the active history entry changes due to browser actions (like clicking the browser Back/Forward buttons).

```javascript
// Register a listener to handle back/forward navigation
window.addEventListener('popstate', (event) => {
  // Retrieve the state object associated with the history entry
  const state = event.state;
  if (state && state.route) {
    renderRoute(state.route, false); // Render route without pushing new state
  }
});

function navigateTo(route) {
  // Save route state and change URL synchronously without reloading page
  history.pushState({ route }, '', route);
  renderRoute(route, true);
}
```

### 2.2 Manual Scroll Restoration

By default, the browser remembers and restores scroll positions when navigating history. For SPAs where content is loaded dynamically, this default behavior can cause the page to scroll to random positions.

- **Solution:** Change `history.scrollRestoration` to `manual`.

```javascript
if ('scrollRestoration' in history) {
  // Disable default browser scroll restoration
  history.scrollRestoration = 'manual';
}
```

---

## 3. Location: URL Manipulation & Search Parsing

The `location` object represents the current URL of the active document.

### 3.1 `location.href` vs. `location.replace()`

- `location.href = '/path'`: Navigates to a new page, pushing the current page into history. The back button will return to this page.
- `location.replace('/path')`: Navigates to a new page, replacing the current page in history. The back button will skip this page. **Essential for post-login redirects.**

### 3.2 Modern URL & Search Parameter Parsing

Avoid parsing query parameters (`location.search`) using complex regex. Use the native `URL` and `URLSearchParams` APIs instead.

```javascript
// URL: https://app.com/search?q=js+perf&sort=desc#results

const url = new URL(window.location.href);

console.log(url.pathname); // "/search"
console.log(url.hash); // "#results"

// Parse Query Parameters
const params = new URLSearchParams(url.search);
const query = params.get('q'); // "js perf"
const sortOrder = params.get('sort') || 'asc'; // "desc"

// Modify parameters in memory
params.set('page', '2');
const updatedUrl = `${url.pathname}?${params.toString()}`;
// history.pushState({}, '', updatedUrl);
```

---

## 4. Navigator: Hardware & Capability Detection

The `navigator` object provides information about the client browser, operating system, and hardware properties.

### 4.1 Adaptive Asset Loading

For high-performance web applications, you can detect the client's network connection and hardware memory limits to serve scaled down assets (e.g. low-res images, blocking heavy animations on low-memory devices).

```javascript
function loadAdaptiveAssets() {
  const dpr = window.devicePixelRatio || 1;
  const memoryGb = navigator.deviceMemory || 4; // RAM in GB
  const logicalCores = navigator.hardwareConcurrency || 4; // CPU cores

  // Connection details (Network Information API)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowNetwork = connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g');

  if (memoryGb <= 2 || logicalCores < 4 || isSlowNetwork) {
    console.log('Low-performance device or slow connection detected. Activating performance saving mode.');
    disableHeavyEffects();
    fetchLowResolutionImages();
  } else {
    fetchHighResolutionImages(dpr);
  }
}
```

### 4.2 Clipboard & User Permissions

Modern asynchronous APIs require querying user permissions before triggering prompt overlays.

```javascript
async function copyToClipboardSafely(text) {
  try {
    // Check permission status first
    const permissionStatus = await navigator.permissions.query({ name: 'clipboard-write' });

    if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
      await navigator.clipboard.writeText(text);
      console.log('Copied successfully!');
    }
  } catch (error) {
    console.error('Failed to write to clipboard:', error);
  }
}
```

---

## 5. Interview Hot Corners

### Q1: Why does `window.onLine` return false positives?

- **Answer:** `navigator.onLine` returns a boolean indicating whether the client browser is connected to a network. However, it does not verify whether that network has actual internet access (e.g., if the user is connected to a router but the WAN connection is offline, `navigator.onLine` returns `true`). Always pair this check with a quick `fetch` request or listen for offline events to confirm connectivity:
  ```javascript
  window.addEventListener('offline', () => showOfflineAlert());
  ```

### Q2: How do you listen to route changes in single-page apps (SPAs)?

- **Answer:** The `popstate` event only fires when the browser back/forward buttons are clicked or `history.back()` / `history.forward()` is called programmatically. It **does not** fire when `history.pushState()` or `history.replaceState()` is called. To listen to all route changes, SPA routers wrap the `pushState` and `replaceState` methods to trigger custom events:

  ```javascript
  const patchHistoryMethod = (type) => {
    const orig = history[type];
    return function () {
      const result = orig.apply(this, arguments);
      const event = new Event(type.toLowerCase());
      event.arguments = arguments;
      window.dispatchEvent(event);
      return result;
    };
  };
  history.pushState = patchHistoryMethod('pushState');

  // Now you can listen to custom state pushes:
  window.addEventListener('pushstate', () => console.log('Route updated!'));
  ```
