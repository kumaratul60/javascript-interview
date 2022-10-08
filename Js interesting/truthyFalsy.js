const fruits = ["aple", null, "mango", undefined];

// filter falsy  values

const falsyValues = fruits.filter(Boolean);
console.log("filter falsy values", falsyValues);

// filter truthy Values

const truthy = fruits.some(Boolean);
console.log("filter truthy values", truthy);

const arr = [1, 2, 3, "5", [52], ["89"]];
// arry of numbers
const numArr = arr.map(Number);
console.log("Number array", numArr);

// arry of string
const strArr = arr.map(String);
console.log("String array", strArr);
