/**
 * @file PromiseAny.js
 * @description Deep Dive into Promise.any()
 * @level Intermediate
 *
 * PROBLEM STATEMENT:
 * Explain the behavior of Promise.any(), how it differs from Promise.race(),
 * and what happens when all promises reject.
 *
 * KEY TAKEAWAYS:
 * 1. FIRST SUCCESS WINS: It resolves as soon as the FIRST promise in the
 *    iterable fulfills.
 * 2. IGNORES REJECTIONS: If a promise rejects, it waits for the next one.
 *    It only rejects if ALL promises in the iterable reject.
 * 3. AGGREGATE ERROR: If all promises reject, it throws an `AggregateError`,
 *    which contains an `errors` property with all individual rejection reasons.
 * 4. SHORT-CIRCUIT ON SUCCESS: Once one promise resolves, it doesn't wait for others.
 */

// --- 1. BASIC USAGE (Success Case) ---
const task = (id, ms, shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(`❌ Task ${id} Failed`);
      else resolve(`✅ Task ${id} Done`);
    }, ms);
  });

const tasks = [
  task(1, 1000, true), // Fails at 1s
  task(2, 2000), // Succeeds at 2s (This should be the winner)
  task(3, 500, true), // Fails at 0.5s
];

console.log('--- Starting Promise.any Success Example ---');
Promise.any(tasks)
  .then((result) => {
    console.log('First Success Winner:', result); // Expected: Task 2
  })
  .catch((err) => console.error('Should not happen:', err));

// --- 2. ALL REJECTED (AggregateError Case) ---
const allFailing = [Promise.reject('Error A'), Promise.reject('Error B')];

console.log('\n--- Starting Promise.any AggregateError Example ---');
Promise.any(allFailing)
  .then((res) => console.log("Won't run:", res))
  .catch((err) => {
    console.log('Caught:', err.message); // "All promises were rejected"
    console.log('Individual Errors:', err.errors); // ["Error A", "Error B"]
  });

// --- 3. INTERVIEW POLYFILL ---
/**
 * A manual implementation of Promise.any
 * @param {Array} promises
 */
function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];

    if (promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(resolve) // First one to resolve wins the whole thing
        .catch((err) => {
          errors[index] = err;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}

// Testing Polyfill
console.log('\n--- Testing MyPromiseAny Polyfill ---');
myPromiseAny([Promise.reject('Fail 1'), Promise.resolve('Success 2')]).then(console.log);

/*
--- REAL-WORLD USE CASE ---
Use Promise.any when you have multiple mirror servers or multiple sources
for the same data, and you want to use the first one that responds successfully.
*/
