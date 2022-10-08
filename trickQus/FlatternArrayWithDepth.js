const veryDeep = [[1, [2, 2, [3, [4, [5, [6]]]]], 1]];

const res = veryDeep.flat(Infinity);
console.log(res);
// [1, 2, 2, 3, 4, 5, 6, 1]
/**  If you don't know the depth of the array, 
simply pass Infinity */

// if you know depth then put depth number instead of infinity

const resDepth1 = veryDeep.flat(1);
console.log("Flatten Arry with depth 1=>", resDepth1);

// without flat()
const arr1 = [[1, 2], [3, 4], [5, 6], [7, 8], [8]];
const arr1Res = arr1.reduce(function (a, b) {
  return a.concat(b);
});
console.log("without flat() =>,", arr1Res);

// simple sol

const multidimension1 = ["🥗", ["🍌", "🍎", "🍇"], "🍣", ["🐟", "🍚"]];

const simple1 = [].concat(...multidimension1); // This will return: [🥗, 🍌, 🍎, 🍇, 🍣, 🐟, 🍚]
console.log(simple1);
const multidimension2 = [1, [2, 3, 4], 5, [6, 7]];

const simple2 = [].concat(...multidimension2); // This will return: [1, 2, 3, 4, 5, 6, 7]
console.log(simple2);
