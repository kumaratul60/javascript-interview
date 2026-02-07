/*
The `typeof` operator and Type Coercion in JavaScript:

This file explores JavaScript's dynamic type system, focusing on the `typeof` operator's behavior and the intricate rules of type coercion. Understanding these concepts is crucial for writing predictable JavaScript code and excelling in technical interviews.

Key Areas Covered:
-   `typeof` operator for various data types.
-   Distinction between `isNaN()` and `Number.isNaN()`.
-   Understanding Truthy and Falsy values.
-   Implicit Type Coercion with arithmetic, unary, and comparison operators.
*/

// --- 1. The `typeof` Operator ---
// `typeof` returns a string indicating the type of the unevaluated operand.
console.log('--- `typeof` Operator Basic Checks ---');
console.log("typeof '' (empty string):", typeof ''); // "string"
console.log("typeof 'hello':", typeof 'hello'); // "string"
console.log("typeof String('hello'):", typeof String('hello')); // "string"
console.log("typeof new String('hello'):", typeof new String('hello')); // "object" (Wrapper object)

console.log('\ntypeof 0:', typeof 0); // "number"
console.log('typeof -0:', typeof -0); // "number"
console.log('typeof 0xff (hex literal):', typeof 0xff); // "number"
console.log('typeof -3.142:', typeof -3.142); // "number"
console.log('typeof Infinity:', typeof Infinity); // "number"
console.log('typeof -Infinity:', typeof -Infinity); // "number"
console.log('typeof NaN:', typeof NaN); // "number" (Special numeric value)
console.log('typeof Number(53):', typeof Number(53)); // "number"
console.log('typeof new Number(53):', typeof new Number(53)); // "object" (Wrapper object)

console.log('\ntypeof true:', typeof true); // "boolean"
console.log('typeof false:', typeof false); // "boolean"
console.log('typeof new Boolean(true):', typeof new Boolean(true)); // "object" (Wrapper object)

console.log('\ntypeof undefined:', typeof undefined); // "undefined"

console.log('\ntypeof null:', typeof null); // "object" (Historical bug in JS)

console.log('\ntypeof Symbol():', typeof Symbol()); // "symbol"

console.log('\ntypeof []:', typeof []); // "object"
console.log('typeof Array(5):', typeof Array(5)); // "object"

console.log('\ntypeof function () {}:', typeof function () {}); // "function"
console.log('typeof new Function():', typeof new Function()); // "function"

console.log('\ntypeof new Date():', typeof new Date()); // "object"

console.log('\ntypeof /^(.+)$/:', typeof /^(.+)$/); // "object"
console.log("typeof new RegExp('^(.+)$'):", typeof new RegExp('^(.+)$')); // "object"

console.log('\ntypeof {}:', typeof {}); // "object"
console.log('typeof new Object():', typeof new Object()); // "object"

console.log('\ntypeof arguments:', typeof arguments); // "object" (Array-like object)
// console.log("typeof argument:", typeof argument); // ReferenceError (if uncommented)

console.log('\ntypeof typeof 1:', typeof typeof 1); // "string" (typeof 1 is "number", typeof "number" is "string")

// --- 2. The `null` Anomaly ---
console.log('\n--- The `null` Anomaly ---');
console.log('null == undefined:', undefined == null); // true (loose equality)
console.log('null === undefined:', undefined === null); // false (strict equality)
console.log('typeof null:', typeof null); // "object" (This is a well-known, unfixable bug in JavaScript)

// --- 3. `isNaN()` vs. `Number.isNaN()` ---
// `isNaN()`: Converts its argument to a number first, then checks for NaN.
// `Number.isNaN()`: Checks if the value *is* NaN and *is of type Number* without coercion.
console.log('\n--- `isNaN()` vs. `Number.isNaN()` ---');
console.log('isNaN(NaN):', isNaN(NaN)); // true
console.log('isNaN(null):', isNaN(null)); // false (null coerces to 0)
console.log('isNaN(undefined):', isNaN(undefined)); // true (undefined coerces to NaN)
console.log('isNaN(Infinity):', isNaN(Infinity)); // false
console.log("isNaN('hello'):", isNaN('hello')); // true ('hello' coerces to NaN)
console.log('isNaN(0):', isNaN(0)); // false

console.log('\nNumber.isNaN(NaN):', Number.isNaN(NaN)); // true
console.log('Number.isNaN(null):', Number.isNaN(null)); // false (null is not NaN)
console.log('Number.isNaN(undefined):', Number.isNaN(undefined)); // false (undefined is not NaN)
console.log('Number.isNaN(Infinity):', Number.isNaN(Infinity)); // false
console.log("Number.isNaN('hello'):", Number.isNaN('hello')); // false

// --- 4. Truthy and Falsy Values ---
// Falsy values coerce to `false` in a boolean context. All other values are truthy.
console.log('\n--- Falsy Values ---');
console.log('!!0:', !!0); // false
console.log('!!-0:', !!-0); // false
console.log("!!'':", !!''); // false
console.log('!!false:', !!false); // false
console.log('!!NaN:', !!NaN); // false
console.log('!!null:', !!null); // false
console.log('!!undefined:', !!undefined); // false

console.log('\n--- Truthy Values ---');
console.log('!!+Infinity:', !!+Infinity); // true
console.log('!!-Infinity:', !!-Infinity); // true
console.log('!![] (empty array):', !![]); // true (empty arrays are truthy)
console.log('!!{} (empty object):', !!{}); // true (empty objects are truthy)
console.log("!!new String(''):", !!new String('')); // true (wrapper objects are truthy)
console.log("!!new RegExp(''):", !!new RegExp('')); // true
console.log("!!'Non-empty string':", !!'Non-empty'); // true
console.log("!!'0' (string zero):", !!'0'); // true (non-empty string is truthy)

// --- 5. Type Coercion with Operators ---

// Arithmetic Operators (+, -, *, /, %)
console.log('\n--- Type Coercion: Arithmetic Operators ---');
console.log('100 + 50:', 100 + 50); // 150 (number + number)
console.log('100 - 50:', 100 - 50); // 50 (number - number)

console.log("\n'100' + 50:", '100' + 50); // "10050" (string concat)
console.log("1 + '2' + '2':", 1 + '2' + '2'); // "122" (number to string, then concat)
console.log("'100' - 50:", '100' - 50); // 50 (string to number, then subtract)
console.log("1 + +'2' + '2':", 1 + +'2' + '2'); // "32" (unary + coerces '2' to 2, then addition, then concat)
console.log("1 + -'1' + '2':", 1 + -'1' + '2'); // "02" (unary - coerces '1' to -1, then addition, then concat)

console.log('\nnull + 50:', null + 50); // 50 (null coerces to 0)
console.log('null - 50:', null - 50); // -50 (null coerces to 0)
console.log('null + undefined:', null + undefined); // NaN (null to 0, undefined to NaN)
console.log('null - undefined:', null - undefined); // NaN (null to 0, undefined to NaN)

console.log('\nvoid 0 + 50:', void 0 + 50); // NaN (void 0 is undefined, undefined to NaN)
console.log('void 0 - 50:', void 0 - 50); // NaN

console.log('\ntrue + 50:', true + 50); // 51 (true coerces to 1)
console.log('true - 50:', true - 50); // -49

console.log('\nfalse + 50:', false + 50); // 50 (false coerces to 0)
console.log('false - 50:', false - 50); // -50

console.log('\n[] + 50:', [] + 50); // "50" ([] to empty string, then concat)
console.log('[] - 50:', [] - 50); // -50 ([] to empty string, then to 0)
console.log('[100] + 50:', [100] + 50); // "10050" ([100] to "100", then concat)
console.log('[100] - 50:', [100] - 50); // 50 ([100] to "100", then to 100)
console.log("[100, 50] + '':", [100, 50] + ''); // "100,50"
console.log('[100, 50] + 50:', [100, 50] + 50); // "100,5050"

console.log('\n{} + 50:', {} + 50); // "[object Object]50" (object to string, then concat)
console.log('{} - 50:', {} - 50); // NaN (object to string, then to NaN)

console.log('\nnew Date() + 1000:', new Date() + 1000); // Date object to string, then concat
console.log('new Date() - 1000:', new Date() - 1000); // Date object to number (timestamp), then subtract

// Unary Plus (+) and Unary Minus (-)
console.log('\n--- Type Coercion: Unary Operators ---');
console.log("+'100':", +'100'); // 100 (string to number)
console.log("+'A' - 'B' + '2':", 'A' - 'B' + '2'); // "NaN2" (string to NaN, then concat)
console.log("+'A' - 'B' + 2:", 'A' - 'B' + 2); // NaN (string to NaN, then add to number)
console.log("+'1' + '1' + '2':", +'1' + '1' + '2'); // "112" (unary + '1' to 1, then concat)
console.log("+'null':", +null); // 0
console.log("+'void 0':", +void 0); // NaN
console.log("+'true':", +true); // 1
console.log("+'false':", +false); // 0
console.log("+'[]':", +[]); // 0 (empty array to empty string, then to 0)
console.log("+'[100]':", +[100]); // 100
console.log("+'[100, 50]':", +[100, 50]); // NaN
console.log("+'{}':", +{}); // NaN
console.log("+'new Date()':", +new Date()); // Timestamp (Date object to number)

// Logical NOT (!!)
console.log('\n--- Type Coercion: Logical NOT (!!) ---');
console.log('!!false:', !!false); // false
console.log('!!true:', !!true); // true
console.log('!!0:', !!0); // false
console.log("!!'':", !!''); // false
console.log('!!null:', !!null); // false
console.log('!!undefined:', !!undefined); // false
console.log('!!NaN:', !!NaN); // false
console.log("!!'hello':", !!'hello'); // true
console.log('!!1:', !!1); // true
console.log('!!{}:', !!{}); // true
console.log('!![]:', !![]); // true

// Loose Equality (==) vs Strict Equality (===)
console.log('\n--- Loose Equality (==) vs Strict Equality (===) ---');
console.log("false == '0':", false == '0'); // true (both coerce to 0)
console.log("false === '0':", false === '0'); // false (different types)
console.log('0 == 1:', 0 == 1); // false
console.log('0 == null:', 0 == null); // false
console.log('null == undefined:', null == undefined); // true (special rule)
console.log('null === undefined:', null === undefined); // false
console.log('NaN == NaN:', NaN == NaN); // false (NaN is never equal to itself)
console.log('NaN === NaN:', NaN === NaN); // false

// Complex Coercion Examples
console.log('\n--- Type Coercion: Complex Examples ---');
console.log('3 > 2 > 1:', 3 > 2 > 1); // false (3>2 is true; true > 1 is false)
console.log('1 < 2 < 3:', 1 < 2 < 3); // true (1<2 is true; true < 3 is true)
console.log("'' == false:", '' == false); // true
console.log('[] == false:', [] == false); // true ([] to '', '' to 0, false to 0)
console.log('![] == false:', ![] == false); // true (![] is false, false == false)
console.log('![] + []:', ![] + []); // "false" (false to "false", then concat with "" from [])
console.log('[] + []:', [] + []); // ""
console.log("['a'] + ['b']:", ['a'] + ['b']); // "ab"
console.log("'b' + 'a' + +'a' + 'a':", ('b' + 'a' + +'a' + 'a').toLowerCase()); // "banana" (+'a' is NaN)

// --- 6. Interview Questions ---

/*
Q1: What is the primary difference between `==` and `===` in JavaScript?
*/
// Answer:
// `==` (loose equality) performs type coercion before comparison. If the operands are of different types, JavaScript tries to convert them to a common type before checking their values.
// `===` (strict equality) compares both the value and the type without any type coercion. If the operands are of different types, it immediately returns `false`. It's generally recommended for more predictable comparisons.

/*
Q2: What is the output of `typeof null`, and why is it considered a common JavaScript "gotcha"?
*/
// Answer:
// The output of `typeof null` is `"object"`. This is a long-standing bug in JavaScript that dates back to the very first implementation. It's not going to be fixed to avoid breaking existing websites. While `null` is a primitive value representing the intentional absence of any object value, `typeof` incorrectly reports it as an object.

/*
Q3: Explain the difference between `isNaN()` and `Number.isNaN()`.
*/
// Answer:
// `isNaN()` attempts to coerce its argument to a number. If the coercion results in `NaN`, or if the argument is already `NaN`, it returns `true`. This means `isNaN('hello')` is `true` because 'hello' coerces to `NaN`.
// `Number.isNaN()` does *not* perform type coercion. It returns `true` only if the value *is* `NaN` and its type is `Number`. This makes it a more reliable check for the actual `NaN` value. `Number.isNaN('hello')` is `false`.

/*
Q4: List all the falsy values in JavaScript.
*/
// Answer:
// There are seven falsy values in JavaScript:
// `false`, `0` (number zero), `-0` (negative zero), `""` (empty string), `null`, `undefined`, and `NaN`.

/*
Q5: What is type coercion in JavaScript, and give an example of implicit coercion with the `+` operator.
*/
// Answer:
// Type coercion is JavaScript's automatic conversion of values from one data type to another. Implicit coercion happens without the developer explicitly requesting it.
// With the `+` operator, if one of the operands is a string, the other operand will be coerced to a string, and concatenation will occur.
// Example: `1 + '2'` results in `'12'`. The number `1` is coerced to the string `'1'`, then concatenated with `'2'`.

/*
Q6: What is the output of `[] + {}` and `{}` + `[]` and why?
*/
// Answer:
// `[] + {}` outputs `"[object Object]"`. The array `[]` coerces to an empty string `""`. The object `{}` coerces to `"[object Object]"`. Then, string concatenation `"" + "[object Object]"` occurs.
// `{}` + `[]` outputs `0` (or sometimes `[object Object]` in some environments, depends on how the JS engine treats the leading `{}`: as an empty block or an empty object). When `{}` is treated as an empty block, the unary `+` before `[]` kicks in, coercing `[]` to `0`. If treated as an object, it concatenates to `"[object Object]"`. It's a tricky one often used to highlight JS engine behavior. In a browser console, typing `{} + []` often yields `0` because `{}` is interpreted as a code block (not an object literal) and `+[]` becomes `+""` which is `0`.
// However, `console.log({} + [])` usually yields `[object Object]` because the `+` operator forces the object literal interpretation.
// The code `console.log({} + [])` will result in `[object Object]`.

/*
Q7: What is the output of `1 < 2 < 3` versus `3 > 2 > 1`?
*/
// Answer:
// `1 < 2 < 3` evaluates as `(1 < 2) < 3`, which is `true < 3`. `true` coerces to `1` in a numeric context, so `1 < 3`, which is `true`. Output: `true`.
// `3 > 2 > 1` evaluates as `(3 > 2) > 1`, which is `true > 1`. `true` coerces to `1`, so `1 > 1`, which is `false`. Output: `false`.
