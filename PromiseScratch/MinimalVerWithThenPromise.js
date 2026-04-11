/**
 * @file MinimalVerWithThenPromise.js
 * @description Phase 2: Simple Callback Registration
 * @level Intermediate-Beginner
 * 
 * PROBLEM STATEMENT:
 * Enhance the Promise to handle a `.then()` callback. It should work for 
 * both synchronous and asynchronous resolutions.
 * 
 * KEY FEATURES:
 * - `.then()` implementation.
 * - Callback storage array to handle handlers registered before resolution.
 * - Single-level success handling (No chaining yet).
 * 
 * USE CASE:
 * Learning how asynchronous values are eventually passed to registered 
 * handlers once they are available.
 */

class MyPromiseWithThen {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.onFulfilledCallbacks = [];

        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                // Execute all stored callbacks once the value is ready
                this.onFulfilledCallbacks.forEach((cb) => cb(value));
            }
        };

        const reject = () => {}; // Simple placeholder for this level

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    /**
     * Registers a callback for success.
     * If already resolved, runs it immediately.
     */
    then(onFulfilled) {
        if (this.state === "fulfilled") {
            onFulfilled(this.value);
        } else if (this.state === "pending") {
            this.onFulfilledCallbacks.push(onFulfilled);
        }
    }
}

// --- EXAMPLES ---

// 1. Success with immediate registration
const p1 = new MyPromiseWithThen((resolve) => {
    setTimeout(() => resolve("Async Data Ready"), 1000);
});

p1.then((result) => {
    console.log("P1 Result:", result); // "Async Data Ready" after 1s
});

// 2. Multiple then handlers on the same promise (not chained)
p1.then((result) => {
    console.log("P1 Second listener:", result);
});
