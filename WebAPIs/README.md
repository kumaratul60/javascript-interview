# Essential Web APIs - Mastery Guide (0-100)

This directory contains a detailed guide to the most important browser APIs requested in senior-level JavaScript interviews, structured to provide a deep understanding of the event loop, rendering pipelines, multithreading, and offline capabilities.

---

## 📁 Directory Roadmap

### 1. Interactive Scripts

- **[02-Event-System.js](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/02-Event-System.js)**: Detailed guide on capturing/bubbling propagation, event delegation helpers, event properties (`target` vs `currentTarget`), and performance tuning (`passive: true`, `once: true`).
- **[03-Intersection-Observer.js](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/03-Intersection-Observer.js)**: High-performance visibility checking, image lazy-loading patterns, and infinite scrolling sentinels.
- **[04-Mutation-and-Resize-Observers.js](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/04-Mutation-and-Resize-Observers.js)**: Monitoring DOM structural changes (with optimization filters) and responsive component resize listeners.

### 2. Comprehensive Guides

- **[MutationObserver.md](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/MutationObserver.md)**: Staff-level reference on DOM Observers, compositor-only optimizations, and layout thrashing.
- **[WebWorkers.md](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/WebWorkers.md)**: Offloading expensive computational tasks, structured cloning, transferables, SharedArrayBuffer, Atomics, and Worker Pools.
- **[ServiceWorkers-PWA.md](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/ServiceWorkers-PWA.md)**: Offline assets caching, proxying network requests (Cache First, Network First, Stale-While-Revalidate), lifecycle controls, and Navigation Preloading.
- **[js_ui_skill.md](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/js_ui_skill.md)**: Modality architecture, focus traps, popover APIs, dialog selectors, CSS containment, and stacking context debugging.
- **[Canvas-WebAudio.md](file:///Users/atulkumarawasthi/projects/javascript-interview/WebAPIs/Canvas-WebAudio.md)**: Immediate-mode canvas rendering (Retina dpr scaling, double buffering) and modular AudioContext graphs.

## 🚀 Key Architectures for Senior Interviews

### Quick Reference: Common Performance Bottlenecks & Solutions

| Problem                      | Root Cause                                         | Better Solution                                      |
| :--------------------------- | :------------------------------------------------- | :--------------------------------------------------- |
| **Infinite Scroll**          | Scroll listener + Geometry layout reads            | `IntersectionObserver`                               |
| **Element Resize Detection** | `window.resize` polling or heavy layout checks     | `ResizeObserver`                                     |
| **DOM Change Detection**     | Polling (`setInterval`) or legacy `MutationEvents` | `MutationObserver`                                   |
| **Janky Animation**          | Modifying Layout properties (`top`/`left`/`width`) | Compositor-only `transform` / `opacity`              |
| **Slow UI / Frame Drops**    | Layout Thrashing (interleaved reads/writes)        | Batching Reads/Writes (e.g. `requestAnimationFrame`) |

---

### 1. Browser Event Loop Phases & Microtasks

- **MutationObserver** updates are queued as **microtasks**. They run immediately after the current JS stack empties, _before_ the browser proceeds to recalculate style, layout, or paint.
- **IntersectionObserver** and **ResizeObserver** callbacks run inside the browser's **rendering phase** (after layout is completed, before paint commands are rasterized).
- **DOM Events** (like click, keydown, scroll) queue their handlers as standard **macrotasks**.

```
[JS Stack Executing] ──► [Process Microtasks] ──► [rAF Queue] ──► [Recalc Style & Layout] ──► [Paint] ──► [Composite]
```

### 2. The Browser Pixel Pipeline

Understanding which properties trigger which pipeline stage is critical for maintaining 60/120fps UI experiences:

- **Layout (Reflow) Triggers:** `width`, `height`, `left`, `margin`, `top`, `display` etc. Forces the browser to recalculate element geometry. _Very Expensive._
- **Paint Triggers:** `color`, `background-color`, `box-shadow` etc. Redraws pixels on layers without recalculating layout. _Expensive._
- **Composite-Only Triggers:** `transform` and `opacity`. The browser skips Layout and Paint, allowing the GPU to manipulate existing layers directly. _Incredibly Fast._

### 3. Avoiding Layout Thrashing

Layout thrashing occurs when your script executes alternating writes and reads of DOM geometry properties (such as `offsetWidth` or `getBoundingClientRect()`) in a loop.

**Anti-Pattern (Thrashing):**

```javascript
for (let i = 0; i < elements.length; i++) {
  const width = elements[i].offsetWidth; // READ (Forces style recalculation)
  elements[i].style.height = `${width * 1.5}px`; // WRITE (Dirties layout cache)
}
```

**Optimized Pattern (Batching):**

```javascript
// 1. Batch Reads
const widths = Array.from(elements).map((el) => el.offsetWidth);

// 2. Batch Writes
elements.forEach((el, i) => {
  el.style.height = `${widths[i] * 1.5}px`;
});
```

---

## ⚡ Essential Quick Snippets

### Safe Focus Trap (Modal Open Hook)

```javascript
const focusable = container.querySelectorAll('a[href], button:not([disabled]), input');
const first = focusable[0];
const last = focusable[focusable.length - 1];

container.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
});
```

### Web Worker Transferable Transfer

```javascript
const buffer = new ArrayBuffer(1024 * 1024 * 16); // 16MB ArrayBuffer
// Transfers buffer memory ownership directly to worker thread. $O(1)$ copy cost.
worker.postMessage({ payload: buffer }, [buffer]);
```
