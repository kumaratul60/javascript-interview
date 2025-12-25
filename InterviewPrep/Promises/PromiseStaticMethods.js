class MyPromise {
  constructor(executor) {
    this.state = "pending"; // States: 'pending' -> 'fulfilled' | 'rejected'
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          const result = onFulfilled ? onFulfilled(this.value) : this.value;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === "rejected") {
        try {
          const result = onRejected ? onRejected(this.reason) : this.reason;
          reject(result);
        } catch (error) {
          reject(error);
        }
      } else {
        this.onFulfilledCallbacks.push(() => {
          try {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            const result = onRejected ? onRejected(this.reason) : this.reason;
            reject(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
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

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let results = [];
      let completed = 0;
      if (promises.length === 0) resolve([]);
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          (reason) => reject(reason)
        );
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      let results = [];
      let completed = 0;
      if (promises.length === 0) resolve([]);
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise)
          .then(
            (value) => (results[index] = { status: "fulfilled", value }),
            (reason) => (results[index] = { status: "rejected", reason })
          )
          .finally(() => {
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let errors = [];
      let rejectedCount = 0;
      if (promises.length === 0) reject(new AggregateError([], "All Promises rejected"));
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(resolve, (reason) => {
          errors[index] = reason;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All Promises rejected"));
          }
        });
      });
    });
  }

  static retry(fn, retries = 3, delay = 1000) {
    return new MyPromise((resolve, reject) => {
      const attempt = (triesLeft) => {
        fn()
          .then(resolve)
          .catch((error) => {
            if (triesLeft === 0) {
              reject(error);
            } else {
              setTimeout(() => attempt(triesLeft - 1), delay);
            }
          });
      };
      attempt(retries);
    });
  }
}

// Example usage
const promise1 = MyPromise.resolve(3);
const promise2 = new MyPromise((resolve) => setTimeout(resolve, 100, "foo"));
const promise3 = MyPromise.reject("error");

MyPromise.all([promise1, promise2]).then(console.log).catch(console.error);
MyPromise.allSettled([promise1, promise2, promise3]).then(console.log);
MyPromise.race([promise1, promise2, promise3]).then(console.log).catch(console.error);
MyPromise.any([promise3, promise2]).then(console.log).catch(console.error);

// Retry logic example
const failingPromise = () => new MyPromise((_, reject) => setTimeout(() => reject("Failed!"), 500));
MyPromise.retry(failingPromise, 3, 1000).then(console.log).catch(console.error);
