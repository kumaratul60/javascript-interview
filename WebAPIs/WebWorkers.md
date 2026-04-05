# Web Workers - JavaScript Multi-Threading Mastery

In standard JavaScript, everything runs on a **Single Thread** (the UI Thread). If you run a heavy calculation (like sorting 1 million items), the browser "freezes" and the user cannot click or scroll. **Web Workers** solve this by allowing you to run scripts in a **Background Thread**.

---

## 🚀 1. How It Works: The "Post Office" Model

Web Workers do **not** have access to the DOM, `window`, `document`, or `parent`. They communicate with the main thread via **Message Passing**.

### Main Thread (`main.js`)

```javascript
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ action: 'calculate', data: 5000000 });

// Listen for result from worker
worker.onmessage = function (event) {
  console.log('Result from worker:', event.data);
};

// Terminate if no longer needed
// worker.terminate();
```

### Worker Thread (`worker.js`)

```javascript
self.onmessage = function (event) {
  const { action, data } = event.data;

  if (action === 'calculate') {
    let result = 0;
    for (let i = 0; i < data; i++) result += i; // Heavy task

    self.postMessage(result); // Send back to main thread
  }
};
```

---

## 🏗️ 2. Scaling: How to "Break & Increase/Decrease" Tasks

When dealing with massive datasets, you don't just use _one_ worker; you use a **Worker Pool**.

### A. Breaking Tasks (Chunking)

Instead of sending 1 million items at once, break them into 10 chunks of 100k. Send each chunk to a separate worker.

- **Why?** It prevents a single worker from being a bottleneck and utilizes multi-core CPUs.

### B. Increasing/Decreasing Workers (Concurrency)

- **The Limit**: `navigator.hardwareConcurrency` tells you how many logical processors the user's device has (e.g., 8).
- **The Strategy**: Never create more workers than the CPU cores. If you create 100 workers on a 4-core machine, the overhead of switching between them will actually **slow down** your app.

---

## ⚠️ 3. The "Transferable Objects" Secret

Normally, when you `postMessage` a large object, JS **clones** it. If the object is 100MB, cloning takes a long time and uses 200MB of memory.

**Transferable Objects** allow you to "transfer" the memory address instead of cloning.

```javascript
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB
// Transfer ownership to worker (Main thread can no longer access it!)
worker.postMessage(buffer, [buffer]);
```

---

## 🚫 4. Critical Pitfalls & Logic Errors

1.  **No DOM Access**: You cannot `document.getElementById` inside a worker. It will throw an error.
2.  **Initialization Cost**: Spawning a worker takes ~20-50ms. Don't use them for tiny tasks that take 1ms; it's a net loss.
3.  **The "Sync" Trap**: `localStorage` is NOT available in workers because it is a synchronous API. Use `IndexedDB` instead.
4.  **Memory Leaks**: If you don't `worker.terminate()` or `self.close()`, the background thread stays alive forever, eating RAM.

---

## 🎯 5. When to Use (Use Cases)

- **Image Processing**: Resizing or applying filters.
- **Data Compression/Parsing**: Handling massive JSON files.
- **Background Syncing**: Fetching and processing data for offline use.
- **Cryptographic Operations**: Hashing passwords or handling keys.

---

## 💡 Interview Question: "Can you access 'this' in a Web Worker?"

**Answer**: Yes, but `this` (or `self`) refers to the `DedicatedWorkerGlobalScope`, not the `window` object. You have access to `fetch`, `setTimeout`, `IndexedDB`, and `WebSockets`, but **never** the DOM.
