// How to delete any specific item from an array?

/**
Array method pop() is used to delete the last element from an array. But what can we do if we have to delete any specific item from array

*/

// Array.splice()

let arr = ["a", "b", "c", "d", "e", "f"];

// remove b
let name = "b";
let idx = arr.indexOf(name);
// if (idx !== -1)
if (idx > -1) arr.splice(idx, 1);

console.log(arr);

// Array.filter()

let newArray = ["p", "q", "r", "s"];
// remove q

let rem = "q";
let op = newArray.filter((item) => item !== rem);
console.log(op);
