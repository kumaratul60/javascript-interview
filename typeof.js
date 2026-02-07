// =================================================================================================
// `typeof` Operator
// =================================================================================================
// The `typeof` operator returns a string indicating the type of the unevaluated operand.

console.log('// `typeof` with Primitives');
console.log(typeof ''); // "string"
console.log(typeof 'hello'); // "string"
console.log(typeof String('hello')); // "string" - String() called as a function performs type conversion
console.log(typeof 0); // "number"
console.log(typeof -0); // "number" - Edge case: -0 is still a number
console.log(typeof 0xff); // "number" - Hexadecimal
console.log(typeof -3.142); // "number"
console.log(typeof Infinity); // "number"
console.log(typeof -Infinity); // "number"
console.log(typeof NaN); // "number" - Hot corner: NaN's type is 'number'
console.log(typeof Number(53)); // "number"
console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol()); // "symbol"

console.log('\n// `typeof` with Objects and Functions');
// Hot corner: `typeof` for constructed objects vs. primitives
console.log(typeof new String('hello')); // "object"
console.log(typeof new Number(53)); // "object"
console.log(typeof new Boolean(true)); // "object"

// Hot corner: `typeof null` is a long-standing bug in JavaScript. It should be 'null'.
console.log(typeof null); // "object"

console.log(typeof []); // "object"
console.log(typeof Array(5)); // "object"
console.log(typeof {}); // "object"
console.log(typeof new Object()); // "object"
console.log(typeof new Date()); // "object"
console.log(typeof /^(.+)$/); // "object" - In many environments, regex literals are objects.
console.log(typeof new RegExp('^(.+)$')); // "object"

console.log(typeof function () {}); // "function" - Functions are a special type of object
console.log(typeof new Function()); // "function"
console.log(typeof arguments); // "object" - `arguments` is an array-like object

// Interview Hot Corner: `typeof typeof`
console.log(typeof typeof 1); // "string" - `typeof 1` is "number", so `typeof "number"` is "string"

// =================================================================================================
// `isNaN` vs `Number.isNaN`
// =================================================================================================
// `isNaN()`: Converts the argument to a number before testing. This can have surprising results.
// `Number.isNaN()`: Does not convert the argument. It's a more reliable check for NaN.

console.log('\n// `isNaN` - converts argument');
console.log(isNaN(NaN)); // true
console.log(isNaN(null)); // false - `null` is coerced to 0, which is not NaN
console.log(isNaN(undefined)); // true - `undefined` is coerced to NaN
console.log(isNaN(Infinity)); // false

console.log('\n// `Number.isNaN` - no conversion, more reliable');
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(null)); // false
console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN(Infinity)); // false

// Hot Corner: NaN never equals itself
var x = NaN;
console.log(x == NaN); // false
console.log(x === NaN); // false

// =================================================================================================
// Truthy and Falsy Values
// =================================================================================================
// Falsy values are values that translate to `false` when evaluated in a Boolean context.

console.log('\n// All Falsy Values');
console.log(!!0); // false
console.log(!!-0); // false
console.log(!!''); // false
console.log(!!false); // false
console.log(!!NaN); // false
console.log(!!null); // false
console.log(!!undefined); // false

// Anything not in the falsy list is truthy.
console.log('\n// Examples of Truthy Values');
console.log(!!+Infinity); // true
console.log(!!-Infinity); // true
console.log(!![]); // true - Hot Corner: Empty arrays are truthy
console.log(!!{}); // true - Hot Corner: Empty objects are truthy
console.log(!!new String('')); // true - Any object, even wrapping an empty string, is truthy
console.log(!!new RegExp('')); // true
console.log(!!'Non-empty'); // true
console.log(!!'0'); // true - A string containing a zero is truthy

// =================================================================================================
// Type Coercion in Operations
// =================================================================================================
// JavaScript often converts values from one type to another to perform operations.

console.log('\n// Coercion with + (Addition and Concatenation)');
console.log(100 + 50); // 150 (number + number = number)
console.log('100' + 50); // "10050" (string + number = string)
console.log(null + 50); // 50 (null becomes 0)
console.log(true + 50); // 51 (true becomes 1)
console.log(false + 50); // 50 (false becomes 0)
console.log([] + 50); // "50" ([] becomes "")
console.log([100] + 50); // "10050" ([100] becomes "100")
console.log({} + 50); // "[object Object]50" ({} becomes "[object Object]")

console.log('\n// Coercion with - (Subtraction)');
console.log(100 - 50); // 50
console.log('100' - 50); // 50 (string "100" is converted to number 100)
console.log(null - 50); // -50 (null becomes 0)
console.log(true - 50); // -49 (true becomes 1)
console.log([] - 50); // -50 ([] becomes 0)
console.log([100] - 50); // 50 ([100] becomes 100)
console.log({} - 50); // NaN ({} becomes NaN)

console.log('\n// Unary + Operator (Converts to Number)');
console.log(+'100'); // 100
console.log(+null); // 0
console.log(+true); // 1
console.log(+[]); // 0
console.log(+[100]); // 100
console.log(+[100, 50]); // NaN
console.log(+{}); // NaN

console.log('\n// String Concatenation with ""');
console.log(100 + ''); // "100"
console.log(null + ''); // "null"
console.log(undefined + ''); // "undefined"
console.log([] + ''); // ""
console.log([100, 50] + ''); // "100,50"
console.log({} + ''); // "[object Object]"

// =================================================================================================
// Comparison Operators (0 to 100) - An In-depth Look
// =================================================================================================

console.log('\n// -----------------------------------------------');
console.log('// == (Loose Equality)');
console.log('// -----------------------------------------------');
// The loose equality operator compares two values for equality, after converting both values to a common type (type coercion).
// Hot Corner: Avoid using `==` unless you specifically need to handle `null == undefined`.

console.log(1 == 1); // true
console.log('1' == 1); // true - '1' is coerced to 1
console.log(0 == false); // true - false is coerced to 0
console.log(null == undefined); // true - This is a specific rule for `==`
console.log(0 == null); // false
console.log([] == false); // true -> [].toString() is '', which is coerced to 0. 0 == 0 is true.
console.log([] == ![]); // true -> ![] is false. The expression becomes [] == false, which is true.
console.log([1] == true); // true -> [1].toString() is '1', which is coerced to 1. 1 == 1 is true.

console.log('\n// -----------------------------------------------');
console.log('// === (Strict Equality)');
console.log('// -----------------------------------------------');
// The strict equality operator compares two values for equality without implicit type conversion. This is the recommended comparison operator.

console.log(1 === 1); // true
console.log('1' === 1); // false - Different types
console.log(0 === false); // false - Different types
console.log(null === undefined); // false - Different types

// Hot Corner: Strict equality with objects and arrays checks for reference, not value.
console.log({} === {}); // false (two different objects in memory)
console.log([] === []); // false (two different arrays in memory)
const arr = [];
const arrRef = arr;
console.log(arr === arrRef); // true (both variables point to the same array)

// Special Case: NaN
console.log(NaN === NaN); // false

console.log('\n// -----------------------------------------------');
console.log('// Object.is() - The Ultimate Equality Check');
console.log('// -----------------------------------------------');
// `Object.is()` determines whether two values are the same value. It's similar to `===` but handles two edge cases differently.

// Key differences from ===
console.log('Object.is vs === for NaN:', Object.is(NaN, NaN)); // true
console.log('Object.is vs === for -0, +0:', Object.is(-0, +0)); // false

console.log('\n// -----------------------------------------------');
console.log('// Summary of Comparison Operators - Interview Cheat Sheet');
console.log('// -----------------------------------------------');
console.log('Value 1 | Operator | Value 2 | Result (==) | Result (===)');
console.log('------------------------------------------------------------');
console.log(`'5'     | ==, ===  | 5       | ${'5' == 5}         | ${'5' === 5}`);
console.log(`''      | ==, ===  | false   | ${'' == false}         | ${'' === false}`);
console.log(`0       | ==, ===  | false   | ${0 == false}         | ${0 === false}`);
console.log(`null    | ==, ===  | undefined| ${null == undefined}        | ${null === undefined}`);
console.log(`NaN     | ==, ===  | NaN     | ${NaN == NaN}        | ${NaN === NaN}`);
console.log(`-0      | ==, ===  | 0       | ${-0 == 0}         | ${-0 === 0}`);
console.log(`{}      | ==, ===  | {}      | ${{} == {}}       | ${{} === {}}`);

console.log('\n// Additional Edge Cases & Interesting Snippets');
// `typeof null` vs `instanceof Object`
console.log(typeof null); // 'object'
console.log(null instanceof Object); // false - `null` doesn't have a prototype.

// `typeof NaN` vs `instanceof Number`
console.log(typeof NaN); // 'number'
console.log(NaN instanceof Number); // false - `NaN` is a primitive, not a Number object.

// `new String()` vs `String()`
console.log(typeof new String('str') === typeof String('str')); // false -> 'object' === 'string'

/*
 The commented out `type()` function is not a standard JavaScript function.
 It might be a placeholder for a custom type checking utility.
 For robust type checking, consider using `Object.prototype.toString.call(value)`.
 Example:
 Object.prototype.toString.call(new Date()) -> "[object Date]"
*/
// The following lines were commented out as they use a non-standard `type` function
console.log(
  //   type(function () {
  console.log('empty'),
  //   })
); // "empty, undefined"
console.log(type(new Function())); // "function"
console.log(type(class {})); // "function"
console.log(type({})); // "object"
console.log(type(new Object())); // "object"
console.log(type(/^(.+)$/)); // "regexp"
console.log(type(new RegExp('^(.+)$'))); // "regexp"
console.log(type(new Date())); // "date"
console.log(type(new Set())); // "set"
console.log(type(new Map())); // "map"
console.log(type(new WeakSet())); // "weakset"
console.log(type(new WeakMap())); // "weakmap"

// The original file had some functions like `booleanOrFalse` and `booleanOrTrue`.
// They demonstrate simple boolean logic but are not standard or commonly used patterns.
// They've been removed for clarity in this focused guide, but the concepts are covered
// by the truthy/falsy section.

// Original examples of array concatenation and negation.
console.log(['a'] + ['b']); // "ab"
console.log([] + []); // ""
console.log(![] + []); // "false" -> ![] is `false`, and `false + []` coerces to "false" + "" = "false"
console.log(![]); // false - An empty array is truthy, so its negation is false.
