# Hoisting in JavaScript

Hoisting is a fundamental JavaScript mechanism that influences how variable and function declarations are processed during the compilation phase, _before_ the code actually executes. Understanding hoisting is crucial for avoiding unexpected behavior and for excelling in JavaScript interviews.

## Table of Contents

- [Hoisting in JavaScript](#hoisting-in-javascript)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction: What is Hoisting?](#1-introduction-what-is-hoisting)
  - [2. Types of Hoisting: `var`, `let`/`const`, and Functions](#2-types-of-hoisting-var-letconst-and-functions)
    - [2.1 Function Hoisting](#21-function-hoisting)
    - [2.2 `var` Hoisting](#22-var-hoisting)
    - [2.3 `let` and `const` Hoisting (Temporal Dead Zone - TDZ)](#23-let-and-const-hoisting-temporal-dead-zone---tdz)
  - [3. Global Execution Context, `window`, and `this` (Hoisting's Environment)](#3-global-execution-context-window-and-this-hoistings-environment)
  - [4. Common Hoisting Scenarios \& Pitfalls](#4-common-hoisting-scenarios--pitfalls)
  - [5. Key Takeaways \& Interview One-Liners](#5-key-takeaways--interview-one-liners)
  - [6. Interview Questions \& Answers](#6-interview-questions--answers)

---

## 1. Introduction: What is Hoisting?

Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (global or function scope) during the "creation phase" of the Execution Context, before code execution begins.

**Key points:**

- **Declarations are hoisted, not initializations.** Only the variable or function declaration itself is moved to the top, not any assignment of a value.
- This allows you to use variables and call functions before they appear in your code, though with different behaviors depending on their type (`var`, `let`, `const`, functions).

---

## 2. Types of Hoisting: `var`, `let`/`const`, and Functions

### 2.1 Function Hoisting

Function **declarations** are fully hoisted. This means both their name and their entire definition (the function's code body) are moved to the top of their containing scope. You can call a function declaration before it is defined in the code.

```javascript
console.log('--- 2.1 Function Hoisting ---');
try {
  hoistedFunction(); // Output: Hello from a fully hoisted function!
} catch (e) {
  console.error(e);
}

function hoistedFunction() {
  console.log('Hello from a fully hoisted function!');
}
```

Function **expressions** (when assigned to a variable) are not fully hoisted. Only the variable declaration itself is hoisted (like `var` or `let`/`const`), not the assignment of the function value.

```javascript
// try {
//     hoistedExpression(); // This would throw:
//                         // With `var`: TypeError: hoistedExpression is not a function (because `hoistedExpression` is `undefined`)
//                         // With `let`/`const`: ReferenceError: Cannot access 'hoistedExpression' before initialization (TDZ)
// } catch (e) { console.error(e); }

var hoistedExpression = function () {
  console.log('This is a hoisted function expression (variable declaration only).');
};
try {
  hoistedExpression(); // Output: This is a hoisted function expression (variable declaration only).
} catch (e) {
  console.error(e);
}
```

---

### 2.2 `var` Hoisting

Variables declared with `var` are hoisted to the top of their _functional scope_ (or global scope if declared outside any function). They are automatically initialized with `undefined`. This means you can access a `var` variable before its declaration, but its value will be `undefined`.

```javascript
console.log("
--- 2.2 `var` Hoisting ---");
console.log("Value of `myVar` before declaration:", myVar); // Output: Value of `myVar` before declaration: undefined
var myVar = 100;
console.log("Value of `myVar` after declaration:", myVar);  // Output: Value of `myVar` after declaration: 100
```

**Common Pitfall: Accidental global variables** (a related concept, not strictly hoisting)
If you declare a variable without `var`, `let`, or `const` outside strict mode, it becomes a property of the global object (`window` in browsers).

```javascript
function createAccidentalGlobal() {
  accidentalGlobal = 'I am an accidental global!'; // No `var`, `let`, or `const`
}
createAccidentalGlobal();
console.log('Accidental global:', accidentalGlobal); // Output: Accidental global: I am an accidental global!
```

---

### 2.3 `let` and `const` Hoisting (Temporal Dead Zone - TDZ)

Variables declared with `let` and `const` are also hoisted, but with a crucial difference: they are hoisted to the top of their _block scope_ and are **not initialized**. Attempting to access them before their declaration/initialization line is executed will result in a `ReferenceError`. This period is known as the **Temporal Dead Zone (TDZ)**.

```javascript
console.log("
--- 2.3 `let` and `const` Hoisting (TDZ) ---");

// Example of TDZ:
// try {
//     console.log("Value of `myLet` before declaration:", myLet); // ReferenceError: Cannot access 'myLet' before initialization
// } catch (e) { console.error("TDZ for `myLet`:", e.message); }
let myLet = 200;
console.log("Value of `myLet` after declaration:", myLet); // Output: Value of `myLet` after declaration: 200

// try {
//     console.log("Value of `myConst` before declaration:", myConst); // ReferenceError: Cannot access 'myConst' before initialization
// } catch (e) { console.error("TDZ for `myConst`:", e.message); }
const myConst = 300;
console.log("Value of `myConst` after declaration:", myConst); // Output: Value of `myConst` after declaration: 300
```

**Temporal Dead Zone (TDZ):**
The TDZ is the time period between the beginning of a `let` or `const` variable's scope and the actual execution of its declaration. During this time, the variable exists in memory (is hoisted) but cannot be accessed. This behavior helps catch programming errors by making it clear that variables must be explicitly initialized before use.

**TDZ in a block scope:**

```javascript
{
  // `blockScopedLet` is in TDZ from here
  // try {
  //     console.log(blockScopedLet); // ReferenceError
  // } catch (e) { console.error("TDZ for `blockScopedLet`:", e.message); }
  let blockScopedLet = "I'm block-scoped!";
  console.log('Inside block scope:', blockScopedLet); // Output: Inside block scope: I'm block-scoped!
  // `blockScopedLet` is out of TDZ here
}
// console.log(blockScopedLet); // ReferenceError: blockScopedLet is not defined (outside its block scope)
```

---

## 3. Global Execution Context, `window`, and `this` (Hoisting's Environment)

Hoisting occurs within an Execution Context. The most fundamental is the Global Execution Context (GEC).

```javascript
console.log("
--- 3. Global Execution Context, `window`, and `this` ---");
```

When an empty JavaScript file runs:

1.  A **Global Execution Context** is created.
2.  During the **creation phase** of the GEC:
    - Memory space is set up.
    - For browsers, a global object called `window` is created.
    - A special `this` variable is created and, at the global level, points to the `window` object.
    - All `var` declarations are hoisted and set to `undefined`.
    - All function declarations are hoisted entirely.
    - `let`/`const` declarations are hoisted but remain in the TDZ.

**Shortest JS program:** An empty file. Yet, the JS engine sets up GEC, `window`, and `this`.
In a browser's global scope:

```javascript
// console.log(this === window); // true
// console.log(window); // [object Window]
```

Any code not inside a function is in the global space/scope. Variables and functions declared in the global space become properties of the global object (`window` in browsers).

```javascript
var globalVar = 'I am a global var';
function globalFunc() {
  return 'I am a global function';
}

// In a browser:
// console.log(window.globalVar);   // Output: I am a global var
// console.log(window.globalFunc()); // Output: I am a global function
// console.log(this.globalVar);     // Output: I am a global var
```

---

## 4. Common Hoisting Scenarios & Pitfalls

```javascript
console.log("
--- 4. Common Hoisting Scenarios & Pitfalls ---");
```

**Example 1: Function vs. Variable Hoisting precedence**

Function declarations are hoisted _before_ variable declarations. If a `var` variable and a function have the same name, the function typically wins. However, if the `var` variable is later _initialized_, it can overwrite the function reference. This is why naming conflicts are bad!

```javascript
// A simple example of ambiguity
var ambiguous = 10;
function ambiguous() {
  return 'I am a function';
}
// console.log(typeof ambiguous); // In old engines, `function`. In modern, `number` due to initialization.
// Output depends on if the `var` initialization happens before or after the function is resolved.

// More explicit example of this ambiguity:
console.log('Value of `conflict` before declaration:', typeof conflict); // Output: function (due to function hoisting)
// (Note: some environments might show 'undefined' if `var conflict` is processed first then function,
// but generally function declarations take precedence in the hoisting phase for initial assignment).
function conflict() {
  return 'Function conflict';
}
var conflict = 'Variable conflict'; // This initialization will likely overwrite the function reference *during execution*.
console.log('Value of `conflict` after declarations:', conflict); // Output: Variable conflict (the var assignment wins during execution)
// And then if you tried to call it:
// try {
//     conflict(); // TypeError: conflict is not a function
// } catch (e) { console.error("Calling overwritten function:", e.message); }
```

**Example 2: Hoisting with local scope**

```javascript
var value = 50;
function showValue() {
  console.log('Inside showValue, before local var:', value); // Output: undefined (local `var value` is hoisted here)
  var value = 100; // This `var` declaration hoists `value` to the top of `showValue`'s scope
  console.log('Inside showValue, after local var:', value); // Output: 100
}
showValue();
console.log('Outside showValue:', value); // Output: 50 (global `value` is unaffected)
```

---

## 5. Key Takeaways & Interview One-Liners

```javascript
console.log("
--- 5. Key Takeaways & Interview One-Liners ---");
```

- Hoisting moves declarations to the top of their scope, not initializations.
- `var` variables are hoisted and initialized to `undefined`.
- Function declarations are fully hoisted (declaration + definition).
- `let`/`const` are hoisted but remain in the Temporal Dead Zone (TDZ) until initialized.
- Avoid `var` for better predictability and to leverage block-scoping.
- Always declare variables and functions before use to make code clearer and prevent TDZ errors.
- TDZ makes `let`/`const` safer by preventing access to uninitialized variables.

---

## 6. Interview Questions & Answers

```javascript
console.log("
--- 6. Interview Questions & Answers ---");
```

**Q1: What will be the output of the following code? Explain why.**

```javascript
console.log(a);
var a = 5;
console.log(b);
let b = 10;
```

**A1:**

- For `a`: `undefined`. Explanation: `var a` is hoisted to the top of its scope and automatically initialized to `undefined`. When `console.log(a)` is called, `a` exists but holds `undefined`.
- For `b`: `ReferenceError: Cannot access 'b' before initialization`. Explanation: `let b` is hoisted, but it is not initialized. It is in the Temporal Dead Zone (TDZ) until its declaration line is executed. Accessing it during the TDZ causes a `ReferenceError`.

---

**Q2: Explain the concept of "Temporal Dead Zone" (TDZ) in JavaScript.**

**A2:** The Temporal Dead Zone (TDZ) is the period between when a `let` or `const` variable's declaration is hoisted to the top of its scope and when its actual declaration line (and potential initialization) is executed. During the TDZ, the variable exists but cannot be accessed, preventing common errors where variables are used before being assigned a value. Attempting to access a variable in the TDZ results in a `ReferenceError`.

---

**Q3: How do function declarations and function expressions differ in terms of hoisting?**

**A3:**

- **Function Declarations (`function foo() {}`)**: These are fully hoisted. Both the function's name and its entire code body are moved to the top of the scope, allowing them to be called before their physical definition in the code.
- **Function Expressions (`var foo = function() {}` or `const bar = () => {}`)**: Only the variable part of the declaration (`foo` or `bar`) is hoisted. The assignment of the function value itself is not. Therefore, you cannot call a function expression before its definition line. Attempting to do so with `var` would result in a `TypeError` (as the variable would be `undefined`), or a `ReferenceError` with `let`/`const` (due to TDZ).

---

**Q4: What is the behavior of the following code?**

```javascript
var x = 1;
function a() {
  console.log(x);
  var x = 10;
}
function b() {
  console.log(x);
}
a(); // Output?
b(); // Output?
```

**A4:**

- `a()`: Output will be `undefined`. Explanation: Inside function `a`, `var x = 10` is hoisted to the top of `a`'s local scope. So, when `console.log(x)` is encountered, `x` refers to `a`'s local `x` which has been hoisted but not yet initialized (it's `undefined`). The global `x` is completely shadowed within `a`.
- `b()`: Output will be `1`. Explanation: Function `b` does not have a local `x` declaration. Therefore, `console.log(x)` looks for `x` in its outer (global) scope, finding the global `var x = 1`.

---

**Q5: Explain how hoisting relates to the Global Execution Context and the `window` object in browsers.**

**A5:** When a JavaScript file starts executing, a Global Execution Context (GEC) is created. During the _creation phase_ of this GEC, `var` declarations and function declarations are hoisted. In a browser environment, the GEC creates the `window` global object. All `var` variables and function declarations (not `let`/`const`) declared at the global scope become properties of this `window` object. The global `this` keyword also points to the `window` object. This means `window.myGlobalVar` and `this.myGlobalVar` (at global scope) would refer to the hoisted global `var` variable.
