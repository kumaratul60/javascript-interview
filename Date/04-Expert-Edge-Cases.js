/**
 * 04 - Expert Edge Cases & The Future (The "Final Boss" Level)
 *
 * These concepts separate senior developers from experts.
 */

// 1. The "Month Overflow" Trap
// Question: What is Jan 31st + 1 month?
// Expected: Feb 28th. Actual JS: March 3rd.
const jan31 = new Date(2026, 0, 31);
jan31.setMonth(jan31.getMonth() + 1);
console.log('Trap - Jan 31 + 1 Month:', jan31.toDateString());
// Why? Feb 31 doesn't exist, so JS "rolls over" the extra 3 days into March.

function addMonthsFixed(date, n) {
  const d = new Date(date);
  const expectedMonth = (d.getMonth() + n) % 12;
  d.setMonth(d.getMonth() + n);
  // If the month rolled over too far, set to the last day of the intended month
  if (d.getMonth() !== expectedMonth) {
    d.setDate(0);
  }
  return d;
}
console.log('Fixed - Jan 31 + 1 Month:', addMonthsFixed(new Date(2026, 0, 31), 1).toDateString());

// 2. Serialization: toJSON() vs toISOString()
// They look identical, but toJSON is called by JSON.stringify().
const now = new Date();
console.log('\ntoJSON:', now.toJSON());
console.log('toISOString:', now.toISOString());
// Note: Both return UTC. If the date is invalid, toJSON returns null, toISOString throws error.

// 3. High Precision Timing
// Date.now() has millisecond precision.
// performance.now() has MICROsecond precision (useful for benchmarking).
console.log('\nDate.now():', Date.now());
console.log('performance.now():', performance.now());

// 4. Calculating Business Days (Mon-Fri)
function getBusinessDays(start, end) {
  let count = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}
console.log('\nBusiness Days (Next 10 days):', getBusinessDays(new Date(), new Date(Date.now() + 10 * 86400000)));

// 5. The Future: Temporal API (Stage 3/4 Proposal)
/**
 * Expert Knowledge:
 * The 'Date' object is being replaced by 'Temporal'.
 * Why? 'Date' is mutable, lacks a proper Timezone object, and parsing is unreliable.
 *
 * Example (Hypothetical Temporal API):
 * const today = Temporal.Now.plainDateISO();
 * today.add({ months: 1 }); // Handles month overflow correctly!
 */

console.log('\n--- EXPERT SUMMARY ---');
console.log('1. Beware of month rollovers when adding time.');
console.log('2. Use performance.now() for measuring code speed.');
console.log("3. Always handle 'Invalid Date' before serialization.");
console.log('4. Stay updated on the Temporal API proposal.');
