const myCache = (fn) => {
  const cache = {};
  return function (arg) {
    if (cache[arg]) {
      console.log("cache");
      return cache[arg];
    } else {
      console.log("calculating");
      cache[arg] = fn(arg);
      return cache[arg];
    }
  };
};

const fib = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};
const res = myCache(fib);
console.log(res(5));
console.log(res(5));
