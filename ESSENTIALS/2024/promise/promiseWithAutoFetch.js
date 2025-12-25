// const initialPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//       console.log("Async initialPromise");
//         // reject();
//       resolve();

//   }, 10000);
// });

// initialPromise.then(() => console.log("initialPromise consumed"));

// new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log("Async task 2");
//     resolve();
//   }, 400);
// }).then(function () {
//   console.log("Async 2 resolved");
// });

// const res = initialPromise.then(() => console.log("initialPromise consumed"));
// console.log(res,"::res");

/*
Create a fetchWithAutoRetry(fetch,fetchCount), which automatically fetch again when error happens, until the maximum count is met.
*/

async function fetchWithAutoRetry(fetchData, maximumRetryCount = 1) {
  let attempt = 0;

  async function fetchAttempt() {
    try {
      const response = await fetch(fetchData);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
    } catch (err) {
      if (attempt < maximumRetryCount) {
        attempt++;
        console.log(`Attempt ${attempt} failed. Retrying...`);
        return fetchAttempt();
      } else {
        throw new Error(`Maximum retry attempts reached: ${err.message}`);
      }
    }
  }

  try {
    const result = await fetchAttempt();
    console.log({ result });
  } catch (error) {
    console.error(error.message);
  }
}

const API = "https://jsonplaceholder.typicode.com/todos/10";
// fetchWithAutoRetry(API, 4);

//---- try without fetch ----

async function promiseWithAutoRetry(promiseFn, maximumRetryCount = 1) {
  let attempt = 0;

  async function attemptPromise() {
    try {
      const result = await promiseFn();
      return result;
    } catch (err) {
      if (attempt < maximumRetryCount) {
        attempt++;
        console.log(`Attempt ${attempt} failed. Retrying...`);
        return attemptPromise();
      } else {
        throw new Error(`Maximum retry attempts reached: ${err.message}`);
      }
    }
  }

  try {
    const result = await attemptPromise();
    console.log({ result });
  } catch (error) {
    console.error(error.message);
  }
}

// Example usage with a generic promise-based function
const failingPromise = () => {
  return new Promise((resolve, reject) => {
    console.log("Executing promise");
    setTimeout(() => reject(new Error("Promise failed")), 1000);
  });
};

// promiseWithAutoRetry(failingPromise, 4);

//-- Multiple promise -----

async function multyPromisesWithAutoRetry(promises, maximumRetryCount = 1) {
  let attempt = 0;

  async function attemptPromises() {
    try {
      // Execute all promises concurrently
      const results = await Promise.all(
        promises.map((promise) => {
          return promise().catch((error) => {
            throw new Error(`Throw error to trigger retry logic: ${error.message}`);
          });
        })
      );

      return results;
    } catch (err) {
      if (attempt < maximumRetryCount) {
        attempt++;
        console.log(`Attempt ${attempt} failed. Retrying...`);
        return attemptPromises();
      } else {
        throw new Error(`Maximum retry attempts reached: ${err.message}`);
      }
    }
  }

  try {
    const results = await attemptPromises();
    console.log({ results });
    return results;
  } catch (error) {
    console.error(error.message);
    throw error; // re-throw the error to propagate it further if needed
  }
}

// Example usage with multiple promises
const p1 = () =>
  new Promise((resolve, reject) => {
    console.log("Executing promise p1");
    setTimeout(() => reject(new Error("Promise p1 failed")), 1000);
  });

const p2 = () =>
  new Promise((resolve, reject) => {
    console.log("Executing promise p2");
    setTimeout(() => reject(new Error("Promise p2 failed")), 2000);
  });

multyPromisesWithAutoRetry([p1, p2], 3);
