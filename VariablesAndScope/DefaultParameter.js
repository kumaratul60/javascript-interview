/*
Default Parameters:
Default parameters allow named parameters to be initialized with default values if no value or `undefined` is passed. This feature was introduced in ECMAScript 2015 (ES6) and provides a cleaner syntax for handling optional function arguments.
*/

// --- 1. Traditional Way to Handle Missing Arguments (Pre-ES6) ---
// Before ES6, developers often used conditional logic inside the function to set default values.
console.log('--- Traditional Default (Pre-ES6) ---');
function multiply(a, b) {
  // Check if 'b' is undefined; if so, default it to 1.
  b = b === undefined ? 1 : b;
  return a * b;
}
console.log('multiply(2):', multiply(2)); // Output: 2
console.log('multiply(2, 3):', multiply(2, 3)); // Output: 6
console.log('multiply(2, 4, 5):', multiply(2, 4, 5)); // Output: 8 (extra arguments are ignored unless used)

// --- 2. ES6 Default Parameters Syntax ---
// The modern, cleaner way to define default values directly in the function signature.
console.log('\n--- ES6 Default Parameters ---');
function multiplyNew1(a, b = 1) {
  return a * b;
}
console.log('multiplyNew1(2):', multiplyNew1(2)); // Output: 2
console.log('multiplyNew1(2, 3):', multiplyNew1(2, 3)); // Output: 6
console.log('multiplyNew1(2, 4, 5):', multiplyNew1(2, 4, 5)); // Output: 8

// --- 3. Important Distinction: `undefined` vs. Falsy Values ---
// Default parameters *only* apply if the argument is `undefined` or not provided.
// Falsy values like `null`, `0`, `''` (empty string), or `false` are considered valid values
// and will *not* be replaced by the default parameter. This is a common interview "gotcha".
console.log('\n--- undefined vs. Falsy Values ---');
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

console.log('greet():', greet()); // Output: Hello, Guest! (name is undefined)
console.log('greet(undefined):', greet(undefined)); // Output: Hello, Guest! (name is explicitly undefined)
console.log('greet(null):', greet(null)); // Output: Hello, null! (null is a valid value)
console.log("greet(''):", greet('')); // Output: Hello, ! (empty string is a valid value)
console.log('greet(0):', greet(0)); // Output: Hello, 0! (0 is a valid value)
console.log('greet(false):', greet(false)); // Output: Hello, false! (false is a valid value)

// --- 4. Expressions as Default Values ---
// Default values can also be expressions, which are evaluated each time the function is called
// and only if the parameter is missing or `undefined`.
console.log('\n--- Expressions as Default Values ---');
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function createUser(name, id = generateId()) {
  return { name, id };
}

console.log('User 1:', createUser('Alice')); // Output: { name: "Alice", id: "..." }
console.log('User 2:', createUser('Bob', 'customId123')); // Output: { name: "Bob", id: "customId123" }
console.log('User 3:', createUser('Charlie')); // Output: { name: "Charlie", id: "..." } (new ID generated)

// --- 5. Common Use Cases ---
// - Providing sensible fallbacks for optional configuration options.
// - Simplifying function signatures by reducing the need for `if (arg === undefined)` checks.
// - Making APIs more user-friendly by allowing callers to omit arguments they don't care about.

// --- 6. Interview Questions ---

/*
Q1: What is the primary purpose of default parameters in JavaScript?
*/
// Answer:
// Default parameters provide a cleaner and more concise way to define default values for function arguments if no value or `undefined` is explicitly passed when the function is called. This improves code readability and reduces boilerplate logic for argument validation.

/*
Q2: Will a default parameter be used if you pass `null` as an argument? Why or why not?
*/
// Answer:
// No, a default parameter will *not* be used if you pass `null` as an argument. Default parameters only trigger when the argument is `undefined` or omitted. `null` is considered a valid, albeit empty, value in JavaScript, so it will override the default parameter.

/*
Q3: What happens if you pass fewer arguments than required by the function (without default parameters)?
*/
// Answer:
// If a function is called with fewer arguments than it declares, the missing arguments will automatically be assigned the value `undefined`. If the function then attempts to use these `undefined` values in operations (e.g., arithmetic), it can lead to `NaN` or other unexpected results. Default parameters were introduced to mitigate this.

/*
Q4: Can a default parameter value be an expression or a function call? If so, when is it evaluated?
*/
// Answer:
// Yes, a default parameter value can be an expression or a function call. It is evaluated *each time the function is called* and *only if* the corresponding argument is omitted or is `undefined`. This means a new value is generated or the expression is re-evaluated every time the default is used.

//  Default parameter taken only if we are no value or we sending undefined.

//  Falsy value: 0, null, undefined, NaN, "", false

function multiply(a, b) {
  return a * b;
}
console.log(multiply(2)); // NaN
console.log(multiply(2, 3)); // 6
console.log(multiply(2, 4, 5)); // 8

// To overcome NaN problem
function multiplyNew(a, b) {
  b = b === undefined ? 1 : b;
  return a * b;
}
console.log(multiplyNew(2)); // 2
console.log(multiplyNew(2, 3)); // 6
console.log(multiplyNew(2, 4, 5)); // 8

//  or

function multiplyNew1(a, b = 1) {
  return a * b;
}
console.log(multiplyNew1(2)); // 2
console.log(multiplyNew1(2, 3)); // 6
console.log(multiplyNew1(2, 4, 5)); // 8

console.log(multiplyNew1(2, '')); // 0
console.log(multiplyNew1(2, null)); // 0
console.log(multiplyNew1(2, undefined)); // 2
console.log(multiplyNew1(2, false)); // 0
console.log(multiplyNew1(2, 4, undefined)); // 8
