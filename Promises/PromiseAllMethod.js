/*
Promise.all() accepts an array of promises, and once all promises are resolved it returns an array containing all the data resolved by passed promises in order we have passed the promises.

Key takeaways about Promise.all()

1.Time take to finish all promises is equal to the largest time consuming promise.
In above passed tasks, task4 is taking most the time, hence total time taken by the Promise.all() is 5000 ms .

2.If any promise in the passed list got rejected then the catch block is directly called, not matter if all other Promises got resolved or not.

*/

function asyncTask(message, delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(message);
    }, delay);
  });
}

const task1 = asyncTask("Task 1 Done", 2000);
const task2 = asyncTask("Task 2 Done", 3000);
const task3 = asyncTask("Task 3 Done", 1000);
const task4 = asyncTask("Task 4 Done", 5000);

Promise.all([task1, task2, task3, task4]).then(function (results) {
  console.log(results);
});

// results will contain:
Array(4)[("Task 1 Done", "Task 2 Done", "Task 3 Done", "Task 4 Done")];

//////////////////////////

function asyncTask(message, delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (message === "Task 3 Done") {
        // Rejecting third task
        reject("Error occured");
      } else {
        resolve(message);
      }
    }, delay);
  });
}

const task11 = asyncTask("Task 1 Done", 2000);
const task22 = asyncTask("Task 2 Done", 3000);
const task33 = asyncTask("Task 3 Done", 1000);
const task44 = asyncTask("Task 4 Done", 5000);

Promise.all([task11, task22, task33, task44])
  .then(function (results) {
    // this will never be called
    console.log(results);
  })
  .catch(function (error) {
    console.log(error);
  });

// In the console Error occurred will be printed.
