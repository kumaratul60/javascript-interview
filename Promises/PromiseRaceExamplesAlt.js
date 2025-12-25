let promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("p3 failed")), 100);
});

Promise.race([promise1, promise2]).then(console.log);
// Both resolve, but promise2 is faster
// so output is "two"
Promise.race([promise1, promise2, promise3])
  .then(console.log) // not called since promise3 rejects faster
  .catch((error) => console.log(error.message)); // p3 failed

//Promise.race can be used to create a pseudo version of a cancellable promise that times out after a certain time period.

let timeout = (timeoutLimit) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(), timeoutLimit);
  });
let promise12 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});
Promise.race([promise12, timeout(100)]).catch(() =>
  console.log("request timed out")
);

Promise.race([promise12, timeout(1000)]).then(() =>
  console.log("did not time out")
);
