console.log(typeof ""); // "string"
console.log(typeof "hello"); // "string"
console.log(typeof String("hello")); // "string"
console.log(typeof new String("hello")); // "object"

console.log(typeof 0); // "number"
console.log(typeof -0); // "number"
console.log(typeof 0xff); // "number"
console.log(typeof -3.142); // "number"
console.log(typeof Infinity); // "number"
console.log(typeof -Infinity); // "number"
console.log(typeof NaN); // "number"
console.log(typeof Number(53)); // "number"
console.log(typeof new Number(53)); // "object"

console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"
console.log(typeof new Boolean(true)); // "object"

console.log(typeof undefined); // "undefined"

console.log(typeof null); // "object"

console.log(typeof Symbol()); // "symbol"

console.log(typeof []); // "object"
console.log(typeof Array(5)); // "object"

console.log(typeof function () {}); // "function"
console.log(typeof new Function()); // "function"

console.log(typeof new Date()); // "object"

console.log(typeof /^(.+)$/); // "object"
console.log(typeof new RegExp("^(.+)$")); // "object"

console.log(typeof {}); // "object"
console.log(typeof new Object()); // "object"

console.log(undefined == null); // true
console.log(undefined === null); // false

console.log(isNaN(NaN)); // true
console.log(isNaN(null)); // false
console.log(isNaN(undefined)); // true
console.log(isNaN(Infinity)); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(null)); // false
console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN(Infinity)); // false

var x = NaN;

console.log(x == NaN); // false
console.log(x === NaN); // false

console.log(
  //   type(function () {
  console.log("empty")
  //   })
); // "function"
// console.log(type(new Function())); // "function"

// console.log(type(class {})); // "function"

// console.log(type({})); // "object"
// console.log(type(new Object())); // "object"

// console.log(type(/^(.+)$/)); // "regexp"
// console.log(type(new RegExp("^(.+)$"))); // "regexp"

// console.log(type(new Date())); // "date"
// console.log(type(new Set())); // "set"
// console.log(type(new Map())); // "map"
// console.log(type(new WeakSet())); // "weakset"
// console.log(type(new WeakMap())); // "weakmap"

console.log(!!0); // false
console.log(!!-0); // false
console.log(!!""); // false
console.log(!!false); // false
console.log(!!NaN); // false
console.log(!!null); // false
console.log(!!undefined); // false

// TRUTHY VALUES

console.log(!!+Infinity); // true
console.log(!!-Infinity); // true
console.log(!![]); // true
console.log(!!{}); // true
console.log(!!new String("")); // true
console.log(!!new RegExp("")); // true
console.log(!!"Non-empty"); // true

console.log(100 + 50); // 150
console.log(100 - 50); // 50

console.log("100" + 50); // "10050"
console.log("100" - 50); // 50

console.log(null + 50); // 50
console.log(null - 50); // -50

console.log(void 0 + 50); // NaN
console.log(void 0 - 50); // NaN

console.log(true + 50); // 51
console.log(true - 50); // -49

console.log(false + 50); // 50
console.log(false - 50); // -50

console.log([] + 50); // "50"
console.log([] - 50); // -50

console.log([100] + 50); // "10050"
console.log([100] - 50); // 50

console.log({} + 50); // "[object Object]50"
console.log({} - 50); // NaN

console.log(new Date() + 1000); // "Thu May 31 2018 18:27:51 GMT+0100 (WAT)1000"
console.log(new Date() - 1000); // 1527787670595

console.log(+"100"); // 100

console.log(+null); // 0
console.log(+void 0); // NaN

console.log(+true); // 1
console.log(+false); // 0

console.log(+[]); // 0
console.log(+[100]); // 100
console.log(+[100, 50]); // NaN

console.log(+{}); // NaN

console.log(+new Date()); // 1527790306576

console.log(100 + ""); // "100"

console.log(null + ""); // "null"
console.log(void 0 + ""); // "undefined"

console.log(true + ""); // "true"
console.log(false + ""); // "false"

console.log([] + ""); // ""
console.log([100] + ""); // "100"
console.log([100, 50] + ""); // "100,50"

console.log({} + ""); // "[object Object]"

console.log(new Date() + ""); // "Thu May 31 2018 19:28:09 GMT+0100 (WAT)"

// Function that accepts a boolean as first argument
// and returns the boolean otherwise `false`
const booleanOrFalse = (value) => typeof value == "boolean" && value;

// Function that accepts a boolean as first argument
// and returns the boolean otherwise `true`
const booleanOrTrue = (value) => typeof value != "boolean" || value;

console.log(booleanOrFalse(true)); // true
console.log(booleanOrFalse(false)); // false
console.log(booleanOrFalse(1)); // false
console.log(booleanOrFalse(0)); // false
console.log(booleanOrFalse("String")); // false
console.log(booleanOrFalse({})); // false
console.log(booleanOrFalse([])); // false

console.log(booleanOrTrue(true)); // true
console.log(booleanOrTrue(false)); // false
console.log(booleanOrTrue(1)); // true
console.log(booleanOrTrue(0)); // true
console.log(booleanOrTrue("String")); // true
console.log(booleanOrTrue({})); // true
console.log(booleanOrTrue([])); // true

console.log(["a"] + ["b"]); // "ab"
console.log([] + []); // ""
console.log(![] + []); // "false", because ![] returns false.
console.log(![]); // false
