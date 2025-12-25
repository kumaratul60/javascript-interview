console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 == 0.3); // false

/*
Numbers in JavaScript are all treated with floating point precision, and as such, may not always yield the expected results.”

A typical solution is to compare the absolute difference between two numbers with the special constant Number.EPSILON:
*/

function areTheNumbersAlmostEqual(num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3)); // true

/*
2^53 - 1  →  Number.MAX_SAFE_INTEGER
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 // true :x:
Number.MAX_SAFE_INTEGER        // 9007199254740991
Number.MAX_SAFE_INTEGER + 1   // 9007199254740992
Number.MAX_SAFE_INTEGER + 2   // 9007199254740992
It proves the precision limit.
JavaScript numbers are IEEE-754 doubles.
After 2^53 - 1:
The gap between representable numbers is 2
+1 cannot be represented
Up to 2^53 - 1 → every integer exists
After that → integers are skipped
JS silently rounds
“Because JavaScript numbers can’t represent every integer above 2^53 − 1, both expressions round to the same floating-point value.”

*/

//Problem Statement

//Implement a function twoSum(x, y) that returns the exact sum of two numbers as { hi, lo }.

//Constraints

// Do not initialize lo to 0
// Do not use BigInt or external libraries
// Must work for floating-point numbers
// hi + lo must equal the exact mathematical sum

function twoSum(x, y) {
  const hi = x + y;
  const lo = y - (hi - x);
  return { hi, lo };
}

const fn1 = () => {
  a: 1;
};
function fn1() {
  return { a: 1 };
}
const res1 = fn();
const res2 = fn1();
console.log({ res1, res2 });

// {}: in arrow fn = scope
// {}: in fn = object
// ({}): expression
const fn = () => ({ a: 1 });
function fn1() {
  return { a: 1 };
}
const res11 = fn();
const res21 = fn1();
console.log({ res1, res2 });

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label

const num1 = 0.1 + 0.2;
if (num === 0.3) {
  console.log('equal');
}

const num = 1000.1 + 1000.2;
if (Math.abs(num - 2000.3) < 2000 * Number.EPSILON) {
  // if(Math.abs(num-2000.3)<0.00099){
  // if(Math.abs(num-2000.3)<0.01){
  // 0.01,0.0000999

  console.log('equal');
}

const test = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

console.log(test.format(-2, 'month'));

var map = {};
var k1 = {};
var k2 = {};
map[k1] = 'xy';
log(map[k1]);
log(map[k2]);

//input: [{name:"x",location:"y"}, {name:"p",location:"q"}] output: {y:[x], q:[p]}

const test1 = 'ab';
const pat = 'ca';
// { ab: 'ca' }
const cat = {
  [test]: pat,
};
console.log(cat);

/*
"{"a":null,"b":null}"
why:
Because JSON does not support NaN or Infinity.
JSON is a language-independent data format
Valid JSON numbers must be finite
These are invalid in JSON:
NaN
Infinity
-Infinity
So the JSON spec says:  If a value is not a valid JSON number, replace it with null
JSON.stringify([NaN, Infinity]);
// "[null,null]"
JSON.stringify(data, (_, value) =>
  typeof value === 'number' && !Number.isFinite(value)
    ? String(value)
    : value
);
{"a":"NaN","b":"Infinity"}
Because JSON only supports finite numbers; NaN and Infinity are invalid, so JSON.stringify converts them to null by spec.
*/
console.log(JSON.stringify({ a: NaN, b: Infinity }));
