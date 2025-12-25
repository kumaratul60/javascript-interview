class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
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

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const fulfilledHandler = (value) => {
                try {
                    if (typeof onFulfilled === "function") {
                        resolve(onFulfilled(value));
                    } else {
                        resolve(value);
                    }
                } catch (err) {
                    reject(err);
                }
            };

            const rejectedHandler = (reason) => {
                try {
                    if (typeof onRejected === "function") {
                        resolve(onRejected(reason));
                    } else {
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


const myPromise = new MyPromise((resolve, reject) => {
    console.log("Executor runs immediately");
    setTimeout(() => reject("MyPromise Failed"), 2000);
});

myPromise
    .then((res) => {
        console.log("First then:", res);
        return res + " processed";
    })
    .catch((err) => {
        console.error("Caught error:", err);
        return "Recovered value";
    })
    .then((res) => {
        console.log("After catch then:", res);
        return "Final result";
    })
    .finally(() => console.log("Cleanup done"));
