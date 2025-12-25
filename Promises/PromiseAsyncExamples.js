// Promises and Async/Await Examples

// Basic Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Hello World!"), 1000);
});

myPromise.then(result => console.log(result));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Promise.all for multiple async operations
const promise1 = Promise.resolve('First');
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second'), 1000));
const promise3 = Promise.reject('Error in third');

Promise.all([promise1, promise2])
  .then(results => console.log(results))
  .catch(error => console.error(error));

// Error handling in promises
Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log(results));