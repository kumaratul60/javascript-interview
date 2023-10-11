/**
what is callback function, call back helll in vanilla javascript, how to avoid this with example?

 A callback function in JavaScript is a function passed as an argument to another function and is executed after the completion of that function.
It's a way to handle asynchronous operations, ensuring that the next step in a program is executed only after the previous step has completed.


** Callback hell is a term used to describe a situation where you have a lot of nested callback functions, often seen in complex asynchronous code. It can make the code hard to read, understand, and maintain.

*/

// Here's an example of callback hell in vanilla JavaScript: this callback hell is also know as Pyramid of DOOM

asyncOperation1(function (result1) {
  asyncOperation2(result1, function (result2) {
    asyncOperation3(result2, function (result3) {
      // ...
    });
  });
});

// To avoid callback hell, you can use techniques like Promises, async/await, or modularization. Here's an example using Promises:

function asyncOperation1() {
  return new Promise((resolve) => {
    // Asynchronous operation
    setTimeout(() => {
      console.log("Async operation 1 completed");
      resolve("Result from operation 1");
    }, 1000);
  });
}

function asyncOperation2(result) {
  return new Promise((resolve) => {
    // Asynchronous operation
    setTimeout(() => {
      console.log("Async operation 2 completed");
      resolve("Result from operation 2");
    }, 1000);
  });
}

function asyncOperation3(result) {
  return new Promise((resolve) => {
    // Asynchronous operation
    setTimeout(() => {
      console.log("Async operation 3 completed");
      resolve("Result from operation 3");
    }, 1000);
  });
}

async function doAsyncOperations() {
  try {
    const result1 = await asyncOperation1();
    const result2 = await asyncOperation2(result1);
    const result3 = await asyncOperation3(result2);
    console.log("Final result:", result3);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// doAsyncOperations();
/* OP:

 Async operation 1 completed
Async operation 1 completed
Async operation 2 completed
Async operation 3 completed
Final result: Result from operation 3
*/

// handle error without writing .catch() using .then()

function asyncOperationCatch() {
  return new Promise((resolve, reject) => {
    // Simulate an error
    const success = false;

    if (success) {
      resolve("Operation completed successfully");
    } else {
      reject(new Error("Operation failed"));
    }
  });
}

// asyncOperationCatch().then(
//   (result) => {
//     console.log("Success:", result);
//   },
//   (error) => {
//     console.error("Error1:", error.message);
//   }
// );

function asyncOperation() {
  return new Promise((resolve, reject) => {
    // Simulate an error
    const success = true;

    if (success) {
      resolve("Operation completed successfully");
    } else {
      reject(new Error("Operation failed"));
    }
  });
}

asyncOperation()
  .then((result) => {
    console.log("Success:", result);
    return result; // Pass the result to the next .then()
  })
  .then(
    (result) => {
      console.log("Continuing with the result:", result);
    },
    (error) => {
      console.error("Error:", error.message);
    }
  );

/**
OP:
Success: Operation completed successfully
Continuing with the result: Operation completed successfully
*/
