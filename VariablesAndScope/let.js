/*
The `let` Keyword in JavaScript:

`let` is a keyword introduced in ECMAScript 2015 (ES6) for declaring variables. It provides a more robust and predictable way to declare variables compared to `var`, primarily due to its block-scoping behavior.

Key Characteristics of `let`:
1.  **Block-Scoped**: `let` variables are scoped to the nearest enclosing block (`{...}`). This means they are only accessible within that block and its child blocks, unlike `var` which is function-scoped.
2.  **No Redeclaration**: A `let` variable cannot be redeclared within the same scope. Attempting to do so will result in a `SyntaxError`.
3.  **Reassignment Allowed**: The value of a `let` variable can be reassigned after its initial declaration.
4.  **Hoisting & TDZ**: `let` declarations are hoisted to the top of their block scope but are not initialized. They are in a Temporal Dead Zone (TDZ) from the start of their block until their declaration is encountered, preventing access before initialization (results in `ReferenceError`).
*/

// --- Comparison Table of Variable Declarations ---
// This table summarizes key differences between `var`, `let`, and `const`.
| Keyword | Scope        | Redeclaration | Reassignment | Hoisting & TDZ      |
| :------ | :----------- | :------------ | :----------- | :------------------ |
| `var`   | Function     | ✅ Yes        | ✅ Yes       | Hoisted, `undefined` |
| `let`   | Block        | ❌ No         | ✅ Yes       | Hoisted, TDZ        |
| `const` | Block        | ❌ No         | ❌ No        | Hoisted, TDZ        |


// --- Example 1: Basic 'let' Behavior (Reassignment and No Redeclaration) ---
console.log("--- Basic 'let' Behavior ---");
function myFn() {
  let foo = 1;
  console.log("Initial foo:", foo); // Output: Initial foo: 1
  foo = 30; // ✅ Reassignment allowed
  console.log("Reassigned foo:", foo); // Output: Reassigned foo: 30

  // let foo = 101; // ❌ SyntaxError: 'foo' has already been declared
  // Redeclaration is not allowed in the same scope.

  foo = 101; // ✅ Reassignment again
  console.log("Final foo in myFn:", foo); // Output: Final foo in myFn: 101
}

myFn();

// console.log("foo outside myFn:", foo); // ReferenceError: foo is not defined
// 'foo' is scoped to `myFn` and not accessible globally.


// --- Example 2: 'let' and Block Scoping ---
// Demonstrates that `let` variables are confined to the block they are declared in.
console.log("\n--- 'let' and Block Scoping ---");
var varVariable = "I'm var (global)";
let letVariable = "I'm let (global)";

if (true) {
  var varVariable = "I'm var (inside if)"; // ✅ Redeclares the global 'varVariable'
  let letVariable = "I'm let (inside if)";   // ✅ Creates a NEW block-scoped 'letVariable'
  console.log("Inside if block:");
  console.log("  varVariable:", varVariable); // Output: I'm var (inside if)
  console.log("  letVariable:", letVariable); // Output: I'm let (inside if)
}

console.log("Outside if block:");
console.log("  varVariable:", varVariable); // Output: I'm var (inside if) (global var was overwritten)
console.log("  letVariable:", letVariable); // Output: I'm let (global) (block-scoped let is gone)

// Example with for loop
for (var i = 0; i < 3; i++) { /* ... */ }
console.log("var loop counter 'i' outside loop:", i); // Output: 3

for (let j = 0; j < 3; j++) { /* ... */ }
// console.log("let loop counter 'j' outside loop:", j); // ReferenceError: j is not defined


// --- Example 3: 'let' and Temporal Dead Zone (TDZ) ---
// Accessing a 'let' variable before its declaration line results in a ReferenceError.
console.log("\n--- 'let' and TDZ ---");
// console.log(tdzVar); // ❌ ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = "I'm out of TDZ!";
console.log(tdzVar); // Output: I'm out of TDZ!

// For more details on Hoisting and TDZ, refer to `Hoisting.js`.


// --- Interview Questions ---

/*
Q1: What is the main difference between `var` and `let`?
*/
// Answer:
// The main difference is their scope. `var` is function-scoped (or globally scoped if declared outside a function), meaning it's accessible throughout the entire function. `let`, on the other hand, is block-scoped, meaning it's only accessible within the block (`{}`) where it's declared. This block-scoping behavior makes `let` less prone to bugs and easier to reason about.


/*
Q2: Can you redeclare a variable declared with `let` in the same scope?
*/
// Answer:
// No, you cannot redeclare a variable declared with `let` within the same scope. Doing so will result in a `SyntaxError`. However, you *can* declare a `let` variable with the same name in a *different* (nested) block scope, which creates a new, separate variable.


/*
Q3: Explain the concept of the Temporal Dead Zone (TDZ) in relation to `let` variables.
*/
// Answer:
// The TDZ is a period during which `let` (and `const`) variables exist in a hoisted state but cannot be accessed. It starts from the beginning of the block scope until the actual declaration statement is executed. Attempting to access a `let` variable within its TDZ will throw a `ReferenceError`, promoting better coding practices by preventing the use of variables before they are initialized.


/*
Q4: Provide a scenario where using `let` over `var` can prevent a common bug.
*/
// Answer:
// A classic scenario is within a `for` loop that contains an asynchronous operation (like `setTimeout`).
// With `var`, the loop variable (`i`) is function-scoped. By the time `setTimeout` callbacks execute, `i` has its final value (loop's end value), leading to all callbacks logging the same incorrect value.
// With `let`, `j` is block-scoped, and a new `j` is created for each iteration. Each `setTimeout` callback captures the correct `j` from its iteration, solving the bug.
// ```javascript
// for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); } // Logs '3' three times
// for (let j = 0; j < 3; j++) { setTimeout(() => console.log(j), 100); } // Logs '0', '1', '2'
// ```