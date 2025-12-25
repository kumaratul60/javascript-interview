/*
* Promise:
 A promise is an object that represents eventual completion or failure of an asynchronous operation.

 Promise.all,allSetteled,race and any taked array of promsies, i.e Promsie.all([p1,p2,p3,..])

* Promiss.all: It work based on fail-fast method.
 if all promises are fulfilled: It wait for all of them to finish and then return an array of promises result.

 if any of them rejected then Promise.all immediate throw an error as a response.
 it'lln't wait for other promises.

* Promise.allSetteled:
 if all promises are fulfilled: It wait for all of them to finish or setteled and then return an array of promises result.

 if any of them rejected then Promise.allSetteled return an array of fullfiled promises result and reject promise result as error message.

 basically it won't be return an error for rejecting the promise case.

* Promise.race:
 Promise.race means the person who'll finish first is the winner.

 it'll return the result of the first promise that settles, either fulfilled or rejected.

* Promise.any: It is kind of success seeking race.

 It'll wait for the first promise to resolve/fullfiled/success and return the promise result as a response.

 If all of them promises get failed or rejected then return result will be an aggrigated error, this aggrigateError will be an array of all the promises error, i.e [err1,err2,err3,...]

 It returns the result of the first promise that settles successfully. If no promise settles successfully and one rejects, it will throw an error.

 * Lingo in Promise world :

 Satteled: it means promise either get resolve or reject type get a result
 Pending: when we create a new promise but not yet settled.
 Fulfill: when a promise successfully gets resolved.
 Reject:  when a promise fails to get resolved.


 - Fulfillment: An action performed when a promise successfully completes its execution.
 - Rejection: An action performed when a promise fails during its execution.

 resolve/success/fulfilled
 reject/failure/reject



*/

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
