/*
Promise.allSettled() accepts an array of promises, and once all promises are either resolved or rejected then it returns an array containing all the data with resolved and rejected promises in order we have passed the promises.

Key takeaways about Promise.allSettled()

1. Unlike Promise.all(), it does not short circuit if any promise got rejected. It will keep executing other promises until all of the passed promises either got rejected or resolved.

2. catch block is never get called in Promise.allSettled because all the data is returned in then block with the information of rejected and resolved promises.

*/
function asyncTask(message, delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (message === "Task 3 Done") {
        reject("Error occurred");
      } else {
        resolve(message);
      }
    }, delay);
  });
}

const task1 = asyncTask("Task 1 Done", 2000);
const task2 = asyncTask("Task 2 Done", 3000);
const task3 = asyncTask("Task 3 Done", 1000);
const task4 = asyncTask("Task 4 Done", 5000);

Promise.allSettled([task1, task2, task3, task4]).then(function (results) {
  console.log(results);
});

// console.log(results) output;
/* 
  0: Object { status: "fulfilled", value: "Task 1 Done" }
  ​
  1: Object { status: "fulfilled", value: "Task 2 Done" }
  ​
  2: Object { status: "rejected", reason: "Error occured" }
  ​
  3: Object { status: "fulfilled", value: "Task 4 Done" }
  */

/////////////////////////////

function asyncTask(message, delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Error occurred");
    }, delay);
  });
}

const task11 = asyncTask("Task 11 Done", 2000);

Promise.allSettled([task11])
  .then(function (results) {
    console.log(results);
    // above line will log
    // [{ status: "rejected", reason: "Error occurred" }]
  })
  .catch(function (error) {
    console.log(error); // It will never get called.
  });
