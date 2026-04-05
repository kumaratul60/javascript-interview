/**
 * Intl - Expert Level Features (The "100" Level)
 *
 * Rare but powerful features that show deep mastery of the API.
 */

const date = new Date('2026-03-15T09:30:00Z');

// 1. resolvedOptions()
// This tells you exactly what settings the Intl object is using.
// Very useful when you pass multiple locales and want to see which one was supported.
const fmt = new Intl.DateTimeFormat(['en-IN', 'en-US'], {
  timeZone: 'Asia/Kolkata',
  calendar: 'gregory',
});

console.log('--- resolvedOptions ---');
console.log(fmt.resolvedOptions());
/*
{
  locale: "en-IN",
  calendar: "gregory",
  numberingSystem: "latn",
  timeZone: "Asia/Kolkata",
  year: "numeric", month: "numeric", day: "numeric"
  ...
}
*/

// 2. fractionalSecondDigits (1, 2, or 3)
// Essential for logs or scientific applications.
console.log('\n--- Precision (Milliseconds) ---');
console.log(
  '3-digits:',
  new Intl.DateTimeFormat('en-US', {
    second: 'numeric',
    fractionalSecondDigits: 3,
  }).format(date),
); // 00.000

// 3. dayPeriod ("narrow", "short", "long")
// Instead of just AM/PM, this gives "in the morning", "noon", "at night".
console.log('\n--- Day Periods ---');
const dayPeriodFmt = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  dayPeriod: 'long',
});
console.log('Morning:', dayPeriodFmt.format(new Date('2026-03-15T09:00:00Z'))); // 9 in the morning
console.log('Night:', dayPeriodFmt.format(new Date('2026-03-15T22:00:00Z'))); // 10 at night

// 4. supportedLocalesOf()
// Check if a browser actually supports a specific locale before using it.
const locales = ['hi-IN', 'unknown-locale', 'fr-FR'];
const supported = Intl.DateTimeFormat.supportedLocalesOf(locales);
console.log('\nSupported Locales:', supported); // ["hi-IN", "fr-FR"]

/**
 * EXPERT INTERVIEW CHALLENGE:
 * "Create a formatter that falls back to a 24-hour clock ONLY if the
 * locale's default numbering system is not 'latn'."
 */
function smartFormatter(locale) {
  const tempFmt = new Intl.DateTimeFormat(locale);
  const options = tempFmt.resolvedOptions();

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: options.numberingSystem === 'latn',
  });
}
// This shows you know how to inspect the environment before formatting.
