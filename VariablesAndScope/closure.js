/*
Closures:
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler terms, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

Lexical Scope:
Lexical scope (or static scope) means that the accessibility of variables is determined by the physical placement of the function declaration within the source code. An inner function can access variables declared in its outer (parent) scope, but the outer function cannot access variables from its inner (child) scope.
*/

// --- 1. Basic Closure Example ---
// The `addChild` function forms a closure over the `add` function's scope,
// allowing it to "remember" and access `a` even after `add` has finished executing.
function add() {
  let a = 4; // 'a' is part of the lexical environment of 'addChild'

  function addChild() {
    console.log("Basic Closure Example:", a + 5);
  }
  return addChild; // Returning 'addChild' without executing it immediately
}

let catchAdd = add(); // 'catchAdd' now holds a reference to 'addChild' and its closure
console.log("Returned function:", catchAdd); // Output: [Function: addChild]
catchAdd(); // Output: Basic Closure Example: 9
// Here, `addChild` (referenced by `catchAdd`) still has access to `a` (value 4) from `add`'s scope.


// --- 2. Closure with Nested Scopes ---
// Demonstrates how inner functions have access to variables from all their outer scopes.
var globalVar = "xyz"; // Global scope

(function outerFunc(outerArg) { // outerFunc's scope
  var outerVar = "a";

  (function innerFunc(innerArg) { // innerFunc's scope
    var innerVar = "b";

    console.log("\n--- Nested Closure Example ---");
    console.log("outerArg = " + outerArg); // Accesses outerFunc's argument
    console.log("innerArg = " + innerArg); // Accesses innerFunc's argument
    console.log("outerVar = " + outerVar); // Accesses outerFunc's local variable
    console.log("innerVar = " + innerVar); // Accesses innerFunc's local variable
    console.log("globalVar = " + globalVar); // Accesses global variable
  })(456); // Immediately invoke innerFunc with argument 456
})(123); // Immediately invoke outerFunc with argument 123


// --- 3. Practical Use Case: Private Counter ---
// Closures can be used to create private variables that can only be manipulated
// through exposed public methods, achieving encapsulation.
console.log("\n--- Private Counter Example (Closure for Encapsulation) ---");
function createCounter() {
  let count = 0; // This variable is private to the createCounter scope

  return {
    increment: function() {
      count++;
      console.log("Incremented to:", count);
    },
    decrement: function() {
      count--;
      console.log("Decremented to:", count);
    },
    getCount: function() {
      return count; // Only way to read the private 'count'
    }
  };
}

const myCounter = createCounter(); // 'myCounter' gets the object with public methods
myCounter.increment(); // Output: Incremented to: 1
myCounter.increment(); // Output: Incremented to: 2
console.log("Current count:", myCounter.getCount()); // Output: Current count: 2
// console.log(myCounter.count); // undefined - cannot directly access 'count'


// --- 4. Common Pitfall: 'var' in Loops with Callbacks ---
// This example demonstrates why 'var' with asynchronous callbacks in loops
// leads to unexpected results, and how closures (or 'let') fix it.
console.log("\n--- Pitfall: 'var' in Loops (will log 5 five times) ---");
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log("var loop (problem):", i); // 'i' is 5 in every iteration
  }, i * 100);
}
// Expected Output (after small delays):
// var loop (problem): 5
// var loop (problem): 5
// var loop (problem): 5
// var loop (problem): 5
// var loop (problem): 5
// Reason: 'var i' is function-scoped. By the time setTimeout callbacks execute, the loop has completed, and 'i' has become 5.

console.log("\n--- Solution 1: Using 'let' in Loops (will log 0-4) ---");
for (let j = 0; j < 5; j++) {
  setTimeout(function() {
    console.log("let loop (solution):", j); // 'j' is block-scoped, creating a new 'j' for each iteration
  }, j * 100);
}
// Expected Output (after small delays):
// let loop (solution): 0
// let loop (solution): 1
// let loop (solution): 2
// let loop (solution): 3
// let loop (solution): 4

console.log("\n--- Solution 2: Using Closure with 'var' (will log 0-4) ---");
for (var k = 0; k < 5; k++) {
  (function(capturedK) { // An IIFE creates a new scope for each iteration, capturing 'k'
    setTimeout(function() {
      console.log("var loop (closure solution):", capturedK);
    }, capturedK * 100);
  })(k); // Pass 'k' as an argument, which is then captured by the IIFE's scope
}
// Expected Output (after small delays):
// var loop (closure solution): 0
// var loop (closure solution): 1
// var loop (closure solution): 2
// var loop (closure solution): 3
// var loop (closure solution): 4


// --- 5. Interview Questions ---

/*
Q1: What is a closure in JavaScript?
*/
// Answer:
// A closure is the combination of a function and its lexical environment (the scope in which it was declared). This allows a function to "remember" and access variables from its outer scope, even after the outer function has finished executing.


/*
Q2: How does lexical scope relate to closures?
*/
// Answer:
// Lexical scope is the fundamental principle behind closures. It dictates that the scope of a variable is determined by its physical placement in the code. A closure is formed because an inner function, due to lexical scoping, maintains a reference to the variables in its parent scope(s) where it was defined, allowing it to access those variables even when it's executed elsewhere.


/*
Q3: Provide a common real-world use case for closures.
*/
// Answer:
// One common use case is creating private counters or modules. A function can return an object with methods that have access to a `count` variable declared within the outer function. This `count` variable is then "private" and can only be modified or read through the returned methods, effectively encapsulating its state. Another common use is in event listeners to capture specific values from the loop in which they were created.


/*
Q4: What is a potential pitfall when using `var` inside a loop with asynchronous operations (like `setTimeout`), and how do closures or `let`/`const` fix it?
*/
// Answer:
// With `var`, variables are function-scoped. In a loop with `setTimeout`, by the time the `setTimeout` callbacks execute, the loop has already completed, and the `var` variable (e.g., `i`) will have its final value from the loop's end. All callbacks will then reference this *same final value*.
// Closures (by wrapping the `setTimeout` in an IIFE that captures the current loop variable) or using `let`/`const` (which are block-scoped, creating a new binding for each loop iteration) fix this by ensuring each callback references the specific value of the loop variable from its respective iteration.


/*
Q5: What are the advantages and disadvantages of using closures?
*/
// Answer:
// **Advantages:**
// - **Data Privacy/Encapsulation:** Create private variables and methods (e.g., private counters, module pattern).
// - **Maintaining State:** Preserve state across multiple function calls or in asynchronous operations.
// - **Functional Programming:** Enable currying and memoization.
// **Disadvantages:**
// - **Memory Overhead:** The enclosed variables are kept in memory as long as the closure exists, potentially leading to increased memory consumption if not managed properly.
// - **Performance Impact:** Can be slightly slower due to the overhead of accessing variables from outer scopes.
// - **Debugging Complexity:** Can make debugging more challenging to track variable values.
