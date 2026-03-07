// ============================================================
// DATE GENERATION: EXAMPLES, TRAPS, EDGE CASES
// ============================================================

// ------------------------------------------------------------
// 1) BASIC: Generate next N days (LOCAL time)
// ------------------------------------------------------------
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function nextNDaysLocal(n, from = new Date()) {
  const start = new Date(from);
  return Array.from({ length: n }, (_, i) => new Date(start.getTime() + i * MS_PER_DAY));
}

console.log('Next 7 days (local):', nextNDaysLocal(7));

// ------------------------------------------------------------
// 2) SAFE FOR DST: Generate dates using UTC (no DST jumps)
// ------------------------------------------------------------
function addDaysUTC(date, days) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));
}

function nextNDaysUTC(n, from = new Date()) {
  const startUTC = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  return Array.from({ length: n }, (_, i) => addDaysUTC(startUTC, i));
}

console.log('Next 7 days (UTC):', nextNDaysUTC(7));

// ------------------------------------------------------------
// 3) DATE RANGE: Inclusive range (LOCAL)
// ------------------------------------------------------------
function dateRangeLocal(start, end) {
  const res = [];
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);
  while (cur <= endDate) {
    res.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return res;
}

console.log('Range local:', dateRangeLocal('2026-03-01', '2026-03-05'));

// ------------------------------------------------------------
// 4) FORMAT: ISO date (YYYY-MM-DD)
// ------------------------------------------------------------
function toISODateString(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

console.log('ISO Date:', toISODateString(new Date()));

// ============================================================
// INTERVIEW TRAPS & EDGE CASES
// ============================================================

// Trap 1: Off-by-ms bug (adding 1 instead of 1 day)
// Wrong: Date.now() + days   (days is not in ms)
// Right: Date.now() + days * MS_PER_DAY

// Trap 2: Month is 0-based in JS Date
// new Date(2026, 0, 1) => Jan 1, 2026
// new Date(2026, 1, 1) => Feb 1, 2026

// Trap 3: DST can shift local "midnight" by +/- 1 hour
// Use UTC math when you need consistent day increments.

// Trap 4: Parsing "YYYY-MM-DD" is treated as UTC by spec
// new Date('2026-03-01') => 2026-03-01T00:00:00.000Z (UTC)
// In local time this may display as previous day depending on timezone.

// Trap 5: Parsing numeric-like strings can be surprising
// new Date('45') -> 1945-01-01T00:00:00.000Z (year 1945 in UTC)
// new Date('045') -> 1945-01-01T00:00:00.000Z (still 1945)
// new Date('5') -> 2001-05-01T00:00:00.000Z (treated as May 1, 2001)
// Always prefer explicit formats (e.g., '2026-03-01') or numeric args.

// Trap 6: Date mutation
// setDate mutates the original object. Use new Date(old) when needed.

// ============================================================
// INTERVIEW QUESTIONS (WITH SHORT ANSWERS)
// ============================================================

// Q1: How to get "today at midnight" safely?
// A1: Use setHours(0,0,0,0) on a copy for local, or Date.UTC for UTC.

// Q2: Why might date ranges skip or repeat a day?
// A2: DST transitions in local time can shift by an hour.

// Q3: How do you add N days without DST issues?
// A3: Use UTC getters/setters or Date.UTC with day math.

// Q4: What is wrong with new Date('2026-03-01') in local UI?
// A4: It's parsed as UTC; local display can show previous day.

// Q5: How do you compare only calendar dates?
// A5: Normalize to midnight (local or UTC), then compare timestamps.

// ============================================================
// QUICK EXAMPLES
// ============================================================

// Example 1: Generate last 7 days (UTC)
function lastNDaysUTC(n, from = new Date()) {
  const startUTC = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  return Array.from({ length: n }, (_, i) => addDaysUTC(startUTC, -i));
}

console.log('Last 7 days (UTC):', lastNDaysUTC(7));

// Example 2: Check if two dates are same day (UTC)
function isSameDayUTC(a, b) {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

console.log('Same day UTC?', isSameDayUTC(new Date(), new Date()));
