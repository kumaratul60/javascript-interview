// This file demonstrates deeply nested closures.
// For a comprehensive guide on closures, including definitions, use cases, pitfalls, and interview questions, please refer to `closure.js` in this directory.

/*
Closures:
A function, along with its lexical environment (its local memory plus the lexical environment of its parent), bundled together forms a closure. This allows an inner function to retain access to variables from its outer (parent) scopes even after the outer functions have finished executing.
*/

// --- Deeply Nested Closures Example ---
// This example shows `y` accessing variables `a` from `x`'s scope and `b` from `z`'s scope.
function z() { // Outermost function's scope
  var b = 500;
  function x() { // Middle function's scope
    var a = 7;
    function y() { // Innermost function's scope
      console.log("Deep Closure Example: a =", a, ", b =", b);
    }
    y(); // `y` is executed within `x`'s scope, which is within `z`'s scope
  }
  x(); // `x` is executed within `z`'s scope
}
z(); // Output: Deep Closure Example: a = 7 , b = 500

// Explanation:
// - `y` is defined inside `x`, so it forms a closure over `x`'s lexical environment (accessing `a`).
// - `x` is defined inside `z`, so it forms a closure over `z`'s lexical environment (accessing `b`).
// - Therefore, `y` indirectly has access to `b` through `x`'s closure over `z`.


// closure ->  A function with its lexical environment(local memory along with reference of its parent(lexical parent -> where actually function sits inside the code) bind together or bundle together forms a closure)

//  use case of closure

/*
 * Module design pattern
 * Currying
 * Functions like once
 * Memoize
 * Maintaining state is async world
 * setTimeouts
 * Iterators
 * and many more...
 */
