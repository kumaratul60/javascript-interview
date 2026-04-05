/**
 * 03 - Date Arithmetic and Leap Year Logic
 *
 * Checklist covered:
 * - Date Arithmetic: Adding & Subtracting Time
 * - The Leap Year Logic
 * - Storing vs. Rendering Dates
 * - Final Recap (Logic)
 */

const date = new Date('2026-03-15T14:30:00Z');

// 1. Date Arithmetic: Adding & Subtracting Time
// Method A: Manual (using get/set)
const tomorrow = new Date(date);
tomorrow.setDate(date.getDate() + 1);
console.log('Tomorrow (Manual):', tomorrow.toISOString());

// Method B: Millisecond manipulation (Faster for small changes)
const oneHour = 60 * 60 * 1000;
const hourLater = new Date(date.getTime() + oneHour);
console.log('Hour Later:', hourLater.toISOString());

// 2. The Leap Year Logic
// Logic: A year is leap if (divisible by 4 and NOT by 100) OR (divisible by 400).
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log('\n--- Leap Year Check ---');
console.log('2024 is leap?', isLeapYear(2024)); // true
console.log('2026 is leap?', isLeapYear(2026)); // false
console.log('2000 is leap?', isLeapYear(2000)); // true (divisible by 400)

// JavaScript Hack: Get the last day of February!
// Day 0 of March is always the last day of February.
function getDaysInFeb(year) {
  return new Date(year, 2, 0).getDate();
}
console.log('Days in Feb 2024:', getDaysInFeb(2024)); // 29

// 3. Storing vs. Rendering Dates
// BEST PRACTICE:
// - DATABASE: Always store as UTC (ISO-8601 string or numeric timestamp).
// - API: Send/Receive ISO-8601 strings.
// - FRONTEND: Use `Intl.DateTimeFormat` (or `toLocaleString`) for display based on user locale.

const storedDate = '2026-03-15T14:30:00Z'; // UTC from DB
const userLocale = 'en-IN'; // User from India
console.log('\n--- Rendering Best Practice ---');
console.log(
  'Rendered for User:',
  new Intl.DateTimeFormat(userLocale, { dateStyle: 'full' }).format(new Date(storedDate)),
);

/**
 * FINAL RECAP:
 * - Handle logic in UTC where possible.
 * - Always use standard libraries or `Intl` for formatting.
 * - Beware of 0-indexed months and parsing machine-specific variations.
 */
