// Method - 1 (forEach)
// The forEach() method executes a provided function once for each array element. There is no way to stop or break a forEach() loop other than by throwing an exception.
// array.forEach(function (currentValue, index, arr))

const students = ["John", "Sara", "Jack"];

students.forEach((element, index, arr) => {
  console.log("element", element);
  console.log("index", index);
  console.log("arr", arr);
});

/* output- 
element John
index 0
arr (3) ['John', 'Sara', 'Jack']
element Sara
index 1
arr (3) ['John', 'Sara', 'Jack']
element Jack
index 2
arr (3) ['John', 'Sara', 'Jack']
*/

/* --------------------------------------------------------------------------- */

// Method - 2 (map)
// The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

const numbers = [65, 44, 12, 4];
const newArr = numbers.map((num) => num * 10);
console.log(newArr);

// output- [650, 440, 120, 40]
/* --------------------------------------------------------------------------- */

// Method - 3 (every)
// The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

const ages = [32, 33, 16, 40];
const isAllAdult = ages.every((age) => age > 18);
console.log(isAllAdult);

// output- false
/* --------------------------------------------------------------------------- */

// Method - 4 (some)
// The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

const ages2 = [32, 33, 16, 40];
const isAllAdult2 = ages2.some((age) => age > 18);
console.log(isAllAdult2);

// output- true

/* --------------------------------------------------------------------------- */

// Method - 5 (filter)
// The filter() method creates a new array with all elements that pass the test implemented by the provided function.

const ages3 = [32, 33, 16, 40];
const isAllAdult3 = ages3.filter((age) => age > 18);
console.log(isAllAdult3);

// output- [32, 33, 40]
/* --------------------------------------------------------------------------- */

// Method - 6 (reduce)
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10

/* --------------------------------------------------------------------------- */

// Method - 7 (reduceRight)
// The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.

// 100 + 30 + 45 + 3
const num = [2, 45, 30, 100];
const result = num.reduceRight((total, currentNum) => total - currentNum);
console.log(result);

// output: 23

/* --------------------------------------------------------------------------- */

// Method - 8 (find)
// The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

const numArray = [5, 12, 8, 130, 44];
const found = numArray.find((element) => element > 10);

console.log(found);

// output: 12

/* --------------------------------------------------------------------------- */

// Method - 9 (findIndex)
// The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.

const numArray2 = [5, 12, 8, 130, 44];

console.log(numArray2.findIndex((element) => element > 13));

// output: 3

/* --------------------------------------------------------------------------- */

// Method - 10 (indexOf)
// The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let index = fruits.indexOf("Apple");
console.log(index);

// output: 2

/*
    Array.prototype.indexOf() expects a value as first parameter. This makes it a good choice to find the index in arrays of primitive types (like string, number, or boolean).
    Array.prototype.findIndex() expects a callback as first parameter. Use this if you need the index in arrays with non-primitive types (e.g. objects) or your find condition is more complex than just a value.
*/

/* --------------------------------------------------------------------------- */

// Method - 11 (lastIndexOf)
// The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backward.
const animals = ["Dodo", "Tiger", "Penguin", "Dodo"];

console.log(animals.lastIndexOf("Dodo"));
// expected output: 3

console.log(animals.lastIndexOf("Tiger"));
// expected output: 1

/* --------------------------------------------------------------------------- */

// Method - 12 (includes)
// The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
const countingNum = [1, 2, 3];

console.log(countingNum.includes(2));
// expected output: true

/* --------------------------------------------------------------------------- */
// Method - 13 (push)
// The push() method adds one or more elements to the end of an array and returns the new length of the array.

const animals2 = ["pigs", "goats", "sheep"];

const count = animals2.push("cows");
console.log(count);
console.log(animals2);

/* output: 
4
['pigs', 'goats', 'sheep', 'cows']
*/
/* --------------------------------------------------------------------------- */

// Method - 14 (pop)
// The pop() method removes the last element from an array and returns that element. This method changes the length of the array.

const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

console.log(plants.pop());
// expected output: "tomato"

/* --------------------------------------------------------------------------- */

// Method - 15 (unshift)
// The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
const numArray3 = [1, 2, 3];

console.log(numArray3.unshift(4, 5));

console.log(numArray3);

/* --------------------------------------------------------------------------- */

// Method - 16 (shift)
// The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.
const numArray4 = [1, 2, 3];

console.log(numArray4.shift());

console.log(numArray4);

/* output: 
1
[2, 3]
*/

/* --------------------------------------------------------------------------- */

// Method - 17 (reverse)
//  The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
const numArray5 = [1, 2, 3];

console.log(numArray5.reverse());

console.log(numArray5);

/* output: 
[3, 2, 1]
[3, 2, 1]
*/
/* --------------------------------------------------------------------------- */

// Method - 18 (fill)
// The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
const fillArr = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(fillArr.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(fillArr.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(fillArr.fill(6));
// expected output: [6, 6, 6, 6]

/* --------------------------------------------------------------------------- */

// Method - 19 (concat)
// The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.

const concatArr1 = ["a", "b", "c"];
const concatArr2 = ["d", "e", "f"];
const concatArr3 = concatArr1.concat(concatArr2);

console.log(concatArr3);

// output: ['a', 'b', 'c', 'd', 'e', 'f']

/* --------------------------------------------------------------------------- */

// Method - 20 (join)
// The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.

const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(""));
// expected output: "FireAirWater"

console.log(elements.join("-"));
// expected output: "Fire-Air-Water"
