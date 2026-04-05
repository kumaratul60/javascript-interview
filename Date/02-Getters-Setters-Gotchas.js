/**
 * 02 - Getters, Setters, and Common Gotchas
 *
 * Checklist covered:
 * - Must-Know Getters & Tricks
 * - Mastering Setters & Logic
 * - WATCH OUT: Common Date Gotchas!
 * - How to Parse & Validate Dates
 */

const d = new Date(2026, 2, 15, 14, 30, 0); // March 15, 2026

// 1. Must-Know Getters
console.log('Full Year:', d.getFullYear());
console.log('Month (0-indexed!):', d.getMonth()); // 2 (March)
console.log('Day of the Month:', d.getDate());
console.log('Day of the Week:', d.getDay()); // 0 (Sunday) to 6 (Saturday)
console.log('Hours:', d.getHours());

// 2. Mastering Setters (Logic Rules)
// Setters allow you to MODIFY the date object.
d.setFullYear(2027);
d.setMonth(0); // Change to January
console.log('\nAfter Modification:', d);

// 3. WATCH OUT: Common Date Gotchas!
// A. 0-Indexed Months: Jan=0, Dec=11.
// B. Parsing behavior: "2026-03-15" (UTC) vs "2026/03/15" (Local)
console.log('\n--- Gotcha: Parsing Formats ---');
const isoDate = new Date('2026-03-15'); // Interpreted as UTC 00:00
const slashDate = new Date('2026/03/15'); // Interpreted as Local 00:00
console.log('ISO Date UTC Hour:', isoDate.getUTCHours());
console.log('Slash Date UTC Hour:', slashDate.getUTCHours()); // Varies by local machine timezone

// C. The Day of the Week trick
// To get the name of the day:
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
console.log('Day Name:', days[d.getDay()]);

// 4. How to Parse & Validate Dates Properly
// Expert Logic: Check if it is a Date instance AND the time is not NaN.
function isValidDate(input) {
  const d = input instanceof Date ? input : new Date(input);
  return d instanceof Date && !isNaN(d);
}

console.log('\n--- Validation ---');
console.log("Is 'hello' a date?", isValidDate('hello')); // false
console.log("Is Date('2026-03-15') a date?", isValidDate(new Date('2026-03-15'))); // true
console.log("Is '2026-03-15' a date?", isValidDate('2026-03-15')); // true (it parses correctly)
