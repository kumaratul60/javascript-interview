/**
forEach is commonly used with arrays for its simplicity, but it's not directly suited for iterating over object properties.

for...of is designed for arrays, and it's not typically used to iterate over object properties.

for...in is suitable for iterating over object properties, but it's not recommended for arrays due to potential issues with iterating over prototype properties.

The recommended approach is to use forEach for arrays and for...in for objects when you need to iterate over properties.

 */

const check = ["ram", "kio", "pii", "kjio", "lpo", "lpo"];
const obj = [
  {
    name: "Atul",
    age: 25,
    iSGood: false,
    "is total fine": true,
  },
  {
    name: "ram",
    age: 26,
    iSGood: false,
    "is total fine": true,
  },
  {
    name: "Bhaj",
    age: 27,
    iSGood: false,
    "is total fine": true,
  },
];

// three argument offer by forEach: item, index, fullArr

check.forEach((item, index, fullArr) => {
  console.log({ item, index, fullArr });
});

const print = (p) => console.log({ name: p });
check.forEach(print);

obj.forEach((item, key) => {
  console.log(item.name, key);
});

const person = { name: "John", age: 30, city: "New York" };

for (const key in person) {
  console.log(key, person[key]);
}

const fruits = ["apple", "banana", "orange"];

// Not recommended for arrays, as it iterates over indices (not values)
for (const index in fruits) {
  console.log(fruits[index]);
}

const personObj = { name: "John", age: 30, city: "New York" };

// Not recommended for objects, as it iterates over values (not key-value pairs)
for (const value of Object.values(personObj)) {
  console.log({ value });
}

const colors = ["red", "green", "blue"];

for (const color of colors) {
  console.log({ color }); // print value
}

for (const colorIn in colors) {
  console.log({ colorIn }); // print indexes
}
const personEach = { name: "John", age: 30, city: "New York" };

Object.values(personEach).forEach((value) => {
  console.log({ value });
});

const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log({ num });
});
