/**
 * @file PromiseWithResolvers.js
 * @description Understanding Promise.withResolvers()
 * @level Intermediate-Advanced
 * @status ES2024 (Standard)
 *
 * PROBLEM STATEMENT:
 * Explain the purpose of Promise.withResolvers() and how it simplifies
 * external control of a promise compared to the traditional constructor pattern.
 *
 * WHY IT'S ASKED:
 * Tests your knowledge of:
 * - Promise lifecycle management.
 * - Avoiding "Revealing Constructor" boilerplate.
 * - Modern ES2024 features.
 *
 * REAL-WORLD USE CASE:
 * - Creating a promise that needs to be resolved by an external event (e.g., a button click).
 * - Implementing custom stream-like behavior.
 * - Cleanly handling async operations in non-async contexts.
 */

// --- POLYFILL / IMPLEMENTATION ---
if (!Promise.withResolvers) {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

// --- 1. THE OLD WAY (Boilerplate-heavy) ---
console.log('--- The Old Way (Constructor Pattern) ---');
let oldResolve;
const oldPromise = new Promise((res) => {
  oldResolve = res;
});
oldPromise.then((val) => console.log('Old Resolve Result:', val));
oldResolve('Done manually!');

// --- 2. THE NEW WAY (Promise.withResolvers) ---
console.log('\n--- The New Way (withResolvers Pattern) ---');

const { promise, resolve, reject } = Promise.withResolvers();

promise.then(
  (val) => console.log('Success:', val),
  (err) => console.error('Error:', err),
);

// We can resolve it from anywhere in our code without being inside an executor
resolve('Resolved from external scope! ✅');

// --- 3. PRACTICAL EXAMPLE: Custom Event Trigger ---
const createTrigger = () => {
  const { promise, resolve } = Promise.withResolvers();

  // Simulate some external event (like a button click or message received)
  setTimeout(() => {
    resolve('🎉 Event Triggered after 1s');
  }, 1000);

  return promise;
};

createTrigger().then(console.log);

/*
--- COMPARISON & BENEFITS ---

1. FLAT STRUCTURE: No more nesting your logic inside a `new Promise(...)` executor.
2. BETTER SCOPING: `resolve` and `reject` are naturally available in the local scope.
3. READABILITY: It clearly signals that this promise will be controlled externally.

--- STAFF TIP ---
Use this when you have a long-running process where the start and end of
the operation happen in different places (e.g., a Socket.io message handler
that needs to resolve a promise started by a UI component).
*/
