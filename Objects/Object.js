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


