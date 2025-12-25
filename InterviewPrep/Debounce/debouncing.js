/*
Debouncing => Debouncing is a performance optimization technique. It limits the rate of execution of a function (API call) 
and wait for a certain amount of time before running it again.

*/

const debounce = (fn, delay) => {
  let timer;
  return function () {
    if (timer) clearTimeout();
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

const check = () => console.log("checking...");

const myDebounce = debounce(check, 1000);
console.log("running1");
myDebounce();
console.log("running2");
