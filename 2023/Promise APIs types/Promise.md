## Promise:

A promise is an object that represents eventual completion or failure of an asynchronous operation.

## What are and which are Promise combinators?

Promise combinators are higher-order functions that operate on multiple Promises and return a new Promise.
This technique can improve performance and reduce the overall time it takes to complete multiple asynchronous operations.

Some common Promise combinators are:

Promise.all,allSetteled,race and any taked array of promsies, i.e Promsie.all([p1,p2,p3,..])

- **Promiss.all**: It work based on fail-fast method.
  if all promises are fulfilled: It wait for all of them to finish and then return an array of promises result.

if any of them rejected then Promise.all immediate throw an error as a response.
it'lln't wait for other promises.

- **Promise.allSetteled**:
  if all promises are fulfilled: It wait for all of them to finish or setteled and then return an array of promises result.

if any of them rejected then Promise.allSetteled return an array of fullfiled promises result and reject promise result as error message.

basically it won't be return an error for rejecting the promise case.

- **Promise.race**:
  Promise.race means the person who'll finish first is the winner.

it'll return the result of the first promise that settles, either fulfilled or rejected.

- **Promise.any**: It is kind of success seeking race.

It'll wait for the first promise to resolve/fullfiled/success and return the promise result as a response.

If all of them promises get failed or rejected then return result will be an aggrigated error, this aggrigateError will be an array of all the promises error, i.e [err1,err2,err3,...]

It returns the result of the first promise that settles successfully. If no promise settles successfully and one rejects, it will throw an error.

- **Lingo in Promise world** :

**Satteled**: it means promise either get resolve or reject type get a result
**Pending**: when we create a new promise but not yet settled.
**Fulfill**: when a promise successfully gets resolved.
**Reject**: when a promise fails to get resolved.

- **Fulfillment**: An action performed when a promise successfully completes its execution.
- **Rejection**: An action performed when a promise fails during its execution.

```javascript
resolve / success / fulfilled;
reject / failure / reject;
```

- The key differences between these methods are in the way they handle multiple Promises, and in the values that they resolve or reject.

  - **Promise.all()** and **Promise.race()** are focused on resolving or rejecting with a single value.
  - **Promise.any()** and **Promise.allSettled()** are focused on aggregating the outcomes of multiple Promises.
  - **Promise.any()** and **Promise.allSettled()** return a Promise that always resolves, while **Promise.all()** and **Promise.race()** can result in a rejected Promise.

## what are challenges of using promises?

- **Callback Hell** (Pyramid of Doom): Although Promises were introduced to alleviate the "Callback Hell" problem (nested callback functions), improper use of Promises can still lead to a similar issue, known as the "Pyramid of Doom." Chaining too many .then calls can make the code hard to read and maintain.

- **Error Handling**: Error handling in Promises can be challenging. While you can use .catch to handle errors, it's easy to forget to add proper error handling, leading to unhandled promise rejections. Also, debugging can be more complex when errors occur inside promise chains.

- **Uncaught Promise Rejections**: If a Promise is rejected, and there's no .catch handler to handle the rejection, it becomes an unhandled promise rejection. This can lead to hard-to-trace bugs and may crash the Node.js process in certain scenarios.

- **Limited State Management**: Promises are one-time-use and represent a single value. They don't provide built-in features for managing and sharing state between multiple asynchronous operations, which can be important in certain scenarios.

- **Lack of Built-in Cancelation**: Promises don't have built-in support for cancelation. Once a Promise is initiated, it will complete its execution even if the result is no longer needed. This can be problematic in situations where rapid changes occur, and there's a need to cancel ongoing asynchronous operations.

- **Readability and Syntax Complexity**: While Promises are an improvement over callbacks, the syntax can still be complex for beginners. Asynchronous operations are inherently more challenging to understand than synchronous ones, and Promises introduce additional concepts that may be confusing.

- **Backward Compatibility**: In some cases, you might be dealing with code or libraries that still use callbacks, and integrating Promises into such environments can be challenging.

- **Limited Parallelism**: While Promises can be executed concurrently, managing multiple Promises in parallel can be tricky. Libraries like Promise.all help, but they have their limitations and might not be suitable for all use cases.

Despite these challenges, Promises remain a widely used and valuable tool for handling asynchronous code in JavaScript. The introduction of async/await in modern JavaScript has also addressed some of these issues, making asynchronous code more readable and manageable.

## what are benefites of using promise

**Improved Readability**:
Promises provide a more readable and structured way to handle asynchronous operations compared to nested callbacks. This can lead to code that is easier to understand and maintain.

**Avoiding Callback Hell**:
Promises help mitigate the issue of callback hell, where multiple nested callbacks can make the code difficult to follow. With Promises, you can chain .then() calls, making the code more linear and easier to manage.

**Sequential Execution**:
Promises allow you to write asynchronous code in a more sequential manner using the .then() syntax. This makes it easier to express the flow of asynchronous operations.

- **Error Handling**:
  Promises provide a consistent way to handle errors using the .catch() method. This simplifies error handling and makes it more centralized, improving code maintainability.

- **Promise Chaining**:
  Promises can be easily chained together using multiple .then() calls, allowing you to create a sequence of asynchronous operations. This helps in avoiding deeply nested callbacks.

- **Separation of Concerns**:
  Promises separate the concerns of initiating an asynchronous operation and handling its result. This separation makes it easier to reason about the code and maintain a clean structure.

- **Async/Await Syntax**:
  The introduction of async/await in modern JavaScript builds on the Promise API, providing a more synchronous-looking syntax for handling asynchronous code. This further improves code readability.

- **Single Point of Error Handling**:
  Promises centralize error handling in the .catch() block, making it easier to manage errors from multiple asynchronous operations at a single point in the code.

- **Promise Composition**:
  Promises can be composed, meaning you can create new promises that depend on the resolution of existing promises. This allows for better organization and reuse of asynchronous code.

- **Easier Debugging**:
  Promises simplify the debugging process by providing a structured way to handle errors. The stack trace in case of a rejection points directly to the .catch() or the corresponding onRejected callback.

- **Compatibility with Other APIs**:
  Many modern APIs and libraries use Promises for handling asynchronous operations. Using Promises in your code makes it easier to integrate with these APIs and maintain consistency.

## What is Promise Chaining?

Promise Chaining is a powerful technique in JavaScript that allows us to execute asynchronous operations in a specific order. This technique involves returning a new Promise from a then() callback of an existing Promise, which allows us to chain multiple asynchronous operations together.

```javascript
const promise3 = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(name);
    }, 1000); // Delayed function after 1 second (1000 milliseconds)
  });
};

promise3("Lorem")
  .then((data) => {
    console.log(data); // wait 1 second and output: "Lorem"
    return promise3("Ipsum");
  })
  .then((data) => {
    console.log(data); // wait 1 second and output: "Ipsum"
    return promise3("Dolor");
  })
  .then((data) => {
    console.log(data); // wait 1 second and output: "Dolor"
    return promise3("Amet");
  })
  .then((data) => {
    console.log(data); // wait 1 second and output: "Amet"
  });
```
- Promises exmaples

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Resolved p1");
  }, 3000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Resolved p2");
  }, 2000);
});

const p3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("rejected p3");
  }, 4000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved p4");
  }, 5000);
});

const promiseAll = Promise.all([p1, p2, p3, p4]);
// promiseAll
//   .then((res) => console.log({ res }))
//   .catch((err) => console.error({ err }));

// console.log({ promiseAll });
/*
 [[Prototype]]:Promise
 [[PromiseState]]:"rejected"
 [[PromiseResult]]:"rejected p3"
 */

const promiseAllSetteled = Promise.allSettled([p1, p2, p3, p4]);
// promiseAllSetteled.then((res) => console.log({ res }));
// console.log({ promiseAllSetteled });
/*
 [[Prototype]]:Promise
 [[PromiseState]]:"fulfilled"
 [[PromiseResult]]:Array(4)
 0:{status: 'fulfilled', value: 'Resolved p1'}
 1:{status: 'fulfilled', value: 'Resolved p2'}
 2:{status: 'rejected', reason: 'rejected p3'}
 3:{status: 'fulfilled', value: 'Resolved p4'}
 */

const promiseRace = Promise.race([p1, p2, p3, p4]);
// promiseRace.then((res) => console.log({ res }));
// console.log({ promiseRace });
/*
 [[Prototype]]:Promise
 [[PromiseState]]:"fulfilled"
 [[PromiseResult]]:"Resolved p2"
 */

const promiseAny = Promise.any([p1, p2, p3, p4]);
// promiseAny.then((res) => console.log({ res }));
// console.log({ promiseAny });
/*
 [[Prototype]]:Promise
 [[PromiseState]]:"fulfilled"
 [[PromiseResult]]:"Resolved p2"
 */

///* AggregateError

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
    console.log(err.errors); // aggregate err []
  });

```


