/**
 * @file PromiseTry.js
 * @description Understanding Promise.try (The Safety Net)
 * @level Intermediate-Advanced
 * @status ES2025 (TC39 Stage 4)
 *
 * PROBLEM STATEMENT:
 * Explain how to safely start a promise chain that might throw a
 * synchronous error before the first asynchronous task.
 *
 * WHY IT'S ASKED:
 * Tests your knowledge of:
 * - Synchronous vs Asynchronous error handling.
 * - Promise chain entry points.
 * - Understanding of microtask scheduling vs immediate execution.
 */

/*
--- DECISION MATRIX: When to use Promise.try ---

✅ USE IT WHEN:
- You are building a .then().catch() chain.
- You have "risky" synchronous code (like JSON.parse) at the start of a chain.
- You want to ensure a function ALWAYS returns a Promise, even if it fails immediately.

❌ AVOID IT WHEN:
- Using async/await (standard try/catch is cleaner).
- Performance is ultra-critical (it creates an extra Promise object).
- Supporting legacy environments without a polyfill.
*/

// --- POLYFILL / IMPLEMENTATION ---
if (!Promise.try) {
  Promise.try = function (fn) {
    return new Promise((resolve) => {
      // Note: resolve(fn()) handles both sync returns and sync throws
      resolve(fn());
    });
  };
}

// --- EXAMPLE 1: The Problem (Synchronous Error) ---
function riskySyncCode() {
  throw new Error('💥 Sync Crash!');
}

console.log('--- Standard approach (fails to catch sync error in chain) ---');
try {
  // If this throws, the .catch() on the promise below is NEVER reached
  riskySyncCode();
  Promise.resolve().then(() => console.log('Success'));
} catch (e) {
  console.log('Caught by EXTERNAL try-catch (Required for sync code):', e.message);
}

// --- EXAMPLE 2: The Solution (Promise.try) ---
console.log('\n--- Promise.try approach (unified error channel) ---');

Promise.try(() => {
  // This sync error is automatically converted into a rejected promise
  return riskySyncCode();
})
  .then((res) => console.log('Result:', res))
  .catch((err) => console.log('Caught by PROMISE chain (No external try-catch needed):', err.message));

// --- EXAMPLE 3: Mixing Sync and Async (Real-World Use Case) ---
/**
 * Unified Error Channels: Wrap functions that might throw before starting a fetch.
 */
const getUserData = (id) => {
  return Promise.try(() => {
    if (!id) throw new Error('ID is required!'); // Sync throw
    // Imagine this is a database or API call returning a promise
    return Promise.resolve({ id, name: 'John Doe' });
  });
};

getUserData(null).catch((e) => console.log('\nValidation Error caught in chain:', e.message));

/*
--- ⚠️ PITFALLS & COMMON MISTAKES ---

1. IMMEDIATE EXECUTION:
   Unlike .then(), the function passed to Promise.try(fn) runs IMMEDIATELY
   (synchronously). It is not deferred to the microtask queue until the
   function itself finishes.
*/

console.log('\n--- Pitfall: Execution Order ---');
console.log('1. Before Promise.try');
Promise.try(() => {
  console.log('2. Inside Promise.try (Sync!)');
});
console.log('3. After Promise.try');
// Output will be 1, 2, 3 (not 1, 3, 2 as some expect)

/*
2. RETURN WRAPPING:
   If your function returns a value, Promise.try wraps it in a Promise.
   If it returns a Promise, it "flattens" it (adopts its state).
*/
