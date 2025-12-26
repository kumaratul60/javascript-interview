function throttle(func, delay) {
  let isTimerSet = false; // private variable for this function, can't be changed from outside

  return function () {
    if (!isTimerSet) {
      func.call();
      setTimeout(() => (isTimerSet = false), delay);
      isTimerSet = true;
    }
  };
}

const wait = 3000;
const logger = () => console.log("abc");
const throttled = throttle(logger, wait);

console.log("test one");
throttled();
throttled();
throttled();
console.log("test two");
setTimeout(throttled, 3500);
