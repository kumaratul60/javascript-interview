// Promise Examples

// Basic Promise Usage
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise
  .then(
    (result) => console.log(result), // shows "done!" after 1 second
    (error) => console.log(error) // doesn't run
  )
  .finally(() => console.log("Promise ready")); // triggers first;

let promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise1.then(
  (result) => console.log(result), // doesn't run
  (error) => console.log(error) // shows "Error: Whoops!" after 1 second
);

/*
  let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(console.log(result);

let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(console.log(result);

  */

// Promise Methods Overview
/*
[*] all(iterable)  ====>	Waits for all promises to be resolved or any one to be rejected
[*] allSettled(iterable)  ====>	Waits until all promises are either resolved or rejected
[*] any(iterable)  ====>	Returns the promise value as soon as any one of the promises is fulfilled
[*] race(iterable)  ====>	Wait until any of the promises is resolved or rejected
[*] reject(reason)  ====>	Returns a new Promise object that is rejected for the given reason
[*] resolve(value)  ====>	Returns a new Promise object that is resolved with the given value
[*] catch()  ====>	Appends the rejection handler callback
[*] then()	  ====>Appends the resolved handler callback
[*] finally()  ====>	Appends a handler to the promise
*/

// Can you Guess what will be printed in the console in case we have empty
// array passed inside all 4 variants of Promises?

Promise.all([])
  .then(function (data) {
    console.log("then block all", data);
  })
  .catch(function () {
    console.log("then block allSettled");
  }); // then block all []

Promise.allSettled([])
  .then(function (data) {
    console.log("then block allSettled", data);
  })
  .catch(function (error) {
    console.log("then block allSettled");
  }); // then block allSettled []

Promise.any([])
  .then(function () {
    console.log("then block any");
  })
  .catch(function (error) {
    console.log("catch block any", error);
  }); // catch block any [AggregateError: All promises were rejected]

Promise.race([])
  .then(function () {
    console.log("then block race");
  })
  .catch(function (error) {
    console.log("catch block race");
  }); // pending