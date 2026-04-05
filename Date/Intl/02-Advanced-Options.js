/**
 * Intl.DateTimeFormat - Advanced Options
 *
 * Fine-grained control over date/time components.
 */

const date = new Date('2026-03-15T14:30:00Z');

// 1. Fine-grained Component Control
console.log(
  'Custom format (en-US):',
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long', // "narrow", "short", "long"
    month: '2-digit', // "numeric", "2-digit", "narrow", "short", "long"
    day: 'numeric', // "numeric", "2-digit"
    year: 'numeric', // "numeric", "2-digit"
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date),
);
// Sunday, 03/15/2026, 2:30:00 PM

// 2. formatToParts()
// Returns an array of objects containing the formatted parts.
// Useful for custom styling (e.g., coloring the year differently).
const parts = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).formatToParts(date);
console.log('\n--- formatToParts() ---');
console.log(parts);
/*
[
  { "type": "weekday", "value": "Sunday" },
  { "type": "literal", "value": ", " },
  { "type": "month", "value": "March" },
  ...
]
*/

// 3. hourCycle (h11, h12, h23, h24)
// Precise control over 12-hour vs 24-hour clocks.
// h23: 0–23 (Standard 24h)
// h24: 1–24 (Rarely used)
// h11: 0–11 (PM/AM)
// h12: 1–12 (PM/AM)
console.log(
  '\nh23 (Standard 24h):',
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23' }).format(date),
); // 14
console.log(
  'h12 (Standard 12h):',
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h12' }).format(date),
); // 2 PM

// 4. Numbering System (e.g., 'arab', 'hans', 'deva')
console.log('\nNumbering System (Arabic-Indic):', new Intl.DateTimeFormat('en-US-u-nu-arab').format(date));
// ٣/١٥/٢٠٢٦

// 5. Calendar (e.g., 'islamic', 'buddhist', 'indian')
console.log('Calendar (Buddhist):', new Intl.DateTimeFormat('en-US-u-ca-buddhist').format(date));
// 3/15/2569 BE

/**
 * INTERVIEW TIP: Customizing parts
 * Use formatToParts() if you need to wrap the date parts in HTML elements like <span>.
 */
function highlightYear(date) {
  const parts = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).formatToParts(date);
  return parts.map((p) => (p.type === 'year' ? `<b style="color: red;">${p.value}</b>` : p.value)).join('');
}
// console.log(highlightYear(date)); // "March <b style=\"color: red;\">2026</b>"
