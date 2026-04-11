function withLog(fn) {
  return function (...arg) {
    console.log('calling fn with args', arg);
    const res = fn(...arg);
    console.log(res);
    return res;
  };
}
const add = (a, b) => a + b;
const logRes = withLog(add);
logRes(2, 3);
