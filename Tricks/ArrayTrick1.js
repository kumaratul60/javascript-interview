// ============================================================
// OPERATORS: PRE/POST, TRICKY CASES, BIT MANIPULATION
// ============================================================

// ------------------------------------------------------------
// PRE/POST INCREMENT/DECREMENT
// ------------------------------------------------------------
let a = 1;
console.log(a++); // 1 (post: returns old, then increments)
console.log(a); // 2

let b = 1;
console.log(++b); // 2 (pre: increments, then returns)

let c = 5;
console.log(c--); // 5
console.log(c); // 4
console.log(--c); // 3

// Trap: mixing in expressions
let d = 1;
console.log(d++ + ++d); // 1 + 3 = 4

// ------------------------------------------------------------
// UNARY OPERATORS
// ------------------------------------------------------------
console.log(+true); // 1
console.log(+'42'); // 42
console.log(+'42px'); // NaN
console.log(!!''); // false
console.log(!!'0'); // true

// ------------------------------------------------------------
// EQUALITY & COERCION TRAPS
// ------------------------------------------------------------
console.log(0.1 + 0.2 === 0.3); // false (floating point)
console.log([] == ![]); // true (both coerce to 0)
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log('' == 0); // true
console.log('' === 0); // false

// ------------------------------------------------------------
// LOGICAL OPERATORS (SHORT-CIRCUIT)
// ------------------------------------------------------------
console.log(false || 'fallback'); // 'fallback'
console.log(true && 'keep'); // 'keep'
console.log(0 ?? 42); // 0 (nullish coalescing only checks null/undefined)
console.log(null ?? 42); // 42

// Trap: || vs ??
console.log(0 || 42); // 42 (0 is falsy)
console.log(0 ?? 42); // 0

// ------------------------------------------------------------
// BIT MANIPULATION BASICS
// ------------------------------------------------------------
// Bitwise ops work on 32-bit signed integers
console.log(5 & 3); // 1  (0101 & 0011 = 0001)
console.log(5 | 3); // 7  (0101 | 0011 = 0111)
console.log(5 ^ 3); // 6  (0101 ^ 0011 = 0110)
console.log(~5); // -6 (bitwise NOT)

// Shifts
console.log(5 << 1); // 10
console.log(5 >> 1); // 2  (sign-propagating)
console.log(5 >>> 1); // 2  (zero-fill)

// Trap: 32-bit overflow
console.log(1 << 31); // -2147483648
console.log(1 << 32); // 1 (shift count masked to 5 bits)

// Fast Math tricks (be careful with large numbers)
console.log(~~3.9); // 3 (truncate)
console.log(~~-3.9); // -3 (toward zero)

// ------------------------------------------------------------
// OPERATOR PRECEDENCE TRAPS
// ------------------------------------------------------------
console.log(1 + 2 * 3); // 7
console.log((1 + 2) * 3); // 9
console.log('5' + 1 * 2); // '52'
console.log('5' - 1 + 2); // 6 (string becomes number)

// ------------------------------------------------------------
// COMMA OPERATOR
// ------------------------------------------------------------

// Quick examples
let x = 1;
x = (x++, x);
console.log(x); // 2 (returns last expression)

x = (2, 3);
console.log(x); // 3

// Common use: multiple updates inside for-loop header
for (let i = 0, j = 10; i < 3; i++, j--) {
  console.log(i, j); // (0,10), (1,9), (2,8)
}

// Traps & edge cases
// f(a, b) passes two args. (a, b) evaluates to b.
function demo(a, b) {
  return a + b;
}
console.log(demo(1, 2)); // 3
console.log(demo((1, 2), 3)); // 5  -> (1,2) becomes 2

// Precedence can surprise: assignment has lower precedence than comma
let y = 0;
y = (y += 2, y * 10);
console.log(y); // 20

// Return value of comma operator
function getValue() {
  return (console.log('side effect'), 42);
}
console.log(getValue()); // logs "side effect" then 42

// ------------------------------------------------------------
// CLASSIC JS QUIRKS (ORGANIZED)
// ------------------------------------------------------------

// 1) Event loop order
// Expected order: one, four, three, two
console.log('one');
setTimeout(function () {
  console.log('two');
}, 0);
Promise.resolve().then(function () {
  console.log('three');
});
console.log('four');

// 2) Assignment order with references
// foo.x is set on the old object before foo points to the new one
var foo = { n: 1 };
var bar = foo;
foo.x = foo = { n: 2 };
console.log(foo.x); // undefined
console.log(bar.x); // { n: 2 }

// 3) Array length after pushes
var arr = [];
arr.push(1);
arr.push(2);
console.log(arr.length); // 2

// 4) Function scope vs block scope (var leaks)
var greeting = 'Hello';
(function () {
  var bar = ' World';
  console.log(greeting + bar); // "Hello World"
})();
// console.log(greeting + bar); // ReferenceError: bar is not defined

// 5) Floating point + string concatenation
console.log(0.1 + 0.2 == 0.3); // false
var mix = 10 + '20';
console.log(mix); // "1020"

// 6) arguments.length behavior
function countArgs() {
  console.log(arguments.length);
}
console.log(countArgs); // function reference
console.log(countArgs()); // 0
console.log(countArgs('a')); // 1
console.log(countArgs('a', 'b')); // 2
console.log(countArgs('a', 'a')); // 2
console.log(countArgs('a', 'b', 'c')); // 3

// ------------------------------------------------------------
// INTERVIEW QUESTIONS (GRADED)
// ------------------------------------------------------------

// Q1 (Easy): What is the output of: let x=1; console.log(x++); console.log(x);
// A1: 1, then 2

// Q2 (Easy): What does ~0 equal?
// A2: -1

// Q3 (Medium): What is output of: console.log([] == ![])?
// A3: true (both coerce to 0)

// Q4 (Medium): What is output of: 1 << 31?
// A4: -2147483648 (signed 32-bit)

// Q5 (Hard): What is output of: let x=1; console.log(x++ + ++x);
// A5: 4

// Q6 (Hard): Why is 1 << 32 equal to 1?
// A6: JS masks shift count to 5 bits (mod 32).

// Q7 (Easy): What does (1, 2, 3) evaluate to?
// A7: 3 (last expression)

// Q8 (Medium): What does demo((1, 2), 3) return and why?
// A8: 5 because (1,2) evaluates to 2, so demo(2,3) => 5

// Q9 (Medium): Why is comma operator common in for-loops but rare elsewhere?
// A9: It allows multiple expressions where one is expected; outside loops it hurts readability.
