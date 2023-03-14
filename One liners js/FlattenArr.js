// Flatten an array
/*
To flatten an array means to convert a multi-dimensional array into a one-dimensional array. 
This process of reducing the dimensionality of an array can be achieved using various methods, one of which is the flat() method in JavaScript.
*/

const arr = [1, [2, 3], [4, [5], [6, [7, 8, 9], 10], 11], [12], 13];

// 1
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

// 2
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
// 3
const flatten = (arr) =>
    arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

console.log(flatten(arr));

// 4
function flattenDeep(arr) {
    return arr.reduce(
        (acc, e) => (Array.isArray(e) ? acc.concat(flattenDeep(e)) : acc.concat(e)),
        []
    );
}

// 5
function flatten1(arr) {
    return arr.reduce((acc, e) => acc.concat(e), []);
}

// 6
function flatten2(arr) {
    return [].concat.apply([], arr);
}

// 7
//   using recursion and closures
function flattenRecursiveClosures(arr) {
    var temp = [];

    function recursiveFlatten(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                recursiveFlatten(arr[i]);
            } else {
                temp.push(arr[i]);
            }
        }
    }
    recursiveFlatten(arr);
    return temp;
}

// 8
const flatten3 = (arr) =>
    arr.reduce(
        (acc, next) => acc.concat(Array.isArray(next) ? flatten3(next) : next),
        []
    );

const a = [1, [2, [3, [4, [5, [6]]]]]];
console.log(flatten3(a));

// 9
const arrStr = ["abc", [[[6]]], ["3,4"], "2"];

const s = "[" + JSON.stringify(arrStr).replace(/\[|]/g, "") + "]";
const flattened = JSON.parse(s);

console.log(flattened);

////////////////////////////////
// 10
// when you may have some non-array elements in your array.

function flattenArrayOfArrays(a, r) {
    if (!r) {
        r = [];
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i].constructor == Array) {
            flattenArrayOfArrays(a[i], r);
        } else {
            r.push(a[i]);
        }
    }
    return r;
}
const arrOOArr = flattenArrayOfArrays([
    1,
    [2, [3, [4, [5, [6, 7], 8], 9], 10]],
]);
console.log("arrOOArr", arrOOArr);

////////////////////////////////
// [1,[2,[3,[4,[5,[6,7],8],9],10]]] - [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 11
// using Es6 flat()
let arrT = [1, [2, [3, [4, [5, [6, 7], 8], 9], 10]]];
console.log(arrT.flat(Infinity));

// 12
// using Es6 reduce()
let flatIt = (array) =>
    array.reduce((x, y) => x.concat(Array.isArray(y) ? flatIt(y) : y), []);
console.log(flatIt(arrT));

// 13
// using recursion
function myFlat(array) {
    let flat = [].concat(...array);
    return flat.some(Array.isArray) ? myFlat(flat) : flat;
}
console.log(myFlat(arrT));

// 14
// using string manipulation
let strArr = arrT.toString().split(",");
for (let i = 0; i < strArr.length; i++) strArr[i] = parseInt(strArr[i]);

console.log(strArr);

// 15
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

////////////////////////////////
/*
[1, 2, [3, 4]].flat();                  // -> [1, 2, 3, 4]

[1, 2, [3, 4, [5, 6]]].flat();          // -> [1, 2, 3, 4, [5, 6]]

[1, 2, [3, 4, [5, 6]]].flat(2);         // -> [1, 2, 3, 4, 5, 6]

[1, 2, [3, 4, [5, 6]]].flat(Infinity);  // -> [1, 2, 3, 4, 5, 6]
*/

// test cases for flat arrays

/*
test('already flatted', () => {
    expect(flatten([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  
  test('flats first level', () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
  });
  */
