/**
 * Intl.DateTimeFormat - Timezones
 *
 * Essential for interview questions related to worldwide user bases.
 */

const date = new Date('2026-03-15T14:30:00Z'); // 2:30 PM UTC

// 1. timeZone: IANA Timezone Names (e.g., 'America/New_York', 'Asia/Kolkata')
console.log('UTC:', new Intl.DateTimeFormat('en-US', { timeStyle: 'full', timeZone: 'UTC' }).format(date));
// 2:30:00 PM Coordinated Universal Time

console.log(
  'IST (India):',
  new Intl.DateTimeFormat('en-IN', { timeStyle: 'full', timeZone: 'Asia/Kolkata' }).format(date),
);
// 8:00:00 PM IST

console.log(
  'EST (New York):',
  new Intl.DateTimeFormat('en-US', { timeStyle: 'full', timeZone: 'America/New_York' }).format(date),
);
// 10:30:00 AM Eastern Time

// 2. timeZoneName: short | long | shortOffset | longOffset
console.log(
  '\ntimeZoneName (short):',
  new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', timeZoneName: 'short' }).format(date),
);
// 3/15/2026, 10:30 AM EDT

console.log(
  'timeZoneName (longOffset):',
  new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', timeZoneName: 'longOffset' }).format(date),
);
// 3/15/2026, 10:30 AM GMT-04:00

// 3. DST (Daylight Saving Time)
// Some regions shift their time twice a year.
// NYC (America/New_York) starts DST in mid-March.
const march10 = new Date('2026-03-10T14:30:00Z'); // Before DST shift
const march20 = new Date('2026-03-20T14:30:00Z'); // After DST shift

console.log('\n--- DST Shift ---');
console.log(
  'Before DST (March 10):',
  new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'America/New_York' }).format(march10),
); // 9:30 AM
console.log(
  'After DST (March 20):',
  new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'America/New_York' }).format(march20),
); // 10:30 AM

// 4. Checking if a Timezone is Supported
try {
  new Intl.DateTimeFormat('en-US', { timeZone: 'Invalid/Zone' });
} catch (e) {
  console.log('\nError:', e.message); // RangeError: Invalid time zone specified: Invalid/Zone
}

/**
 * INTERVIEW PROBLEM: Compare two timezones
 * Check if two locations are currently at the same time.
 */
function isSameLocalTime(date, tz1, tz2) {
  const format = (tz) =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hourCycle: 'h23',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);

  return format(tz1) === format(tz2);
}

// console.log(isSameLocalTime(date, 'Europe/London', 'Africa/Casablanca')); // true (both UTC+0 in winter)
