class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // States: 'pending' -> 'fulfilled' | 'rejected'
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
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
      if (this.state === 'fulfilled') {
        try {
          const result = onFulfilled ? onFulfilled(this.value) : this.value;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === 'rejected') {
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
}

// Example usage
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Custom Promise Resolved!'), 1000);
});

myPromise.then(value => console.log(value)).catch(error => console.log(error));
