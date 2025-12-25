// ✅ Polyfill for Promise.all()
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("myPromiseAll requires an array"));
    }

    let results = new Array(promises.length);
    let completed = 0;
    let total = promises.length;

    if (total === 0) return resolve([]);

    for (let i = 0; i < total; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = value;
          completed++;
          if (completed === total) resolve(results);
        })
        .catch(reject);
    }
  });
}

// ✅ Polyfill for Promise.race()
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("myPromiseRace requires an array"));
    }

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject);
    }
  });
}

// ✅ Polyfill for Promise.allSettled()
function myPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    if (!Array.isArray(promises)) {
      return resolve([]);
    }

    let results = new Array(promises.length);
    let completed = 0;
    let total = promises.length;

    if (total === 0) return resolve([]);

    for (let i = 0; i < total; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === total) resolve(results);
        });
    }
  });
}

// ✅ Polyfill for Promise.any()
function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("myPromiseAny requires an array"));
    }

    let errors = new Array(promises.length);
    let rejectedCount = 0;
    let total = promises.length;

    if (total === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    for (let i = 0; i < total; i++) {
      Promise.resolve(promises[i])
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          rejectedCount++;
          if (rejectedCount === total) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    }
  });
}



const p1All = Promise.resolve(1);
const p2All = new Promise((res) => setTimeout(() => res(2), 1000));
const p3All = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3] after 1 second


const p1Race = new Promise((res) => setTimeout(() => res("Fast"), 500));
const p2Race = new Promise((res) => setTimeout(() => res("Slow"), 1000));

myPromiseRace([p1, p2]).then(console.log); // "Fast" after 500ms


const p1AllSettled = Promise.resolve("Success");
const p2AllSettled = Promise.reject("Error");

myPromiseAllSettled([p1, p2]).then(console.log);
/* Output:
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Error" }
]
*/


const p1 = Promise.reject("Fail 1");
const p2 = Promise.resolve("Success");
const p3 = Promise.reject("Fail 2");

myPromiseAny([p1, p2, p3]).then(console.log); // "Success"

