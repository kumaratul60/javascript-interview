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

///---------------------------

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

// const counter = createCounter(0);
// console.log(counter.getCount()); // Output: 0

// counter.increment();
// counter.increment();
// console.log(counter.getCount()); // Output: 2

// counter.decrement();
// console.log(counter.getCount()); // Output: 1
