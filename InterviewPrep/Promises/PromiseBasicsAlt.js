let promise = new Promise(function (resolve, reject) {
  // throw new Error("calculation error"); // throw will reject promise
  reject("Reject!");
  resolve("resolve");
});

promise
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });

//////////////////////////
let myPromise = new Promise((resolve, reject) => {
  let a = 1 + 2;
  if (a == 2) resolve("Yes");
  else reject("No");
});
myPromise
  .then(function (value) {
    console.log("hat", value);
  })
  .catch((err) => {
    console.log("mm", err);
  });
