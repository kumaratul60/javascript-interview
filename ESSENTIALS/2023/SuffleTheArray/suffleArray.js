// Shuffling an array is an operation that randomly rearranges the elements in an array.

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// M1 => Fisher-Yates Shuffle, also known as the Knuth Shuffle , time complexity is O(n)
/**
The Fisher-Yates Shuffle, also known as the Knuth Shuffle, is a simple and efficient method to shuffle an array. It works by iterating through the array from the last element to the first, swapping each element with an element at a random index less than or equal to its current index.
 */

function fisherYatesShuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    // Pick a remaining element
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    let temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

console.log(fisherYatesShuffle(arr));

//  M2 => Durstenfeld shuffle
/**
The Durstenfeld shuffle is a computer-optimized version of the Fisher-Yates shuffle, developed by Richard Durstenfeld in 1964. This algorithm is designed to be more efficient and works by picking one random element for each original array element, and then excluding it from the next draw.

The Durstenfeld shuffle is considered more efficient than the Fisher-Yates shuffle because it avoids the need to insert the selected elements into the new array, which can be computationally expensive.
 */
function durstenfeldShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
console.log(durstenfeldShuffle(arr));

// M3 => Schwartzian Transform

/***
 we can use the Schwartzian Transform to assign a random number to each array element, sort the array based on these numbers, and then remove the numbers, leaving a shuffled array.

 the Schwartzian Transform is a clever technique, it may not be the most efficient method for shuffling large arrays in JavaScript

*/

function schwartzianShuffle(array) {
  return array
    .map((a) => [Math.random(), a]) // Assign a random number to each element
    .sort((a, b) => a[0] - b[0]) // Sort by the random numbers
    .map((a) => a[1]); // Remove the random numbers
}

console.log(schwartzianShuffle(arr));

// Shuffling Multidimensional Arrays

function shuffleMultiDimensionalArray(array) {
  // Flatten the array
  let flattened = [].concat(...array);

  // Shuffle the flattened array
  for (let i = flattened.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flattened[i], flattened[j]] = [flattened[j], flattened[i]];
  }

  // Rebuild the multidimensional array
  let result = [];
  while (flattened.length) result.push(flattened.splice(0, array[0].length));

  return result;
}

let array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(shuffleMultiDimensionalArray(array));

// Using Lodash

// const _ = require("lodash");

// let lodashArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(_.shuffle(lodashArray));

let multiDimentionArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// console.log(_.shuffle(_.flatten(multiDimentionArray)));

console.log("---------Check performance----------");

let arrPer = Array.from({ length: 1000000 }, (_, i) => i + 1);

console.time("Fisher-Yates Shuffle"); //98.888ms
fisherYatesShuffle(arrPer);
console.timeEnd("Fisher-Yates Shuffle");

console.time("Durstenfeld Shuffle"); //91.518ms
durstenfeldShuffle(arrPer);
console.timeEnd("Durstenfeld Shuffle");

console.time("Schwartzian Transform"); //2.498s
schwartzianShuffle(arrPer);
console.timeEnd("Schwartzian Transform");

// console.time("Lodash Shuffle");
// _.shuffle(arrPer);
// console.timeEnd("Lodash Shuffle");
