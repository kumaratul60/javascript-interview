const fib = (n) => {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
};
const memo = (fn) => {
  let cache = {};
  return function (arg) {
    if (cache[arg]) {
      console.log("cache");
      return cache[arg];
    } else {
      console.log("calculate");
      cache[arg] = fn(arg);
      return cache[arg];
    }
  };
};
const res = memo(fib);
console.log(res(110));
console.log(res(110));
