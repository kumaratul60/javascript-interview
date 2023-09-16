// ASYNC

//  async is a keyword that is used before a function to create async function.

// Noraml function -> return a value
function getMe() {
  return "I am the best";
}

// Async function => always return a promise
// if you are retun a promise in async function and instead of promise you return a value(string,number, float,etc) it will take that value and wrap it inside a promise then retun that wrapped promise.

async function getData() {
  // return new Promise(function (resolve, reject) {})
  return "Hello Val";
}
const dataPromise = getData();
dataPromise.then((res) => console.log({ res })); //'Hello Val'
console.log({ dataPromise }); // Promise { 'Hello Val' } }

////////////////////////////////////////////////////////////////

const prom = new Promise(function (resolve, reject) {
  resolve("Promise Resolve Value!!");
});
async function promRes() {
  return prom;
}
const res2 = promRes();
res2.then((res) => console.log({ res })); //'Result: Promise Resolve Value!!'
console.log({ res2 }); // Promise { <pending> }

////////////////////////////////////////////////////////////////////////
// AWAIT -> await keyword can used only inside async function,
// async & await is a keyword that is used to handle promise.
//  always write await front of the peomise.

function beforePromise() {
  prom.then((val) => console.log({ val })); //'Promise Resolve Value!!'
}
// beforePromise()

async function handleAsyncProm() {
  const val1 = await prom;
  console.log({ val1 }); //'Promise Resolve Value!!'
  return `Result:${val1}`; //'Result : Promise Resolve Value!'
}
handleAsyncProm(); //'Promise Resolve Value!!'
