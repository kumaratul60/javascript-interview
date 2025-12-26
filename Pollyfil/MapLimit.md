A **`mapLimit`** function is a utility (famous from the `async` library) that maps an array of items to an asynchronous function, but **limits the number of concurrent operations** to a specific number.

This uses a worker-pool / sliding-window model.
We keep limit promises in flight, and every time one finishes, we start the next.

Unlike `Promise.all`, which fires everything at once, `mapLimit` ensures you don't overwhelm an API or a database by hitting it with 1,000 requests at the same time.

---

# Polyfill for `mapLimit` (JavaScript)

## Implementation (Modern Promise-based)

This version uses a "sliding window" or "worker pool" approach, which is more efficient than processing in "batches." As soon as one task finishes, the next one starts immediately.

```javascript
/**
 * @param {Array} arr - Array of items to process
 * @param {number} limit - Maximum number of concurrent tasks
 * @param {Function} iteratee - Async function to apply to each item
 * @returns {Promise<Array>} - Resolves to an array of results
 */
/**
 * mapLimit - Processes array items with an async function, limiting concurrency.
 */
async function mapLimit(arr, limit, iteratee) {
  // 1. Validation & Edge Cases
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  if (typeof limit !== 'number' || limit <= 0) throw new RangeError('limit must be > 0');
  if (arr.length === 0) return [];

  return new Promise((resolve, reject) => {
    const results = new Array(arr.length);
    let index = 0;
    let completed = 0;
    let aborted = false; // Flag to stop execution on error

    const runTask = async () => {
      // Stop if we've reached the end or an error occurred
      if (index >= arr.length || aborted) return;

      const currentIndex = index++;

      try {
        // Execute iteratee with item and index
        const result = await iteratee(arr[currentIndex], currentIndex);

        if (aborted) return; // Guard against late resolutions after an error

        results[currentIndex] = result;
        completed++;

        if (completed === arr.length) {
          resolve(results);
        } else {
          runTask(); // Recursive call to pick up the next item
        }
      } catch (err) {
        aborted = true; // Set flag so other workers stop
        reject(err);
      }
    };

    // 2. Initial Burst
    // Start initial batch up to the limit or array size
    const initialBatch = Math.min(limit, arr.length);
    for (let i = 0; i < initialBatch; i++) {
      runTask();
    }
  });
}
```

---

## How It Works

1.  **Results Array:** We pre-allocate an array `new Array(arr.length)` to ensure the final output order matches the input order, even if tasks finish at different times.
2.  **Concurrency Control:** We start only `limit` number of tasks initially using a `for` loop.
3.  **The "Chain":** Inside each task, when `await iteratee(item)` completes, we immediately call `runTask()` again. This pulls the next item from the queue, maintaining exactly `limit` active tasks at all times.
4.  **Error Handling:** If any single task fails, we set a `failed` flag to stop starting new tasks and immediately `reject` the entire promise.

---

## 🚀 Example Usage

Imagine you have 10 URLs to fetch, but you only want to fetch **2 at a time**.

```javascript
const urls = [1, 2, 3, 4, 5];

// An async function that takes some time
const fetchUser = async (id) => {
  console.log(`🚀 Starting Task ${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s
  console.log(`✅ Finished Task ${id}`);
  return { id, name: `User ${id}` };
};

// Use mapLimit with a concurrency of 2
mapLimit(urls, 2, fetchUser)
  .then((results) => {
    console.log('Final Results:', results);
  })
  .catch((err) => console.error('One failed:', err));
```

---

## Comparison: `Promise.all` vs `mapLimit`

| Feature             | `Promise.all`                          | `mapLimit`                             |
| :------------------ | :------------------------------------- | :------------------------------------- |
| **Concurrency**     | Unlimited (all at once)                | **Strictly Limited** (e.g., 2 or 5)    |
| **Server Impact**   | High (can cause 429 Too Many Requests) | **Low (safe for rate limits)**         |
| **Execution Speed** | Fastest (limited by browser/OS only)   | Managed (efficient but throttled)      |
| **Use Case**        | Fetching 2-3 small items               | Processing 100s of items or heavy APIs |

---

## 💡 Interview Tip

In an interview, if they ask for this, clarify whether they want:

1. **Batching:** (Run 5, wait for ALL to finish, then run next 5) — _Less efficient._
2. **Sliding Window:** (Run 5, as soon as 1 finishes, start the 6th) — _The implementation above._ (This is what you should aim for).

The difference between `mapLimit` and standard polyfills like `map`, `reduce`, or `bind` is fundamental. While the others are **Synchronous Data Transformers**, `mapLimit` is an **Asynchronous Resource Manager**.

Here is the breakdown of how they differ in terms of logic, architecture, and purpose.

---

## Understanding `mapLimit`: The Async Concurrency Manager

## 1. The Scenario

Imagine you have a list of **5 User IDs** to fetch from a server. However, the server has a strict **Rate Limit**: if you send more than **2 requests at once**, it will block you (Error 429).

### The Problem with `Promise.all`

If you use `Promise.all(urls.map(fetchUser))`, it fires **all 5 requests simultaneously**.

- **Result:** The server gets overwhelmed, and your requests fail.

### The Solution: `mapLimit`

`mapLimit(urls, 2, fetchUser)` ensures that **at most, only 2 requests are "in-flight"** at any given moment.

---

## 2. Implementation Example

```javascript
const urls = [1, 2, 3, 4, 5];

// An async function simulating a network request
const fetchUser = async (id) => {
  console.log(`🚀 Starting Task ${id}`);
  // Simulate 1 second network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`✅ Finished Task ${id}`);
  return { id, name: `User ${id}` };
};

// Process 5 items, but only 2 at a time
mapLimit(urls, 2, fetchUser)
  .then((results) => {
    console.log('Final Results:', results);
  })
  .catch((err) => console.error('A task failed:', err));
```

---

## 3. The Timeline (Mental Model)

Here is exactly how the execution flows second-by-second:

| Time   | Action                             | Active Tasks | Status                               |
| :----- | :--------------------------------- | :----------- | :----------------------------------- |
| **0s** | Start Task 1 & 2                   | `[1, 2]`     | **Limit reached.** Waiting...        |
| **1s** | Task 1 Finishes → **Start Task 3** | `[2, 3]`     | Task 1 is done; space opened for 3.  |
| **2s** | Task 2 Finishes → **Start Task 4** | `[3, 4]`     | Task 2 is done; space opened for 4.  |
| **3s** | Task 3 Finishes → **Start Task 5** | `[4, 5]`     | Task 3 is done; space opened for 5.  |
| **4s** | Task 4 Finishes                    | `[5]`        | No more new tasks to start.          |
| **5s** | Task 5 Finishes                    | `[]`         | **All Done!** Resolving final array. |

---

## 4. Why this is "Best Practice"

### ✅ 1. No Idle Time (Sliding Window)

Unlike **Batching** (where you wait for 1 and 2 to finish before starting 3 and 4), `mapLimit` uses a **Sliding Window**. As soon as _any_ task finishes, the next one starts immediately. This is much faster.

### ✅ 2. Order Preservation

Even though Task 2 might finish before Task 1 (if the network is jittery), `mapLimit` ensures the results are placed in the array based on their **original input index**.

- `results[0]` will always be User 1.
- `results[1]` will always be User 2.

### ✅ 3. Resource Safety

By controlling the "Concurrency Limit," you prevent:

- Browser memory exhaustion.
- Server-side Rate Limiting (429 errors).
- Database connection pool starvation.

---

## 5. Comparison: Batching vs. Sliding Window

| Method             | Visual Flow                                   | Efficiency                               |
| :----------------- | :-------------------------------------------- | :--------------------------------------- |
| **Batching**       | `[1, 2]` ...wait... `[3, 4]` ...wait... `[5]` | ⚠️ Slow (waits for the slowest in batch) |
| **Sliding Window** | `[1, 2]` → `[2, 3]` → `[3, 4]` → `[4, 5]`     | ✅ Fast (fills gaps immediately)         |

---

## 💡 Real-World Use Cases

1.  **Web Scrapers:** Crawling 1,000 pages but only 5 at a time to avoid being banned.
2.  **File Uploaders:** Uploading a gallery of 50 images, but only 3 at a time to keep the UI responsive.
3.  **Database Migrations:** Updating 1 million records in chunks of 100 to avoid locking the database.

---

## 🎯 Interview Cheat Sheet

**Question:** _"What is mapLimit and why use it over Promise.all?"_

**Answer:** _"While `Promise.all` executes everything simultaneously, `mapLimit` processes items using a **sliding-window worker pool**. It guarantees that only **N** concurrent async operations happen at once. This prevents server overloading while ensuring maximum efficiency with no idle time, all while preserving the original array order."_

---

## Can we do using Promise?

Yes, you **can** achieve a similar result using `Promise.all`, but it leads to a pattern called **Batching**.

While it is easier to write, it is **less efficient** than the worker-pool (sliding window) version we discussed earlier.

Here is how you would do it using `Promise.all`, along with the pros and cons.

---

## 📦 Implementing Concurrency with `Promise.all` (Batching)

In this approach, we split the large array into smaller "chunks" (batches) and process each batch completely before moving to the next.

### The Code

```javascript
async function mapLimitWithBatching(arr, limit, iteratee) {
  const results = [];

  // 1. Loop through the array in steps of 'limit'
  for (let i = 0; i < arr.length; i += limit) {
    // 2. Create a "batch" (e.g., [1, 2])
    const batch = arr.slice(i, i + limit);

    // 3. Process the entire batch at once
    const batchPromises = batch.map((item, index) => iteratee(item, i + index));

    // 4. WAIT for the whole batch to finish
    const batchResults = await Promise.all(batchPromises);

    // 5. Store results
    results.push(...batchResults);
  }

  return results;
}
```

---

## 🛑 The Major Flaw: "The Slowest Link" Problem

The reason professional developers prefer the **Worker Pool** over this `Promise.all` batching is efficiency.

### Imagine: `limit = 2`

- **Task 1:** Takes **10 seconds**.
- **Task 2:** Takes **1 second**.
- **Task 3:** Takes **1 second**.

#### ❌ With `Promise.all` Batching:

1.  Batch 1 starts Task 1 (10s) and Task 2 (1s).
2.  Task 2 finishes in 1 second. **BUT Task 3 cannot start yet!**
3.  The system sits idle for **9 more seconds** waiting for Task 1 to finish.
4.  Only after 10 seconds does Batch 2 start.
5.  **Total Time: ~11 seconds.**

#### ✅ With Worker Pool (Sliding Window):

1.  Task 1 (10s) and Task 2 (1s) start.
2.  Task 2 finishes in 1 second. **Task 3 starts immediately.**
3.  Task 3 finishes in 1 second. **Task 4 starts immediately.**
4.  Task 1 is still running while others finish.
5.  **Total Time: ~10 seconds.**

---

## Comparison Table

| Feature         | `Promise.all` Batching                | Worker Pool (Sliding Window)      |
| :-------------- | :------------------------------------ | :-------------------------------- |
| **Complexity**  | Simple / Easy to read                 | Moderate                          |
| **Efficiency**  | ⚠️ Lower (waits for slowest in batch) | ✅ Maximum (no idle time)         |
| **Concurrency** | Guaranteed                            | Guaranteed                        |
| **Best For**    | Simple scripts, small data            | Production, High-performance apps |

---

## Summary: Which one should you use?

1.  **Use the `Promise.all` version** if you are in a hurry, the array is small, or all tasks take roughly the same amount of time.
2.  **Use the Worker Pool version (previous version)** for interviews and production code. It shows you understand how the **Event Loop** works and that you care about optimizing "idle time" in asynchronous code.

**In an interview:** If you provide the `Promise.all` batching version, the interviewer will likely ask: _"How can you make this faster so we don't wait for the slowest task in a batch?"_ — That is your cue to switch to the worker-pool implementation!

---

## Difference: `mapLimit` vs. Standard JS Polyfills

### 1. Synchronous vs. Asynchronous

- **Standard Polyfills (`map`, `filter`, `reduce`):** These are **synchronous**. They process data one after another in the same "tick" of the event loop. If you have 1 million items, the main thread stays busy until it's finished.
- **`mapLimit`:** This is **asynchronous**. It returns a `Promise`. It allows the JavaScript engine to perform other tasks (like UI rendering) while it waits for external tasks (like API calls) to complete.

### 2. Resource Management (The "Limit")

- **Standard `map`:** Has no concept of "concurrency." It just visits every element. If you try to use standard `map` with async functions (`arr.map(async...)`), it creates **all** promises at once. If the array has 5,000 items, you just fired 5,000 API requests simultaneously.
- **`mapLimit`:** Its primary job is **throttling**. It ensures that only `N` operations are happening at any given moment. It protects your server and the browser's memory.

### 3. Prototype vs. Standalone Utility

- **Standard Polyfills:** Usually attached to a prototype (e.g., `Array.prototype.map`). They are part of the official ECMAScript language specification.
- **`mapLimit`:** Is **not** a native JavaScript method. It is a utility function popularized by libraries like `async.js` or `p-map`. You don't polyfill it because it was "removed" or "missing" from older browsers; you implement it because JS doesn't provide concurrency control out of the box.

---

### Side-by-Side Comparison

| Feature          | Standard `map` Polyfill | `mapLimit`                          | `call / bind / apply`    |
| :--------------- | :---------------------- | :---------------------------------- | :----------------------- |
| **Target**       | `Array.prototype`       | Standalone Function                 | `Function.prototype`     |
| **Return Value** | A new Array             | A **Promise**                       | Result / New Function    |
| **Logic**        | Linear Loop             | Worker Pool / Recursion             | Context (`this`) binding |
| **Timing**       | Immediate (Sync)        | Deferred (Async)                    | Immediate                |
| **Main Concern** | Data Transformation     | **Rate Limiting / Traffic Control** | Execution Context        |

---

## Code Structure Comparison

### Standard `map` Polyfill (Simple)

_Focus: Looping and pushing to a new array._

```javascript
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

### `mapLimit` (Conceptual)

_Focus: Managing a "pool" of active promises._

```javascript
async function mapLimit(arr, limit, iteratee) {
  // 1. Setup a "Worker" system
  // 2. Track index and completion
  // 3. Return a Promise that only resolves when workers are empty
}
```

---

## 🎯 When to use which?

1.  **Use `map` / `filter` / `reduce` / `forEach`**: When you have data in memory and you want to transform it immediately (e.g., converting a list of names to uppercase).
2.  **Use `call` / `apply` / `bind`**: When you need to control what `this` refers to inside a function.
3.  **Use `mapLimit`**: When your "transformation" involves an **external cost** (Network request, File System, Database query) and you need to ensure you don't crash the system by doing too much at once.

### Summary

If `map` is a **conveyor belt** where every item is processed one by one, and `Promise.all` is a **floodgate** where everything rushes through at once, **`mapLimit` is a security guard** at a door only letting 5 people in at a time.
