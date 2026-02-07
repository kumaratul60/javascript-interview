/*
Callback Functions:
A callback function in JavaScript is a function passed as an argument to another function, which is then executed inside the outer function at a later point in time. This execution can be synchronous or asynchronous. Callbacks are a fundamental concept for handling asynchronous operations in JavaScript, giving us control over when certain code runs.
*/

// --- 1. Synchronous Callback Example ---
// The callback `logResult` is executed immediately and synchronously by `processArray`.
console.log('--- Synchronous Callback ---');
function processArray(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

function multiplyByTwo(num) {
  return num * 2;
}

const numbers = [1, 2, 3];
const multipliedNumbers = processArray(numbers, multiplyByTwo);
console.log('Synchronous result:', multipliedNumbers); // Output: Synchronous result: [2, 4, 6]

// --- 2. Asynchronous Callback Example ---
// The callback `onSuccess` is executed after a delay, demonstrating asynchronous behavior.
console.log('\n--- Asynchronous Callback ---');
function fetchData(url, onSuccess, onError) {
  console.log(`Fetching data from ${url}...`);
  setTimeout(() => {
    const data = { id: 1, name: 'Sample Data' };
    const error = false; // Simulate API error

    if (!error) {
      onSuccess(data);
    } else {
      onError('Failed to fetch data.');
    }
  }, 1000);
}

function handleSuccess(data) {
  console.log('Data received:', data);
}

function handleError(errorMsg) {
  console.error('Error:', errorMsg);
}

fetchData('https://api.example.com/items/1', handleSuccess, handleError);
console.log('Request sent. Waiting for response...'); // This logs before "Data received"

// --- 3. The Problem: Callback Hell (Pyramid of Doom) ---
// This illustrates how deeply nested callbacks can make code hard to read and maintain.
console.log('\n--- Callback Hell Example ---');
function step1(data, callback) {
  console.log('Step 1 processing...');
  setTimeout(() => callback(data + ' -> Step 1'), 500);
}

function step2(data, callback) {
  console.log('Step 2 processing...');
  setTimeout(() => callback(data + ' -> Step 2'), 500);
}

function step3(data, callback) {
  console.log('Step 3 processing...');
  setTimeout(() => callback(data + ' -> Step 3'), 500);
}

// Example of Callback Hell:
// This forms a "pyramid" structure, making control flow difficult to follow.
step1('Initial Data', function (result1) {
  step2(result1, function (result2) {
    step3(result2, function (result3) {
      console.log('Final result from Callback Hell:', result3);
    });
  });
});

// --- 4. Interview Questions ---

/*
Q1: What is a callback function in JavaScript, and why are they used?
*/
// Answer:
// A callback function is a function passed as an argument to another function, which is then executed inside the outer function at a later point. They are primarily used to handle asynchronous operations, ensuring that code runs only after a previous, time-consuming operation (like fetching data, timers) has completed, preventing blocking of the main thread.

/*
Q2: What is "Callback Hell" (or "Pyramid of Doom") and how can it be avoided?
*/
// Answer:
// Callback Hell refers to deeply nested callback functions, often seen in complex asynchronous code. This structure makes the code very difficult to read, understand, debug, and maintain, resembling a sideways pyramid. It can be avoided by using modern asynchronous patterns like Promises (`.then().catch()`) and `async/await`.

/*
Q3: Can a callback function be synchronous? Provide an example.
*/
// Answer:
// Yes, callback functions can be synchronous. They are simply functions that get passed as arguments and executed. If the outer function executes the callback immediately within its own execution flow, it's a synchronous callback.
// Example: The `map()` method on arrays takes a synchronous callback that's executed for each element without delay.
// `[1, 2, 3].map(num => num * 2);` here `num => num * 2` is a synchronous callback.

/*
Q4: What are the disadvantages of relying heavily on callbacks for asynchronous operations in large applications?
*/
// Answer:
// 1. **Callback Hell**: Leads to unreadable and unmaintainable code due to deep nesting.
// 2. **Error Handling**: Propagating errors through nested callbacks can be complex and error-prone.
// 3. **Inversion of Control**: You lose direct control over when and how the callback is executed, relying on the outer function to call it correctly.
// 4. **Lack of Flow Control**: Difficult to manage complex sequences (e.g., executing multiple async tasks in parallel or race conditions) compared to Promises or `async/await`.

// Callback => Functions are first class citizens in javascript, that means you can take a function and pass it into another function and when you do so, this function which you pass into another function in known as a callback function.
//  callback function gives us the power of asynchronism in js

setTimeout(function () {
  console.log('timer');
}, 3000);

function x(y) {
  console.log('x');
  y();
}
x(function y() {
  console.log('y');
});

function attch() {
  let count = 0;
  document.getElementById('clickme').addEventListener('click me', function xy() {
    console.log('button click', +count);
  });
}
attch(); // function invocation

function outer() {
  var x = 101;
  function inner() {
    console.log(x);
  }
  // inner();
  return inner;
}
// outer();
outer()();
// var close = outer();
// outer();

// hay to go they are main bra
