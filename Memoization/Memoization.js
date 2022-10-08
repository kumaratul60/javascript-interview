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
