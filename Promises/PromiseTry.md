# JS Reference: `Promise.try`

**The Safe Entry Point for Promise Chains**

`Promise.try` is a static method that executes a function and wraps its result in a Promise. It provides a unified flow for handling both synchronous errors (throws) and asynchronous rejections in a single `.catch()` block.

---

## Overview

- **Status:** Part of **ES2025** (TC39 Stage 4).
- **Availability:** Emerging. Requires polyfills for older environments or current stable runtimes.
- **Core Logic:**
  1. If `fn` returns a value $\rightarrow$ **Resolves**.
  2. If `fn` returns a Promise $\rightarrow$ **Adopts its state**.
  3. If `fn` throws synchronously $\rightarrow$ **Rejects**.

---

### ⚡ The Problem vs. The Solution

Historically, to start a promise chain safely, developers used `Promise.resolve().then()`. This had several drawbacks.

| Aspect             | `Promise.resolve().then(fn)` | `Promise.try(fn)`         |
| :----------------- | :--------------------------- | :------------------------ |
| **Intent**         | Indirect/Obscure             | Explicit & Readable       |
| **Execution**      | Always async (Microtask hop) | Executes `fn` immediately |
| **Error Handling** | Catches `fn` errors          | Catches `fn` errors       |
| **Complexity**     | Boilerplate-heavy            | Clean entry point         |

---

### 🛠️ Syntax & Examples

```javascript
// Basic Usage
Promise.try(() => JSON.parse(userInput))
  .then((data) => console.log('Success:', data))
  .catch((err) => console.error('Invalid input or Sync error'));

// Handling mixed Sync/Async logic
Promise.try(() => {
  if (!ready) throw new Error('Not ready!'); // Sync throw
  return fetch('/data'); // Async return
})
  .then((res) => res.json())
  .catch((e) => console.log(e)); // Catches BOTH
```

---

### 🎯 Real-World Use Cases

1.  **Unified Error Channels:** Wrap functions that might throw (like `JSON.parse` or config lookups) before starting an async fetch.
2.  **Safe Library Wrappers:** When writing a function that returns a Promise, use `Promise.try` to ensure that even if the setup code crashes, the caller receives a rejected Promise rather than a synchronous crash.
3.  **Lazy/Conditional Chains:** Useful for initiating a sequence where the first step is a computation that hasn't happened yet.

---

### 🚦 Decision Matrix

#### **Use it when...**

- You are building a Promise chain (`.then().catch()`).
- You are mixing synchronous "risky" code with asynchronous calls.
- You want to ensure a function _always_ returns a Promise, even if it fails immediately.

#### **Avoid it when...**

- **Using `async/await`:** Just use a standard `try/catch` block—it is cleaner and idiomatic.
- **Performance is critical:** Every `Promise.try` creates a new Promise object; don't use it for simple arithmetic.
- **Running in legacy environments:** Ensure you have a polyfill.

---

### ⚠️ Pitfalls to Watch

1.  **Immediate Execution:** `Promise.try(fn)` calls `fn` **immediately**, not when the promise is "started." It is not a way to defer execution like an event handler.
2.  **Runtime Support:** Since it is an ES2025 feature, it will break in older browsers/Node.js versions without a polyfill.

**The Polyfill:**

```javascript
if (!Promise.try) {
  Promise.try = function (fn) {
    return new Promise((resolve) => {
      resolve(fn());
    });
  };
}
```

---

### 🏁 Bottom Line

Think of `Promise.try` as the **"Async Safety Net."** It replaces the awkward `Promise.resolve().then()` pattern with a readable, standard method that ensures your error handling starts the moment your code begins to run.
