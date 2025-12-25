// a simple pure function to get a value adding 10
const add = (n) => n + 10;
console.log("Simple call", add(3));

function fib(n) {
  if (n <= 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(41));

////////////////////////////////////////////////////
// a simple memoize function that takes in a function
// and returns a memoized function
const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0]; // just taking one argument here
    if (n in cache) {
      console.log("Fetching from cache");
      return cache[n];
    } else {
      console.log("Calculating result");
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};
///////////////////////////////////////////////////////////////////
// creating a memoized function for the 'add' pure function
const memoizedAdd = memoize(add);
console.log(memoizedAdd(321)); // calculated
console.log(memoizedAdd(382)); // cached
