// This file provides additional examples demonstrating the behavior of `setTimeout` within loops,
// especially concerning `var` and `let` scoping, and solutions using closures.
// For a detailed explanation of the "setTimeout in a loop" problem, its causes,
// solutions, and interview questions, please refer to `setTimeOut.js` in this directory.


// --- Example 1: `var` in loop with `setTimeout` ---
// This function `x()` demonstrates the classic problem.
// Due to `var`'s function-scoping, `i` will be `6` when the `setTimeout` callbacks execute.
const x = () => {
  console.log("--- Example with `var` (problematic) ---");
  for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log("`var` loop output:", i); // Logs 6 five times
    }); // Default delay is 0, but execution is deferred to macrotask queue
  }
};
x();

// --- Example 2: `let` in loop with `setTimeout` ---
// This function `y()` demonstrates the correct behavior using `let`.
// `let` creates a new `i` binding for each loop iteration.
const y = () => {
  console.log("\n--- Example with `let` (correct) ---");
  for (let i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log("`let` loop output:", i); // Logs 1, 2, 3, 4, 5
    });
  }
};
y();

// --- Example 3: `var` in loop with Closure (IIFE pattern) ---
// This function `z()` demonstrates a solution for `var` using a closure (specifically an IIFE pattern).
// The `close(k)` function captures the value of `k` for each iteration.
const z = () => {
  console.log("\n--- Example with `var` and Closure (solution) ---");
  for (var k = 1; k <= 5; k++) {
    function close(currentK) { // `currentK` captures the value of `k`
      setTimeout(function () {
        console.log("`var` loop with closure output:", currentK); // Logs 1, 2, 3, 4, 5
      });
    }
    close(k); // Pass the current value of `k` to the closure immediately
  }
};
z();

// For more detailed explanations and common interview questions on this topic,
// please refer to `setTimeOut.js`.
