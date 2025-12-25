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

console.log(multiplyNew1(2, "")); // 0
console.log(multiplyNew1(2, null)); // 0
console.log(multiplyNew1(2, undefined)); // 2
console.log(multiplyNew1(2, false)); // 0
console.log(multiplyNew1(2, 4, undefined)); // 8
