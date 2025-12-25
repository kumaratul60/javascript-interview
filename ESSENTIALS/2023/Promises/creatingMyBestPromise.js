// A Promise is an Object which represents eventual complition or failure of an asynchronous operation
// Promise State: Pending, Fulfilled, failure

// Call back hell -> code increses horizontly -> Pyramid of Doom
// to avoid call back hell or pyramid of Doom problem, we return a promise from top level created promise and we handle it in the next level of the chain like passing thing down to other,... ex: crateOrder(cart) promise


// passing promise:= pass function in to a function as parameter is callback
// Attaching:= get result of that promise by chaning it is attching a promise

const cart = ["tablet", "mobile", "laptop"];

// createOrder returns a promise object
const promise = createOrder(cart); // orderId

console.log(promise); //return promise with pending state like {data:undefine}

// consume the promise

/*
 Important: what we pass in next chain just return it first, we return any data or any promise which is resolved.
 Whenever we've chaining thing in the promise chain we need to keep retuning thing from one chain down to other,down to other,...
 Simple what we pass in promise function as parameter, just return it same.

*/
promise
  .then(function (orderId) {
    console.log(orderId);
    //   proceedToPay(orderId);

    return orderId;
  })

  .then(function (orderId) {
    return proceedToPay(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    console.log(err.message);
  })
  .then(function (orderId) {
    console.log(
      "No matter what happens, I'll definitely called because Catch block only check above of then function noe below catch block, so that's why I 'm running"
    );
  });

//   always use catch block with promise when you consume it to handle error gracefully

/* Promise is a constructor which take a function which has resolve and reject parameters
    resolve and reject are function which are given by javascript to build the promises
    promise should return a success or failure
*/

// Producer
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
