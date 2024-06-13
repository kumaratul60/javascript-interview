/* Memoization is a technique where it will return the value if the same input come,
so instead of running the function again it will  from the Cache. */

function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
}

function factorial(n) {
    if (n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}

function add(a, b) {
    return a + b;
}

function memoize(fn) {
    let cache = {};
    return function (...args) {
        // JSON.stringify(args) is used to generate a unique key for the current set of arguments passed to the memoized function.
        // JSON.stringify converts the array of arguments into a string, which can then be used as a key in the cache object.

        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log("Fetching from cache");
            return cache[key];
        } else {
            console.log("Calculating result");
            cache[key] = fn(...args);
            return cache[key];
        }
    };
}

// Memoize the fibonacci function
const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(10)); // Output from calculated
console.log(memoizedFibonacci(10)); // Output from cached

// Memoize the factorial function
const memoizedFactorial = memoize(factorial);
console.log(memoizedFactorial(10)); // Output from calculated
console.log(memoizedFactorial(10)); // Output from cached

const add_memo = memoize(add);
console.log(add_memo(200, 502));
console.log(add_memo(200, 502));
