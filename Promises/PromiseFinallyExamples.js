/*
 Promise.prototype.finally()
👉 The finally() method returns a Promise.
👉 When a Promise is completed, either resolved or rejected,this specified callback function is executed.
👉 This helps to avoid duplicating code in both the promise's then() and catch() handlers.
👉 The finally() method will help if you're going to do any processing or cleanup work once a promise is made, regardless of the outcome.
*/

const addition = (a, b) =>
  new Promise((resolve, reject) => {
    if (typeof a == "number" && typeof b == "number") {
      resolve(a + b);
    } else {
      reject("Not a Number");
    }
  });

addition(10, 5)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Numbers are added");
  });
