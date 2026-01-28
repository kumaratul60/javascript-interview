/*
Closures:
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler terms, a closure gives you access to an outer function’s scope from an inner function.

For a comprehensive guide on closures, including definitions, use cases, pitfalls, and interview questions, please refer to `closure.js` in this directory.
*/

// --- Simple Closure Example ---
// This example demonstrates how the `inner` function retains access
// to the `a` variable from `outer`'s scope even after `outer` has executed.
function outer() {
  var a = 10; // 'a' is part of the lexical environment of 'inner'
  function inner() {
    console.log("Value of 'a' inside inner():", a);
  }
  return inner; // 'inner' forms a closure over 'outer's scope
}
outer()(); // Output: Value of 'a' inside inner(): 10
// When `outer()` is called, it returns `inner()`. Executing `outer()()` immediately
// calls this returned `inner` function, which still has access to `a = 10`.
