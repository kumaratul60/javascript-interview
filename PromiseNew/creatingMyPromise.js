const cart = ["tablet", "mobile", "laptop"];

// createOrder returns a promise object
const promise = createOrder(cart); // orderId

console.log(promise); //return promise with pending state

// consume the promise
promise
  .then(function (orderId) {
    console.log(orderId);
    //   proceedToPay(orderId);

    // important: what we pass in next chain just return it first, we return any data or any promise which is resolved
    return orderId;
  })
  
  .then(function (orderId) {
    return proceedToPay(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  }).catch(function (err) {
    console.log(err.message);
  }).then(function (orderId){
    console.log("No matter what happens, I'll definitely called");

  })

//   always use catch block with promise when you consume it to handle error gracefully

/* Promise is a constructor which take a function which has resolve and reject parameters
    resolve and reject are function which are given by javascript to build the promises 
    promise should return a success or failure
*/

//creating own promise : produce the promise
function createOrder(cart) {
  const cpr = new Promise(function (resolve, reject) {
    // createOrder logic
    // validateCart
    // orderId

    if (!validateCart(cart)) {
      const err = new Error("validation failed");
      reject(err);
    }

    // logic for crateOrder
    const orderId = "424242";
    if (orderId) {
      setTimeout(function () {
        resolve(orderId);
      }, 5000);
      //   resolve(orderId);
    }
  });

  return cpr;
}

function proceedToPay(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Payment successfull");
  });
}

function validateCart(cart) {
//   return true;

  //   to reject the promise, just mark validateCart to false
    return false;
}
