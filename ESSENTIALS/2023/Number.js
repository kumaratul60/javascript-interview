const max = 20;
const min = 10;

//  max - min => to define range and adding +1 to avoid 0 case
const res = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(res);

const ceil = Math.ceil(4.5);
const flor = Math.floor(4.5);
console.log(ceil);
console.log(flor);

const score = 400;
const scoreNew = new Number(400);

console.log(score);
console.log(scoreNew);

let randomValue = Math.random();
console.log(randomValue); // Example output: 0.874385923724

let num = 4.7;
console.log(Math.floor(num)); // Output: 4
console.log(Math.ceil(num)); // Output: 5
console.log(Math.round(num)); // Output: 5

let numbers = [5, 12, 8, 3, 10];
console.log(Math.max(...numbers)); // Output: 12
console.log(Math.min(...numbers)); // Output: 3

let base = 2;
let exponent = 3;
console.log(Math.pow(base, exponent)); // Output: 8

let number = 25;
console.log(Math.sqrt(number)); // Output: 5

/**
 * Number.toFixed(): This method formats a number with a specified number of decimal places and returns a string representation.
 */

let numFixed = 3.14159;
console.log(numFixed.toFixed(2)); // Output: "3.14"

/**
Number.isNaN(): This function determines whether a value is NaN (Not-a-Number).
*/

console.log(Number.isNaN(NaN)); // Output: true
console.log(Number.isNaN(5)); // Output: false

/**
 * Number.parseInt(), Number.parseFloat(): These functions convert strings to integers and floating-point numbers, respectively.
 */

let intString = "42";
let floatString = "3.14";
console.log(Number.parseInt(intString)); // Output: 42
console.log(Number.parseFloat(floatString)); // Output: 3.14

/**
 *Math.abs(): This function returns the absolute value of a number.
 */

let numAbs = -5;
console.log(Math.abs(numAbs)); // Output: 5

/***
Math.trunc(): This method truncates the decimal part of a number, effectively removing the fractional part.
*/
let numTrunc = 3.9;
console.log(Math.trunc(numTrunc)); // Output: 3

/***
"machine epsilon" or "floating-point epsilon" concept:

the concept of epsilon in computing helps address the inherent limitations of floating-point arithmetic when dealing with equality comparisons and precision-sensitive operations involving floating-point numbers.

JavaScript provides the Number.EPSILON property, which represents the difference between 1 and the smallest value greater than 1 that can be represented as a Number value. This value is often used as a starting point for defining the machine epsilon for numerical comparisons.
*/

const epsilonCheck = 0.1 + 0.2 === 0.3;
console.log({ epsilonCheck }); //false

const machineEpsilon = Number.EPSILON;

function areEqualWithinEpsilon(a, b) {
  return Math.abs(a - b) < machineEpsilon;
}

let x = 0.1 + 0.2;
let y = 0.3;

console.log(areEqualWithinEpsilon(x, y)); // true
