/**
 * @file MinimalVersionPromise.js
 * @description Phase 1: The Basic State Machine
 * @level Beginner
 * 
 * PROBLEM STATEMENT:
 * Implement the core internal structure of a Promise. It should manage states 
 * (pending, fulfilled, rejected) and store the final value or reason, ensuring 
 * that once a promise is settled, it cannot change state again.
 * 
 * KEY FEATURES:
 * - State management: pending -> fulfilled OR pending -> rejected.
 * - Value/Reason storage.
 * - Immutability: State transitions are final.
 * 
 * USE CASE:
 * Understanding how a Promise acts as a container for a future value before 
 * adding any callback logic like `.then()`.
 */

class MyMiniPromise {
    constructor(executor) {
        // Initial state is always pending
        this.state = "pending";
        this.value = undefined;

        /**
         * Transitions state to fulfilled and saves the value.
         * Only works if the current state is pending.
         */
        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
            }
        };

        /**
         * Transitions state to rejected and saves the reason.
         * Only works if the current state is pending.
         */
        const reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.value = reason;
            }
        };

        // The executor runs immediately and receives our internal resolve/reject
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
}

// --- EXAMPLES ---

// 1. Synchronous Success
const p1 = new MyMiniPromise((resolve, reject) => {
    resolve("Success!");
});
console.log("P1 State:", p1.state); // "fulfilled"

// 2. Asynchronous Success
const p2 = new MyMiniPromise((resolve, reject) => {
    setTimeout(() => resolve("Async Done!"), 1000);
});
setTimeout(() => {
    console.log("P2 State (after 1s):", p2.state); // "fulfilled"
}, 1100);
