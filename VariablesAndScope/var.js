/*
The `var` Keyword in JavaScript:

`var` is the original keyword for declaring variables in JavaScript, present since its inception. While still functional, its behaviors can sometimes lead to unexpected results, which is why `let` and `const` were introduced in ES6 as more predictable alternatives.

Key Characteristics of `var`:
1.  **Function-Scoped**: `var` variables are scoped to the nearest enclosing function. If declared outside any function, they become global variables, attaching to the `window` object in browsers.
2.  **Redeclaration Allowed**: A `var` variable can be redeclared multiple times within the same scope without throwing an error. The last assignment takes precedence.
3.  **Reassignment Allowed**: The value of a `var` variable can be reassigned after its initial declaration.
4.  **Hoisting**: `var` declarations are hoisted to the top of their function (or global) scope during the compilation phase. They are initialized with `undefined` when hoisted.
*/

// --- Comparison Table of Variable Declarations ---
// This table summarizes key differences between `var`, `let`, and `const`.
/*
| Keyword | Scope        | Redeclaration | Reassignment | Hoisting & TDZ      |
| :------ | :----------- | :------------ | :----------- | :------------------ |
| `var`   | Function     | ✅ Yes        | ✅ Yes       | Hoisted, `undefined` |
| `let`   | Block        | ❌ No         | ✅ Yes       | Hoisted, TDZ        |
| `const` | Block        | ❌ No         | ❌ No        | Hoisted, TDZ        |
*/

// --- Example 1: Basic 'var' Behavior (Reassignment and Redeclaration) ---
console.log("--- Basic 'var' Behavior ---");
function myFn() {
  var foo = 1;
  console.log('Initial foo:', foo); // Output: Initial foo: 1
  foo = 30; // Reassignment allowed
  console.log('Reassigned foo:', foo); // Output: Reassigned foo: 30

  var foo = 101; // Redeclaration allowed (overwrites previous 'var foo')
  console.log('Redeclared foo:', foo); // Output: Redeclared foo: 101

  var foo = 1021; // Another redeclaration
  console.log('Final foo in myFn:', foo); // Output: Final foo in myFn: 1021
}

myFn();

// console.log("foo outside myFn:", foo); // ReferenceError: foo is not defined
// 'foo' is function-scoped to `myFn` and not accessible globally.

// --- Example 2: 'var' and Function Scoping ---
// Demonstrates that 'var' variables are not block-scoped, even within 'if' blocks or loops.
console.log("\n--- 'var' and Function Scoping ---");
function showVarScope() {
  var funcScopedVar = 'I am function-scoped';

  if (true) {
    var ifBlockVar = 'I am declared inside an if block';
    console.log('  Inside if block, ifBlockVar:', ifBlockVar);
  }

  // 'ifBlockVar' is accessible here because 'var' is not block-scoped.
  console.log('  Outside if block, ifBlockVar:', ifBlockVar);

  for (var i = 0; i < 2; i++) {
    var loopVar = 'I am declared inside a loop';
    console.log('  Inside loop, loopVar:', loopVar);
  }
  // 'loopVar' is also accessible here.
  console.log('  Outside loop, loopVar:', loopVar);
}

showVarScope();
// console.log(funcScopedVar); // ReferenceError: funcScopedVar is not defined

// --- Example 3: 'var' and Hoisting ---
// 'var' declarations are hoisted to the top of their function/global scope and initialized with 'undefined'.
console.log("\n--- 'var' and Hoisting ---");
console.log('value of hoistedVar before declaration:', hoistedVar); // Output: undefined
var hoistedVar = 'I am hoisted';
console.log('value of hoistedVar after declaration:', hoistedVar); // Output: I am hoisted

// For more details on Hoisting, refer to `Hoisting.js`.

// --- Example 4: Common Pitfall - Loops with Asynchronous Operations ---
// This is a classic bug where 'var's function-scoping combined with asynchronous behavior leads to unexpected results.
console.log('\n--- Common Pitfall: `var` in Loops with `setTimeout` ---');
function varLoopProblem() {
  for (var j = 0; j < 5; j++) {
    setTimeout(function () {
      console.log('  var loop problem, final j:', j); // Logs '5' five times
    }, j * 100); // Small staggered delay for demonstration
  }
}
varLoopProblem();
// Explanation: By the time the `setTimeout` callbacks execute, the loop has completed, and `j` has reached `5`.
// All callbacks close over this *same* final value of `j`.
// For a detailed explanation and solution, refer to `setTimeOut.js`.

// --- Interview Questions ---

/*
Q1: What is the scope of a variable declared with `var`? How does it differ from `let`?
*/
// Answer:
// A variable declared with `var` is function-scoped. This means it is accessible anywhere within the function it's declared in, regardless of block boundaries (like `if` statements or `for` loops). If `var` is declared outside any function, it becomes globally scoped.
// In contrast, `let` is block-scoped, meaning it's confined to the block (`{}`) in which it is declared.

/*
Q2: Can you redeclare a variable declared with `var`? What happens if you do?
*/
// Answer:
// Yes, you can redeclare a variable declared with `var` within the same scope. JavaScript will not throw an error. When a `var` variable is redeclared, its value will simply be updated to the new assignment, or remain `undefined` if no new assignment is made. The last declaration and assignment will take precedence.

/*
Q3: How does hoisting work with `var` variables?
*/
// Answer:
// `var` declarations are hoisted to the top of their function (or global) scope. This means that the variable declaration is processed before any code is executed. However, only the declaration is hoisted, not the assignment. Consequently, a `var` variable will be initialized with `undefined` when hoisted. You can access it before its line of declaration, but its value will be `undefined` until the assignment line is reached.

/*
Q4: What is a common pitfall or unexpected behavior associated with `var` in loops, especially with asynchronous operations?
*/
// Answer:
// A common pitfall occurs in loops (e.g., `for` loops) when `var` is used as the loop counter, especially in combination with `setTimeout` or other asynchronous callbacks. Since `var` is function-scoped, the loop variable is shared across all iterations. By the time the asynchronous callbacks execute, the loop has already finished, and the loop variable holds its final value. All callbacks will then reference this same final value, leading to unexpected results (e.g., logging the same number multiple times). This problem is solved using `let` (which is block-scoped) or a closure to capture the variable's value for each iteration.
