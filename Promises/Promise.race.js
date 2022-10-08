/*
Promise.race() Method
👉 The Promise.race() method returns a Promise that is resolved or rejected, as soon as one of the promises in an iterable, such as an array, fulfills or rejects, with the value or reason from that Promise.
👉 The promise returned will be forever pending, if the iterable passed is empty.
👉 Promise.race() will resolve to the first value found in the iterable, if the iterable contains one or more non-promise value or an already settled promise.
*/

const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 200);
});

const pro2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 100);
});

Promise.race([pro1, pro2])
  .then((response) => {
    console.log(response); //output: two
  })
  .catch((err) => {
    console.log(err);
  });

const pro3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("rejected"), 300);
});

const pro4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 400);
});

Promise.race([pro3, pro4])
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
/////////////////////////////////

const pro5 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 200);
});

const pro6 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 100);
});

const pro7 = new Promise((resolve, reject) => {
  setTimeout(() => reject("rejected"), 300);
});

const pro8 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 400);
});

Promise.race([pro5, pro6, pro7, pro8])
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
