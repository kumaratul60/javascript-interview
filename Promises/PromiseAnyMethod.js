/* 
This is somewhat similar to Promise.race . Here also race is happening.
But with good runners only, if any runner fall down during the race, the race won’t stop unlike Promise.all . The race will continue to happen until one of the runner reaches the finish line.

The only difference with Promise.all()is that if any promise got rejected, instead of directly short circuiting, Promise.any()waits for all other promise to get resolved.

Like all other, it also accepts an array of promises.


Key takeaways about Promise.any()

1. Whatever we pass in reject message, won’t be available in catch block.

2. If all promise got rejected, it will throw a predefined error
AggregateError: All promises were rejected

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
const task2 = asyncTask("Task 2 Done", 1000);
const task3 = asyncTask("Task 3 Done", 200); // Winner Tasks, but it's being rejected
const task4 = asyncTask("Task 4 Done", 5000);

Promise.any([task1, task2, task3, task4]).then(function (results) {
  console.log(results); // Task 2 Done will be logged in the console.
  // Task 2 will win the race, because runner (Task3)
});

//What if every runner (task) falls down during the race i.e. got rejected?

//catch block is called, with a predefined error message.

function asyncTask(message, delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Error occured"); // Passed error message won't be available in catch block.
    }, delay);
  });
}

const task11 = asyncTask("Task 1 Done", 2000);
const task21 = asyncTask("Task 2 Done", 1000);
const task31 = asyncTask("Task 3 Done", 200);
const task41 = asyncTask("Task 4 Done", 5000);

Promise.any([task11, task21, task31, task41])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (error) {
    console.log("error", error);
    // error: AggregateError: All promises were rejected
  });
