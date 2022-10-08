const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("It will return value 300ms later");
  }, 300);
});
console.log("hay", myPromise);
setTimeout(() => {
  console.log(myPromise);
}, 300);

const myPromise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("It will return value 1sec later");
  }, 1000);
});
myPromise1
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error("error : " + error);
  });
