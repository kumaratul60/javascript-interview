const ap1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("rejected p1");
  }, 3000);
});

const ap2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("rejected p2");
  }, 2000);
});

const ap3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("rejected p3");
  }, 4000);
});

const ap4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("rejected p4");
  }, 5000);
});

const promiseAggregateErr = Promise.any([ap1, ap2, ap3, ap4]);
promiseAggregateErr
  .then((msg) => console.log({ msg }))
  .catch((err) => {
    console.error({ err });
    console.log(err.errors);
  });
