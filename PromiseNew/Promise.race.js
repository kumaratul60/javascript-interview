/*
It means race among tasks, whichever promise got resolved or rejected first, Promise.race() will stop execution and will simply return the data of resolved or rejected promise.

Like Promise.all() and Promise.allSettled() it also accepts an array or promises.
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

const task11 = asyncTask("Task 1 Done", 2000);
const task21 = asyncTask("Task 2 Done", 1000);
const task31 = asyncTask("Task 3 Done", 2000);
const task41 = asyncTask("Task 4 Done", 5000);

Promise.race([task11, task21, task31, task41]).then(function (result) {
  console.log(result); // Task 2 Done will be logged in the console
  // Here Task2 has shortest time, so it will win the race.
  // Here result will not be an array.
  // result will be the data returned by resolve method
});

// What if a rejected promise wins the race?

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
const task2 = asyncTask("Task 2 Done", 1000);
const task3 = asyncTask("Task 3 Done", 200); // Shortest time 200ms
const task4 = asyncTask("Task 4 Done", 5000);

Promise.race([task1, task2, task3, task4])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (error) {
    console.log(error); // Task 3 has shortest time, and it wins the race.
    // Error occurred will be logged in the console.
  });
