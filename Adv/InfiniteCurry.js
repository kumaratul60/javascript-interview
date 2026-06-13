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
  return function(b) {
    if (b === undefined) return a;
    return sumWithEmptyCall(a + b);
  };
}

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

console.log("--- Infinite Currying (valueOf) ---");
const result = sum(1)(2)(3)(4);
console.log("Result (Number conversion):", +result); // 10

console.log("\n--- Currying with Empty Call ---");
console.log("Result:", sumWithEmptyCall(1)(2)(3)(4)()); // 10
