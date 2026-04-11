/**
 * @file PromiseFinally.js
 * @description Understanding Promise.prototype.finally()
 * @level Intermediate
 *
 * PROBLEM STATEMENT:
 * Explain the purpose of .finally(), how it differs from .then() and .catch(),
 * and how it handles returned values and errors.
 *
 * KEY TAKEAWAYS:
 * 1. SIDE EFFECTS ONLY: .finally() is for cleanup logic (e.g., hiding a loading
 *    spinner, closing a DB connection) regardless of success or failure.
 * 2. PASSTHROUGH: It typically passes through the result or error from the
 *    previous step in the chain.
 * 3. NO ARGUMENTS: The callback passed to .finally() receives NO arguments.
 * 4. ERROR OVERRIDE: If .finally() throws an error or returns a rejected promise,
 *    the chain will reject with that new reason.
 */

// --- 1. BASIC USAGE ---
const mockFetch = (shouldFail = false) =>
  new Promise((resolve, reject) => {
    console.log('Fetching data...');
    setTimeout(() => {
      if (shouldFail) reject('❌ Network Error');
      else resolve('✅ Data Received');
    }, 1000);
  });

console.log('--- Starting .finally() Example ---');
let isLoading = true; // Initial state

mockFetch(false)
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    isLoading = false;
    console.log('Cleanup: isLoading set to', isLoading);
  });

// --- 2. INTERVIEW POLYFILL ---
/**
 * A manual implementation of Promise.prototype.finally
 * @param {Function} callback
 */
if (!Promise.prototype.myFinally) {
  Promise.prototype.myFinally = function (callback) {
    // 'this' refers to the promise instance we are calling .myFinally on
    const P = this.constructor;
    return this.then(
      // Success case: execute callback, then return the original value
      (value) => P.resolve(callback()).then(() => value),
      // Failure case: execute callback, then throw the original reason
      (reason) =>
        P.resolve(callback()).then(() => {
          throw reason;
        }),
    );
  };
}

// Testing Polyfill
console.log('\n--- Testing .myFinally Polyfill ---');
Promise.resolve('Success')
  .myFinally(() => console.log('Polyfill Cleanup Running...'))
  .then(console.log);

/*
--- REAL-WORLD USE CASE ---
Always use .finally() for operations that must happen regardless of the outcome,
such as:
- Closing a file handle.
- Hiding a "Loading..." state in the UI.
- Logging the completion of a transaction for analytics.
*/
