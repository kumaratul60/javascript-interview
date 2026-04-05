/**
 * Intl - Range and Relative Formatting
 *
 * Includes formatRange and RelativeTimeFormat.
 */

const start = new Date('2026-03-10T10:00:00Z');
const end = new Date('2026-03-15T10:00:00Z');

// 1. formatRange()
// Intelligently formats a date range.
const rangeFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
console.log('Range:', rangeFmt.formatRange(start, end));
// Mar 10 - 15, 2026

const rangeTimeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });
console.log('Time Range:', rangeTimeFmt.formatRange(start, new Date('2026-03-10T12:00:00Z')));
// 10:00 AM – 12:00 PM

// 2. Intl.RelativeTimeFormat()
// Used for "yesterday", "2 days ago", "next week", etc.
const relative = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto', // "always" (1 day ago) or "auto" (yesterday)
  style: 'long', // "long", "short", "narrow"
});

console.log('\n--- Relative Time ---');
console.log('-1 day:', relative.format(-1, 'day')); // yesterday
console.log('+1 day:', relative.format(1, 'day')); // tomorrow
console.log('-2 hours:', relative.format(-2, 'hour')); // 2 hours ago
console.log('short style:', new Intl.RelativeTimeFormat('en', { style: 'short' }).format(-1, 'week')); // 1 wk. ago

/**
 * INTERVIEW PROBLEM: "Time Ago" helper
 * Create a function that calculates the largest relative time part.
 */
function getRelativeTime(d1, d2 = new Date()) {
  const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const elapsed = d1 - d2;

  for (let u in units) {
    if (Math.abs(elapsed) > units[u] || u === 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u);
    }
  }
}

// console.log(getRelativeTime(Date.now() - 3600000)); // "1 hour ago"
// console.log(getRelativeTime(Date.now() + 86400000)); // "tomorrow"
