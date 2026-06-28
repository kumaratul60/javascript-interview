# Web Workers: Multi-Threaded JavaScript Architecture

In standard web browsers, JavaScript execution is single-threaded, running entirely on the **Main (UI) Thread**. If you run complex computations (e.g., sorting massive datasets, image manipulation, cryptographic functions), the browser's main thread blocks, leading to "frozen" UIs, unresponsive touch interactions, and frame drops. **Web Workers** solve this by enabling concurrent multi-threading in background environments.

---

## 1. Executive Summary & Architecture

Web Workers execute in a completely isolated thread with their own global context (`DedicatedWorkerGlobalScope`), independent of the main window's thread.

```
┌──────────────────────────────────────┐          ┌──────────────────────────────────────┐
│             MAIN THREAD              │          │            WORKER THREAD             │
│   (DOM, CSSOM, UI Render, Window)    │          │  (DedicatedWorkerGlobalScope, self)  │
├──────────────────────────────────────┤          ├──────────────────────────────────────┤
│  const w = new Worker('worker.js');  │          │  self.onmessage = (e) => { ... }     │
│  w.postMessage(data); ───────────────┼─────────►│  // CPU-intensive computation        │
│  w.onmessage = (e) => { ... }        │◄─────────┼── self.postMessage(result);          │
└──────────────────────────────────────┘          └──────────────────────────────────────┘
```

### Context Restrictions in Workers:

- **No DOM Access:** You cannot query or manipulate elements (no `document`, `window`, `parent`).
- **Limited Web APIs:** APIs like `localStorage`, `alert()`, and the direct UI paint loops are blocked.
- **Allowed APIs:** `fetch()`, `IndexedDB`, `WebSockets`, `setTimeout`/`setInterval`, and cryptography (`crypto`).

---

## 2. Advanced Communication Models

### 2.1 The Worker Pool (Concurrency Management)

Spawning a worker has a non-negligible cost (~20-50ms and 5-10MB RAM). For heavy batch tasks, you should maintain a **Worker Pool** limited by the CPU's hardware capacity (`navigator.hardwareConcurrency`).

Here is a production-grade implementation of a dynamic Worker Pool scheduler:

```javascript
class WorkerPool {
  constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
    this.workerScript = workerScript;
    this.poolSize = poolSize;
    this.workers = [];
    this.activeWorkers = new Set();
    this.taskQueue = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(this.workerScript);
      this.workers.push({
        id: i,
        worker,
        currentResolve: null,
      });
    }
  }

  runTask(payload) {
    return new Promise((resolve, reject) => {
      const task = { payload, resolve, reject };
      this.taskQueue.push(task);
      this.next();
    });
  }

  next() {
    if (this.taskQueue.length === 0) return;

    // Find first idle worker
    const idleWorker = this.workers.find((w) => !this.activeWorkers.has(w.id));
    if (!idleWorker) return; // All workers are busy

    const task = this.taskQueue.shift();
    this.activeWorkers.add(idleWorker.id);

    // Set up one-time message handler
    idleWorker.worker.onmessage = (event) => {
      this.activeWorkers.delete(idleWorker.id);
      task.resolve(event.data);
      this.next(); // Trigger processing of next queued task
    };

    idleWorker.worker.onerror = (error) => {
      this.activeWorkers.delete(idleWorker.id);
      task.reject(error);
      this.next();
    };

    idleWorker.worker.postMessage(task.payload);
  }

  destroy() {
    this.workers.forEach((w) => w.worker.terminate());
    this.workers = [];
    this.activeWorkers.clear();
    this.taskQueue = [];
  }
}

// Usage Example
// const pool = new WorkerPool('complex-calc-worker.js');
// pool.runTask({ data: 5000 }).then(result => console.log(result));
```

---

## 3. Deep Dive: Memory Sharing & Data Transfer

How data is sent between threads represents a major performance boundary.

### 3.1 Structured Clone Algorithm vs. Transferable Objects

When using standard `postMessage(data)`, the browser runs the **Structured Clone Algorithm**. It deep-copies the entire object serialization into a new memory location.

- **Problem:** Copying a 100MB TypedArray block blocks the main thread for several milliseconds, negating the benefits of multi-threading.

**Transferable Objects** solve this by transferring ownership of the underlying buffer (e.g., `ArrayBuffer`, `MessagePort`, `ImageBitmap`) between threads. The reference is moved; the sending thread immediately loses access (zero-copy, $O(1)$ performance).

```javascript
// Main Thread
const largeArray = new Float32Array(10_000_000); // ~40MB
// Populate array...

// Pass buffer as the 2nd argument to transfer ownership
worker.postMessage({ data: largeArray }, [largeArray.buffer]);

// CRITICAL: largeArray.byteLength is now 0 on the main thread!
console.log(largeArray.byteLength); // 0
```

### 3.2 SharedArrayBuffer & Atomics (Shared Memory)

To bypass postMessage bottlenecks completely, threads can share memory using `SharedArrayBuffer` (SAB).

- **SPECTRE Vulnerability Mitigation:** Because SAB can be exploited for timing attacks, modern browsers require strict HTTP headers for pages using it:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`

- **Atomics:** Because multiple threads write/read to the same memory segment simultaneously, race conditions occur. `Atomics` ensures updates are completed sequentially before another thread accesses the buffer.

```javascript
// Main Thread
const sharedBuffer = new SharedArrayBuffer(1024); // Allocate 1KB of shared memory
const typedArray = new Int32Array(sharedBuffer);

const worker = new Worker('atomic-worker.js');
worker.postMessage({ buffer: sharedBuffer });

// Safely modify using Atomics
Atomics.store(typedArray, 0, 42);
```

```javascript
// atomic-worker.js (Worker Thread)
self.onmessage = function (e) {
  const typedArray = new Int32Array(e.data.buffer);

  // Safely read/wait using Atomics
  const val = Atomics.load(typedArray, 0);
  console.log('Value loaded atomically:', val); // 42
};
```

---

## 4. Key Performance Pitfalls & Mitigation

1. **Initialization Overhead:** Creating a worker is heavy. Avoid spawning a worker for low-cost, sub-10ms calculations. Keep a persistent pool.
2. **Synchronous Storage Trap:** Neither `localStorage` nor `sessionStorage` is available in workers because they are synchronous blocking APIs. Standard persistence inside workers must use **IndexedDB** or asynchronous caching.
3. **No Garbage Collection for Workers:** Background workers do not automatically shut down when inactive. If you do not call `worker.terminate()` (main thread) or `self.close()` (inside worker context), the thread eats RAM indefinitely.

---

## 5. Interview Hot Corners

### Q1: Compare Web Workers, Service Workers, Shared Workers, and Worklets.

- **Web Workers (Dedicated):** Tied to a single browser tab. Used for offloading CPU-intensive processing tasks.
- **Shared Workers:** Shared across multiple tabs/windows from the same origin. Useful for orchestrating cross-tab state syncing or websocket connections.
- **Service Workers:** Acts as a network proxy. Persistent, runs in the background independent of tabs. Drives PWA offline caching and push notifications.
- **Worklets:** Low-level hook into browser rendering and audio engines (e.g., `AudioWorklet`, `PaintWorklet`). Run on extremely strict timing constraints, often on real-time rendering pipelines.

### Q2: How do you import dependencies inside a Web Worker?

- **Synchronous Method:** `importScripts('lib1.js', 'lib2.js')` blocks the worker thread while loading scripts.
- **ES Modules Method:** Initialize the worker with `type: 'module'` config:
  ```javascript
  const worker = new Worker('module-worker.js', { type: 'module' });
  ```
  Inside `module-worker.js`:
  ```javascript
  import { complexUtility } from './utils.js';
  ```

### Q3: How do you debug Web Workers in Chrome DevTools?

- Open DevTools, navigate to the **Sources** tab.
- Look at the **Page** navigation pane; scroll down to find the `Threads` dropdown or the **Workers** section.
- You can place breakpoints inside the worker script just like standard JS. Chrome will isolate the call stack to the background thread context.
