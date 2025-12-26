/* Memoization is a technique where it will return the value if the same input come,
so instead of running the function again it will  from the Cache. */

// function fib(n) {
//   if (n <= 2) {
//     return 1;
//   }
//   return fib(n - 1) + fib(n - 2);
// }
// console.log(fib(41));

function fib(n, prevValues = []) {
  if (prevValues[n] != null) return prevValues[n];

  let result;
  if (n <= 2) {
    result = 1;
  } else {
    result = fib(n - 1, prevValues) + fib(n - 2, prevValues);
  }

  prevValues[n] = result;
  return result;
}
console.log(fib(401));


///

const fib = (n, memo) => {
  memo = memo || {};

  if (memo[n]) return memo[n];

  if (n <= 1) return 1;
  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
};
const res = fib(15);
console.log(res);

const fib2 = (n) => {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
};
const memo = (fn) => {
  let cache = {};
  return function (arg) {
    if (cache[arg]) {
      console.log('cache');
      return cache[arg];
    } else {
      console.log('calculate');
      cache[arg] = fn(arg);
      return cache[arg];
    }
  };
};
const res2 = memo(fib);
console.log(res2(110));
console.log(res2(110));
