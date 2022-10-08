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
