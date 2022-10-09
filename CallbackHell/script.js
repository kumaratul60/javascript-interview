// Javascript is a loosely coupled, Dynamically typed, Single threaded, Synchronous language. And it can do just one thing at a time because javascript has one call-stack.

console.log("Hay");

setTimeout(function () {
    console.log("callback");
}, 500)

/* callback is a powerful way to do asynchronous thing in Javascript. so we can take a piece of code inside a function and we can just pass it as a callback which can execute later point of time, and out job is done.
*/

const cart = ["mobile", "laptop", "tablet",]

// api.createOrder()
// api.proceedToPay()
// api.shoOrderSummary()
// api.updateWallet()


api.createOrder(cart, function () {

    api.proceedToPay(function () {

        api.shoOrderSummary(function () {

            api.updateWallet();
        })
    })
})

// this type of code structure like unreadable & unmaintainable and this type of structure is known as Pyramid of Doom(POD)

// IOC : inversion of control=> It mean you loose the control of your code when you are using callback.

// Issues with callback: IOC, POD

console.log("show me");