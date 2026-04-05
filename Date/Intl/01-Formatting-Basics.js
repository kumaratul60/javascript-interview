/**
 * Intl.DateTimeFormat - Formatting Basics
 *
 * The Intl.DateTimeFormat object enables language-sensitive date and time formatting.
 */

// const {log} = console

const date = new Date('2026-03-15T14:30:00Z');

// 1. Basic Usage (Browser default locale)
console.log('Default:', new Intl.DateTimeFormat().format(date));

// 2. Locale Differences
// Locales use BCP 47 language tags (e.g., 'en-US', 'hi-IN', 'ja-JP')
console.log('US (en-US):', new Intl.DateTimeFormat('en-US').format(date)); // 3/15/2026
console.log('UK (en-GB):', new Intl.DateTimeFormat('en-GB').format(date)); // 15/03/2026
console.log('Germany (de-DE):', new Intl.DateTimeFormat('de-DE').format(date)); // 15.3.2026
console.log('Japan (ja-JP):', new Intl.DateTimeFormat('ja-JP').format(date)); // 2026/3/15
console.log('India (hi-IN):', new Intl.DateTimeFormat('hi-IN').format(date)); // 15/3/2026

// 3. Using dateStyle and timeStyle (Shortcut APIs)
// These are easier than specifying every single part.
const styles = ['full', 'long', 'medium', 'short'];

console.log('\n--- Date Styles (en-US) ---');
styles.forEach((style) => {
  console.log(`${style.padEnd(7)}:`, new Intl.DateTimeFormat('en-US', { dateStyle: style }).format(date));
});
/*
full   : Sunday, March 15, 2026
long   : March 15, 2026
medium : Mar 15, 2026
short  : 3/15/26
*/

console.log('\n--- Time Styles (en-US) ---');
styles.forEach((style) => {
  // Note: 'full' and 'long' include timezone information
  console.log(
    `${style.padEnd(7)}:`,
    new Intl.DateTimeFormat('en-US', { timeStyle: style, timeZone: 'UTC' }).format(date),
  );
});
/*
full   : 2:30:00 PM Coordinated Universal Time
long   : 2:30:00 PM UTC
medium : 2:30:00 PM
short  : 2:30 PM
*/

// 4. Combining Date and Time
console.log(
  '\nCombined:',
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date),
);
// Mar 15, 2026, 2:30 PM

/**
 * INTERVIEW TIP: Performance
 * Creating a new Intl.DateTimeFormat object is expensive.
 * If you are formatting many dates in a loop or a React component,
 * reuse the formatter instance.
 */

// BAD:
// for (let d of dates) console.log(new Intl.DateTimeFormat('en-US').format(d));

// GOOD:
const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
// console.log(formatter.format(date));
