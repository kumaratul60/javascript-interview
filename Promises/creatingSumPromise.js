const promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    // const sum = 4 + 5 + "l";
    // if (isNaN(sum)) {
    //   reject("Error while calculating sum.");
    // } else {
    //   resolve(sum);
    // }
    const sum = 42 + 5;

    resolve({
      a: 4,
      b: 5,
      sum,
    });
  }, 1000);
});

promise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });
