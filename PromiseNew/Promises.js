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
