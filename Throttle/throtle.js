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

function throttle1(fn, delay = 500) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const wait = 3000;
const logger = () => console.log('abc');
const throttled = throttle(logger, wait);

console.log('test one');
throttled();
throttled();
throttled();
console.log('test two');
setTimeout(throttled, 3500);
