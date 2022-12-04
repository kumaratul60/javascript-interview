/**
The call(), apply() and bind() methods are used for function borrowing in JavaScript. It means that by using them, we can use the methods of one object on a different object without having to make a copy of that method and maintain it in two separate places.
 */

/*
1. call(object, arguments) - invokes the function on passed object along with passed arguments if there
2. apply(object, [arguments]) - invokes the function on passed object along with passed array of arguments if there
3. bind(object, arguments) - returns a new function with referencing passed object and arguments

*/

// Polyfill for call()

/* The prototype function will take two arguments similar to the call function, obj (which can be referred using the this keyword inside the function) and the other arguments (args), that we will be getting in the args variable.*/

//  fnRef -> target function of object or borrowed function of object for execution
Function.prototype.customCall = function (obj, ...args) {
  obj.fnRef = this;
  obj.fnRef(...args);
  console.log(obj);
};

//  Polyfill for apply()

/* the polyfill for call and be converted into the polyfill for apply. All we need to do is to accept the second argument as an array.*/

Function.prototype.customApply = function (obj, args) {
  obj.fnRef = this;
  obj.fnRef(...args);
};

// Polyfill for bind()

/* The bind function actually returns another function, which means we need to use a closure to create our own customBind function.*/

Function.prototype.customBind = function (obj) {
  obj.fnRef = this;
  return function (...args) {
    obj.fnRef(...args);
  };
};

function printName(city, country) {
  console.log(`${this.firstName} ${this.lastName}, ${city} - ${country}`);
}

const myName = {
  firstName: "Atul",
  lastName: "Kumar",
};

printName.customCall(myName, "Bahraich", "India");
printName.customApply(myName, ["Bahraich", "India"]);
const result = printName.customBind(myName);
result("India", "Mumbai");
