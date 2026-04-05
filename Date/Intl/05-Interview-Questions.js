/**
 * Intl - Interview Questions & Edge Cases
 *
 * Common interview scenarios involving the Intl API.
 */

// 1. Invalid Date Handling
// What happens if you pass an invalid date to the formatter?
try {
  const invalid = new Date('invalid-date-string');
  new Intl.DateTimeFormat().format(invalid);
} catch (e) {
  console.log('Q1: Invalid Date Error ->', e.message); // RangeError: Invalid time value
}

// 2. formatToParts for Custom UI
// Interview Task: "Highlight only the day in red"
const date = new Date('2026-03-15T14:30:00Z');
const parts = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).formatToParts(date);
const highlighted = parts.map((p) => (p.type === 'day' ? `[[${p.value}]]` : p.value)).join('');
console.log('Q2: Highlight Day ->', highlighted); // March [[15]], 2026

// 3. 12-hour vs 24-hour (User Preference)
// Task: "Format time based on a boolean parameter for 12h/24h"
function formatTime(date, is24Hour = false) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: is24Hour ? 'h23' : 'h12',
  }).format(date);
}
console.log('Q3: 12h ->', formatTime(date, false)); // 2:30 PM
console.log('Q3: 24h ->', formatTime(date, true)); // 14:30

// 4. Checking Timezone Offset without External Libraries
// Task: "Get the timezone offset string (e.g., +05:30) for a specific IANA zone"
function getOffsetString(tzName, date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tzName,
    timeZoneName: 'longOffset',
  }).formatToParts(date);

  const offset = parts.find((p) => p.type === 'timeZoneName').value;
  return offset.replace('GMT', ''); // returns "+05:30" or "-04:00"
}
console.log('Q4: IST Offset ->', getOffsetString('Asia/Kolkata', date)); // +05:30
console.log('Q4: NYC Offset ->', getOffsetString('America/New_York', date)); // -04:00

// 5. Comparing format() vs toLocaleString()
/**
 * Interview Knowledge:
 * - date.toLocaleString('en-US', options) is just a shortcut for
 *   new Intl.DateTimeFormat('en-US', options).format(date).
 * - performance: Intl.DateTimeFormat is faster for multiple dates.
 */

/**
 * FINAL EDGE CASE: DST Transition Missing Hour
 * Clocks spring forward (lose an hour) in New York on March 8, 2026 at 2 AM.
 * 2:00 AM becomes 3:00 AM.
 */
const springForward = new Date('2026-03-08T07:05:00Z'); // 2:05 AM NYC
console.log(
  '\nQ5: DST Shift (NYC):',
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    timeStyle: 'medium',
  }).format(springForward),
);
// NYC jumped to 3:05 AM EDT (no 2 AM existed on this day)
