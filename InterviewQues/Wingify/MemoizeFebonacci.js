function fibo(n) {
  if (n <= 2) {
    return 1;
  }
  return fibo(n - 1) + fibo(n - 2);
}
console.log(fibo(41));

const fib = (n, memo) => {
  memo = memo || {};

  if (memo[n]) return memo[n];

  if (n <= 1) return 1;
  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
};
const res = fib(15);
console.log(res);

function fibMemo(n, prevValues = []) {
  if (prevValues[n] != null) return prevValues[n];

  let result;
  if (n <= 2) {
    result = 1;
  } else {
    result = fibMemo(n - 1, prevValues) + fibMemo(n - 2, prevValues);
  }

  prevValues[n] = result;
  return result;
}
console.log(fibMemo(401));
