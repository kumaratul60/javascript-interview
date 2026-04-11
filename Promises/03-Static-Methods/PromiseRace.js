/**
 * @file PromiseRace.js
 * @description Deep Dive into Promise.race()
 * @level Intermediate
 *
 * PROBLEM STATEMENT:
 * Explain the behavior of Promise.race(), how it differs from Promise.any(),
 * and how to use it for implementing a timeout.
 *
 * KEY TAKEAWAYS:
 * 1. FIRST SETTLEMENT WINS: It resolves or rejects as soon as the FIRST
 *    promise in the iterable settles (either fulfilled or rejected).
 * 2. NO SPECIAL ERROR: If the winner is a rejection, the whole race rejects
 *    with that specific reason (unlike Promise.any which ignores rejections).
 * 3. EMPTY ITERABLE: If passed an empty array, the returned promise will
 *    stay in a "pending" state forever.
 * 4. SINGLE RESULT: Returns a single value/reason, NOT an array.
 */

// --- 1. BASIC USAGE (Success Winner) ---
const task = (id, ms, shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(`❌ Task ${id} Failed`);
      else resolve(`✅ Task ${id} Done`);
    }, ms);
  });

const successRace = [
  task(1, 1000), // Finishes at 1s
  task(2, 500), // Finishes at 0.5s (Winner)
  task(3, 2000),
];

console.log('--- Starting Promise.race Success Example ---');
Promise.race(successRace).then(console.log); // Expected: Task 2 Done

// --- 2. REJECTION WINNER ---
const rejectionRace = [
  task(1, 1000),
  task(2, 200, true), // Fails at 0.2s (Winner)
  task(3, 500),
];

console.log('\n--- Starting Promise.race Rejection Example ---');
Promise.race(rejectionRace)
  .then((res) => console.log("Won't run:", res))
  .catch((err) => console.log('Caught Winner Rejection:', err)); // Expected: Task 2 Failed

// --- 3. PRACTICAL USE CASE: Request Timeout ---
/**
 * Wraps a promise with a timeout using Promise.race
 */
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('⏰ Request Timed Out')), ms));
  return Promise.race([promise, timeout]);
}

console.log('\n--- Testing Request Timeout ---');
const longTask = task('Long', 5000);
withTimeout(longTask, 1000)
  .then(console.log)
  .catch((err) => console.log(err.message)); // Expected: Request Timed Out

// --- 4. INTERVIEW POLYFILL ---
/**
 * A manual implementation of Promise.race
 * @param {Array} promises
 */
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return; // Stays pending forever per spec

    promises.forEach((p) => {
      // First one to settle (then/catch) triggers the outer resolve/reject
      Promise.resolve(p).then(resolve, reject);
    });
  });
}

// Testing Polyfill
console.log('\n--- Testing MyPromiseRace Polyfill ---');
myPromiseRace([task('Poly 1', 300), task('Poly 2', 100)]).then(console.log);

/*
--- REAL-WORLD USE CASE ---
Use Promise.race for adding timeouts to network requests or for selecting the
fastest response from multiple redundant sources when any response (even an error)
is acceptable as an immediate result.
*/
