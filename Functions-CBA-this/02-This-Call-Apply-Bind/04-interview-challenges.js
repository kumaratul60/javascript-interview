/**
 * @file 04-interview-challenges.js
 * @description Curated 'this' and Binding puzzles.
 */

// 1. Losing Context (The Detached Method)
const user = {
  name: 'John',
  greet() {
    console.log(`Hi, ${this.name}`);
  },
};

const detachedGreet = user.greet;
detachedGreet(); // undefined (or Error in strict mode)
// Why? Because it's called as a standalone function.

// 2. Multi-Bind Challenge
function show() {
  console.log(this.name);
}
const m1 = { name: 'Alice' };
const m2 = { name: 'Bob' };

const boundOnce = show.bind(m1);
const boundTwice = boundOnce.bind(m2);
boundTwice(); // "Alice"
// Why? A function can only be bound ONCE. Subsequent binds are ignored.

// 3. Arrow Function + Explicit Binding
const arrowShow = () => console.log(this.name);
arrowShow.call({ name: 'Charlie' }); // undefined
// Why? Explicit binding cannot override lexical 'this' of an arrow function.

// 4. setTimeout Context
const timer = {
  name: 'Clock',
  start() {
    setTimeout(function () {
      console.log(this.name); // undefined
    }, 100);

    // Fix with Arrow
    setTimeout(() => {
      console.log(this.name); // "Clock"
    }, 200);
  },
};
timer.start();
