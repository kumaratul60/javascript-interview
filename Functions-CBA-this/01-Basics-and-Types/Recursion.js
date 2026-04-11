/**
 * @file Recursion.js
 * @description Understanding Recursive functions and the Call Stack.
 * @level Intermediate
 */

/**
 * 1. BASIC RECURSION: Factorial
 * Logic: n! = n * (n-1)!
 * Base Case: n === 0
 */
function factorial(n) {
  if (n === 0) return 1; // Base case
  return n * factorial(n - 1); // Recursive call
}
console.log('Factorial(5):', factorial(5)); // 120

/**
 * 2. COMPLEX RECURSION: Fibonacci
 * Logic: F(n) = F(n-1) + F(n-2)
 */
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log('Fibonacci(6):', fibonacci(6)); // 8

/**
 * 3. TAIL CALL OPTIMIZATION (TCO)
 * A tail call is when the recursive call is the VERY LAST action.
 * Modern engines can optimize this to prevent Stack Overflow.
 */
function tailFactorial(n, accumulator = 1) {
  if (n === 0) return accumulator;
  return tailFactorial(n - 1, n * accumulator); // Optimized call
}

/**
 * 🎯 INTERVIEW TIP:
 * Always identify the "Base Case" first. Without it, you get a "RangeError: Maximum call stack size exceeded".
 */
