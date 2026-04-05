/**
 * 01 - Date Creation and Epoch Time
 *
 * Checklist covered:
 * - What is Epoch Time?
 * - Timestamp vs. TimeZone
 * - 4 Ways to Create Dates
 */

// 1. What is Epoch Time?
// It is the number of milliseconds passed since January 1, 1970, 00:00:00 UTC.
console.log('Current Epoch (Timestamp):', Date.now());

// 2. The 4 Ways to Create Dates
// A. No arguments (Current moment)
const now = new Date();

// B. From Timestamp (Epoch)
const fromEpoch = new Date(1742040600000);

// C. From Date String (Careful: Parsing behavior varies by browser)
const fromString = new Date('2026-03-15T14:30:00Z'); // ISO 8601 (Recommended)

// D. From Components (Year, MonthIndex, Day, Hour, Minute, Second, ms)
// IMPORTANT: Month is 0-indexed (0 = Jan, 2 = March)
const fromComponents = new Date(2026, 2, 15, 14, 30, 0);

console.log('\n--- Creation Methods ---');
console.log('Now:', now);
console.log('Epoch:', fromEpoch);
console.log('String:', fromString);
console.log('Components:', fromComponents);

// 3. Timestamp vs. TimeZone
// A Timestamp is a SINGLE point in time globally (UTC).
// A TimeZone is just a "view" or "filter" of that point.
const timestamp = 1742040600000;
const d = new Date(timestamp);

console.log('\n--- One Timestamp, Many Views ---');
console.log('UTC View:', d.toUTCString());
console.log('Local View:', d.toString());

/**
 * BEST PRACTICE:
 * Always STORE and TRANSMIT dates as Timestamps or ISO-UTC strings.
 * Only convert to Local Time when RENDERING to the user.
 */
