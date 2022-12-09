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
