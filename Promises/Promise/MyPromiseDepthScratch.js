/*
A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation.

Instead of dealing with callback hell, Promises let us chain asynchronous logic using .then(), .catch(), and .finally().

States of a Promise:

pending → initial state (neither fulfilled nor rejected).

fulfilled → operation completed successfully.

rejected → operation failed.

Once a promise is fulfilled or rejected, it becomes settled and cannot change state again.

queueMicrotask:
1.queueMicrotask is a browser/Node API that schedules a function to run at the end of the current event loop tick, before the next macro task (like setTimeout).
2.This makes your custom Promise behave like real Promise.
3. Without queueMicrotask, .then handlers would fire immediately, which is not correct.

executor:
1.executor is the function you pass ((resolve, reject) => {...}).
2.We save resolve and reject as private methods _resolve and _reject.
 */


class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = this._resolve.bind(this);
        const reject = this._reject.bind(this);

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    _runCallbacks(callbacks, value) {
        callbacks.forEach(cb => cb(value));
    }

    _resolve(value) {
        // outer check: This prevents scheduling the microtask at all if the promise is already settled.
        if (this.state === "pending") {
            queueMicrotask(() => {
                // inner check: This ensures correctness at the time the microtask actually runs.
                // Why? Because between scheduling and running the microtask, the state might already have been changed by another call.
                if (this.state !== "pending") return;
                this.state = "fulfilled";
                this.value = value;
                this._runCallbacks(this.onFulfilledCallbacks, value);
            });
        }
    }

    _reject(reason) {
        if (this.state === "pending") {
            queueMicrotask(() => {
                if (this.state !== "pending") return;
                this.state = "rejected";
                this.reason = reason;
                this._runCallbacks(this.onRejectedCallbacks, reason);
            });
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const fulfilledHandler = this._createHandler(onFulfilled, resolve, reject);
            const rejectedHandler = this._createHandler(onRejected, resolve, reject, true);

            if (this.state === "fulfilled") {
                queueMicrotask(() => fulfilledHandler(this.value));
            } else if (this.state === "rejected") {
                queueMicrotask(() => rejectedHandler(this.reason));
            } else {
                this.onFulfilledCallbacks.push(fulfilledHandler);
                this.onRejectedCallbacks.push(rejectedHandler);
            }
        });
    }

    _createHandler(fn, resolve, reject, isReject = false) {
        return (input) => {
            try {
                if (typeof fn === "function") {
                    const result = fn(input);
                    resolve(result instanceof MyPromise ? result : result);
                } else {
                    isReject ? reject(input) : resolve(input);
                }
            } catch (err) {
                reject(err);
            }
        };
    }

    // catch support
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    // finally support
    finally(callback) {
        return this.then(
            (value) => {
                callback();
                return value;
            },
            (reason) => {
                callback();
                throw reason;
            }
        );
    }
}


// case 1:
// const myPromise = new MyPromise((resolve, reject) => {
//     console.log("MyPromise started");
//     const success = false;
//     setTimeout(() => {
//         if (success) resolve("MyPromise Success");
//         else reject("MyPromise Failed");
//     }, 2000);
// });
//
// myPromise
//     .then((result) => {
//         console.log(result);
//         return result + " - processed";
//     })
//     .then((result) => {
//         console.log("Second then", result);
//         return result + " - more processing";
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     })
//     .then((result) => {
//         console.log("Third then after catch", result);
//     })
//     .then((result) => {
//         console.log("Fourth then", result);
//     })
//     .catch((error) => {
//         console.error("Second catch:", error);
//     });


// case 2:
// const myPromise = new MyPromise((resolve, reject) => {
//     console.log("MyPromise started");
//     const success = true;
//     setTimeout(() => {
//         if (success) resolve("MyPromise Success");
//         else reject("MyPromise Failed");
//     }, 2000);
// });
//
// myPromise
//     .then((result) => {
//         console.log(result);
//         return result + " - processed";
//     })
//     .then((result) => {
//         console.log("Second then", result);
//         return result + " - more processing";
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     })
//     .then((result) => {
//         console.log("Third then after catch", result);
//     })
//     .then((result) => {
//         console.log("Fourth then", result);
//     })
//     .catch((error) => {
//         console.error("Second catch:", error);
//     });

// case 3:
// const myPromise = new MyPromise((resolve, reject) => {
//     console.log("MyPromise started");
//     const success = true;
//     setTimeout(() => {
//         if (success) resolve("MyPromise Success");
//         else reject("MyPromise Failed");
//     }, 2000);
// });
//
// myPromise
//     .then((result) => {
//         console.log(result);
//         return result + " - processed";
//     })
//     .then((result) => {
//         console.log("Second then", result);
//         return result + " - more processing";
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     })
//     .finally(() => {
//         console.log("Cleanup runs always ✅");
//     })
//     .then((result) => {
//         console.log("Third then after finally", result);
//     })
//     .catch((error) => {
//         console.error("Final catch:", error);
//     });

// case 4:
const myPromiseT = new MyPromise((resolve, reject) => {
// const myPromiseT = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) resolve("✅ Done!");
        else reject("❌ Error occurred");
    }, 1000);
});

myPromiseT
    .then((res) => console.log("Result:", res))
    .catch((err) => console.error("Caught:", err))
    .finally(() => console.log("Cleanup runs always"));



