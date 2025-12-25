/**
Async function => always return a promise
async is a keyword that is used before a function to create async function.
if you are retun a promise in async function and instead of promise you return a value(string,number, float,etc) it will take that value and wrap it inside a promise then retun that wrapped promise.

AWAIT -> await keyword can used only inside async function,
async & await is a keyword that is used to handle promise.
 always write await front of the peomise.

*/

const p = new Promise(function (resolve, reject) {
  const a = 5;
  if (a) {
    setTimeout(() => {
      resolve("I'm resolved after 8");
    }, 8000);
  } else {
    reject("I'm not");
  }
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("I'm resolved after 5");
  }, 12000);
});

// without async & await
function getAction() {
  p.then((res) => console.log({ res })).catch((err) => {
    console.log({ err });
  });
  console.log("test fun");
}
// getAction();
/***
output:
first print -> test fun
then wait for 8sec to promise get resolved then print => { res: "I'm resolved" }

*/
async function getAsyncAction() {
  try {
    // JS Engine was waiting for primise to resolve
    const val = await p;
    console.log({ val });
    console.log("testFun async");
    return val;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// getAsyncAction();

/**
output:
wait for 8 sec JS Engine was waiting for primise to resolve then print => { val: "I'm resolved" }
then print => testFun async
*/

async function getAsyncActionAll() {
  console.log("Hello");
  try {
    // JS Engine was waiting for primise to resolve
    const val1 = await p;
    console.log({ val1 });
    console.log("testFun1 async");
  } catch (error) {
    console.error("An error occurred:", error);
  }

  const val2 = await p;
  console.log({ val2 });
  console.log("testFun2 async");
}
// getAsyncActionAll();

/**
output:
first wait for 8sec then print to all:
{ val1: "I'm resolved" }
testFun1 async
{ val2: "I'm resolved" }
testFun2 async
*/

async function p2test() {
  console.log("p2test");
  const val3 = await p;
  console.log({ val3 });
  console.log("testFun3 async");

  const val4 = await p2;
  console.log({ val4 });
  console.log("testFun4 async");
}
p2test();

/***
output:
order will not change it works synchronous way , like first wait for 8 sec then print  all:
p2test
{ val3: "I'm resolved after 8" }
testFun3 async
{ val4: "I'm resolved after 5" }
testFun4 async

Note:=>
1. if first promise time is less than second promise then after first promise time is ovet the first promise will get prinited then wait for second primise time when this is over get prinited after first.

2. If first promise time is more that  second then when first promise time is over then immediatly, first & second promise get printed.

*/

/***

Q: How Async-await or promise execute in js engine?

The JavaScript engine operates with a single call stack and follows a synchronous, single-threaded approach, executing code line by line. However, when it encounters an async function or async line of code, it doesn't block the call stack. Instead, it temporarily suspends execution, freeing the call stack to move on to other tasks like event listeners. When encountering an async line of code, it initiates its execution and, upon completion or resolution/rejection, pushes the task back onto the call stack, resuming from where it was suspended.

*/
