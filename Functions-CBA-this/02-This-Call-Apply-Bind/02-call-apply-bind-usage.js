/**
 * @file 02-call-apply-bind-usage.js
 * @description Practical usage of Explicit Binding (Call, Apply, Bind).
 */

const person = {
  firstName: 'Atul',
  lastName: 'Kumar',
};

const printDetails = function (city, state) {
  console.log(`${this.firstName} ${this.lastName} from ${city}, ${state}`);
};

// 1. .call() -> Invokes immediately, comma-separated args
printDetails.call(person, 'Bahraich', 'UP');

// 2. .apply() -> Invokes immediately, array of args
printDetails.apply(person, ['Mumbai', 'MH']);

// 3. .bind() -> Returns a new function for later use
const boundFn = printDetails.bind(person, 'Delhi'); // Partially applied 'Delhi'
boundFn('DL'); // Output: Atul Kumar from Delhi, DL

// --- REAL-WORLD USE CASES ---

// A. Borrowing Math methods for arrays (Old JS pattern)
const numbers = [10, 5, 20, 15];
const max = Math.max.apply(null, numbers);
console.log('Max using .apply():', max);

// B. Replaced by Spread in Modern JS
const maxModern = Math.max(...numbers);
console.log('Max using Spread:', maxModern);

// C. Borrowing from Array prototype
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const realArray = Array.prototype.slice.call(arrayLike);
console.log('Converted array-like:', realArray);
