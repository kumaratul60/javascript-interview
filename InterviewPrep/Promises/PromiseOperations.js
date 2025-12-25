let promise = new Promise(function (resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

// promise.then(alert); // 1

////////////////////////////////////////////////////////////////
function delay(ms) {
  ///your code
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log("runs after 3 seconds"));
