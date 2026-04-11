/**
 * @file MyPromiseDepthScratch.js
 * @description Phase 4: Full Specification Compliance (Advanced Polyfill)
 * @level Expert
 *
 * PROBLEM STATEMENT:
 * Build a high-fidelity Promise implementation that handles nested promises
 * in `.then()`, multiple callbacks for the same promise, and proper
 * microtask-based asynchronicity.
 *
 * KEY FEATURES:
 * - Proper `this` binding for internal `_resolve` and `_reject`.
 * - Handles nested Promise resolution: `resolve(anotherPromise)`.
 * - Multiple handlers on a single promise: `p.then(); p.then();`.
 * - Comprehensive microtask implementation: ensures specs are met.
 * - Robust error handling for executors and all `.then` handlers.
 *
 * USE CASE:
 * Senior/Deep-dive interviews where architectural design, event loop
 * knowledge, and spec compliance are tested.
 *
 * About Promise
 *
 * A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation.

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
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // Bind internal methods to preserve 'this' context
    const resolve = this._resolve.bind(this);
    const reject = this._reject.bind(this);

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  _resolve(value) {
    if (this.state !== 'pending') return;

    // If a promise is resolved with another promise, wait for it (nested resolution)
    if (value instanceof MyPromise) {
      return value.then(this._resolve.bind(this), this._reject.bind(this));
    }

    queueMicrotask(() => {
      // inner check: This ensures correctness at the time the microtask actually runs.
      // Why? Because between scheduling and running the microtask, the state might already have been changed by another call.
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.onFulfilledCallbacks.forEach((cb) => cb(value));
    });
  }

  _reject(reason) {
    if (this.state !== 'pending') return;

    queueMicrotask(() => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach((cb) => cb(reason));
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // Success handler logic
      const fulfilledHandler = () => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(this.value);
            resolve(result);
          } else {
            resolve(this.value); // Pass-through
          }
        } catch (err) {
          reject(err);
        }
      };

      // Error handler logic
      const rejectedHandler = () => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(this.reason);
            // If the error is handled, the next promise in the chain resolves
            resolve(result);
          } else {
            reject(this.reason); // Pass-through
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled') {
        queueMicrotask(fulfilledHandler);
      } else if (this.state === 'rejected') {
        queueMicrotask(rejectedHandler);
      } else {
        this.onFulfilledCallbacks.push(fulfilledHandler);
        this.onRejectedCallbacks.push(rejectedHandler);
      }
    });
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
      },
    );
  }
}

// --- TEST CASES ---

// Case 1: Failure with Recovery
// Expected Output: "Error: MyPromise Failed", "Third then after catch undefined", "Fourth then undefined"
/*
const myPromise1 = new MyPromise((resolve, reject) => {
    console.log("Case 1 started");
    const success = false;
    setTimeout(() => {
        if (success) resolve("MyPromise Success");
        else reject("MyPromise Failed");
    }, 1000);
});

myPromise1
    .then((result) => {
        console.log(result);
        return result + " - processed";
    })
    .then((result) => {
        console.log("Second then", result);
        return result + " - more processing";
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .then((result) => {
        console.log("Third then after catch", result);
    })
    .then((result) => {
        console.log("Fourth then", result);
    })
    .catch((error) => {
        console.error("Second catch:", error);
    });
*/

// Case 2: Standard Success Chain
// Expected Output: "MyPromise Success", "Second then MyPromise Success - processed", ...
/*
const myPromise2 = new MyPromise((resolve, reject) => {
    console.log("Case 2 started");
    const success = true;
    setTimeout(() => {
        if (success) resolve("MyPromise Success");
        else reject("MyPromise Failed");
    }, 1000);
});

myPromise2
    .then((result) => {
        console.log(result);
        return result + " - processed";
    })
    .then((result) => {
        console.log("Second then", result);
        return result + " - more processing";
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .then((result) => {
        console.log("Third then after catch", result);
    })
    .then((result) => {
        console.log("Fourth then", result);
    })
    .catch((error) => {
        console.error("Second catch:", error);
    });
*/

// Case 3: Chaining with .finally()
// Expected Output: Success logs -> "Cleanup runs always ✅" -> "Third then after finally..."
/*
const myPromise3 = new MyPromise((resolve, reject) => {
    console.log("Case 3 started");
    const success = true;
    setTimeout(() => {
        if (success) resolve("MyPromise Success");
        else reject("MyPromise Failed");
    }, 1000);
});

myPromise3
    .then((result) => {
        console.log(result);
        return result + " - processed";
    })
    .then((result) => {
        console.log("Second then", result);
        return result + " - more processing";
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Cleanup runs always ");
    })
    .then((result) => {
        console.log("Third then after finally", result);
    })
    .catch((error) => {
        console.error("Final catch:", error);
    });
*/

// Case 4: Minimal Success/Error/Finally
// Expected Output: "Result:  Done!", "Cleanup runs always"
const myPromiseT = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve(' Done!');
    else reject('Error occurred');
  }, 1000);
});

myPromiseT
  .then((res) => console.log('Result:', res))
  .catch((err) => console.error('Caught:', err))
  .finally(() => console.log('Cleanup runs always'));
