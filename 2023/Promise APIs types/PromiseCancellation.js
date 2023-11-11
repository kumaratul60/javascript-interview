// M1- using AbortController
const controller = new AbortController();
const signal = controller.signal;

const promise = new Promise((resolve, reject) => {
  if (signal.aborted) {
    reject(new Error("Promise cancelled"));
  } else if (error) {
    reject(error);
  } else {
    resolve(result);
  }
});

// Set a timeout to cancel the Promise after 5 seconds
setTimeout(() => {
  controller.abort();
}, 5000);

// M2- using function

function createCancellablePromise(executor) {
  let isCancelled = false;

  // Cancellation token function
  const cancel = () => {
    isCancelled = true;
  };

  // The main promise
  const promise = new Promise((resolve, reject) => {
    executor(resolve, reject, cancel);
  });

  // Attach the cancellation function to the promise
  promise.cancel = cancel;

  // Wrapper function to check for cancellation before resolving
  const cancellableResolve = (value) => {
    if (!isCancelled) {
      resolve(value);
    }
  };

  return new Promise((resolve, reject) => {
    promise.then(cancellableResolve, reject);
  });
}

// Example usage:
const cancellablePromise = createCancellablePromise(
  (resolve, reject, cancel) => {
    // Simulating an asynchronous operation
    const timeoutId = setTimeout(() => {
      if (!cancel.isCancelled) {
        resolve("Operation completed successfully");
      }
    }, 2000);

    // Attach the cancel function to the promise
    cancel.timeoutId = timeoutId;
  }
);

// Use the cancellablePromise as you would with a regular Promise
cancellablePromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message); // Output: Promise cancelled
  });

// Cancel the operation before it completes
cancellablePromise.cancel();

// M3- using class

class CancellablePromise {
  constructor(executor) {
    this.isCancelled = false;
    this.promise = new Promise((resolve, reject) => {
      this.cancel = () => {
        this.isCancelled = true;
        reject(new Error("Promise cancelled"));
      };
      executor(resolve, reject, this.cancel);
    });
  }

  then(onResolve, onReject) {
    return this.promise.then(onResolve, onReject);
  }

  catch(onReject) {
    return this.promise.catch(onReject);
  }
}

// Example usage:
const cancellablePromiseClass = new CancellablePromise(
  (resolve, reject, cancel) => {
    // Simulating an asynchronous operation
    const timeoutId = setTimeout(() => {
      if (!cancel.isCancelled) {
        resolve("Operation completed successfully");
      }
    }, 2000);

    // Attach the cancel function to the promise
    cancel.timeoutId = timeoutId;
  }
);

// Use the cancellablePromise as you would with a regular Promise
cancellablePromiseClass
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message); // Output: Promise cancelled
  });

// Cancel the operation before it completes
cancellablePromiseClass.cancel();
