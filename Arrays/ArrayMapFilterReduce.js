// Array Map, Filter, Reduce, FlatMap Examples

// From arrFlatmap.js
const numbers = [0, 3, 6];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // logs [0, 6, 12]

const numbers1 = [0, 3, 6];
const doubled1 = numbers1.filter((n) => n !== 0).map((n) => n * 2);
console.log(doubled1); // logs [6, 12]

const numbers2 = [0, 3, 6];
const doubled2 = numbers2.flatMap((number) => {
  return number === 0 ? [] : [2 * number];
});
console.log(doubled2); // logs [6, 12]

// From filter.js
const user = [
  { firstName: "Atul", lastName: "Kumar", class: "24", marks: "20" },
  { firstName: "Areol", lastName: "Kantr", class: "24", marks: "22" },
  { firstName: "Atal", lastName: "Kandi", class: "50", marks: "26" },
];
const output1 = user.filter((x) => {
  return x.class < 30;
});
console.log(output1);
const output2 = user.filter((x) => x.class < 30).map((x) => x.firstName);

console.log(output2);

const output3 =
  user.filter((x) => x.class < 30) && user.filter((x) => x.marks > 20);

console.log(output3);

// From map.js
const userMap = [
  { firstName: "Atul", lastName: "Kumar", class: "24" },
  { firstName: "Areol", lastName: "Kantr", class: "24" },
  { firstName: "Atal", lastName: "Kandi", class: "25" },
];
const output1Map = userMap.map((x) => {
  return x.firstName + "" + x.lastName;
});
console.log(output1Map);

const output2Map = userMap.map((x) => {
  x.firstName + "" + x.lastName;
});
console.log(output2Map);

const output3Map = userMap.map((x) => x.firstName + "" + x.lastName);

console.log(output3Map);

const output4Map = userMap.map((x) => x.firstName);

console.log(output4Map);

// From TrickyFilter.js
const userTricky = [
  { firstName: "Atul", lastName: "Kumar", class: "24", marks: "80" },
  { firstName: "Areol", lastName: "Kantr", class: "24", marks: "69" },
  { firstName: "Atal", lastName: "Kandi", class: "25", marks: "35" },
  { firstName: "Atil", lastName: "Kandi", class: "25", marks: "55" },
];

const op = userTricky.filter((mark) => mark.marks > 60).map((name) => name.firstName);

const total = userTricky
  .map((all) => {
    if (all.marks < 60) {
      all.marks += 5;
    }
    return all;
  })
  .filter((all) => all.marks > 70).reduce((acc, curr) => acc + curr.marks,0)
console.log(total);

// From TrickyMap.js
let nums = [11, 12, 13, 14];
let newArray = nums.map((v, i) => {
  return {
    value: v,
    index: i,
  };
});
console.log(newArray);

// From TrickyCombine.js
let arrTricky = [2,3,4,6,8,9,12,14,16,18,21]
let dby2 = [];
let dby3 = [];

const op1 = arrTricky.filter(val=>{
    return val%3==0
})
console.log(op1)
const op2 = arrTricky.filter(val=>{
    return val%2==0
})
console.log(op2)

// From reduce.js (reduce examples)
let arrReduce = [2,3,4,6,8,9,12,14,16,18,21]
const flateArr = (arr) => {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flateArr(item) : item);
  }, []);
};
flateArr([5, 235, [12, [13], 11], [10], 54, 50]);

// Array methods overview from ArrMethodJS.js
/*
concat(arr1,[...]) // Joins two or more arrays, and returns a copy of the joined arrays
copyWithin(target,[start],[end]) // Copies array elements within the array, to and from specified positions
entries() // Returns a key/value pair Array Iteration Object
every(function(currentval,[index],[arr]),[thisVal]) // Checks if every element in an array pass a test
fill(val,[start],[end]) // Fill the elements in an array with a static value
filter(function(currentval,[index],[arr]),[thisVal]) // Creates a new array with every element in an array that pass a test
find(function(currentval,[index],[arr]),[thisVal]) // Returns the value of the first element in an array that pass a test
findIndex(function(currentval,[index],[arr]),[thisVal]) // Returns the index of the first element in an array that pass a test
forEach(function(currentval,[index],[arr]),[thisVal]) // Calls a function for each array element
from(obj,[mapFunc],[thisVal]) // Creates an array from an object
includes(element,[start]) // Check if an array contains the specified element
indexOf(element,[start]) // Search the array for an element and returns its position
isArray(obj) // Checks whether an object is an array
join([seperator]) // Joins all elements of an array into a string
keys() // Returns a Array Iteration Object, containing the keys of the original array
lastIndexOf(element,[start]) // Search the array for an element, starting at the end, and returns its position
map(function(currentval,[index],[arr]),[thisVal]) // Creates a new array with the result of calling a function for each array element
pop() // Removes the last element of an array, and returns that element
push(item1,[...]) // Adds new elements to the end of an array, and returns the new length
reduce(function(total,currentval,[index],[arr]),[initVal]) // Reduce the values of an array to a single value (going left-to-right)
reduceRight(function(total,currentval,[index],[arr]),[initVal]) // Reduce the values of an array to a single value (going right-to-left)
reverse() // Reverses the order of the elements in an array
shift() // Removes the first element of an array, and returns that element
slice([start],[end]) // Selects a part of an array, and returns the new array
some(function(currentval,[index],[arr]),[thisVal]) // Checks if any of the elements in an array pass a test
sort([compareFunc]) // Sorts the elements of an array
splice(index,[quantity],[item1,...]) // Adds/Removes elements from an array
toString() // Converts an array to a string, and returns the result
unshift(item1,...) // Adds new elements to the beginning of an array, and returns the new length
valueOf() // Returns the primitive value of an array
*/