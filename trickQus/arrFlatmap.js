const numbers = [0, 3, 6];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // logs [0, 6, 12]

const numbers1 = [0, 3, 6];
const doubled1 = numbers1.filter((n) => n !== 0).map((n) => n * 2);
console.log(doubled1); // logs [6, 12]

// combo of fiter & map
const numbers2 = [0, 3, 6];
const doubled2 = numbers2.flatMap((number) => {
  return number === 0 ? [] : [2 * number];
});
console.log(doubled2); // logs [6, 12]

/*
array.flatMap() function accepts a callback function as an argument and returns a new mapped array:

const mappedArray = array.flatMap((item, index, origArray) => {

  return [value1, value2, ..., valueN];
}[, thisArg]);



The callback function is invoked upen each iteam in the original array with 3 arguments: the current item, index, and the original array. The array returned by the callback is then flattened by 1 level deep, and the resulting items are added to the mapped array.

Also, the method accepts a second, optional, argument indicating the this value inside of the callback.

*/

// The simplest way you can use array.flatMap() is to flatten an array that contains items as arrays:

const arrays = [[2, 4], [6]];
const flatten = arrays.flatMap((item) => item);
console.log(flatten); // logs [2, 4, 6]

const numbers3 = [0, 3, 6];
const doubled3 = numbers3.flatMap((number) => {
  return number === 0 ? [] : [2 * number];
});
console.log(doubled3); // logs [6, 12]

const numbers4 = [1, 4];
const trippled4 = numbers4.flatMap((number) => {
  return [number, 2 * number, 3 * number];
});
console.log(trippled4);
// logs [1, 2, 3, 4, 8, 12]

/*
array.flatMap() method is the way to go if you want to map an array to a new array, but also have control over how many items you'd like to add to the new mapped array.

The callback function of array.flatMap(callback) is called with 3 arguments: the current iterated item, index, and the original array. The array returned from the callback function is then flattened at 1 level deep, and the resulting items are inserted in the resulting mapped array.

*/
