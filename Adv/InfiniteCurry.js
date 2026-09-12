/**
 * @fileoverview
 * Infinite Currying
 * A classic "trick" JavaScript interview question.
 *
 * Target: Implement a function sum(a)(b)(c)...(n) that returns
 * the total sum when the value is needed.
 */

/**
 * Strategy:
 * 1. Return a function that takes the next argument.
 * 2. Keep track of the running sum via a closure.
 * 3. Override the valueOf or toString method of the returned function
 *    so it returns the sum when compared or converted to a primitive.
 *
 * NOTE: In modern environments (like Node.js or browsers),
 * console.log(sum(1)(2)) might still show the function object.
 * To get the primitive value, you may need to use '+' or 'Number()'.
 */
function sum(a) {
  const next = (b) => sum(a + b);

  next.valueOf = () => a;
  next.toString = () => a;

  return next;
}

/**
 * 📈 Interview Insights:
 * -----------------------
 * 1. Closure: 'a' is remembered by the 'next' function.
 * 2. Implicit Conversion: When you do +sum(1)(2), JS calls .valueOf().
 * 3. Recursion: The function keeps returning itself to allow chaining.
 * 4. Alternative: Sometimes the interviewer wants the sum to trigger
 *    on an empty call: sum(1)(2)(). In that case, check if the argument
 *    is undefined.
 */

function sumWithEmptyCall(a) {
  return function (b) {
    if (b === undefined) return a;
    return sumWithEmptyCall(a + b);
  };
}

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

console.log('--- Infinite Currying (valueOf) ---');
const result = sum(1)(2)(3)(4);
console.log('Result (Number conversion):', +result); // 10

console.log('\n--- Currying with Empty Call ---');
console.log('Result:', sumWithEmptyCall(1)(2)(3)(4)()); // 10

//
// Example of a curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    }
  };
}

// Example function to be curried
function multiply(a, b, c) {
  return a * b * c;
}

// Currying the multiply function
const curriedMultiply = curry(multiply);

// Applying curried functions
const step1 = curriedMultiply(2); // partially apply 2
const step2 = step1(3); // partially apply 3
const result1 = step2(4); // apply the final argument

console.log(result1); // Output: 24
// https://www.greatfrontend.com/blog/javascript-interview-questions-for-5-years-experience
