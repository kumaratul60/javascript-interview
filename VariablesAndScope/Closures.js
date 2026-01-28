// This file demonstrates a key aspect of closures: capturing a reference to an outer variable.
// For a comprehensive guide on closures, including definitions, use cases, and interview questions, please refer to `closure.js` in this directory.

/*
Closures:
A function with its lexical environment bound together forms a closure.
Lexical environment: The surrounding state of a function/variable, including its local memory and references to the lexical environment of its parent.
Lexical parent: Where the function is physically located in the code.
*/

function x() {
  var a = 7; // 'a' is part of the lexical environment of 'y'

  function y() {
    console.log("Value of 'a' inside y():", a); // 'a' is a reference, not a value copy
  }
  a = 100; // 'a' is reassigned before 'y' is called
  return y; // 'y' forms a closure over 'x's scope
}
var z = x(); // 'z' now holds the function 'y' and its closure over 'x's scope
console.log("Returned function z:", z); // Output: [Function: y]
z(); // Output: Value of 'a' inside y(): 100

// Explanation:
// When `x()` is called, it returns `y()`. At this point, `a` has been updated to `100`.
// The closure `z` (which is `y`) remembers the *reference* to `a` from its lexical parent's scope.
// So, when `z()` is executed later, it accesses the *current* value of `a`, which is `100`.
// This demonstrates that closures capture variables by reference.