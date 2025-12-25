// closure: Function bundled along with it's lexical scope is closure.
// *A closure is a function that has access to its outer function scope even after the function has returned. Meaning, A closure can remember and access variables and arguments reference of its outer function even after the function has returned.*

// my rough definition: A function warp/bundle within another function that has access to it's lexical scope  (or outer function scope) is a closure

// my definition of closure:
// * A closure is formed when a function is encapsulated within another function that has access to it's lexical scope (outer function scope)

/**
 * Advantages of Closure:

Module Design Pattern
Currying
Memoize
Data hiding and encapsulation
setTimeouts etc.

* Disadvantages of Closure:

Over consumption of memory
Memory Leak
Freeze browser
 */

// closure ex 1:

function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  return y;
}
var z = x();
console.log(z); // value of z is entire code of function y.

// closure ex 2

function z() {
  var b = 900;
  function x() {
    var a = 7;
    function y() {
      console.log(a, b);
    }
    y();
  }
  x();
}
z(); // 7 900

//problem

// counter1();
function counter1() {
  for (var i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

// 5,5,..
function counter2() {
  const scope = (count) => {
    for (var j = 0; j < count; j++) {
      setTimeout(() => {
        console.log(j);
      }, j * 1000);
      // setTimeout(() => console.log(j), 1000*j);
    }
  };
  scope(5);
}
// counter2();

// solution

// counterS1();
function counterS1() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
  // similar result

  // for (let i = 10; i > 0; i--) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, i * 1000);
  // }
}

function counterS2() {
  for (var i = 0; i < 5; i++) {
    (function (e) {
      setTimeout(function () {
        console.log(e);
      }, e * 1000);
    })(i);
  }
}

// counterS2();

// const res = counterS2();
// console.log(res);
// counterS2(6)

/***
const res = counterS2(); console.log(res); === counterS2();
*/

// IIFE way

// (function () {
//   for (var i = 0; i < 5; i++) {
//     (function (e) {
//       setTimeout(function () {
//         console.log(e);
//       }, e * 1000);
//     })(i);
//   }
// })();

// BOOM counter
function Boom() {
  for (let i = 10; i > 0; i--) {
    setTimeout(() => {
      console.log(i);
    }, (10 - i) * 1000);
  }
}
// Boom();

// Private counter

function createCounter(initialValue) {
  let count = initialValue;

  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter(0);
console.log(counter.getCount()); // Output: 0

counter.increment();
counter.increment();
console.log(counter.getCount()); // Output: 2

counter.decrement();
console.log(counter.getCount()); // Output: 1

///******

function counter() {
  let _counter = 0;
  // return an object with several functions that allow you
  // to modify the private _counter variable
  return {
    add: function (increment) {
      _counter += increment;
    },
    remove: (increment) => {
      _counter -= increment;
    },
    retrieve: function () {
      return "The counter is currently at: " + _counter;
    },
  };
}

// error if we try to access the private variable like below
// _counter;

// usage of our counter function
let c = counter();
c.add(5);
c.add(9);
c.remove(5);

// now we can access the private variable in the following way
console.log(c.retrieve()); // => The counter is currently at: 9
