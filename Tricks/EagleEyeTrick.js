// Questions:
// 1. What does this log, and why?
// 2. What is the value of i after the loop ends?
// 3. How would you fix it?
// 4. Why does numbers end up with a single element?
// 5. What changes if i is let instead of var in the trap?
// 6. Can a linter catch this? Which rule?
// Trap: the trailing semicolon makes the loop body empty.
// The block below runs once AFTER the loop using the final i value.
// Expected: [1,2,3,4] 4
// Actual:   [5] 1
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);
{
  numbers.push(i + 1);
}
console.log(numbers, numbers.length);

// Correct: no stray semicolon.
const okNumbers = [];
for (let j = 0; j < length; j++) {
  okNumbers.push(j + 1);
}
console.log(okNumbers, okNumbers.length);
