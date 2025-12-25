// Object Examples

// From Objecttest2.js
let obj = {
  name: "Saket Vatsa",
  age: "27",
  genderAss: "true",
  favColors: ["red", "green", "blue"],
  numArr: ["1", "2", "3"],
  friends: [
    { name: "saket", age: "31" },
    { name: "aman", age: "25" },
  ],
  favNum: "null",
  birth: {
    city: "patna",
    year: "1989",
  },
};

Object.entries(obj).forEach(([key, values]) => {
  console.log(key, values);
});

// From obj.js
console.log("b" + "a" + +"a" + "a");
// baNaNa

console.log(Number.MIN_VALUE > 0); // true

console.log(Math.min() > Math.max()); // true

const user = {
  name: "Ram",
  age: 24,
  todo:['Hay men', 'nice to meet you']
}
const {name,age, todo:[op,gp]} = user
console.log(name)
console.log(gp)
console.log(user.todo[0]);

// From obj_JsInteresting.js (truncated version)
console.log("b" + "a" + +"a" + "a");
// baNaNa

console.log(Number.MIN_VALUE > 0); // true

console.log(Math.min() > Math.max()); // true

// From passbyVal-Ref.js
let x = 10; // passbyVal
const y = {
  name: "abc",
  age: 100, // passbyRef
};

const z = (a, b) => {
  a = 20;
  console.log(a);
  b.age = 50; // passbyRef
};
z(x, y);
console.log(x);
console.log(y);

// From prototype.js
Array.prototype.myFilter = function (cb) {
  let newArray = [];

  for (let i = 0; i < this.length; i++) {
    if (isEven(cb(this[i]))) newArray.push(this[i]);
  }
  return newArray;
};

function isEven(x) {                                                                  
  return x % 2 === 0;
}
let arr = [1, 2, 3, 4, 16, 9, 8];

let filteredArray = arr.myFilter(isEven);
console.log(filteredArray);