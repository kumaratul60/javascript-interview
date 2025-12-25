console.log("promise");

const GITHUB_API = "https://api.github.com/users/kumaratul60";
const user = fetch(GITHUB_API);
console.log(user);

// Attaching function with user promise
user.then(function (myData) {
  console.log(myData);
});

// there is difference between attaching the function vs passing the function

// Promise: pending, fulfilled, rejected

//  promise object are immutable.

// Promise is a, immutable object in return, resolved just once, pass it wherever you want.

//////////////////////////////
/* 
1. Promise object is a placeholder for certain period of time until we receive a value from a asynchronous operation.

2. Promise is container for a free future value.

3. from MDN -> A promise is an object representing the eventual completion or failure of an asynchronous operation.

A promise is an object which is responsible for eventual completion/success or failure of an asynchronous operation
*/

const cart = ["mobile", "tablet", "laptop"];

createOrder(cart, function (orderId) {
  proceedToPay(orderId, function (paymentInfo) {
    showOrderSummary(paymentInfo, function () {
      updateWallet();
    });
  });
});

// const promise = createOrder(cart)

// promise.then(function (orderId) {
//     proceedToPay(orderId)
// })

createOrder(cart)
  .then(function (orderId) {
    return proceedToPay(orderId);
  })
  .then(function (paymentInfo) {
    return showOrderSummary(paymentInfo);
  })
  .then((paymentInfo) => updateWallet(paymentInfo));
