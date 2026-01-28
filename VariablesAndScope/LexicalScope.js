/*
Lexical Scope (Static Scope):
Lexical scope is a fundamental concept in JavaScript that defines where variables and other expressions are available in your code. It's called "lexical" because it's determined by the *physical placement* of the code during authoring (compile time), not during runtime.

Key principles:
1.  **Outer can't access Inner**: A function cannot access variables defined inside its child functions.
2.  **Inner can access Outer**: A function can access variables defined in its parent functions (and its parent's parents, and so on, up to the global scope).
3.  **The Chain**: This forms a "scope chain" or "lexical environment chain", where the JavaScript engine looks for a variable from the current scope outwards.

Lexical scope is the underlying mechanism that enables closures.
(For a comprehensive guide on closures and their relationship with lexical scope, refer to `closure.js` in this directory.)
*/

// --- 1. Basic Lexical Scope Example ---
// The `addChild` function forms a closure over the `add` function's scope,
// allowing it to "remember" and access `a` even after `add` has finished executing.
console.log("--- Basic Lexical Scope ---");
function add() {
  let a = 4; // Variable 'a' is in the lexical environment of 'addChild'

  function addChild() {
    console.log("addChild accessing 'a':", a + 5); // 'addChild' can access 'a'
  }
  addChild(); // 'addChild' is executed here
}
add(); // Output: addChild accessing 'a': 9


// --- 2. Multi-level Nested Lexical Scope Example ---
// Demonstrates how inner functions have access to variables from all their outer scopes.
console.log("\n--- Multi-level Nested Lexical Scope ---");
const globalVar = "I'm Global"; // Global scope

function outerFunction() {
  const outerVar = "I'm from Outer"; // outerFunction's scope

  function middleFunction() {
    const middleVar = "I'm from Middle"; // middleFunction's scope

    function innerFunction() {
      const innerVar = "I'm from Inner"; // innerFunction's scope
      console.log("innerFunction can access:");
      console.log("  innerVar:", innerVar); // From its own scope
      console.log("  middleVar:", middleVar); // From middleFunction's scope
      console.log("  outerVar:", outerVar); // From outerFunction's scope
      console.log("  globalVar:", globalVar); // From global scope
    }
    // console.log("middleFunction can't access innerVar:", innerVar); // ❌ ReferenceError
    innerFunction();
  }
  // console.log("outerFunction can't access middleVar:", middleVar); // ❌ ReferenceError
  middleFunction();
}
outerFunction();


// --- 3. Interview Questions ---

/*
Q1: What is lexical scope in JavaScript?
*/
// Answer:
// Lexical scope refers to the ability of an inner function to access variables declared in its outer (parent) function's scope. This access is determined by the physical placement of the functions in the code, rather than where the functions are called.


/*
Q2: How does lexical scope enable closures?
*/
// Answer:
// Closures are formed because of lexical scope. When an inner function is returned from an outer function, it "remembers" its lexical environment (including variables from its parent's scope). Even if the outer function has finished executing, the inner function (the closure) can still access and manipulate those outer variables because it maintains a reference to that lexical environment.


/*
Q3: What would be the output of the following code and why?
```javascript
let x = 10;
function foo() {
  console.log(x);
  let x = 20;
}
foo();
```
*/
// Answer:
// This code would throw a `ReferenceError: Cannot access 'x' before initialization`.
// Although `let x = 20;` is declared inside `foo()`, its declaration is hoisted to the top of `foo()`'s scope. However, `let` variables are in a Temporal Dead Zone (TDZ) until their actual declaration line is executed. The `console.log(x)` attempts to access `x` within its TDZ *within the `foo` function's scope*, not the global `x=10`.


/*
Q4: Can an outer function access variables declared inside an inner function?
*/
// Answer:
// No, an outer function cannot access variables declared inside its inner function. Lexical scope dictates that variable access flows from inner scopes outwards, not the other way around. Variables declared within an inner function are local to that inner function and are not part of the outer function's lexical environment.
