/**
 * @file MinimalPromise.js
 * @description Phase 3: Chaining and Async Microtasks
 * @level Intermediate
 * 
 * PROBLEM STATEMENT:
 * Implement a Promise that supports chaining, error handling, and behaves 
 * asynchronously according to the spec (using microtasks).
 * 
 * KEY FEATURES:
 * - `.then()` returns a NEW MyPromise (enables chaining).
 * - `.catch()` and `.finally()` support.
 * - `queueMicrotask` for async execution: ensures `.then()` is always async.
 * - Error propagation through chains.
 * 
 * USE CASE:
 * A solid polyfill for mid-level interview questions. It demonstrates 
 * understanding of microtasks and the requirement that `.then` returns a promise.
 */

class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            // Move into a microtask to ensure it's always async
            queueMicrotask(() => {
                if (this.state !== "pending") return;
                this.state = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach((cb) => cb(value));
            });
        };

        const reject = (reason) => {
            queueMicrotask(() => {
                if (this.state !== "pending") return;
                this.state = "rejected";
                this.value = reason;
                this.onRejectedCallbacks.forEach((cb) => cb(reason));
            });
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    /**
     * Enables chaining by returning a new MyPromise.
     */
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            // Helper for processing success
            const fulfilledHandler = (value) => {
                try {
                    // If onFulfilled is not a function, just pass through the value
                    if (typeof onFulfilled === "function") {
                        resolve(onFulfilled(value));
                    } else {
                        resolve(value);
                    }
                } catch (err) {
                    reject(err);
                }
            };

            // Helper for processing error
            const rejectedHandler = (reason) => {
                try {
                    if (typeof onRejected === "function") {
                        // If we handle the error, the new promise should resolve
                        resolve(onRejected(reason));
                    } else {
                        // Otherwise, keep the rejection chain going
                        reject(reason);
                    }
                } catch (err) {
                    reject(err);
                }
            };

            if (this.state === "fulfilled") {
                queueMicrotask(() => fulfilledHandler(this.value));
            } else if (this.state === "rejected") {
                queueMicrotask(() => rejectedHandler(this.value));
            } else {
                this.onFulfilledCallbacks.push(fulfilledHandler);
                this.onRejectedCallbacks.push(rejectedHandler);
            }
        });
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

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

// --- EXAMPLES ---

// 1. Chaining and async behavior
const p1 = new MyPromise((resolve) => {
    resolve(10);
});

p1.then((val) => val * 2)
  .then((val) => val + 5)
  .then((val) => {
      console.log("P1 Chained Result:", val); // 25
  });

// 2. Catching Errors
const p2 = new MyPromise((_, reject) => {
    reject("Initial Error");
});

p2.then((val) => val)
  .catch((err) => {
      console.log("Caught:", err);
      return "Recovered";
  })
  .then((val) => console.log("Post-catch:", val));
