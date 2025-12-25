let stocks = [
  { name: "Apple", price: 321.85 },
  { name: "Tesla", price: 2471.04 },
  { name: "Disney", price: 118.77 },
  { name: "Google", price: 1434.87 },
  { name: "Netflix", price: 425.92 },
];

/*
The filter() method creates a new array with all elements that pass the test implemented by the provided function.
*/
const filter = stocks.filter((stock) => stock.price < 1000);
console.log(filter);

/* The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

*/
const map = stocks.map((stock) => [stock.name, stock.price]);
console.log(map);

/*
The find() method returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
*/
const find = stocks.find((stock) => stock.name === "Tesla");
console.log(find);

/*
The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.
*/
const some1 = stocks.some((stock) => stock.price < 1000);
const some2 = stocks.some((stock) => stock.price < 10);
console.log(some1);
console.log(some2);

/*
The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value
*/

const every1 = stocks.every((stock) => stock.price < 1000);
const every2 = stocks.every((stock) => stock.price < 2500);
console.log(every1);
console.log(every2);

/*The forEach() method executes a provided function once for each array element. */
const forEach = stocks.forEach((stock) => console.log(stock));

/*The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value. */
const reduce = stocks.reduce((total, stock) => total + stock.price, 0);
console.log(reduce);

/*The toString() method returns a string representing the specified array and its elements. */
const toString = stocks.toString();
console.log(toString);

let names = ["Apple", "Tesla", "Disney", "Google", "Netflix"];

// toString
const toStringName = names.toString();
console.log(toStringName);

/*The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate. */

const includes = names.includes("Apple");
const in1 = names.includes("Microsoft");
console.log(includes);
console.log(in1);

/*The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present. */
const index = names.indexOf("Tesla");
console.log(index);

names = ["Apple", "Tesla", "Disney", "Google", "Netflix", "Tesla"];

/*The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex. */

const lastIndexOf = names.lastIndexOf("Tesla");
console.log(lastIndexOf);

/*The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

The time and space complexity of the sort cannot be guaranteed as it depends on the implementation. */
const sort1 = names.sort();
console.log(sort1);
const sort2 = stocks.sort();
console.log(sort2);
const sort3 = names.sort((a, b) => a - b);
console.log(sort3);

/*The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified. */
const slice = names.slice(3);
const slice1 = names.slice(0, 3);
const slice2 = names.slice(1, 3);
console.log(slice);
console.log(slice1);
console.log(slice2);

/*The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator. */

const join1 = names.join();
const join2 = names.join(" - ");
console.log(join1);
console.log(join2);
