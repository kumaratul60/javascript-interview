/*
Promise.all() shows fail-fast behavior, that is, Promise.all() asynchronously rejects with the value of the promise that rejected, if any of the passed-in elements are rejected.


“pending” – still waiting
“fulfilled” – promise succeeded
“rejected” – promise failed
“settled” – succeeded or failed
*/

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 300, "resolved");
}); //will be resolved after 300ms

const promise2 = 93; //non-promise

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "resolved2");
}); // will be resolved after 100ms

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////////////////
const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 1000);
});

const pro2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 2000);
});

const pro3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("rejected"), 3000);
});

Promise.all([pro1, pro2, pro3])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log(error);
  });

/////////

let promise12 = Promise.resolve("Wisdom");
let promise23 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "Geek");
});
let promise34 = Promise.reject(new Error("failed because of p3"));

Promise.all([promise12, promise23]).then(console.log); // ["Wisdom", "Geek"]

Promise.all([promise12, promise23, promise34])
  .then(console.log) // Does not get called, but errors out
  .catch((error) => {
    console.error(error.message); // failed because of p3
  });
