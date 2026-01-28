/*
The setTimeout in a Loop Problem:

This file addresses a classic JavaScript interview question that highlights the interaction between asynchronous operations (`setTimeout`), variable scope (`var` vs. `let`), and closures. The core problem is usually observed when `setTimeout` is used inside a `for` loop declared with `var`, leading to unexpected outputs.
*/

// --- 1. Solution using `let` (Block Scope) ---
// This function demonstrates the correct behavior when `let` is used as the loop counter.
// `let` creates a new `i` for each iteration of the loop, which is then captured by the `setTimeout`'s closure.
function x() {
  console.log("--- Using `let` in loop with setTimeout (Correct) ---");
  for (let i = 0; i < 5; i++) {
    // Each `setTimeout` captures a unique `i` from its block scope.
    setTimeout(function () {
      console.log("`let` loop output:", i); // Logs 0, 1, 2, 3, 4 sequentially after 3 seconds
    }, 3000); // All will log after 3 seconds due to fixed delay
  }
  console.log("`let` loop: 'hello' logged immediately."); // Logs immediately
}
x();

// --- 2. The Problem with `var` (Function Scope) ---
// This function demonstrates the classic bug where `var` is used as the loop counter.
// `var` is function-scoped (or global). The `setTimeout` callback forms a closure over the *same* `j` variable.
// By the time the `setTimeout`s execute, the loop has completed, and `j` has become its final value.
function varProblem() {
  console.log("\n--- Using `var` in loop with setTimeout (Problematic) ---");
  for (var j = 0; j < 5; j++) {
    // All `setTimeout`s close over the *same* `j`.
    setTimeout(function () {
      console.log("`var` loop output (problem):", j); // Logs 5, five times, after 3 seconds
    }, 3000); // All will log after 3 seconds due to fixed delay
  }
  console.log("`var` loop: 'hello' logged immediately."); // Logs immediately
}
varProblem();

// --- 3. Solution using Closure with `var` ---
// This function `y()` uses a closure (`close(k)`) to capture the correct value of `j` (passed as `k`)
// for each iteration, even when `var` is used as the loop counter.
function y() {
  console.log("\n--- Using Closure with `var` in loop (Solution) ---");
  for (var j = 0; j < 5; j++) {
    // The `close(k)` function creates a new lexical environment for each iteration.
    function close(k) { // 'k' captures the value of 'j' for this specific iteration.
      setTimeout(function () {
        console.log("`var` loop output (closure solution):", k); // Logs 0, 1, 2, 3, 4 with staggered delays
      }, k * 1000); // Staggered delays: 0s, 1s, 2s, 3s, 4s
    }
    close(j); // Call 'close' immediately, passing the current value of 'j'.
  }
  console.log("`var` loop (closure solution): final j:", j, "(This is 5, showing var's scope)."); // Logs 5 immediately
}
y();


// --- 4. Interview Questions ---

/*
Q1: What will be logged to the console by the `varProblem()` function, and why?
*/
// Answer:
// The `varProblem()` function will log `5` five times. This is because `var j` is function-scoped. By the time the `setTimeout` callbacks actually execute (after their 3-second delay), the `for` loop has already completed, and `j` has been incremented to `5`. All five `setTimeout` callbacks then close over this *same* final `j` variable, thus logging `5` each time.


/*
Q2: How does `x()` (using `let`) solve the `setTimeout` in loop problem compared to `varProblem()` (using `var`)?
*/
// Answer:
// `let` variables are block-scoped. In a `for` loop, `let` effectively creates a new variable binding for `i` in *each* iteration. Therefore, each `setTimeout` callback forms a closure over a *different, unique* `i` value corresponding to that iteration. This ensures that the callbacks log `0, 1, 2, 3, 4` respectively, as intended.


/*
Q3: How can you fix the `setTimeout` in loop problem if you are restricted to using `var`?
*/
// Answer:
// You can fix it by using a closure, often implemented with an Immediately Invoked Function Expression (IIFE) or a separate function call like in `y()`. By wrapping the `setTimeout` call inside another function (`close(k)` in `y()`) and passing the loop variable (`j`) as an argument (`k`), a new lexical environment is created for each iteration. This captures the value of `j` at that specific iteration, and the `setTimeout` callback closes over this captured `k` instead of the original `j`.


/*
Q4: What is the significance of `k * 1000` in `y()` function's `setTimeout` delay?
*/
// Answer:
// The `k * 1000` in `setTimeout`'s delay argument creates staggered delays. This means the first message will appear after 0 seconds, the second after 1 second, the third after 2 seconds, and so on. This makes the output appear one by one, rather than all at once (if the delay was fixed). It's a common way to visually separate the asynchronous outputs from each iteration.


/*
const arr = [1, 22, 11, 5];
function x() {
  arr.forEach((element) => {
    setTimeout(function () {
      console.log(element);
    },1000);
  });
}
x();

*/