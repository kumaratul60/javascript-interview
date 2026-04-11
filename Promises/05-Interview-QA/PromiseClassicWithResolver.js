// Classic
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('300ms later');
  }, 300);
});

p.then(console.log).catch(console.error);

// classic -1
// let resolve, reject;
// const classicProm = new Promise((res, rej) => {
//   resolve = res;
//   reject = rej;
// });

// Async-Await
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(`${ms}ms later`), ms));

(async () => {
  try {
    const result = await delay(300);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
})();

// Destructuring
const pDes = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ data: 'done', time: 300 });
  }, 300);
});

pDes.then(({ data, time }) => {
  console.log(data, time);
});
// const { data, time } = await pDes;

// Promise.withResolvers()

const { promise, resolve, reject } = Promise.withResolvers();

setTimeout(() => {
  resolve('300ms later');
}, 300);

promise.then(console.log).catch(console.error);
