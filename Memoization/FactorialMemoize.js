const factorial = (n) => {
  if (n == 0 || n === 1) return 1;
  return n * factorial(n - 1);
};
// const res = factorial(5);
// console.log(res);

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

const memoizeFact = memoize(factorial);
console.log(memoizeFact(10));
console.log(memoizeFact(10));
console.log(memoizeFact(50));
