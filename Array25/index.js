// in JS Array can be a collection of anything

// phase 1: Create an Array

const mixedArray = [1, "a", true, null, undefined, { name: "John" }, [1, 2, 3], {}];

// index = The position of an element in an array.
// index start from 0 and end at length-1

// length = The number of elements in an array.
// note: javascript array length is not fixed length, it can be changed at any time with +ve numeric value.

// creating constructor function for a blueprint object

// using function
function Person1(name, age) {
  this.name = name;
  this.age = age;
}

// using class
class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const person3 = new Person1("John", 30);
const person4 = new Person2("Parkour", 31);
console.log({ person3, person4 });

// Array constructor function
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(arr1);
const arr3 = new Array(1, 2, 3, 4, 5);

const arr4 = new Array(5); // creates an array with 5 empty slots
//  when we pass single argument to Array constructor function, it creates an array with that number of empty slots

// remember: taking as parameter and passing as argument are two different things.

console.log({ arr1, arr2, arr3 });

// looping through array arr1 from index 0(first element) to length-1(last element)

console.time("Classic for loop (i < length)");
for (let i = 0; i < arr1.length; i++) {
  // console.log(arr1[i]); // Comment out for accurate timing
  arr1[i];
}
console.timeEnd("Classic for loop (i < length)");

console.time("Classic for loop (i <= length - 1)");
for (let i = 0; i <= arr1.length - 1; i++) {
  // console.log(arr1[i]);
  arr1[i];
}
console.timeEnd("Classic for loop (i <= length - 1)");

console.time("for...of loop");
for (const item of arr1) {
  // console.log(item);
  item;
}
console.timeEnd("for...of loop");

console.time("forEach (value only)");
arr1.forEach((item) => {
  // console.log(item);
  item;
});
console.timeEnd("forEach (value only)");

console.time("forEach (index + value)");
arr1.forEach((item, i) => {
  // console.log(i, item);
  item;
});
console.timeEnd("forEach (index + value)");

// phase 2: Get, Add elements to an array
const arrayOfCars = [
  { name: "Audi", model: "A4", year: 2010 },
  { name: "BMW", model: "X5", year: 2015 },
  { name: "Mercedes", model: "C-Class", year: 2012 },
  { name: "Audi", model: "A6", year: 2018 },
  { name: "BMW", model: "X6", year: 2019 },
  { name: "Mercedes", model: "E-Class", year: 2017 },
];

for (let i = 0; i < arrayOfCars.length; i++) {
  console.log(
    `element at index ${i} is ${arrayOfCars[i].name} - ${arrayOfCars[i].model} - ${arrayOfCars[i].year}`
  );
}

// remember below method will mutate(change) the source array

// push() - adding at end
// unshift() -  adding at start

// pop() - remove from end
// shift() - remove from start

arrayOfCars.push({ name: "Audi", model: "A8", year: 2020 });
console.log("push:", arrayOfCars);
arrayOfCars.unshift({ name: "Audi", model: "A3", year: 2009 });
console.log("unshift:", arrayOfCars);
arrayOfCars.pop();
console.log("pop:", arrayOfCars);
arrayOfCars.shift();
console.log("shift:", arrayOfCars);

// phase-3 : clone or copy of array

// remember below method will not mutate(change) the source array, rather it will return a new array

// slice() - copy:  - returns a new array with the elements from start to end (end not included)
const sliceArray = ["tomato", "potato", "onion", "carrot", "cabbage"];
const sliceArrayCopy = sliceArray.slice(); // copy the source array
console.log(sliceArray === sliceArrayCopy); // false
const sliceArray1 = sliceArray.slice(1, 3); // show only elements from index 1 to 2
const sliceArray2 = sliceArray.slice(1); // show only elements from index 1 to end
const sliceArray3 = sliceArray.slice(-2); // show only elements from index -2 means last 2 elements
const sliceArray4 = sliceArray.slice(-2, -1); // show only elements last elements
console.log({ sliceArray, sliceArrayCopy, sliceArray1, sliceArray2, sliceArray3, sliceArray4 });

// Phase-4 : determine if a value is an array or not

// Array.isArray() to check that passed value is array or not

Array.isArray(arrayOfCars); // true
Array.isArray({}); // false
Array.isArray([]); // true
Array.isArray(""); // false

// Phase-5: destructuring an array
const destructureArray = [
  "tomato",
  "potato",
  "onion",
  "carrot",
  "cabbage",
  "beetroot",
  "cucumber",
  "capsicum",
  "ginger",
];
const [first, second, third, fourth, fifth, ...rest] = destructureArray;
console.log({ first, second, third, fourth, fifth, rest });
const [tmo, , , crt] = destructureArray;
console.log({ tmo, crt });

// Phase-6: Nested Array

const fruits = [
  "apple",
  "banana",
  "orange",
  ["mango", "grapes", "pineapple"],
  ["watermelon", ["strawberry", "blueberry"]],
];
console.log(fruits[0]); // apple
console.log(fruits[3][1]); // grapes
console.log(fruits[4][1][0]); // strawberry

// Phase-7: Rest and spread operator

// thumb rule:
// rest operator always go with variables( left hand side)
// spread operator always go with array value itself( right hand side)
// rest operator must be a last form of parameter, it is a called function
// spread operator must be a first form of parameter, it is a calling function

//rest operator
// const [firstEle, secondEle, thirdEle, ...rest] = destructureArray;
// console.log({ firstEle, secondEle, thirdEle, rest });

//spread operator
const spreadArray = ["tomato", "potato", "onion", "carrot", "cabbage"];
const spreadArrayCopy = [...spreadArray];
console.log({ spreadArrayCopy });

// phase-7: swapping
let sw1 = 5;
let sw2 = 10;

// m-1
console.log({ sw1, sw2 });
[sw1, sw2] = [sw2, sw1];
console.log({ sw1, sw2 });

// m-2
const swap = (a, b) => {
  let temp = a;
  a = b;
  b = temp;
  console.log({ a, b });
};
swap(2, 3);

// m-3 : without using extra variable
const swap1 = (a, b) => {
  a = a + b; // a = 6+7 = 13
  b = a - b; // b = 13-7 = 6
  a = a - b; // a = 13-6 = 7
  console.log({ a, b });
};
swap1(6, 7);

// merge two array
const mergeArray = ["tomato", "potato", "onion", "carrot", "cabbage"];
const mergeArray1 = ["beetroot", "cucumber", "capsicum", "ginger"];
const mergeArray2 = [...mergeArray, ...mergeArray1];
console.log({ mergeArray2 });

// using concatenation
const mergeArray3 = mergeArray.concat(mergeArray1);
console.log({ mergeArray3 });

// length property
const lengthArray = ["tomato", "potato", "onion", "carrot", "cabbage"];
const lengthArr = new Array(5);
console.log(lengthArray.length); // 5
console.log(lengthArr.length); // 5

// now to set lengthArray to 1
lengthArray.length = 1;
console.log(lengthArray.length); // 1 ["tomato"]

// note: An array can hold the elements of any type, maximum length of an array will be 2 ** 32 - 1 === 4294967295

// Phase-8: Array methods
// concat(): it is a immutable method, it means that if you performing the operation on the array using the concat method, then the source array will not get change.

const fc1 = [1, 2, 3];
const fc2 = [4, 5, 6];
const fc3 = [7, 8, 9];
const fm1 = fc1.concat(fc2);
const fm2 = fc2.concat(fc1);
const fm3 = fc1.concat(fc2, fc3);
console.log({ fc1, fc2, fm1, fm2, fm3 });

// join():
// 1. Join the array elements together.
// 2. Join the all array of elements using a "separator" and ultimate return a "string"
// 3. The default separator the join method is using is comma (',').

const joinTest = ["✅", "✔️", "💥", "🔽", "▶️"];
const joinRes1 = joinTest.join();
const joinRes2 = joinTest.join("$");
const joinRes3 = joinTest.join("&<^=>");
// [].join() => return ""
console.log({ joinTest, joinRes1, joinRes2, joinRes3 });

// fill(): fill a array with static values and selective change, it mutate(change). the array
const colors = ["red", "white", "green"];
// colors.fill("pink"); //['pink', 'pink', 'pink']

// for selective change
colors.fill("pink", 1, 3); //['red', 'pink', 'pink']
console.log({ colors });

// includes(): it determines that element presence in array or not. case-sensitive(case matters a-lot): return true or false

const valP = ["tom", "bom"];
const cp = valP.includes("tom"); // true
const cp1 = valP.includes("Tom"); // false

// indexOf(): it used to know index position of a element in array, it return first occurrence of element.
const namesBaba = ["alex", "bob", "saba"];
const resBaba = namesBaba.indexOf("bob");
console.log({ resBaba }); //1
namesBaba.indexOf("robbi"); //-1

// lastIndexOf(): it used to know index position of a element in array, it return last occurrence of element.

// reverse(): reverse the existing array, it mutate the original array
const revA = [1, 2, 3, 4];
console.log(revA.reverse());

// sort:
// the default sort() method converts the element types into string
// the default sorting order is ascending

const artist = ["jon", "tom", "lio", "kio", "Anna"];
const defaultSort = artist.sort();
// writing comparator function
const descendingSort = artist.sort(function (a, b) {
  return a === b ? 0 : a > b ? -1 : 1;
});
const descendingSort1 = artist.sort(function (a, b) {
  return b - a;
});
const descendingSort2 = artist.sort((a, b) => b - a);

//✅ Always clone the original array before sorting if you don't want it mutated.
//❌ b - a only works for numbers, not for strings.
//✅ Use a > b ? -1 : 1 or localeCompare() for safer string sorting.

const defaultSort1 = [...artist].sort(); // shallow copy and sort
const descendingSort11 = [...artist].sort((a, b) => {
  return a === b ? 0 : a > b ? -1 : 1;
});
const ascendingSort11 = [...artist].sort((a, b) => {
  return a === b ? 0 : a > b ? 1 : -1;
});
// Or simpler comparator:
const descendingSort12 = [...artist].sort((a, b) => b.localeCompare(a));

// Splice()

// splice(start,deleteCount,item, item1,item2,...)
// start: starting position
// deleteCount: number of element want to delete, if count is 0,-1 then none of element get removed
// item, item1,item2,...: that element get added from starting position,
//so for the adding the item: splice(start,deleteCount,item, item1,item2,...)
// for deleting the item = splice(start,deleteCount)
// splice return the deleted item of array

const tomSplice1 = ["paa", "kka", "lla"];
console.log(tomSplice1.splice(0, 1)); // ["paa"]
console.log(tomSplice1.splice(0, 1, "ooo")); // ["paa"]
console.log(tomSplice1); // ["ooo", "kka", "lla"]

// at()
// +ve number start count from left hand side
// -ve number start count from right hand side

const junky = ["ab", "bc", "cd", "ef", "fg", "gh", "hi", "ij", "jk"];
console.log(junky[0]); //"ab"
console.log(junky.at[0]); // undefined
console.log(junky.at(0)); // "ab"
console.log(junky.at(3)); // "ef"
console.log(junky.at(-1)); // "jk"
console.log(junky.at(-5)); // "fg"
console.log(junky.at(8)); // "jk"
// console.log(junky(-10));// error
// console.log(junky(10));// error

// copyWithin()
// copyWithIn(target,start,end) : target and start are mandatory, end operator is optional

const withIn1 = [1, 2, 3, 4, 5, 6, 7];
withIn1.copyWithin(0, 3, 6);
console.log(withIn1); //  [4, 5, 6, 4, 5, 6, 7];

const withIn2 = [7, 8, 9, 10, 11, 12, 13];
withIn2.copyWithin(0, 4);
console.log(withIn2); //[11,12,13,10,11,12,13]

const withIn3 = [7, 8, 9, 10, 11, 12, 13];
withIn2.copyWithin(0, 4, 12);
console.log(withIn3); //[12,13,9,10,11,12,13]

// flat()
