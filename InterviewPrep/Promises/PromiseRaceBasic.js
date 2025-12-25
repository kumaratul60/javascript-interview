let promiseA = new Promise(function (resolve, reject) {
  setTimeout(resolve, 400, "A");
});
let promiseB = new Promise(function (resolve, reject) {
  setTimeout(resolve, 300, "B");
});
Promise.race([promiseA, promiseB])
  .then((value) => console.log("Promise " + value + " is resolved"))
  .catch((err) => console.log("Promise " + err + " is rejected"));
