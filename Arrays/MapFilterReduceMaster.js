/**
 * MASTER GUIDE: map(), filter(), and reduce()
 *
 * These are "Higher-Order Functions" because they take another function as an argument.
 * They allow for a "declarative" programming style, focusing on WHAT to do
 * rather than HOW to loop (imperative style).
 */

const users = [
  { firstName: 'Atul', lastName: 'Kumar', age: 24, class: 'A' },
  { firstName: 'Areol', lastName: 'Kantr', age: 22, class: 'A' },
  { firstName: 'Atal', lastName: 'Kandi', age: 25, class: 'B' },
  { firstName: 'Atil', lastName: 'Kandi', age: 30, class: 'B' },
];

const numbers = [1, 2, 3, 4, 5];

// ============================================================================
// 1. MAP() - The Transformer
// ============================================================================
/**
 * WHAT IT DOES: Creates a NEW array by applying a function to EVERY element.
 * WORKING: It iterates through the array, calls the callback for each item,
 *          and pushes the return value into a new array.
 * WHEN TO USE: When you need to transform data (e.g., getting only names,
 *              formatting prices, doubling numbers).
 * PITFALL: Forgetting to 'return' inside the callback (returns 'undefined' for that slot).
 */

console.log('--- 1. map() Examples ---');

// Basic: Double the numbers
const doubled = numbers.map((x) => x * 2);
console.log('Doubled Numbers:', doubled);

// Advanced: Format names from objects
const fullNames = users.map((user) => `${user.firstName} ${user.lastName}`);
console.log('Full Names:', fullNames);

// ============================================================================
// 2. FILTER() - The Decider
// ============================================================================
/**
 * WHAT IT DOES: Creates a NEW array containing only elements that pass a "test".
 * WORKING: It iterates through the array; if the callback returns 'true',
 *          the element is added to the new array.
 * WHEN TO USE: When you need a subset of the data (e.g., searching,
 *              filtering by category, removing unwanted items).
 * PITFALL: If no elements pass, it returns an empty array [], not 'undefined'.
 */

console.log('\n--- 2. filter() Examples ---');

// Basic: Get even numbers
const evens = numbers.filter((x) => x % 2 === 0);
console.log('Even Numbers:', evens);

// Advanced: Filter users by class
const classA = users.filter((user) => user.class === 'A');
console.log('Users in Class A:', classA);

// ============================================================================
// 3. REDUCE() - The Swiss Army Knife
// ============================================================================
/**
 * WHAT IT DOES: Executes a "reducer" function on each element,
 *              resulting in a SINGLE output value (number, string, object, array).
 * WORKING:
 *   - accumulator: Stores the result of the previous calculation.
 *   - currentValue: The current element being processed.
 *   - initialValue: The starting value of the accumulator. (CRITICAL!)
 * WHEN TO USE: When you need to "condense" an array into one result
 *              (e.g., sum, average, grouping, frequency counting).
 * PITFALLS:
 *   1. Not providing an initial value (defaults to the first element).
 *   2. Not returning the accumulator in every iteration.
 */

console.log('\n--- 3. reduce() Examples ---');

// Basic: Sum of numbers
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Total Sum:', sum);

// Intermediate: Frequency Counting (Tally)
const fruits = ['apple', 'orange', 'apple', 'banana', 'orange', 'apple'];
const fruitCounts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc; // Must return acc!
}, {});
console.log('Fruit Frequency:', fruitCounts);

// Advanced: Grouping Objects by Property
const groupedByClass = users.reduce((acc, user) => {
  const className = user.class;
  if (!acc[className]) acc[className] = [];
  acc[className].push(user);
  return acc;
}, {});
console.log('Grouped by Class:', groupedByClass);

// ============================================================================
// 4. CHAINING - The Power Move
// ============================================================================
/**
 * Since map and filter return arrays, you can chain them together.
 */

console.log('\n--- 4. Chaining Examples ---');

// Problem: Get the total age of users in Class B
const totalAgeClassB = users
  .filter((u) => u.class === 'B') // 1. Get Class B users
  .map((u) => u.age) // 2. Get their ages
  .reduce((acc, age) => acc + age); // 3. Sum them up

console.log('Total Age (Class B):', totalAgeClassB);

// ============================================================================
// 5. SUMMARY CHEAT SHEET
// ============================================================================
/**
 * | Method   | Returns        | Purpose                      | Mutates? |
 * |----------|----------------|------------------------------|----------|
 * | map      | New Array      | Transform every element      | No       |
 * | filter   | New Array      | Pick subset of elements      | No       |
 * | reduce   | Single Value   | Accumulate elements into one | No       |
 *
 * PRO TIP: If you find yourself using .forEach() to push into a new array,
 *          you should probably be using .map() or .filter() instead!
 */
