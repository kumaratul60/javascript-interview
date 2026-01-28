/*
Scope in JavaScript:

Scope determines the accessibility of variables, functions, and objects in some particular part of your code during runtime. Essentially, it defines where you can use a declared identifier.

There are three main types of scope in JavaScript:
1.  **Global Scope**: Variables declared outside any function or block are in the global scope. They can be accessed from anywhere in the code.
2.  **Function Scope**: Variables declared with `var` inside a function are function-scoped. They are accessible throughout the entire function, but not outside it.
3.  **Block Scope**: Variables declared with `let` or `const` inside a block (`{}`) are block-scoped. They are only accessible within that block.

*/

// --- 1. Demonstrating Accidental Global Variables (without 'use strict') ---
// This example highlights a common JavaScript "gotcha" if `var`, `let`, or `const` are not used correctly.
console.log("--- Accidental Global Variable ---");
(function () {
  //   "use strict"; // Uncommenting this line will cause a ReferenceError for 'b'
  var a = b = 5; // 'a' is declared with 'var' and is function-scoped.
                // 'b' is assigned without explicit declaration, making it a global variable (in non-strict mode).
})();
// console.log("Value of a outside IIFE:", a); // ReferenceError: a is not defined
console.log("Value of b outside IIFE:", b); // Output: Value of b outside IIFE: 5
// Explanation: In non-strict mode, if you assign a value to a variable that hasn't been declared,
// JavaScript implicitly declares it as a global variable. `b = 5` is evaluated first, creating `window.b = 5`,
// then `var a = (window.b = 5)` assigns the value to `a`.


// --- 2. Preventing Accidental Globals with 'use strict' ---
// 'use strict' mode prevents the creation of accidental global variables by throwing a ReferenceError.
console.log("\n--- 'use strict' Example ---");
(function () {
  "use strict";
  var x = 10;
  // y = 20; // ❌ ReferenceError: y is not defined (if uncommented in strict mode)
  // var x = y = 20; // ❌ ReferenceError: y is not defined
})();


// --- 3. Contrasting `var`, `let`, and `const` Scopes ---
console.log("\n--- Scope Differences (var vs. let/const) ---");

// Global Scope
var globalVar = "I am global var";
let globalLet = "I am global let";
const globalConst = "I am global const";

function showScopes() {
  // Function Scope (var) vs Block Scope (let/const)
  var functionVar = "I am function var";
  let blockLet = "I am block let (function scope)";
  const blockConst = "I am block const (function scope)";

  if (true) {
    var ifVar = "I am var (if block)";       // Accessible throughout showScopes()
    let ifLet = "I am let (if block)";       // Accessible only within this 'if' block
    const ifConst = "I am const (if block)"; // Accessible only within this 'if' block

    console.log("  Inside if block:");
    console.log("    ifVar:", ifVar);
    console.log("    ifLet:", ifLet);
    console.log("    ifConst:", ifConst);
  }

  console.log("  Outside if block (inside showScopes function):");
  console.log("    functionVar:", functionVar);
  console.log("    ifVar:", ifVar); // ✅ 'ifVar' (var) is accessible here
  // console.log("    ifLet:", ifLet);     // ❌ ReferenceError: ifLet is not defined
  // console.log("    ifConst:", ifConst);   // ❌ ReferenceError: ifConst is not defined
}

showScopes();

console.log("Outside function (Global Scope):");
console.log("  globalVar:", globalVar);
console.log("  globalLet:", globalLet);
console.log("  globalConst:", globalConst);
// console.log("  functionVar:", functionVar); // ❌ ReferenceError


// --- 4. Interview Questions ---

/*
Q1: Explain the different types of scope in JavaScript.
*/
// Answer:
// 1. **Global Scope**: Variables accessible from anywhere in the code.
// 2. **Function Scope**: Variables declared with `var` inside a function are local to that function.
// 3. **Block Scope**: Variables declared with `let` or `const` inside any block (`{}`) are local to that block.


/*
Q2: What is an IIFE, and how is it related to scope?
*/
// Answer:
// An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. Its primary purpose is to create a private scope for variables, preventing them from polluting the global scope. Variables declared inside an IIFE (even with `var`) are local to the IIFE's function scope and are not accessible from the outside.


/*
Q3: How does 'use strict' mode affect variable scoping and accidental globals?
*/
// Answer:
// In non-strict mode, assigning a value to an undeclared variable implicitly creates a global variable. 'use strict' mode (strict mode) prevents this behavior. If you attempt to assign to an undeclared variable in strict mode, it will throw a `ReferenceError`, helping to catch common coding mistakes and enforce better practices.


/*
Q4: Consider the following code. What will be logged, and why?
```javascript
function foo() {
  var x = y = 10;
}
foo();
console.log(y);
console.log(x);
```
*/
// Answer:
// `console.log(y)` will output `10`. `console.log(x)` will throw a `ReferenceError`.
// Explanation: `var x = y = 10;` is equivalent to `y = 10; var x = y;`. Since `y` is not explicitly declared with `var`, `let`, or `const`, it becomes an accidental global variable (in non-strict mode). `x`, however, is declared with `var` inside `foo()`, making it function-scoped and thus not accessible outside `foo()`.
