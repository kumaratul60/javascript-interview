/*
Use the spread (...) syntax
Use the Object.assign() method
Use the JSON.stringify() and JSON.parse() methods

Both spread (...) and Object.assign() perform a shallow copy while the JSON methods carry a deep copy.

*/

const person = {
  firstName: "John",
  lastName: "Doe",
};

// using spread ...
let p1 = {
  ...person,
};
console.log(p1);
// using  Object.assign() method
let p2 = Object.assign({}, person);

console.log(p2);
// using JSON
let p3 = JSON.parse(JSON.stringify(person));
console.log(p3);
