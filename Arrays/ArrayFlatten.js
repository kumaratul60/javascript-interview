// Array Flattening Examples

// From FlattenArr.js
const arr = [1, [2, 3], [4, [5], [6, [7, 8, 9], 10], 11], [12], 13];

let arrE = [
    ["$6"],
    ["$12"],
    ["$25"],
    ["$25"],
    ["$18"],
    ["$22"],
    ["$10"],
].flat();

console.log(arrE);

// the fastest one
const flattenFast = function (arr, result = []) {
    for (let i = 0, length = arr.length; i < length; i++) {
        const value = arr[i];
        if (Array.isArray(value)) {
            flattenFast(value, result);
        } else {
            result.push(value);
        }
    }
    return result;
};
const fastRes = flattenFast(arr);
console.log(fastRes);
const checkAll = flattenFast(Array(200000).fill([1]));
console.log("checkAll", checkAll);
const checkNested = flattenFast(
    Array(2).fill(Array(2).fill(Array(2).fill([1])))
);
console.log("checkNested", checkNested);
const checkDiffLevelArr = flattenFast([1, [1], [[1]]]);
console.log("checkDiffLevelArr", checkDiffLevelArr);

//////
const flatten = (arr) =>
    arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

console.log(flatten(arr));

function flattenDeep(arr) {
    return arr.reduce(
        (acc, e) => (Array.isArray(e) ? acc.concat(flattenDeep(e)) : acc.concat(e)),
        []
    );
}

function flatten1(arr) {
    return arr.reduce((acc, e) => acc.concat(e), []);
}

function flatten2(arr) {
    return [].concat.apply([], arr);
}

// using Es6 flat()
let arrT = [1, [2, [3, [4, [5, [6, 7], 8], 9], 10]]];
console.log(arrT.flat(Infinity));

// using Es6 reduce()
let flatIt = (array) =>
    array.reduce((x, y) => x.concat(Array.isArray(y) ? flatIt(y) : y), []);

console.log(flatIt(arrT));

// using recursion
function myFlat(array) {
    let flat = [].concat(...array);
    return flat.some(Array.isArray) ? myFlat(flat) : flat;
}
console.log(myFlat(arrT));

// using string manipulation
let strArr = arrT.toString().split(",");
for (let i = 0; i < strArr.length; i++) strArr[i] = parseInt(strArr[i]);

console.log(strArr);

// for older browser
const arrOld = [
    "A",
    ["B", [["B11", "B12", ["B131", "B132"]], "B2"]],
    "C",
    ["D", "E", "F", ["G", "H", "I"]],
];
const flatArray = (arr) => {
    const res = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            const subRes = flatArray(item);
            res.push(...subRes);
        } else {
            res.push(item);
        }
    }

    return res;
};

console.log(flatArray(arrOld));

// From FlatternArrayWithDepth.js
const veryDeep = [[1, [2, 2, [3, [4, [5, [6]]]]], 1]];

const res = veryDeep.flat(Infinity);
console.log(res);
// [1, 2, 2, 3, 4, 5, 6, 1]

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

const simple1 = [].concat(...multidimension1);
console.log(simple1);
const multidimensional2 = [1, [2, 3, 4], 5, [6, 7]];

const simple2 = [].concat(...multidimensional2);
console.log(simple2);