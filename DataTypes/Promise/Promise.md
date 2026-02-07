# JavaScript `Promise`

## The Basics

### What is `Promise`?

In JavaScript, a `Promise` is a **non-primitive (reference) data type** that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a placeholder for a value that is not yet known. Promises provide a cleaner and more structured way to handle asynchronous code compared to traditional callback functions (avoiding "callback hell").

### Key Characteristics

*   **Non-Primitive (Reference Type)**: `Promise` instances are objects, and variables holding them store a reference to the `Promise` object in the heap.
*   **States**: A Promise object can be in one of three states:
    1.  **`pending`**: Initial state, neither fulfilled nor rejected.
    2.  **`fulfilled` (or `resolved`)**: Meaning that the operation completed successfully, with a resulting value.
    3.  **`rejected`**: Meaning that the operation failed, with an error reason.
*   **Immutable Once Settled**: Once a promise is `fulfilled` or `rejected` (it is then "settled"), its state cannot change. It will hold onto its result (value or error) indefinitely.
*   **Asynchronous**: The callback functions (`.then()`, `.catch()`, `.finally()`) associated with a promise are always executed asynchronously in the microtask queue, even if the promise resolves synchronously.
*   **Chaining**: Promises can be chained together, allowing for a sequence of asynchronous operations to be handled gracefully.
*   **`typeof` Operator**: For `Promise` objects, `typeof` returns `"object"`.
    ```js
    const myPromise = new Promise(() => {});
    console.log(typeof myPromise); // "object"
    ```

### Syntax & Examples

```js
// 1. Creating a Promise
// A Promise constructor takes an executor function with two arguments: resolve and reject.
const myPromise = new Promise((resolve, reject) => {
  // Simulate an asynchronous operation (e.g., fetching data, timer)
  const success = Math.random() > 0.5; // Randomly succeed or fail

  setTimeout(() => {
    if (success) {
      resolve('Operation successful!'); // Fulfill the promise with a value
    } else {
      reject('Operation failed!');   // Reject the promise with an error
    }
  }, 1000);
});

// 2. Consuming a Promise
myPromise
  .then(value => {
    console.log('Success:', value); // Handles fulfillment
  })
  .catch(error => {
    console.error('Error:', error); // Handles rejection
  })
  .finally(() => {
    console.log('Promise settled (finished).'); // Always executes, regardless of fulfillment or rejection
  });

// 3. Chaining Promises
function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve('Data fetched'), 1000));
}

function processData(data) {
  return new Promise(resolve => setTimeout(() => resolve(`${data} and processed`), 500));
}

fetchData()
  .then(data => {
    console.log(data); // 'Data fetched'
    return processData(data); // Return another promise for chaining
  })
  .then(processedData => {
    console.log(processedData); // 'Data fetched and processed'
  })
  .catch(err => {
    console.error('Chain error:', err);
  });

// 4. Promise.resolve() and Promise.reject() for immediately resolved/rejected promises
const resolvedPromise = Promise.resolve('Immediate success!');
resolvedPromise.then(val => console.log(val));

const rejectedPromise = Promise.reject('Immediate failure!');
rejectedPromise.catch(err => console.error(err));
```

---

## Primitive vs. Non-Primitive

`Promise` is a **non-primitive (reference) data type**.

*   **Primitives**: Value-based, immutable, stack-allocated, compared by value.
*   **Non-Primitives (Objects, Arrays, Functions, Promise, etc.)**:
    *   **Reference-based**: Variables hold a *reference* (memory address/pointer) to the actual data.
    *   **Mutable (internally)**: A Promise's state (`pending` -> `fulfilled`/`rejected`) changes, but once settled, its outcome is immutable. The promise object itself is mutable in that its internal state transitions.
    *   **Heap Allocation**: Stored in the heap memory.
    *   **Comparison**: Compared by reference (`===` checks if two variables point to the exact same `Promise` object in memory).

```js
// Reference vs. Value Example
const p1 = new Promise(res => res());
const p2 = p1; // p2 holds a *reference* to the same Promise object as p1

console.log(p1 === p2); // true

const p3 = new Promise(res => res());
const p4 = new Promise(res => res());
console.log(p3 === p4); // false (different Promise objects in memory)
```

### Memory Allocation (Heap vs. Stack)

*   **Stack**: When a `Promise` variable is declared (e.g., `myPromise`), the variable itself is stored on the **call stack**. This variable holds the *memory address* (reference) of where the actual `Promise` object data is located.
*   **Heap**: The actual `Promise` object data, including its internal state (`pending`, `fulfilled`, `rejected`), its eventual value/error, and the queues of `.then()`, `.catch()`, `.finally()` callbacks, is stored in the **heap memory**. This allows the promise to persist and manage its callbacks even after the synchronous code that created it has finished executing.

---

## Use Cases & Real-time Applications

Promises are fundamental for modern asynchronous JavaScript programming.

1.  **Handling Asynchronous Operations**: The primary use case for `Promise` is to manage operations that don't complete immediately, such as:
    *   **Network Requests**: Fetching data from APIs (`fetch()` returns a Promise).
        ```js
        fetch('/api/users')
          .then(response => response.json())
          .then(users => console.log(users))
          .catch(error => console.error('Failed to fetch users:', error));
        ```
    *   **Timers**: `setTimeout`, `setInterval` can be "promisified".
        ```js
        function delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        delay(2000).then(() => console.log('2 seconds passed!'));
        ```
    *   **File I/O**: Reading/writing files.
    *   **Database Operations**: Querying or updating databases.

2.  **Sequencing Asynchronous Tasks**: Chaining `.then()` calls allows for executing async tasks one after another in a readable way.
    ```js
    loadUser()
      .then(user => loadOrders(user.id))
      .then(orders => displayOrders(orders))
      .catch(error => handleDisplayError(error));
    ```

3.  **Parallel Execution of Asynchronous Tasks**: `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, `Promise.any()` enable powerful parallel and competitive execution patterns.
    ```js
    // Wait for all promises to resolve
    Promise.all([
      fetch('/api/user/profile'),
      fetch('/api/user/settings')
    ])
    .then(([profile, settings]) => {
      // Both requests completed successfully
      console.log('Profile and settings loaded:', profile, settings);
    })
    .catch(error => {
      // At least one request failed
      console.error('Failed to load all data:', error);
    });
    ```
4.  **Error Handling**: Centralized error handling for entire chains of asynchronous operations using `.catch()`.

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Unhandled Promise Rejections

If a promise is rejected and no `.catch()` handler (or `try...catch` in `async/await`) is attached to handle that rejection, it results in an unhandled promise rejection. This often leads to errors being logged to the console and can crash Node.js processes.
```js
new Promise((_, reject) => {
  reject('Oops, unhandled error!');
}); // Uncaught (in promise) Oops, unhandled error!
```
**Fix**: Always attach a `.catch()` handler to the end of your promise chains, or use `try...catch` with `async/await`.

### 2. Promises vs. Callbacks (`setTimeout` and Microtask Queue)

Callbacks passed to `.then()`/`.catch()` are executed in the **microtask queue**, which has higher priority than the **macrotask queue** (where `setTimeout`, `setInterval` callbacks run). This means microtasks execute *before* macrotasks.
```js
console.log('Start');

Promise.resolve().then(() => console.log('Promise Resolved (Microtask)'));

setTimeout(() => console.log('setTimeout (Macrotask)'), 0);

console.log('End');

// Output:
// Start
// End
// Promise Resolved (Microtask)
// setTimeout (Macrotask)
```
**Implication**: Promises always guarantee asynchronous execution of their handlers, even for already-resolved promises. This guarantees a consistent order of operations relative to the event loop.

### 3. Synchronous Executor Function

The executor function (`(resolve, reject) => { ... }`) passed to `new Promise()` is executed *synchronously*. This can lead to subtle bugs if you expect it to be entirely asynchronous.
```js
console.log('Before promise creation');
const p = new Promise((resolve, reject) => {
  console.log('Executor function running synchronously');
  resolve('Done');
});
console.log('After promise creation');
p.then(val => console.log(val));

// Output:
// Before promise creation
// Executor function running synchronously
// After promise creation
// Done
```
**Pitfall**: If the executor performs a long-running synchronous task, it will block the event loop.

### 4. `Promise.all()` Failure Behavior

`Promise.all()` is "fail-fast". If any of the promises in the iterable passed to `Promise.all()` reject, `Promise.all()` immediately rejects with the reason of the first promise that rejected, without waiting for the others to settle.
```js
const p1 = Promise.resolve(3);
const p2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'Error in p2'));
const p3 = new Promise((resolve) => setTimeout(resolve, 500, 'p3 value'));

Promise.all([p1, p2, p3])
  .then(values => console.log(values))
  .catch(error => console.error(error)); // Output: Error in p2 (after ~100ms)
// p3 would still resolve in the background but its result is ignored.
```
**Fix**: If you need all promises to run and collect all results (even if some fail), use `Promise.allSettled()` (ES2020+).

### 5. `async/await` is Syntactic Sugar

`async/await` provides a more synchronous-looking way to write asynchronous code, but it's built on top of Promises. An `async` function always returns a Promise.
```js
async function getUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user; // Returns a Promise resolving with 'user'
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Rejects the Promise returned by getUserData
  }
}

getUserData().then(data => console.log(data)).catch(err => console.error(err));
```
**Implication**: Understanding Promises is essential even when using `async/await`.

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Represents eventual completion/failure of an async operation.  |
| **Type**           | Non-Primitive (Reference Type).                                |
| **States**         | `pending`, `fulfilled` (resolved), `rejected`.                 |
| **Immutability**   | Once settled, state is immutable.                              |
| **`typeof`**       | Returns `"object"`.                                            |
| **Memory**         | Variable on **Stack** holds **Heap** reference to Promise object (state, value/error, callbacks). |
| **Asynchronous**   | Handlers execute in microtask queue.                           |
| **Chaining**       | `.then()`, `.catch()`, `.finally()`.                           |
| **Static Methods** | `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, `Promise.any()`, `Promise.resolve()`, `Promise.reject()`. |
| **Pitfall**        | Unhandled rejections, microtask queue priority, synchronous executor, `Promise.all()` fail-fast, `async/await` understanding. |

---

### Final Decision: When to use?

*   **For managing asynchronous operations (network requests, timers, file I/O)**: ✅ ALWAYS (or `async/await` which builds on Promises).
*   **To sequence asynchronous tasks in a readable way**: ✅ ALWAYS, using chaining.
*   **To handle errors for asynchronous operations centrally**: ✅ ALWAYS, using `.catch()`.
*   **For orchestrating multiple asynchronous tasks (parallel, race, all settled)**: ✅ ALWAYS, using `Promise.all`, `Promise.race`, etc.
*   **For synchronous code that doesn't need to be async**: ❌ AVOID wrapping synchronous code in a `new Promise()` constructor unless necessary for consistent API design.
*   **For immediate resolution/rejection**: ✅ Use `Promise.resolve()` or `Promise.reject()`.
