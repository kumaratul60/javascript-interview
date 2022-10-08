let promiseA = Promise.resolve("A");
let promiseB = Promise.resolve("B");
let promiseC = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "C");
});
Promise.all([promiseA, promiseB, promiseC])
  .then(([resultA, resultB, resultC]) => {
    console.log("result for promise " + resultA);
    console.log("result for promise " + resultB);
    console.log("result for promise " + resultC);
  })
  .catch((err) => {
    console.log("Atleast one promise failed.");
  });
