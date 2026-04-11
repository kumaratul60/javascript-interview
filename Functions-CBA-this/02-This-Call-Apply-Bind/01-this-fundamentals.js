/**
 * @file 01-this-fundamentals.js
 * @description Understanding 'this' in different execution contexts.
 */

// 1. Global Context
// console.log(this); // Browser: window | Node: {}

// 2. Inside a Method (Implicit Binding)
const user = {
  name: 'Atul',
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};
user.greet(); // 'this' is user

// 3. Standalone Function
function showThis() {
  console.log(this);
}
// showThis(); // Non-strict: global/window | Strict: undefined

// 4. Arrow Functions (Lexical this)
const food = {
  name: 'Mango',
  // Arrow function inside object literal
  badGreet: () => console.log(`I love ${this.name}`),

  // Correct way: Function returning arrow
  goodGreet() {
    const inner = () => console.log(`I love ${this.name}`);
    inner();
  },
};

food.badGreet(); // 'this' is global (undefined.name)
food.goodGreet(); // 'this' is food (Mango)

// 5. Constructor (new keyword)
function Car(model) {
  this.model = model;
  this.log = function () {
    console.log(this.model);
  };
}
const myCar = new Car('Tesla'); // 'this' is the new instance
myCar.log();
