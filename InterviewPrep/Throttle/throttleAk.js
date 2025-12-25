const loggerFunc = () => {
  console.count("Throttled Function");
};

const throttle = (func, limit) => {
  let flag = true;
  return function () {
    // let context = this;
    // let args = arguments;
    if (flag) {
      // func.apply(context, args);
      func();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

/*
Why we use closure here -> because we don't reinitialize flag again-2 on each function call
*/

const betterLoggerFunction = throttle(loggerFunc, 1000);

console.log("test one");
betterLoggerFunction();
betterLoggerFunction();
betterLoggerFunction();
console.log("test two");
setTimeout(betterLoggerFunction, 3500);

// window.addEventListener("resize", betterLoggerFunction);

// // This is the normal Function without Throttling
// //Check the console for the difference between the calls of Normal Function and the Throttled Function
// const normalFunc = () => {
//   console.count("Normal Function");
// };

// window.addEventListener("resize", normalFunc);

/**
 Let's take an example again. Suppose, on every window resize event - we call an expensive function. Now, we want it such that the expensive function will only be executed once in the given time interval. This is what throttling is.



const expensive = () => {
  console.log('expensive')
}

const throttle = (fn, limit) => {
  let context = this
  let flag = true
  return function () {
    if (flag) {
      fn.apply(context, arguments)
      flag = false
    setTimeout(() => {
      flag = true
    }, limit)
       }
  }
}
const func = throttle(expensive, 2000)
window.addEventListener('resize', func)
 */
