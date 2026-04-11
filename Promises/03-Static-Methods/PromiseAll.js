/**
 * @file PromiseAll.js
 * @description Deep Dive into Promise.all()
 * @level Intermediate
 *
 * PROBLEM STATEMENT:
 * Implement or explain how Promise.all() works, its fail-fast behavior,
 * and how it maintains the order of results.
 *
 * KEY TAKEAWAYS:
 * 1. ORDER PRESERVATION: The results array matches the order of the input array,
 *    regardless of which promise finishes first.
 * 2. FAIL-FAST: If any promise rejects, the entire Promise.all rejects immediately
 *    with that reason.
 * 3. EXECUTION TIME: Total time taken is equal to the longest-running promise.
 * 4. NON-PROMISES: If an element is not a promise, it's treated as a resolved promise.
 * 5. EMPTY ARRAY: If passed an empty array, it returns an empty array immediately.
 */

// --- 1. BASIC USAGE (Success Case) ---
const task = (id, ms) => new Promise((resolve) => setTimeout(() => resolve(`Task ${id} Done`), ms));

const tasks = [
  task(1, 1000),
  Promise.resolve('Instant Value'), // Resolved promise
  'Raw String Value', // Non-promise value (auto-wrapped)
  task(4, 2000),
];

console.log('--- Starting Promise.all Success Example ---');
Promise.all(tasks)
  .then((results) => {
    console.log('All Results (Maintains Order):', results);
    // Expected: ["Task 1 Done", "Instant Value", "Raw String Value", "Task 4 Done"]
  })
  .catch((err) => console.error("This won't run in success case:", err));

// --- 2. FAIL-FAST BEHAVIOR (Rejection Case) ---
const failingTasks = [task(1, 1000), Promise.reject('❌ Error in Task 2'), task(3, 2000)];

console.log('\n--- Starting Promise.all Fail-Fast Example ---');
Promise.all(failingTasks)
  .then((res) => console.log("This won't run:", res))
  .catch((err) => {
    console.log('Caught Error (Immediate):', err);
    // Even though Task 3 takes 2s, we catch Task 2's error in ~0ms
  });

// --- 3. INTERVIEW POLYFILL (How it works under the hood) ---
/**
 * A manual implementation of Promise.all
 * @param {Array} promises
 */
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) return resolve([]);

    promises.forEach((p, index) => {
      // Ensure every item is a Promise
      Promise.resolve(p)
        .then((val) => {
          results[index] = val; // Store at correct index (Order preservation)
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Fail-fast: Rejects outer promise immediately
    });
  });
}

// Testing Polyfill
console.log('\n--- Testing MyPromiseAll Polyfill ---');
myPromiseAll([task(1, 500), task(2, 100)]).then((res) => console.log('Polyfill Result:', res));

/*
--- REAL-WORLD USE CASE ---
Use Promise.all when you need data from multiple APIs to render a single page,
and the page cannot be displayed correctly if even one of those calls fails.
*/
