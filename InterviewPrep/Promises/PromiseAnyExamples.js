/*
Promise.any() Method
👉 The Promise.any() takes an iterable Object, such as an Array of promises as an input. Once a promise is fulfilled, a single promise is returned and the promise is resolved using the value of the promise.
👉 If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError (that groups together individual errors).

*/

const SlowlyDone = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "Done slowly");
}); //resolves after 500ms

const QuicklyDone = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "Done quickly");
}); //resolves after 100ms

const Rejection = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "Rejected"); //always rejected
});

Promise.any([SlowlyDone, QuicklyDone, Rejection])
  .then((value) => {
    console.log(value);
    //  QuicklyDone fulfils first
  })
  .catch((err) => {
    console.log(err);
  });

/*
  Rejection of Promise.any()
🔹 Promise.any() rejects with an AggregateError if no promise fulfils.
🔹 The AggregateError object represents an error when several errors need to be wrapped in a single error. It is thrown when multiple errors need to be reported by an operation.

=> Promise.any() was supported in node.js 15.0.0. If your node.js version is older than that, the console might show a TypeError: Promise.any is not a function message, so you need to update it and try again.
  */
const Rejection1 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "Rejected"); //always rejected
});

Promise.any([Rejection1]).catch((err) => {
  console.log(err);
});

// expected output: "AggregateError: No Promise in Promise.any was resolved

////////////////////////////////////////////////////////////////

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("p3 failed")), 100);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("p3 failed")), 300);
});
let promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "p3 succeeded");
});

Promise.any([promise1, promise2, promise3]).then(console.log); // p3 succeeded
