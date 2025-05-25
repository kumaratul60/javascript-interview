// closure: Function bundled along with it's lexical scope is closure.

/**
 ** A closure is formed when a function is encapsulated/wrap within another function that has access to it's lexical scope (outer function scope)

 ** Advantages of Closure:

Module Design Pattern
Currying
Memoize
Data hiding and encapsulation
setTimeouts etc.

** Disadvantages of Closure:

Over consumption of memory
Memory Leak
Freeze browser
 */

function createCounter() {
  let _count = 0;

  function increment() {
    _count++;
    console.log(_count, "::+count");
  }

  function decrement() {
    _count--;
    console.log(_count, "::-count");
  }

  return {
    incrementCounter: function () {
      increment();
    },
    decrementCounter: function () {
      decrement();
    },
    getCount: function () {
      return _count;
    },
  };
}

const counter = createCounter();
console.log(counter.incrementCounter()); //1
console.log(counter.incrementCounter()); //2
console.log(counter.decrementCounter()); //1
console.log(counter.incrementCounter()); //2
console.log(counter.getCount()); //2
