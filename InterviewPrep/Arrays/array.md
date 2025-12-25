# The Ultimate Guide to JavaScript Arrays

Welcome to a deep dive into JavaScript Arrays! This guide is designed for developers of all levels, from beginners getting their start to experienced programmers preparing for technical interviews. We'll cover everything from creating an array to mastering advanced iteration and immutable methods.

## Table of Contents

- [The Ultimate Guide to JavaScript Arrays](#the-ultimate-guide-to-javascript-arrays)
  - [Table of Contents](#table-of-contents)
  - [1. Core Concepts (The Basics)](#1-core-concepts-the-basics)
    - [What is a JavaScript Array?](#what-is-a-javascript-array)
    - [Creating an Array](#creating-an-array)
    - [Key Properties: `length` \& Index](#key-properties-length--index)
    - [Looping and Iteration](#looping-and-iteration)
  - [2. Essential Array Methods](#2-essential-array-methods)
    - [⚠️ Mutator Methods (Modify the original array)](#️-mutator-methods-modify-the-original-array)
    - [✅ Accessor Methods (Return a new value/array)](#-accessor-methods-return-a-new-valuearray)
  - [3. Modern Iteration Methods (Functional Approach)](#3-modern-iteration-methods-functional-approach)
    - [Iterators for Transformation, Filtering \& Aggregation](#iterators-for-transformation-filtering--aggregation)
    - [Iterators for Finding \& Checking](#iterators-for-finding--checking)
  - [4. Advanced Topics \& Modern Features (ES2022+)](#4-advanced-topics--modern-features-es2022)
    - [Destructuring, Rest \& Spread](#destructuring-rest--spread)
    - [Cloning Arrays (Shallow Copy)](#cloning-arrays-shallow-copy)
    - [✅ New Immutable Methods (ES2022+)](#-new-immutable-methods-es2022)
    - [Grouping Array Data](#grouping-array-data)
    - [Method Chaining](#method-chaining)
  - [5. Static Array Methods](#5-static-array-methods)
    - [`Array.isArray()`](#arrayisarray)
    - [`Array.from()` \& Array-Like Objects](#arrayfrom--array-like-objects)
    - [`Array.fromAsync()`](#arrayfromasync)
    - [`Array.of()`](#arrayof)
  - [6. Complexity Cheat Sheet (For Interviews!)](#6-complexity-cheat-sheet-for-interviews)
  - [7. JavaScript Array: Q\&A Interview Practice](#7-javascript-array-qa-interview-practice)

---

## 1. Core Concepts (The Basics)

### What is a JavaScript Array?

An array in JavaScript is a special, high-level, list-like object used to store multiple values in a single variable.

**Key Characteristics:**

- **Zero-indexed:** The first element is at index `0`.
- **Dynamic Size:** You can add or remove elements at any time. The `length` is not fixed.
- **Mixed Data Types:** An array can hold elements of different types (numbers, strings, objects, other arrays, etc.).

### Creating an Array

You can create an array using either an array literal (the recommended way) or the `Array` constructor.

**Syntax (Literal):**

```javascript
const arr = [element1, element2, ...];
```

**Syntax (Constructor):**

```javascript
const arr = new Array(element1, element2, ...);
const arr = new Array(arrayLength); // Creates an array with empty slots
```

**Example:**

```javascript
// Literal (Best Practice)
const fruits = ["Apple", "Banana", "Cherry"];

// Constructor with elements
const numbers = new Array(1, 2, 3, 4, 5);

// Constructor with a single number creates an array of that length
const emptySlots = new Array(5); // [ <5 empty items> ]
console.log(emptySlots.length); // 5

// An array can hold anything!
const mixedArray = [1, "hello", true, null, { id: 1 }, ["a", "b"]];
```

> **Interview Tip:** Be aware of the `new Array(5)` behavior. It creates an array with 5 empty slots, not an array with the single element `5`. `Array.of(5)` would create `[5]`.

### Key Properties: `length` & Index

- **`index`**: The position of an element, starting from `0`.
- **`length`**: The total number of elements in the array. It's always `1` greater than the highest index.

```javascript
const letters = ["a", "b", "c"];
// Index:      0    1    2

console.log(letters.length); // 3
console.log(letters[0]); // 'a'
console.log(letters[2]); // 'c'
console.log(letters[letters.length - 1]); // 'c' (Access last element)
```

### Looping and Iteration

There are several ways to loop through an array's elements.

| Method          | Use Case                                                                                  |
| :-------------- | :---------------------------------------------------------------------------------------- |
| **`for` loop**  | The classic. Gives full control over the index and iteration steps.                       |
| **`for...of`**  | The modern, cleanest way to loop over _values_ when you don't need the index.             |
| **`forEach()`** | An array method ideal for executing a function on each element. Provides value and index. |

**Example:**

```javascript
const arr = [10, 20, 30];

// Classic for loop
for (let i = 0; i < arr.length; i++) {
  console.log(`Index: ${i}, Value: ${arr[i]}`);
}

// for...of loop (preferred for simplicity)
for (const value of arr) {
  console.log(`Value: ${value}`);
}

// forEach method
arr.forEach((value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
});
```

---

## 2. Essential Array Methods

Methods are functions built into the array object. We can categorize them by whether they change the original array.

### ⚠️ Mutator Methods (Modify the original array)

These methods change the array they are called on. Be careful when using them!

| Method             | Description                                                                | Complexity |
| :----------------- | :------------------------------------------------------------------------- | :--------- |
| **`push()`**       | Adds one or more elements to the **end** of an array.                      | O(1)       |
| **`pop()`**        | Removes the **last** element from an array.                                | O(1)       |
| **`unshift()`**    | Adds one or more elements to the **beginning** of an array.                | O(n)       |
| **`shift()`**      | Removes the **first** element from an array.                               | O(n)       |
| **`splice()`**     | The "Swiss Army knife": removes, replaces, or adds elements.               | O(n)       |
| **`sort()`**       | Sorts the elements of an array in place.                                   | O(n log n) |
| **`reverse()`**    | Reverses the order of the elements in an array.                            | O(n)       |
| **`fill()`**       | Fills all or part of an array with a static value.                         | O(n)       |
| **`copyWithin()`** | Shallow copies part of an array to another location within the same array. | O(n)       |

**Example: `push`, `pop`, `shift`, `unshift`**

```javascript
let cars = ["BMW", "Mercedes"];

cars.push("Audi"); // ["BMW", "Mercedes", "Audi"]
cars.pop(); // ["BMW", "Mercedes"]

cars.unshift("Toyota"); // ["Toyota", "BMW", "Mercedes"]
cars.shift(); // ["BMW", "Mercedes"]
```

> **Performance Note:** `push` and `pop` are very fast. `unshift` and `shift` are slower because they require re-indexing all subsequent elements in the array.

**Example: `splice(start, deleteCount, ...itemsToAdd)`**

```javascript
const veggies = ["tomato", "potato", "onion", "carrot"];

// Remove 1 element at index 2
const removed = veggies.splice(2, 1);
console.log(veggies); // ["tomato", "potato", "carrot"]
console.log(removed); // ["onion"]

// Add "cabbage" at index 1 without removing anything
veggies.splice(1, 0, "cabbage");
console.log(veggies); // ["tomato", "cabbage", "potato", "carrot"]

// Replace 1 element at index 0 with two new elements
veggies.splice(0, 1, "spinach", "lettuce");
console.log(veggies); // ["spinach", "lettuce", "cabbage", "potato", "carrot"]
```

**Example: `sort()`**

```javascript
const numbers = [40, 100, 1, 5, 25, 10];
const artists = ["Jon", "Tom", "Lio", "Kio", "Anna"];

// Default sort is alphabetical (converts to strings)
numbers.sort(); // [1, 10, 100, 25, 40, 5] (Incorrect for numbers!)
artists.sort(); // ["Anna", "Jon", "Kio", "Lio", "Tom"] (Correct for strings)

// To sort numbers, provide a "compare function"
numbers.sort((a, b) => a - b); // Ascending: [1, 5, 10, 25, 40, 100]
numbers.sort((a, b) => b - a); // Descending: [100, 40, 25, 10, 5, 1]
```

> **Critical Interview Tip:** Always provide a compare function when sorting numbers. For non-ASCII strings (e.g., with accents), use `(a, b) => a.localeCompare(b)`.

---

### ✅ Accessor Methods (Return a new value/array)

These methods **do not** change the original array. Instead, they create and return a new array or value.

| Method              | Description                                                                                               | Complexity |
| :------------------ | :-------------------------------------------------------------------------------------------------------- | :--------- |
| **`slice()`**       | Returns a shallow copy of a portion of an array into a new array.                                         | O(n)       |
| **`concat()`**      | Merges two or more arrays into a new array.                                                               | O(n)       |
| **`join()`**        | Joins all elements of an array into a string.                                                             | O(n)       |
| **`includes()`**    | Checks if an array includes a certain value. Returns `true` or `false`.                                   | O(n)       |
| **`indexOf()`**     | Returns the first index at which a given element can be found. Returns `-1` if not present.               | O(n)       |
| **`lastIndexOf()`** | Returns the last index at which a given element can be found. Returns `-1` if not present.                | O(n)       |
| **`at()`**          | Takes an integer and returns the item at that index. Allows for negative indexing.                        | O(1)       |
| **`flat()`**        | Creates a new array with all sub-array elements concatenated into it recursively up to a specified depth. | O(n)       |

**Example: `slice(start, end)`**

```javascript
const animals = ["ant", "bison", "camel", "duck", "elephant"];

// Get elements from index 2 up to (but not including) index 4
console.log(animals.slice(2, 4)); // ["camel", "duck"]

// Get elements from index 2 to the end
console.log(animals.slice(2)); // ["camel", "duck", "elephant"]

// Get the last 2 elements
console.log(animals.slice(-2)); // ["duck", "elephant"]

// Create a full shallow copy
const animalsCopy = animals.slice();
console.log(animalsCopy); // ["ant", "bison", "camel", "duck", "elephant"]
```

**Example: `at()` vs. bracket notation**

```javascript
const items = ["a", "b", "c", "d", "e"];

console.log(items[0]); // "a"
console.log(items.at(0)); // "a"

// Getting the last element
console.log(items[items.length - 1]); // "e" (verbose)
console.log(items.at(-1)); // "e" (clean and modern)
```

**Example: `flat(depth)`**

```javascript
const nested = [1, 2, [3, 4, [5, 6]]];

// Default depth is 1
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]

// Specify depth
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]

// Flatten completely
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
```

---

## 3. Modern Iteration Methods (Functional Approach)

These are the workhorses of modern JavaScript development. They take a function as an argument and do not mutate the original array.

### Iterators for Transformation, Filtering & Aggregation

| Method          | Description                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------- |
| **`map()`**     | Creates a **new array** by calling a function on every element and collecting the results.         |
| **`filter()`**  | Creates a **new array** with all elements that pass the test implemented by the provided function. |
| **`reduce()`**  | Executes a "reducer" function on each element, resulting in a **single output value**.             |
| **`flatMap()`** | A combination of `map()` followed by `flat()` of depth 1. Efficient for mapping and flattening.    |

**Example: Using a `customers` array**

```javascript
const customers = [
  { id: 1, name: "Abby", age: 32, gender: "F", married: true },
  { id: 2, name: "Jerry", age: 64, gender: "M", married: true },
  { id: 3, name: "Dianna", age: 22, gender: "F", married: false },
  { id: 5, name: "Maria", age: 7, gender: "F", married: false },
];

// map(): Create an array of customer names
const names = customers.map((customer) => customer.name);
// -> ["Abby", "Jerry", "Dianna", "Maria"]

// filter(): Get all senior citizens (age >= 60)
const seniors = customers.filter((customer) => customer.age >= 60);
// -> [{ id: 2, name: "Jerry", age: 64, ... }]

// reduce(): Calculate the total age of all customers
const totalAge = customers.reduce((accumulator, customer) => accumulator + customer.age, 0);
// -> 125 (32 + 64 + 22 + 7)
```

### Iterators for Finding & Checking

| Method                | Description                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------------- |
| **`find()`**          | Returns the **first element** in the array that satisfies the provided testing function.     |
| **`findIndex()`**     | Returns the **index of the first element** that satisfies the test.                          |
| **`findLast()`**      | Returns the **last element** that satisfies the test.                                        |
| **`findLastIndex()`** | Returns the **index of the last element** that satisfies the test.                           |
| **`some()`**          | Tests whether **at least one** element in the array passes the test. Returns `true`/`false`. |
| **`every()`**         | Tests whether **all** elements in the array pass the test. Returns `true`/`false`.           |

**Example:**

```javascript
// find(): Find the first unmarried customer
const firstUnmarried = customers.find((customer) => !customer.married);
// -> { id: 3, name: "Dianna", ... }

// some(): Is there any customer younger than 18?
const hasMinors = customers.some((customer) => customer.age < 18);
// -> true

// every(): Are all customers female?
const allFemale = customers.every((customer) => customer.gender === "F");
// -> false
```

---

## 4. Advanced Topics & Modern Features (ES2022+)

### Destructuring, Rest & Spread

- **Destructuring:** A clean syntax to unpack values from arrays into distinct variables.
- **Rest (`...`)**: Collects the _rest_ of the elements into a new array. Used on the left side of an assignment.
- **Spread (`...`)**: Expands an array into individual elements. Used on the right side of an assignment (e.g., in a function call or another array literal).

**Example:**

```javascript
const food = ["tomato", "potato", "onion", "carrot", "cabbage"];

// Destructuring
const [first, second] = food; // first = "tomato", second = "potato"

// Destructuring with skipping
const [tomo, , onio] = food; // tomo = "tomato", onio = "onion"

// Destructuring with Rest
const [veg1, veg2, ...remainingVeggies] = food;
// remainingVeggies = ["onion", "carrot", "cabbage"]

// Spread for copying
const foodCopy = [...food];

// Spread for merging
const moreFood = ["ginger", "garlic"];
const allFood = [...food, ...moreFood];
```

### Cloning Arrays (Shallow Copy)

Using `slice()` or the spread operator `...` creates a **shallow copy**.

- **Shallow Copy**: Top-level primitive values are copied. Nested objects or arrays are **not** copied; only their reference is. Modifying a nested object in the copy will also modify it in the original.

```javascript
const original = [1, { id: 101 }];
const shallowCopy = [...original];

shallowCopy[0] = 99; // Does NOT affect original
shallowCopy[1].id = 202; // DOES affect original

console.log(original); // [1, { id: 202 }]
console.log(shallowCopy); // [99, { id: 202 }]
```

> **Interview Tip:** For a **deep copy**, you need other methods like `JSON.parse(JSON.stringify(arr))` (has limitations) or a library function like Lodash's `_.cloneDeep()`.

### ✅ New Immutable Methods (ES2022+)

These are modern, immutable alternatives to older, mutating methods. They always return a new array.

| Immutable Method   | Mutating Counterpart   | Description                                                                      |
| :----------------- | :--------------------- | :------------------------------------------------------------------------------- |
| **`toSorted()`**   | `sort()`               | Returns a new, sorted array.                                                     |
| **`toReversed()`** | `reverse()`            | Returns a new, reversed array.                                                   |
| **`toSpliced()`**  | `splice()`             | Returns a new array with elements removed/added/replaced.                        |
| **`with()`**       | `array[index] = value` | Returns a new array with the element at a given index replaced with a new value. |

**Example: `toSorted()` vs `sort()`**

```javascript
const months = ["Mar", "Jan", "Feb"];

const sortedMonths = months.toSorted();
console.log(sortedMonths); // ["Feb", "Jan", "Mar"]
console.log(months); // ["Mar", "Jan", "Feb"] (Original is unchanged)

months.sort();
console.log(months); // ["Feb", "Jan", "Mar"] (Original is now changed)
```

**Example: `with(index, value)`**

```javascript
const originalArr = [1, 2, 3, 4, 5];

// Create a new array with the element at index 2 changed to 99
const newArr = originalArr.with(2, 99);

console.log(newArr); // [1, 2, 99, 4, 5]
console.log(originalArr); // [1, 2, 3, 4, 5] (Unchanged)
```

### Grouping Array Data

`Object.groupBy()` is a powerful way to group elements of an array based on a common property.

**Example:**

```javascript
const employees = [
  { name: "Bob", dept: "Eng" },
  { name: "Alex", dept: "HR" },
  { name: "Toby", dept: "Eng" },
];

const byDept = Object.groupBy(employees, ({ dept }) => dept);
/*
byDept = {
  "Eng": [ { name: "Bob", dept: "Eng" }, { name: "Toby", dept: "Eng" } ],
  "HR": [ { name: "Alex", dept: "HR" } ]
}
*/
```

### Method Chaining

One of the most powerful features of functional array methods is that they can be "chained" together to perform complex data transformations in a clean, readable way.

**Example:**
Calculate the total expense of all married customers.

```javascript
const totalExpense = customers
  .filter((customer) => customer.married) // 1. Get only married customers
  .map((marriedCustomer) => marriedCustomer.expense) // 2. Get their expenses
  .reduce((total, expense) => total + expense, 0); // 3. Sum up the expenses

console.log(totalExpense);
```

---

## 5. Static Array Methods

These methods are called on the `Array` constructor itself (e.g., `Array.isArray()`), not on an array instance.

### `Array.isArray()`

The safest way to check if a value is a true array.

```javascript
Array.isArray([]); // true
Array.isArray({}); // false
Array.isArray("hello"); // false
```

### `Array.from()` & Array-Like Objects

An "array-like" object is an object that has a `length` property and integer-based keys (e.g., `0`, `1`, `2`). Common examples are the `arguments` object in a function or an `HTMLCollection` from the DOM. `Array.from()` converts these objects into real arrays so you can use array methods on them.

```javascript
// DOM Example
const listItems = document.getElementsByTagName("li"); // This is an HTMLCollection, not an array
// listItems.forEach(...) will throw an error!

const realArray = Array.from(listItems);
realArray.forEach((item) => {
  console.log(item.textContent);
});
```

### `Array.fromAsync()`

Creates a new `Array` instance from an async iterable, iterable, or array-like object. It returns a `Promise` that resolves with the new array.

```javascript
const asyncData = {
  0: Promise.resolve("First"),
  1: Promise.resolve("Second"),
  length: 2,
};

Array.fromAsync(asyncData).then((result) => {
  console.log(result); // ["First", "Second"]
});
```

### `Array.of()`

Creates a new Array instance from a variable number of arguments, regardless of the number or type of the arguments. It solves the `new Array()` constructor confusion.

```javascript
Array.of(7); // [7]
new Array(7); // [ <7 empty items> ]

Array.of(1, 2, 3); // [1, 2, 3]
new Array(1, 2, 3); // [1, 2, 3]
```

---

## 6. Complexity Cheat Sheet (For Interviews!)

Understanding the performance of array methods is crucial for writing efficient code and acing technical interviews.

| Method                                           | Time Complexity | Space Complexity    | Notes                                                                                          |
| :----------------------------------------------- | :-------------- | :------------------ | :--------------------------------------------------------------------------------------------- |
| **Access (`arr[i]`, `at()`)**                    | O(1)            | O(1)                | Direct access is very fast.                                                                    |
| **`push()` / `pop()`**                           | O(1)            | O(1)                | Fast operations at the end of the array.                                                       |
| **`shift()` / `unshift()`**                      | O(n)            | O(1)                | Slow. Requires re-indexing all other elements.                                                 |
| **`slice()` / `concat()`**                       | O(n)            | O(n)                | Creates a new array, requiring memory and time proportional to the number of elements.         |
| **`splice()`**                                   | O(n)            | O(k)                | `n` is array size, `k` is number of deleted items. Re-indexing makes it O(n).                  |
| **`forEach()` / `map()` / `filter()`**           | O(n)            | O(n) for map/filter | Iterates through every element once. `map` and `filter` create new arrays.                     |
| **`reduce()` / `find()` / `some()` / `every()`** | O(n)            | O(1)                | Iterates through every element once (or until a condition is met for `find`, `some`, `every`). |
| **`sort()`**                                     | O(n log n)      | O(log n) or O(n)    | The average time complexity for most modern browser sort implementations.                      |
| **`includes()` / `indexOf()`**                   | O(n)            | O(1)                | Must potentially scan the entire array.                                                        |

---

---

## 7. JavaScript Array: Q&A Interview Practice

This document contains a curated list of questions and answers designed to test your knowledge of JavaScript arrays, ranging from basic concepts to advanced data manipulation techniques.

## Table of Contents

- [Basic Array Operations (T-001 to T-020)](#basic-array-operations)
- [Advanced Data Manipulation (T-021 to T-048)](#advanced-data-manipulation)
- [Array-Like Objects & Static Methods (T-049 to T-054)](#array-like-objects--static-methods)

---

## Basic Array Operations

### T-001: Create an array of 5 elements using the Array Constructor.

### Answer

You can pass the elements as arguments to the `Array` constructor.

```javascript
const arr = new Array(1, "two", 3, true, 5);
console.log(arr); // [1, "two", 3, true, 5]
console.log(arr.length); // 5
```

### T-002: Create an array of 3 empty slots.

### Answer

Pass a single number to the `Array` constructor to create a sparse array with a specified length.

```javascript
const emptyArray = new Array(3);
console.log(emptyArray); // [ <3 empty items> ]
console.log(emptyArray.length); // 3
```

### T-003: Create an array of 6 elements using Array literals and access the fourth element.

### Answer

The fourth element is at index `3`. You can access it directly. The prompt's mention of the `length` property is a bit of a curveball, but you can use it to calculate the index from the end.

```javascript
const elements = ["a", "b", "c", "d", "e", "f"];

// Standard way (most readable)
const fourthElement = elements[3];
console.log(fourthElement); // "d"

// Using the length property (less common for this scenario)
// The fourth element is 3rd from the start (index 3),
// which is (length - 3) from the start.
const fourthElementUsingLength = elements[elements.length - 3];
console.log(fourthElementUsingLength); // "d"
```

### T-004: Use a `for` loop on the above array to print elements at the odd indices.

### Answer

You can loop through the array and use the modulo operator (`%`) to check if the index `i` is odd.

```javascript
const elements = ["a", "b", "c", "d", "e", "f"];

for (let i = 0; i < elements.length; i++) {
  // Odd indices are 1, 3, 5, etc.
  if (i % 2 !== 0) {
    console.log(`Index: ${i}, Element: ${elements[i]}`);
  }
}
// Output:
// Index: 1, Element: b
// Index: 3, Element: d
// Index: 5, Element: f
```

### T-005: Add one element at the front and the end of an array.

### Answer

Use `unshift()` to add to the front and `push()` to add to the end. Both methods mutate the original array.

```javascript
const arr = [2, 3, 4];

// Add '1' to the front
arr.unshift(1);
console.log(arr); // [1, 2, 3, 4]

// Add '5' to the end
arr.push(5);
console.log(arr); // [1, 2, 3, 4, 5]
```

### T-006: Remove an element from the front and the end of an array.

### Answer

Use `shift()` to remove from the front and `pop()` to remove from the end. Both methods mutate the original array and return the removed element.

```javascript
const arr = [1, 2, 3, 4, 5];

// Remove from the front
const firstElement = arr.shift();
console.log(firstElement); // 1
console.log(arr); // [2, 3, 4, 5]

// Remove from the end
const lastElement = arr.pop();
console.log(lastElement); // 5
console.log(arr); // [2, 3, 4]
```

### T-007: Create an array of 10 favorite foods. Destructure the 6th food element.

### Answer

Use array destructuring with commas to "skip" the elements you don't need.

```javascript
const favoriteFoods = [
  "Pizza",
  "Sushi",
  "Tacos",
  "Burger",
  "Pasta",
  "Ramen",
  "Steak",
  "Ice Cream",
  "Pho",
  "Curry",
];

// Use commas to skip the first 5 elements
const [, , , , , sixthFood] = favoriteFoods;

console.log(sixthFood); // "Ramen"
```

### T-008: Take out the last 8 food items from the above array using array destructuring.

### Answer

Destructure the first two elements into variables and collect the remaining elements into a new array using the rest parameter (`...`).

```javascript
const favoriteFoods = [
  "Pizza",
  "Sushi",
  "Tacos",
  "Burger",
  "Pasta",
  "Ramen",
  "Steak",
  "Ice Cream",
  "Pho",
  "Curry",
];

const [firstFood, secondFood, ...lastEightFoods] = favoriteFoods;

console.log(lastEightFoods);
// ["Tacos", "Burger", "Pasta", "Ramen", "Steak", "Ice Cream", "Pho", "Curry"]
console.log(lastEightFoods.length); // 8
```

### T-009: Clone an Array (Shallow cloning).

### Answer

The two most common ways to create a shallow clone are using the spread syntax (`...`) and the `slice()` method.

```javascript
const originalArray = [1, 2, { a: 3 }];

// Method 1: Spread Syntax (Recommended)
const clone1 = [...originalArray];

// Method 2: slice() method
const clone2 = originalArray.slice();

console.log(clone1); // [1, 2, { a: 3 }]
console.log(clone2); // [1, 2, { a: 3 }]

// Verify they are different arrays
console.log(originalArray === clone1); // false
```

### T-010: Empty an array using its `length` property.

### Answer

Setting the `length` property of an array to `0` is a quick way to clear it.

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers.length); // 5

numbers.length = 0;

console.log(numbers); // []
console.log(numbers.length); // 0
```

### T-011: Create an array (1-10). Resize it to length 6 once you find the number 5.

### Answer

Loop through the array. When the condition is met, set the `length` and use `break` to exit the loop.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
  console.log(`Checking: ${numbers[i]}`);
  if (numbers[i] === 5) {
    numbers.length = 6; // Resize the array
    console.log("Found 5, resizing array.");
    break; // Stop the loop
  }
}

console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

### T-012: Create an array of 10 elements. Use `splice()` to empty the array.

### Answer

`splice()` can remove elements from an array. To empty it, start at index `0` and remove a number of elements equal to the array's length.

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const deletedItems = numbers.splice(0, numbers.length);

console.log(numbers); // []
console.log(deletedItems); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### T-013: Which method is most efficient for emptying an array?

### Answer

The efficiency depends on the context, particularly on whether other references to the array exist.

1.  **`arr = []` (Reassignment):** This is typically the **fastest**. It doesn't modify the original array but creates a new empty one and reassigns the variable to it. The old array will be garbage-collected _if there are no other references to it_. If other parts of your code hold a reference to the original array, they will remain unchanged.

2.  **`arr.length = 0`:** This is generally the **best method for mutating the original array**. It directly modifies the array, clearing all its elements. It's very fast and ensures that any other references to this array will also see it as empty.

3.  **`arr.splice(0, arr.length)`:** This is **slower**. It does the job but has the overhead of creating and returning a new array containing all the removed elements, which is unnecessary if you just want to clear the array.

4.  **`while(arr.length > 0) { arr.pop(); }`:** This is the **least efficient** method. It involves repeated function calls and can be significantly slower for large arrays.

> **Conclusion for interviews:** For clearing an array in place, use `arr.length = 0`. If you can safely reassign the variable, `arr = []` is often quickest.

### T-014: What happens when you concatenate two empty arrays?

### Answer

Concatenating two empty arrays results in a new, empty array.

```javascript
const arr1 = [];
const arr2 = [];
const result = arr1.concat(arr2);

console.log(result); // []
console.log(result === arr1); // false (it's a new array)
```

### T-015: How can you check if a value is partially matching with any of the elements?

### Answer

Use the `some()` method combined with a string method like `includes()` or a regular expression. `some()` will efficiently stop checking as soon as it finds a match.

```javascript
const fileNames = ["report-2023.pdf", "invoice_final.docx", "archive-2022.zip"];
const searchTerm = "invoice";

// Method 1: Using string.includes()
const hasInvoice = fileNames.some((name) => name.includes(searchTerm));
console.log(hasInvoice); // true

// Method 2: Using RegExp.test() for more complex patterns
const hasReport = fileNames.some((name) => /report/.test(name));
console.log(hasReport); // true
```

### T-016: What is the difference between the `slice()` and `splice()` methods?

### Answer

This is a classic interview question. The key differences are mutability and functionality.

| Feature          | `slice(start, end)`                                        | `splice(start, deleteCount, ...items)`                |
| :--------------- | :--------------------------------------------------------- | :---------------------------------------------------- |
| **Mutability**   | **Immutable**. Does **not** change the original array.     | **Mutable**. **Changes** the original array.          |
| **Return Value** | Returns a **new array** containing the extracted elements. | Returns an array containing the **deleted** elements. |
| **Purpose**      | To copy a portion of an array.                             | To add, remove, or replace elements in an array.      |

```javascript
// Example
const letters = ["a", "b", "c", "d", "e"];

// slice() - does NOT change 'letters'
const sliced = letters.slice(1, 3);
console.log(sliced); // ['b', 'c']
console.log(letters); // ['a', 'b', 'c', 'd', 'e'] (unchanged)

// splice() - CHANGES 'letters'
const spliced = letters.splice(1, 2, "x", "y");
console.log(spliced); // ['b', 'c'] (the deleted items)
console.log(letters); // ['a', 'x', 'y', 'd', 'e'] (changed)
```

### T-017: Create an array of alphanumeric strings. Sort it immutably.

### Answer

Use the modern `toSorted()` method, which returns a new sorted array without modifying the original. For descending order, provide a custom compare function.

```javascript
const items = ["Item 2", "Item 10", "item 1", "Item 5"];

// Ascending sort (immutable)
const ascending = items.toSorted((a, b) => a.localeCompare(b, undefined, { numeric: true }));

// Descending sort (immutable)
const descending = items.toSorted((a, b) => b.localeCompare(a, undefined, { numeric: true }));

console.log("Original:", items);
// Original: ["Item 2", "Item 10", "item 1", "Item 5"]

console.log("Ascending:", ascending);
// Ascending: ["item 1", "Item 2", "Item 5", "Item 10"]

console.log("Descending:", descending);
// Descending: ["Item 10", "Item 5", "Item 2", "item 1"]
```

_Note: `localeCompare` with the `numeric: true` option provides a more natural sort for alphanumeric strings._

### T-018: Can you give examples of sparse and dense arrays?

### Answer

- A **dense array** has elements for every index from `0` to `length - 1`.
- A **sparse array** has gaps, meaning some indices have no element.

```javascript
// Dense Array: No gaps
const denseArray = [10, 20, 30, 40];
console.log(denseArray.length); // 4
console.log(denseArray[1]); // 20

// Sparse Array: Has gaps
const sparseArray = ["a", "b"];
sparseArray[5] = "f";
console.log(sparseArray); // ['a', 'b', <3 empty items>, 'f']
console.log(sparseArray.length); // 6
console.log(sparseArray[2]); // undefined
console.log(2 in sparseArray); // false (the index does not exist)
```

### T-019: Give a practical usage of the `.fill()` method.

### Answer

The `.fill()` method is great for initializing or resetting arrays with a default value. A common use case is creating a game board or a placeholder data structure.

```javascript
// Use case: Creating a 3x3 tic-tac-toe board

// Create an array of 9 elements and fill with null
const board = new Array(9).fill(null);
console.log(board); // [null, null, null, null, null, null, null, null, null]

// Another use case: Resetting scores
let scores = [85, 92, 78];
// Reset all scores to 0 for a new game
scores.fill(0);
console.log(scores); // [0, 0, 0]
```

### T-020: How to convert an array to a string?

### Answer

The `join()` method is the standard way to convert an array to a string. You can specify a separator.

```javascript
const words = ["Hello", "World", "from", "JavaScript"];

// Default separator is a comma (,)
const csvString = words.join();
console.log(csvString); // "Hello,World,from,JavaScript"

// With a space separator
const sentence = words.join(" ");
console.log(sentence); // "Hello World from JavaScript"

// With no separator
const combined = words.join("");
console.log(combined); // "HelloWorldfromJavaScript"
```

---

## Advanced Data Manipulation

**Input Data for T-021 to T-048:**

```javascript
const employees = [
  { id: 1, name: "Alice", departmentId: 1, salary: 5000 },
  { id: 2, name: "Bob", departmentId: 2, salary: 7000 },
  { id: 3, name: "Charlie", departmentId: 3, salary: 4500 },
  { id: 4, name: "Diana", departmentId: 1, salary: 5500 },
  { id: 5, name: "Edward", departmentId: 2, salary: 8000 },
  { id: 6, name: "Fiona", departmentId: 4, salary: 6000 },
  { id: 7, name: "George", departmentId: 3, salary: 5200 },
  { id: 8, name: "Helen", departmentId: 4, salary: 7200 },
  { id: 9, name: "Ian", departmentId: 2, salary: 4800 },
  { id: 10, name: "Jane", departmentId: 1, salary: 5100 },
];

const departments = [
  { id: 1, name: "HR" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Sales" },
];
```

### T-021: Filter employees who work in the "Engineering" department.

### Answer

First, find the ID for the "Engineering" department, then filter the employees array based on that ID.

```javascript
const engineeringDept = departments.find((dept) => dept.name === "Engineering");
const engineeringEmployees = employees.filter((emp) => emp.departmentId === engineeringDept.id);

console.log(engineeringEmployees);
/*
[
  { id: 2, name: 'Bob', departmentId: 2, salary: 7000 },
  { id: 5, name: 'Edward', departmentId: 2, salary: 8000 },
  { id: 9, name: 'Ian', departmentId: 2, salary: 4800 }
]
*/
```

### T-022: Create a new array combining employee names and department names.

### Answer

For efficiency, first create a lookup map for departments. Then, map over the employees to create the new formatted array. This avoids nested loops (O(n \* m)) and is much faster (O(n + m)).

```javascript
const departmentMap = new Map(departments.map((dept) => [dept.id, dept.name]));

const employeeDetails = employees.map((emp) => {
  const deptName = departmentMap.get(emp.departmentId) || "Unknown";
  return `${emp.name} (${deptName})`;
});

console.log(employeeDetails);
// [ 'Alice (HR)', 'Bob (Engineering)', ... ]
```

### T-023: Find the highest salary among employees.

### Answer

Use `reduce()` to iterate through the employees and keep track of the maximum salary found so far.

```javascript
const highestSalary = employees.reduce((maxSalary, emp) => {
  return emp.salary > maxSalary ? emp.salary : maxSalary;
}, 0);

console.log(highestSalary); // 8000
```

Alternatively, using `Math.max` and `map`:

```javascript
const highestSalaryAlt = Math.max(...employees.map((emp) => emp.salary));
console.log(highestSalaryAlt); // 8000
```

### T-024: Check if there is at least one employee in the "Sales" department.

### Answer

Use `some()` for an efficient check that stops as soon as a match is found.

```javascript
const salesDept = departments.find((dept) => dept.name === "Sales");
const hasSalesEmployee = employees.some((emp) => emp.departmentId === salesDept.id);

console.log(hasSalesEmployee); // true
```

### T-025: Write a function to filter employees earning more than 6000.

### Answer

Wrap the `filter` logic in a reusable function.

```javascript
const getHighEarners = (employees, minSalary) => {
  return employees.filter((emp) => emp.salary > minSalary);
};

const highEarners = getHighEarners(employees, 6000);
console.log(highEarners);
/*
[
  { id: 2, name: 'Bob', departmentId: 2, salary: 7000 },
  { id: 5, name: 'Edward', departmentId: 2, salary: 8000 },
  { id: 8, name: 'Helen', departmentId: 4, salary: 7200 }
]
*/
```

### T-026: Create an array of employee names only.

### Answer

Use the `map()` method to transform the array of objects into an array of strings.

```javascript
const employeeNames = employees.map((emp) => emp.name);
console.log(employeeNames);
// [ 'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Helen', 'Ian', 'Jane' ]
```

### T-027: Calculate the total salary of all employees.

### Answer

Use `reduce()` to sum up all the `salary` values.

```javascript
const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
console.log(totalSalary); // 60100
```

### T-028: Is there any employee earning less than 5000?

### Answer

Use the `some()` method for an efficient check.

```javascript
const hasLowEarner = employees.some((emp) => emp.salary < 5000);
console.log(hasLowEarner); // true (Charlie and Ian)
```

### T-029: Find the first employee who earns exactly 5100.

### Answer

Use the `find()` method, which returns the first element that matches the condition.

```javascript
const employee5100 = employees.find((emp) => emp.salary === 5100);
console.log(employee5100); // { id: 10, name: 'Jane', departmentId: 1, salary: 5100 }
```

### T-030: Find the last employee in the "HR" department.

### Answer

Use the `findLast()` method to search from the end of the array.

```javascript
const hrDept = departments.find((dept) => dept.name === "HR");
const lastHrEmployee = employees.findLast((emp) => emp.departmentId === hrDept.id);

console.log(lastHrEmployee); // { id: 10, name: 'Jane', departmentId: 1, salary: 5100 }
```

### T-031: Find the first employee in the "Marketing" department.

### Answer

Use `find()` to get the first match.

```javascript
const marketingDept = departments.find((dept) => dept.name === "Marketing");
const firstMarketingEmployee = employees.find((emp) => emp.departmentId === marketingDept.id);

console.log(firstMarketingEmployee); // { id: 3, name: 'Charlie', ... }
```

### T-032: Check if all employees earn more than 4000.

### Answer

Use the `every()` method to check if all elements pass the test.

```javascript
const allEarnMoreThan4000 = employees.every((emp) => emp.salary > 4000);
console.log(allEarnMoreThan4000); // true
```

### T-033: Find the first employee in the "Sales" department.

### Answer

Use `find()` to locate the first matching employee.

```javascript
const salesDeptId = departments.find((d) => d.name === "Sales").id;
const firstSalesEmployee = employees.find((e) => e.departmentId === salesDeptId);
console.log(firstSalesEmployee); // { id: 6, name: 'Fiona', ... }
```

### T-034: Verify if all employees belong to a department listed in the `departments` array.

### Answer

Create a `Set` of valid department IDs for an efficient O(1) lookup. Then use `every()` to check each employee.

```javascript
const validDeptIds = new Set(departments.map((dept) => dept.id));
const allEmployeesHaveValidDept = employees.every((emp) => validDeptIds.has(emp.departmentId));

console.log(allEmployeesHaveValidDept); // true
```

### T-035: Log each employee's name and department name to the console.

### Answer

Use the efficient department map from T-022 and `forEach` to iterate and log.

```javascript
const departmentMap = new Map(departments.map((dept) => [dept.id, dept.name]));

employees.forEach((emp) => {
  const deptName = departmentMap.get(emp.departmentId) || "Unknown";
  console.log(`${emp.name} works in ${deptName}`);
});
```

### T-036: Extract all employee names into a single array.

### Answer

This is the same as T-026. Use `map()`.

```javascript
const employeeNames = employees.map((emp) => emp.name);
console.log(employeeNames);
```

### T-037: Increment each employee's salary by 10%.

### Answer

Use `map()` to create a new array with the updated salaries. This is the immutable approach and is generally preferred.

```javascript
const employeesWithRaise = employees.map((emp) => ({
  ...emp, // Copy all existing employee properties
  salary: Math.round(emp.salary * 1.1), // Update the salary
}));

console.log(employeesWithRaise);
```

### T-038: Assume employees have skills. Create an array of all skills and flatten them.

### Answer

Use `flatMap()` to both map to the `skills` array of each employee and flatten the result into a single array.

```javascript
const employeesWithSkills = [
  { name: "Alice", skills: ["Excel", "Management"] },
  { name: "Bob", skills: ["JavaScript", "React", "Node.js"] },
  { name: "Charlie", skills: ["Marketing", "SEO"] },
];

const allSkills = employeesWithSkills.flatMap((emp) => emp.skills);
console.log(allSkills); // ["Excel", "Management", "JavaScript", "React", "Node.js", "Marketing", "SEO"]
```

### T-039: Find the total salary of all employees working in the "Engineering" department.

### Answer

Chain `filter()` and `reduce()` for a clean, declarative solution.

```javascript
const engineeringDeptId = departments.find((d) => d.name === "Engineering").id;

const totalEngineeringSalary = employees
  .filter((emp) => emp.departmentId === engineeringDeptId)
  .reduce((sum, emp) => sum + emp.salary, 0);

console.log(totalEngineeringSalary); // 19800
```

### T-040: Check if there is any department where all employees earn more than 5000.

### Answer

This is a multi-step problem. First, group employees by department. Then, check each group.

```javascript
const employeesByDept = Object.groupBy(employees, (emp) => emp.departmentId);

const anyDeptAllHighEarners = Object.values(employeesByDept).some((deptEmployees) =>
  deptEmployees.every((emp) => emp.salary > 5000)
);

console.log(anyDeptAllHighEarners); // true (The Sales department (ID 4) has employees with 6000 and 7200 salaries)
```

### T-041: Find the total number of unique projects across all employees.

### Answer

Use `flatMap()` to get all projects, then a `Set` to automatically handle uniqueness.

```javascript
const employeesWithProjects = [
  { id: 1, name: "Alice", projects: ["Project A", "Project B"] },
  { id: 2, name: "Bob", projects: ["Project C", "Project A"] },
  { id: 5, name: "Edward", projects: ["Project D"] },
];

const allProjects = employeesWithProjects.flatMap((emp) => emp.projects);
const uniqueProjects = new Set(allProjects);

console.log(uniqueProjects); // Set(4) { 'Project A', 'Project B', 'Project C', 'Project D' }
console.log(uniqueProjects.size); // 4
```

### T-042: For each employee, find their department name and return an array of employee names with their department names.

### Answer

This is the same as T-022. The most efficient way is to create a department lookup map first.

```javascript
const departmentMap = new Map(departments.map((dept) => [dept.id, dept.name]));

const employeeDetailsList = employees.map((emp) => {
  const deptName = departmentMap.get(emp.departmentId) || "Unknown";
  return `${emp.name} (${deptName})`;
});

console.log(employeeDetailsList);
```

### T-043: Get a list of names of employees earning more than 6000.

### Answer

Chain `filter()` to select the employees and `map()` to extract their names.

```javascript
const highEarnerNames = employees.filter((emp) => emp.salary > 6000).map((emp) => emp.name);

console.log(highEarnerNames); // ["Bob", "Edward", "Helen"]
```

### T-044: Write a `for...of` loop to print the names of all employees.

### Answer

```javascript
for (const employee of employees) {
  console.log(employee.name);
}
```

### T-045: Using a `for...of` loop, print the names of employees earning more than 5000.

### Answer

```javascript
for (const employee of employees) {
  if (employee.salary > 5000) {
    console.log(employee.name);
  }
}
```

### T-046: Modify the `for...of` loop to destructure each employee object.

### Answer

```javascript
for (const { name, salary } of employees) {
  console.log(`${name} earns ${salary}`);
}
```

### T-047: Write a `for...of` loop to match employees with departments and print the results.

### Answer

Use the efficient department map for fast lookups inside the loop.

```javascript
const departmentMap = new Map(departments.map((dept) => [dept.id, dept.name]));

for (const employee of employees) {
  const deptName = departmentMap.get(employee.departmentId) || "Unknown";
  console.log(`${employee.name} works in the ${deptName} department.`);
}
```

### T-048: Use `Array.prototype.entries()` with a `for...of` loop.

### Answer

`entries()` returns an iterator with `[index, value]` pairs. You can destructure this pair directly in the loop.

```javascript
for (const [index, employee] of employees.entries()) {
  console.log(`Index ${index}: ${employee.name}`);
}
```

---

## Array-Like Objects & Static Methods

### T-049: Access the second element of the given array-like object.

### Answer

Array-like objects can be accessed using bracket notation, just like arrays.

```javascript
const arrayLike = { 0: "First", 1: "Second", length: 2 };

console.log(arrayLike[1]); // "Second"
```

### T-050: Convert the `arguments` object into a real array using `Array.from`.

### Answer

The `arguments` object in a function is a classic array-like object. `Array.from()` is the modern way to convert it.

```javascript
function processArguments() {
  console.log(arguments); // This is an array-like object, not a real array

  // Convert to a real array
  const argsArray = Array.from(arguments);

  // Now you can use array methods like forEach
  console.log(Array.isArray(argsArray)); // true
  argsArray.forEach((arg) => console.log(arg));
}

processArguments("a", "b", 1, 2);
```

### T-051: Convert a `NodeList` into an array.

### Answer

`document.querySelectorAll` returns a `NodeList`, which is array-like. `Array.from()` is perfect for this conversion.

```javascript
// Assume you have this HTML:
// <div>Item 1</div>
// <div>Item 2</div>

const divNodeList = document.querySelectorAll("div");
const divArray = Array.from(divNodeList);

console.log(NodeList.isPrototypeOf(divNodeList)); // true
console.log(Array.isArray(divArray)); // true

divArray.map((div) => div.textContent.toUpperCase()); // Now you can use map!
```

### T-052: Merge two arrays into a single array.

### Answer

Use either the spread syntax (`...`) or the `concat()` method. The spread syntax is often preferred for its conciseness.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// Method 1: Spread Syntax
const merged1 = [...arr1, ...arr2];
console.log(merged1); // [1, 2, 3, 4]

// Method 2: concat()
const merged2 = arr1.concat(arr2);
console.log(merged2); // [1, 2, 3, 4]
```

### T-053: Create an array of n duplicate values using `Array.from`.

### Answer

`Array.from` can take a map function as its second argument, which is executed for each element in the new array.

```javascript
const n = 5;
const value = "A";

const duplicatedArray = Array.from({ length: n }, () => value);

console.log(duplicatedArray); // ["A", "A", "A", "A", "A"]
```

### T-054: Use `Array.from` to convert a string into an array of characters.

### Answer

`Array.from()` works directly on any iterable object, and strings are iterable.

```javascript
const str = "Hello";
const charArray = Array.from(str);

console.log(charArray); // ["H", "e", "l", "l", "o"]
```
