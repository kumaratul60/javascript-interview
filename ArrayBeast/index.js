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
const fl1 = [0, 1, 2, [4, 5]];
console.log(fl1.flat()); // [0,1,2,4,5]

const fl2 = [0, 1, [2, [3, 4, [5, [6, 7]]]]];
console.log(fl2.flat()); //[ 0, 1, 2, [ 3, 4, [ 5, [Array] ] ] ]
console.log(fl2.flat(2)); //[ 0, 1, 2, 3, 4, [ 5, [ 6, 7 ] ] ]
console.log(fl2.flat(3)); //[ 0, 1, 2, 3, 4, 5, [ 6, 7 ] ]
console.log(fl2.flat(Infinity)); //[0, 1, 2, 3, 4, 5, 6, 7]

// grouping the data in array

const emplooyees = [
  { name: "Bob", dept: "Eng", salary: "5000" },
  { name: "Alex", dept: "HR", salary: "500" },
  { name: "Fron", dept: "Sels", salary: "100" },
  { name: "Toby", dept: "Eng", salary: "400" },
  { name: "Boby", dept: "Product", salary: "5100" },
  { name: "Coby", dept: "Eng", salary: "6000" },
  { name: "Doby", dept: "Eng", salary: "7000" },
];
const groupByDept = Object.groupBy(emplooyees, ({ dept }) => dept);
console.log({ groupByDept }, groupByDept.Eng);

const groupByMoreThat5k = Object.groupBy(emplooyees, ({ salary }) => salary > 5000);
console.log(groupByMoreThat5k); // response in true/false format

const groupByMoreThat5k1 = Object.groupBy(emplooyees, ({ salary }) => {
  return salary >= 5000 ? "More than 5k" : "Less than 5k";
});
console.log(groupByMoreThat5k1);

// Phase 9: Immutability

//toReversed(): it is a immutable version of reverse() method
const rev1 = [0, 1, 2, 3];
const rev2 = [10, 11, 12, 13];
// it get change the  original array:
console.log(rev1.reverse(), rev1); // [ 3, 2, 1, 0 ] [ 3, 2, 1, 0 ]

//toReversed(): it doesn't change the original array, rather than it return new array
console.log(rev2.toReversed(), rev2); // [ 13, 12, 11, 10 ] [ 10, 11, 12, 13 ]

// toSorted(): it is a immutable version of sorting method
const months = ["Mar", "Jan", "Jul", "May", "Jun"];
const months2 = ["May", "Jun", "Jan", "Mar", "Jun"];
const months1 = months.sort();
const monthsT2 = months2.toSorted();
console.log({ months, months1, months });
console.log({ months2, monthsT2, months2 });
// months: [ 'Jan', 'Jul', 'Jun', 'Mar', 'May' ],
// months1: [ 'Jan', 'Jul', 'Jun', 'Mar', 'May' ]

// months2: [ 'May', 'Jun', 'Jan', 'Mar', 'Jun' ],
// monthsT2: [ 'Jan', 'Jun', 'Jun', 'Mar', 'May' ]

// toSpliced(): same immutable of splice()
const monthsSp = ["May", "Jun", "Jan", "Mar", "Jun"];
const monthsSpRes = monthsSp.toSpliced(1, 0, "feb");
console.log({ monthsSpRes, monthsSp });
// monthsSpRes: [ 'May', 'feb', 'Jun', 'Jan', 'Mar', 'Jun' ],
// monthsSp: [ 'May', 'Jun', 'Jan', 'Mar', 'Jun' ]

// with(): immutability power ,
// with(index, value) // index is number that can be -ve also, when index number will be:
//  -ve it start counting from backward (from right hand side)
// -ve it start counting from front (from left hand side)

const withNum = [1, 2, 3, 4, 5, 6];
// how to change element 3 and change to 7
withNum[2] = 7;
console.log({ withNum }); //  [ 1, 2, 7, 4, 5, 6 ] // original array get changed

// play with -ve index
withNum[-2] = 8;
console.log({ withNum }); //  [ 1, 2, 7, 4, 5, 6, '-2': 8 ]

const usingWith = withNum.with(2, 7);
const usingWithNeg = withNum.with(-2, 8);
console.log({ usingWith }); //  [ 1, 2, 7, 4, 5, 6 ]
console.log({ usingWithNeg }); // [ 1, 2, 7, 4, 8, 6 ]

// Phase 10: Array Static method

// Array Like
const arr_like = { 0: "I", 1: "Like", 2: "Code", length: 3 };
console.log({ arr_like });
arr_like[2]; // "code"
//Array.isArray(arr_like); // false
//arr_like instanceof object; // true

// uses of Array Like
function checkArgs() {
  console.log(arguments); // prototype:object
  // It shows error typeError: arguments.forEach is not a function
  // arguments.forEach((el) => {
  //   // do something
  // });

  // if we want to iterate then first convert it into array then do the operation
  const argArr = [...arguments];
  console.log(argArr); // prototype:Array
  argArr.forEach((elm) => {
    console.log(elm); //1,3
  });
}
checkArgs(1, 3); // Arguments(2):[0:1,2:3,length:2], it is look like an array but is is not an array it is an object. Array methods will not works here.

console.log("HTML collection as Array Like", document.getElementsByTagName("li"));
// when convert Array-Like to Array use Array.from(Array-Like)
const collectionArr = Array.from(document.getElementsByTagName("li"));
console.log("converted Array", collectionArr);

// fromAsync(): this is also a static method in Array like Array-Like and Array.from, this is will also create new array just like Array.from does, but the one mazor difference is in case of Array.from() you get array directly but in Array.fromAsync you will get a promise in return, and then you've to handle that promise to get actual array value.
// fromAsync also work with asyncIterable object(readableStream, asyncGenerator)
// So if you've asyncIterable object and from there want to convert or get an array as result that is time you'll using Array.fromAsync()

const collectionAsyncArr = Array.fromAsync(document.getElementsByTagName("li"));
console.log("converted Array", collectionAsyncArr); // Promise{<pending>}
collectionAsyncArr.then((res) => console.log(res)).catch((err) => console.log(err));

// Ex:2
const ret = Array.fromAsync({
  0: Promise.resolve("Do code"),
  1: Promise.resolve("Get Dream"),
  2: Promise.resolve("Feel Happy"),
  length: 3,
});

/*
Array-Like:
{
  0: Promise.resolve("Do code"),
  1: Promise.resolve("Get Dream"),
  2: Promise.resolve("Feel Happy"),
  length: 3,
}
*/
const retRes = ret.then((val) => console.log(val).catch((err) => console.log(err)));
console.log(ret, retRes, "::ret");

// Array.of(): Array.of is a static method that help us to create a new array instance.
// not like prev two method where create array from array like using Array.from and Array.fromAsync.
// here it'll create new instance from any number of arguments

// creating an array using array constructor
const aOf = new Array(2, 3, 4); // [2,3,4]
// creating an array using normal way
const bOf = [4, 5, 6]; // [4,5,6]
// creating an array using of() method
const cOf = Array.of(5, 6, 7, true, "test of", { name: "alex" }, [8, 9, 1]);
console.log(cOf); // [5, 6, 7, true, "test of", { name: "alex" }, [8, 9, 1]];

//------------------------------------------------------------------------------------

// Phase 11:
// Array iterator methods

// filter: true/false
// map: transform function
// reduce: reduce something into single value

// The Customer Array
let customers = [
  {
    id: 1,
    f_name: "Abby",
    l_name: "Thomas",
    gender: "M",
    married: true,
    age: 32,
    expense: 500,
    purchased: ["Shampoo", "Toys", "Book"],
  },
  {
    id: 2,
    f_name: "Jerry",
    l_name: "Tom",
    gender: "M",
    married: true,
    age: 64,
    expense: 100,
    purchased: ["Stick", "Blade"],
  },
  {
    id: 3,
    f_name: "Dianna",
    l_name: "Cherry",
    gender: "F",
    married: true,
    age: 22,
    expense: 1500,
    purchased: ["Lipstik", "Nail Polish", "Bag", "Book"],
  },
  {
    id: 4,
    f_name: "Dev",
    l_name: "Currian",
    gender: "M",
    married: true,
    age: 82,
    expense: 90,
    purchased: ["Book"],
  },
  {
    id: 5,
    f_name: "Maria",
    l_name: "Gomes",
    gender: "F",
    married: false,
    age: 7,
    expense: 300,
    purchased: ["Toys"],
  },
];

// filter() method
{
  // filter example - Build Customer Data for Senior Citizens
  const seniorCustomers = customers.filter((customer) => {
    return customer.age >= 60;
  });
  console.log("[filter] Senior Customers = ", seniorCustomers);
}

// map() method
{
  // map example - Build Customer Data with title and full name
  const customersWithFullName = customers.map((customer) => {
    let title = "";
    if (customer.gender === "M") {
      title = "Mr.";
    } else if (customer.gender === "F" && customer.married) {
      title = "Mrs.";
    } else {
      title = "Miss";
    }
    customer["full_name"] = title + " " + customer.f_name + " " + customer.l_name;
    return customer;
  });
  console.log("[map] Customers With Full Name = ", customersWithFullName);
}

// reduce() method
{
  // reduce example - Get the Average Age of
  // Customers who purchased 'Book'
  let count = 0;
  const total = customers.reduce((accumulator, customer, currentIndex, array) => {
    if (customer.purchased.includes("Book")) {
      accumulator = accumulator + customer.age;
      count = count + 1;
    }
    return accumulator;
  }, 0);
  console.log("[reduce] Customer Avg age Purchased Book:", Math.floor(total / count));
}

// some() method
{
  const hasYoungCustomer = customers.some((customer) => {
    return customer.age < 10;
  });
  console.log("[some] Has Young Customer(Age < 10):", hasYoungCustomer);
}

// find() method
{
  const foundYoungCustomer = customers.find((customer) => {
    return customer.age < 10;
  });
  console.log("[find] Found Young Customer(Age < 10): ", foundYoungCustomer);
}

// findIndex() method
{
  const index = customers.findIndex((customer) => {
    return customer.age < 10;
  });
}

// findLastIndex() method
{
  const index = customers.findLastIndex((customer) => {
    return customer.age < 10;
  });
}

// findLast() method
{
  const lastFoundYoungCustomer = customers.findLast((customer) => {
    return customer.age < 10;
  });
  console.log("[find] Last Found Young Customer(Age < 10): ", lastFoundYoungCustomer);
}

// every() method
{
  const isThereWindowShopper = customers.every((customer) => {
    return customer.purchased.length === 0;
  });
  console.log("[every] Everyone a window shopper?", isThereWindowShopper);
}

// entries() method: index,values

const numbers = [1,2,3,4,5]
const arrItr = numbers.entries()
console.log(arrItr.next().value());// [0,1]
console.log(arrItr.next().value());// [1,2]
console.log(arrItr.next().value());// [2,3]
//or not do one by one use for of loop

{
  for (const value of numbers.entries()) {
    console.log(value);
  }
}

// values() method: only values
{
  for (const value of numbers.values()) {
    console.log(value);
  }
}

// flatMap() method
{
  const arr1 = [1, 2, 3, 4];
  arr1.map((item) => item * 2);
  arr1.flatMap((item) => item * 2);

  arr1.map((item) => [item * 2]);
  arr1.flatMap((item) => [item * 2]);

  arr1.map((item) => [[item * 2]]);
  arr1.flatMap((item) => [[item * 2]]);
}

// reduceRight() method
{
  let number = [100, 40, 15];

  number.reduceRight((accumulator, current) => {
    return accumulator - current;
  });
}

// Array method Chaining
{
  const marriedCustomers = customers.filter((customer) => {
    return customer.married;
  });

  const expenseMapped = marriedCustomers.map((marriedCustomer) => {
    return marriedCustomer.expense;
  });

  const totalExpenseMarriedCustomer = expenseMapped.reduce((accum, expense) => {
    return accum + expense;
  }, 0);
  console.log("Total Expense of Married Customers in INR: ", totalExpenseMarriedCustomer);

  // After Chining them
  const total = customers
    .filter((customer) => customer.married)
    .map((married) => married.expense)
    .reduce((accum, expense) => accum + expense);
  console.log("Orchestrated total expense in INR: ", total);
}
