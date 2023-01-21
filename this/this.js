// what is this keyword in js?

/*
 The keyword "this" in JavaScript refers to the object that the function or method is a property of. 
 The value of "this" depends on how the function or method is called.
 In the global scope, "this" refers to the global object (e.g. window in a browser). 
 In an object method, "this" refers to the object that the method belongs to. 
 In a constructor function, "this" refers to the newly created object. 
 The value of "this" can also be set explicitly using the call, bind or apply methods.


difination


*/


const person = {
  name: "javascript",
  sayName: function () {
    console.log(this.name);
    // console.log(global.name);
  },
  //   sayName: () => {
  //     console.log(this.name);
  //   },
};
person.sayName(); // javascript
// sayName with arrow function give undefine

const localName = person.sayName;
localName(); // undefined

const sayName = person.sayName.bind(person);
sayName(); // javascript

// this is used with only function keyword not arrow function
