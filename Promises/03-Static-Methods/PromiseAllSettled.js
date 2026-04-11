/**
 * @file PromiseAllSettled.js
 * @description Understanding Promise.allSettled()
 * @level Intermediate
 *
 * PROBLEM STATEMENT:
 * Explain how Promise.allSettled() differs from Promise.all() and implement
 * a polyfill for it.
 *
 * KEY TAKEAWAYS:
 * 1. NO SHORT-CIRCUITING: Unlike Promise.all(), it waits for ALL promises to
 *    settle (either resolve or reject).
 * 2. UNIFIED RESULT: It returns an array of objects describing the outcome of each promise.
 * 3. STRUCTURE: Each object has a `status` ("fulfilled" or "rejected") and
 *    either a `value` or a `reason`.
 * 4. ALWAYS RESOLVES: The returned promise itself almost never rejects (unless
 *    the input is not iterable).
 */

// --- 1. BASIC USAGE ---
const task = (id, ms, shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(`❌ Task ${id} Failed`);
      else resolve(`✅ Task ${id} Done`);
    }, ms);
  });

const tasks = [
  task(1, 1000),
  task(2, 500, true), // This one fails
  task(3, 1500),
];

console.log('--- Starting Promise.allSettled Example ---');
Promise.allSettled(tasks).then((results) => {
  console.log('All Settled Results:');
  results.forEach((res, i) => {
    if (res.status === 'fulfilled') {
      console.log(`Promise ${i + 1}: Success ->`, res.value);
    } else {
      console.log(`Promise ${i + 1}: Failure ->`, res.reason);
    }
  });
});

// --- 2. INTERVIEW POLYFILL ---
/**
 * A manual implementation of Promise.allSettled
 * @param {Array} promises
 */
function myPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) return resolve([]);

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((val) => {
          results[index] = { status: 'fulfilled', value: val };
        })
        .catch((err) => {
          results[index] = { status: 'rejected', reason: err };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

// Testing Polyfill
console.log('\n--- Testing MyPromiseAllSettled Polyfill ---');
myPromiseAllSettled([task(1, 100), Promise.reject('Early Error')]).then(console.log);

/*
--- REAL-WORLD USE CASE ---
Use Promise.allSettled when you want to perform multiple independent operations
(like logging to different services or fetching independent widgets) and you
want to know the result of each, regardless of whether others succeeded.
*/
