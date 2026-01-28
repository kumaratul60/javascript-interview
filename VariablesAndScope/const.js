/*
The `const` Keyword in JavaScript:

`const` declares a block-scoped local variable, which means the variable exists only within the block (code surrounded by `{}`) where it's declared. The value of a `const` variable *cannot be reassigned* after its initial declaration.

Key Characteristics of `const`:
1.  **Block-Scoped**: `const` variables are scoped to the nearest enclosing block (`{...}`).
2.  **No Reassignment**: Once a value is assigned to a `const` variable, you cannot reassign the variable to a different value.
3.  **Initialization Required**: A `const` variable must be initialized at the time of declaration. Failing to do so will result in a `SyntaxError`.
4.  **Hoisting & TDZ**: Like `let`, `const` declarations are hoisted but are not initialized. They are in a Temporal Dead Zone (TDZ) from the start of their block until their declaration is encountered, preventing access before initialization (results in `ReferenceError`).

Important Note: `const` makes the *binding* immutable, not the *value* itself. For objects and arrays, the *reference* cannot change, but the *contents* (properties of objects, elements of arrays) can still be mutated.
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

// --- Example 1: Basic 'const' Behavior (No Reassignment) ---
console.log("\n--- Basic 'const' Behavior ---");
const greeting = 'Hello';
// greeting = "Hi"; // TypeError: Assignment to constant variable.
console.log('Greeting:', greeting); // Output: Hello

// --- Example 2: 'const' with Arrays (Mutability of Contents) ---
console.log("\n--- 'const' with Arrays ---");
const turtles = ['leonardo', 'donatello', 'michaelangelo', 'raphael'];
// turtles = turtles.concat('Shredder'); // 🙅‍♀️ TypeError: Assignment to constant variable.
// The reference to the array cannot be changed.

// However, the *contents* of the array can be mutated:
turtles.push('Splinter'); // ✅ Allowed
console.log('Mutated array:', turtles); // Output: ["leonardo", "donatello", "michaelangelo", "raphael", "Splinter"]
turtles[0] = 'Leo'; // ✅ Allowed
console.log('Array with element changed:', turtles); // Output: ["Leo", "donatello", "michaelangelo", "raphael", "Splinter"]

// --- Example 3: 'const' with Objects (Mutability of Contents) ---
console.log("\n--- 'const' with Objects ---");
const user = { name: 'Alice', age: 30 };
// user = { name: "Bob" }; // TypeError: Assignment to constant variable.
// The reference to the object cannot be changed.

// However, the *properties* of the object can be mutated:
user.age = 31; // ✅ Allowed
user.city = 'New York'; // ✅ Allowed (adding new property)
console.log('Mutated object:', user); // Output: { name: "Alice", age: 31, city: "New York" }

// --- Example 4: 'const' and Block Scope ---
console.log("\n--- 'const' and Block Scope ---");
const myBoolean1 = true;

if (myBoolean1) {
  const innerVar = "I'm inside the if block";
  console.log(innerVar); // Output: I'm inside the if block
}

// console.log(innerVar); // ReferenceError: innerVar is not defined
// 'innerVar' is scoped to the `if` block and is not accessible outside.

// --- Example 5: 'const' and Temporal Dead Zone (TDZ) ---
console.log("\n--- 'const' and TDZ ---");
// console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
const tdzVar = "I'm initialized";
console.log(tdzVar); // Output: I'm initialized

// For more details on TDZ, refer to `Hoisting.js`.

// --- Interview Questions ---

/*
Q1: What is the primary difference between `let` and `const`?
*/
// Answer:
// Both `let` and `const` are block-scoped and hoisted into the Temporal Dead Zone. The primary difference is that `const` variables cannot be *reassigned* after their initial declaration, while `let` variables can. `const` also requires an initial value at declaration.

/*
Q2: Does `const` make a variable's value immutable? Explain with an example.
*/
// Answer:
// No, `const` makes the *binding* immutable (meaning the variable cannot be reassigned to a different value/reference), but it does not make the *value* itself immutable if the value is an object or an array.
// Example:
// `const arr = [1, 2]; arr.push(3);` is allowed, resulting in `[1, 2, 3]`.
// `const obj = {a: 1}; obj.a = 2;` is allowed, resulting in `{a: 2}`.
// However, `arr = [4, 5];` or `obj = {b: 2};` would throw a `TypeError`.

/*
Q3: When should you use `const` over `let` or `var`?
*/
// Answer:
// It's generally recommended to use `const` by default for any variable that won't be reassigned. This improves code readability and helps prevent accidental reassignments, making the code's intent clearer. If you know a variable's value needs to change later, then `let` is appropriate. `var` is generally discouraged in modern JavaScript due to its function-scoping and hoisting behaviors, which can lead to unexpected bugs.

/*
Keyword	Function vs Block-scope	Redefinable?

var	    function-scope  	✅
let	    block-scope     	✅
const	block-scope     	🚫




*/

const myBoolean = true;

if (myBoolean) {
  const turtles = ['leonardo', 'donatello', 'michaelangelo', 'raphael'];
  // turtles = turtles.concat('Shredder');  // 🙅‍♀️ this would throw an error

  console.log(turtles);
}

console.log(turtles);
