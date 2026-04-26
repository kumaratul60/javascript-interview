function isValidDate(date) {
  return data instanceof Date && isNaN(date.getTime());
}

function safeParse(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isValidDate(date ? date : null);
}

const date = new Date('2024-12-25');
console.log(date.getMonth()); //11, because indexing start from 0
console.log(date.getMonth() + 1); // 12

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

MONTHS[0]; // January
MONTHS[date.getMonth()]; // 12

function addDays(date, days) {
  date.setDate(date.getDate() + days); // mutates original
  return date;
}

// demo
const original = new Date('2024-01-15');
const future = addDays(original, 7);

console.log(original === future); // true (same object)
console.log(original.toISOString()); // shifted by +7 days

// fixed

/**
 Why avoid mutation (Date)
  Date is mutable → setDate changes the same object.
  Hidden side effects: callers holding original get modified unexpectedly.
  Breaks predictability (esp. in React/state, memoization, caching).
  Harder debugging + time-travel/testing issues.
 */
function addDays(date, days) {
  const copy = new Date(date); // clone
  copy.setDate(copy.getDate() + days);
  return copy;
}

const original = new Date('2024-01-15');
const future = addDays(original, 7);

original; // unchanged, Jan 15
future; // +7 days, Jan 22
