/*
Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase, *before* code execution.

However, only the declarations are hoisted, not the initializations. This means a variable can be used before it has been declared and/or initialized.

*/

// --- 1. Function Hoisting ---
// Function declarations are hoisted entirely (both declaration and definition).
console.log("--- Function Hoisting ---");
greet(); // Output: Hello from hoisted function!

function greet() {
  console.log("Hello from hoisted function!");
}

// Function expressions are NOT hoisted in the same way.
// Only the variable declaration (sayHello) is hoisted, not its assignment.
// sayHello(); // TypeError: sayHello is not a function (if using var) or ReferenceError (if using let/const)
var sayHello = function() {
    console.log("This is a function expression.");
};
sayHello(); // Output: This is a function expression.


// --- 2. var Hoisting ---
// 'var' declarations are hoisted to the top of their functional scope and initialized with 'undefined'.
console.log("\n--- var Hoisting ---");
console.log(myVar); // Output: undefined
var myVar = 10;
console.log(myVar); // Output: 10

// Common Pitfall with 'var': Accidental global variables without 'var' keyword
function createGlobal() {
    globalImplicitVar = "I'm global!"; // Declared without 'var', 'let', or 'const'
}
createGlobal();
console.log(globalImplicitVar); // Output: I'm global! (This can lead to unexpected side effects)


// --- 3. let and const Hoisting (and Temporal Dead Zone - TDZ) ---
// 'let' and 'const' declarations are also hoisted, but they are NOT initialized.
// Accessing them before initialization causes a ReferenceError. This period is known as the Temporal Dead Zone (TDZ).
console.log("\n--- let and const Hoisting (TDZ) ---");
// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 20;
console.log(myLet); // Output: 20

// console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
const myConst = 30;
console.log(myConst); // Output: 30

/*
Temporal Dead Zone (TDZ):
The TDZ is the period of time between the entering of a scope where `let` or `const` variable is declared and the actual declaration being evaluated. During this time, the variable cannot be accessed.
*/

// Example: TDZ in a block scope
{
    // 'blockVar' is in TDZ from here
    // console.log(blockVar); // ReferenceError
    let blockVar = "I'm in a block";
    console.log(blockVar); // Output: I'm in a block
    // 'blockVar' is out of TDZ here
}


// --- 4. Interview Questions ---

/*
Q1: What will be the output of the following code? Explain why.
console.log(a);
var a = 5;
console.log(b);
let b = 10;
*/
// Answer:
// For 'a': `undefined` because `var a` is hoisted and initialized to `undefined`.
// For 'b': `ReferenceError: Cannot access 'b' before initialization` because `let b` is hoisted but not initialized, placing it in the TDZ.


/*
Q2: What is the "Temporal Dead Zone" (TDZ) in JavaScript?
*/
// Answer:
// The TDZ is a behavior in JavaScript that occurs with `let` and `const` declarations. It's the period between when a variable is "hoisted" (its declaration is processed) and when its actual declaration line is executed and it's initialized. During the TDZ, attempting to access the variable will result in a `ReferenceError`. It helps catch errors by preventing the use of variables before they are properly set up.


/*
Q3: How do function declarations and function expressions differ in terms of hoisting?
*/
// Answer:
// Function declarations (e.g., `function foo() {}`) are fully hoisted, meaning both their name and their definition are moved to the top of the scope. They can be called before their definition in the code.
// Function expressions (e.g., `var foo = function() {}` or `const foo = () => {}`) only hoist the variable declaration (`foo`). The assignment of the function value itself is not hoisted. Therefore, you cannot call a function expression before its definition line. Attempting to do so with `var` might result in a `TypeError` (if `foo` is `undefined`) or a `ReferenceError` with `let`/`const`.


/* hoising */

// var x = 2;
// function getName(){
//     console.log("hoisyt name")
// }
// getName()
// console.log(x)
// console.log(getName)

/* how function works */

// even  if execution context created by function or globle execution context or any execution context they have own memory space or they have own virtual kind of environment seperatly that is independent of each other.

// var x = 1;
// a();
// b();
// console.log(x);

// function a() {
//   var x = 10;
//   console.log(x);
// }
// function b() {
//    var x = 1001;
//   console.log(x);
// }

/* sortest js program == no code */
// sortest javascript program is empty file => so that empty file has nothing to execute but still javascript engine doing alot of thing behind the seens.
//  if we run empty js program then it will create a global execution context and also sets the memory space
//  it also create something called as "window" in case of browser
//  It also give a "this" object => so At the globle level "this" point to the window object in case of node
//  what is window => Window is a globle object which is careated along with the globle excution context.
//  this === window => true
// when any execution context created the "this" object is will created along with that execution context

//  what is globle space/scope => Any code you write in javascript which is not inisde in the function

//  Any thing you see on top-label is global space .

//  So whenever you create any variable or funtion in global space/scope  so these variables or function get attach to the global object and that globle object is nothing but window object in browser

// var a = 2;
// function(){

// }
// console.log(window.a)
// //or
// console.log(this.a)
//or
// console.log(a)

//  if you don't put any thing in front of this it try to find in global space/scope
