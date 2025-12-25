//  Objects are collections of various data & more complex entities that consist of key-value pairs.

//1. To create object
let obj = new Object();
console.log(obj);
let newObj = {};
console.log(newObj);

//2. Object property key will be automatically converted into strings

let user = {
  name: "atul",
  age: 20,
  neme2: 5,
};

//3. How to access the object properties
console.log(user.name); // object.keyname(property key) = property valuename(object value)

//4. add property
user.isAdmin = true;
user.isHomo = true;
console.log(user);

// 5. delete property
delete user.isHomo;
delete user.neme2;
console.log(user);

// 6. We can use multi word property name

let newUser = {
  name: "abc",
  "likes code": "56",
  2: "at",
};
console.log("Multi world prop accessing", newUser["likes code"]);
console.log(newUser[2]);

//  if you've valid property name then go with dot notation
//  if you've some spaces, special char or property start with a digit/number it is good to go with square backet notation

////////////////////////////
// 7. property name limitation:
// let return = 10  // give an error, you can't you return as variable name because return is a reserve keyword in JS

// 8. but come in object there is no such a restrictions:

let multiUser = {
  let: "ak",
  var: "cb",
  const: "jk",
  return: "ml",
  function: "kl",
  console: "jni",
  log: "my",
};

// 9. in operator
// if you want find out any of object property  present or not then this in operator help us
// syntex: "key" in object  ; whare key is a property name

console.log("log" in multiUser); // true
console.log("kl" in multiUser); // false

///////////////////////////////
//10. To walk over or iterate all keys in an object we've a special loop for...in loop

for (let idx in multiUser) {
  console.log(idx); // keys or Object property name
  console.log(multiUser[idx]); // Values  or Object property values
}

// 11. Objects are pass by references

function animal(d) {
  d.size = "large";
}
let dog = {
  name: "hutch",
  color: "white",
};

console.log(dog);
animal(dog);
console.log(dog);

// 12. optional chaining (?.)
// Non existing property problem

let userNew = {
  address: {
    street: "shankar",
    state: "up",
  },
};

// if we have a nested objects
console.log(userNew);
console.log(userNew.address);
console.log(userNew.address.street);
console.log(userNew?.address?.state);

// 13.
var person = Object.create({
  name: "pkg",
  height: "5.3",
  age: 20,
});
delete person.height;
console.log(person.height);
// Output: 5.3, because height property on the prototype of the person  object not on itself. so deleteion doesn't do anything

// so how to delete
delete Object.getPrototypeOf(person).height;
delete person.__proto__.age;
console.log(person.age);
console.log(person.height);

// 14. JavaScript technique to count by the properties of an array of objects
console.log(
  "////JavaScript technique to count by the properties of an array of objects////////"
);
const countBy = (arr, prop) =>
  arr.reduce(
    (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
    {}
  );
console.log(countBy);
countBy(
  [
    { branch: "audi", model: "q8", year: "2021" },
    { branch: "audi", model: "rs7", year: "2020" },
    { branch: "ford", model: "mustang", year: "2019" },
    { branch: "ford", model: "explorer", year: "2020" },
    { branch: "bmw", model: "x7", year: "2020" },
  ],
  "branch"
);

// 15.  mutable variable/object
let user15 = { name: "Viruska vamika" };
const userList = [user15];
user15 = null;
console.log(userList); //[ { name: 'Viruska vamika' } ]

/* why-> We are declaring mutable variable "user15" which has a property called name whose value is 'Virat Kohli'
Now, we are declaring a non-reassigning list "userList" and taking the user as an element.
Let me give you some more information on const keyword:
By using const keyword we cannot reassign a constant value nor constant array nor constant object but we can change the constant array's elements and constant object's properties.

Now we are reassigning the value of user but we cannot change/reassign the constant value in the list "userList".

OR

user15 and userList holds the same reference value.
So, we did reassigned the user variable but still userList points to the same reference. Hence, array with user object is the answer.

*/

// Bad way

const snowbit1 = {
  age: 15,
  test: "abc",
};
delete snowbit1.test;

console.log(snowbit1); // {age: 15}
// Good way
const snowbit = {
  age: 15,
  test: "abc",
};

const { test, ...newSnowbit } = snowbit;

console.log(newSnowbit); //  {age: 15}




/*
V8 Engine — Developed by Google for Google Chrome and Chromium-based browsers.
Rhino — Managed by Mozilla Foundation.
SpiderMonkey — The first Javascript Engine written by the founder of Javascript, Brendon Eich.
*/

// Guess Output 1

var a = { name: "ak" };
var b = { name: "ak" };
console.log(a === b);
console.log(a == b);

// bcoz When comparing two objects, JavaScript compares internal references which are equal only when both operands refer to the same object in memory, keys, and values are not checked, so the content of the object doesn’t matter

// Guess Output 2

var a = 1;
var b = "1";
console.log(a === b);
console.log(a == b);

// bcoz In “===” it with compare datatype also, of LHS & RHS and whereas “==” only compare values of LHS and RHS


/*
Dot notation is always preferred . If you are using smart IDE then it will show as undefined or it will throw error for invalid properties of objects. Use Bracket notation only when property name starts with number or includes any special characters or property name is unknown till runtime.
*/

const obj1 = {
    123: 'digit',
    firstName: 'John'
    }
//   console.log(obj.123);       // Syntax Error ❌
  console.log(obj1['123']);    // 'digit' ✅


  const obj2 = {
    'Rocket 🚀': 'launch',
    }
//   console.log(obj.Rocket 🚀);        // Syntax Error ❌
  console.log(obj2['Rocket 🚀']);     //'launch' ✅



  const User = {
    firstName: 'Sham',
    lastName: 'Gurav',
    age: 25,
    role: 'Frontend Developer'
    }

  var userInput = 'firstName';
  console.log(User.userInput);       // undefined ❌
console.log(User[userInput]);      // 'Sham' ✅


// 1. two key with same name, it this case other key which is added latter is going to consider at print time -> LIFO type

const objKey = {
  a: "one",
  b: "two",
  b: "three",
  a: "four",
};
console.log(objKey);

// 2. create a function multiplyByTwo(obj) that multiply all numeric property values of num by 2

const num = {
  a: 100,
  b: 200,
  title: "my num",
};

multiplyByTwo(num);

function multiplyByTwo(num) {
  for (let objKey in num) {
    if (typeof num[objKey] == "number") {
      num[objKey] *= 2;
    }
  }
}
console.log(num);

// //////////////////////////////////////////////////////////////////

const p = {};
const q = { key: "q" };
const r = { key: "r" };

p[q] = 123;
p[r] = 456;

console.log(p[q]); //456

// because p[q] have not any key it have string -> '[object Object]' , so last assigned key will be overwritten
// p['[object Object]']=123
// q['[object Object]'] = 456

console.log(p); //456

