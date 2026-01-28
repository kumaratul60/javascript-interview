/*
This file contains various JavaScript code snippets demonstrating different aspects of variable behavior, scope, and object manipulation. It serves as a collection of examples that highlight nuances often encountered in interviews. Each example is now explained to clarify its output and the underlying JavaScript principles.
*/


// --- Example 1: `var` Scope and Function Execution Context ---
// This example demonstrates how variable `c` behaves across different function scopes when `var` is used.
// It highlights lexical scoping and the global scope.
console.log("--- Example 1: `var` Scope ---");
var c = 1; // Global variable
var f1 = function () {
  console.log("  Output from f1():", c); // 'c' is accessed from its outer scope (global)
};
var f2 = function () {
  var c = 2; // This `c` shadows the global `c` within `f2`'s scope
  f1(); // 'f1' is called, and it still looks for 'c' in its *own* lexical environment (global)
};
f2(); // Output:   Output from f1(): 1
// Explanation: `f1` is defined in the global scope. When `f1` is called, it looks for `c` in its lexical environment, which is the global scope, where `c` is `1`. The `c = 2` inside `f2` is a different variable due to `f2`'s function scope and does not affect the `c` that `f1` sees.


// --- Example 2: Object Spread (`...`) with Property Overriding ---
// This demonstrates how the spread syntax `...` combines object properties, and how duplicate keys are handled.
console.log("\n--- Example 2: Object Spread & Overriding ---");
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 10, d: 5 };
// Properties are merged from left to right. Later properties with the same key override earlier ones.
// In `{ ...obj1, d: 4, ...obj2, c: 30 }`:
// - `obj1` properties (a:1, b:2, c:3) are spread first.
// - `d:4` is added.
// - `obj2` properties (a:10, d:5) are spread, overriding `a:1` and `d:4`.
// - `c:30` is added last, overriding `c:3` from `obj1`.
console.log("  Merged Object:", { ...obj1, d: 4, ...obj2, c: 30 });
// Expected Output:   Merged Object: { a: 10, b: 2, c: 30, d: 5 }


// --- Example 3: Closure with `const` Variables ---
// This shows a function returning another function that captures a `const` variable from its outer scope.
console.log("\n--- Example 3: Closure with `const` ---");
const myf1 = () => {
  const a = 2; // 'a' is a const variable in `myf1`'s scope
  return () => console.log("  Value of 'a' in closure:", "a is" + a);
};
const global_a = 1; // Global variable, not related to 'a' inside myf1
const test = myf1(); // 'test' holds the inner function and its closure over `a=2`
test(); // Output:   Value of 'a' in closure: a is2
// Explanation: The inner arrow function (assigned to `test`) forms a closure over `myf1`'s lexical environment.
// It accesses `a` from `myf1`'s scope (`2`), not the global `global_a`.


// --- Example 4: Class with a Getter ---
// This is a basic class definition showcasing a getter property.
// While not directly about 'var', 'let', 'const' scoping, it's a valid JS snippet.
console.log("\n--- Example 4: Class with a Getter ---");
class x1 {
  get y() { // 'y' is a getter method
    return 42;
  }
}
var x21 = new x1(); // Create an instance of the class
console.log("  Value of x21.y:", x21.y); // Output:   Value of x21.y: 42
// Explanation: `y` is accessed as a property, but its value is computed by the getter function.


// --- Interview Questions ---

/*
Q1: In Example 1, why does `f1()` log `1` even though `f2()` redefines `c` to `2`?
*/
// Answer:
// `f1()` logs `1` because JavaScript uses lexical scoping. `f1()` is defined in the global scope where `c` is `1`. When `f1()` is called, it looks for `c` in its own lexical environment (the global scope). The `var c = 2` inside `f2()` creates a *new, function-scoped* variable `c` that *shadows* the global `c` within `f2()`'s scope. It does not change the global `c` that `f1()` refers to.


/*
Q2: What is the significance of the spread syntax (`...`) when merging objects, and how are duplicate keys handled as shown in Example 2?
*/
// Answer:
// The spread syntax (`...`) creates a shallow copy of an object's enumerable own properties into a new object. When merging multiple objects with spread, properties are added from left to right. If multiple objects (or explicit properties) have the same key, the value from the *rightmost* occurrence will override any previous values for that key.


/*
Q3: Example 3 demonstrates a closure. Explain how the `test` function retains access to `a = 2`.
*/
// Answer:
// The `test` function is a closure because it's an inner function (`() => console.log("a is" + a)`) that was defined within `myf1()`. Even after `myf1()` has finished executing and returned the inner function, `test` still retains access to `myf1()`'s lexical environment, which includes the `const a = 2` variable. This allows `test` to "remember" and use the value of `a` from its creation context.
