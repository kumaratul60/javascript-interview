# JavaScript Date & Intl API - The Complete Interview Masterclass (0-100)

This directory contains a comprehensive guide to mastering Date and Time in JavaScript, ranging from fundamental concepts to expert-level internationalization and edge-case handling.

## 📁 Directory Structure

### 🛠️ Core Date API (The Foundation)

- **`01-Creation-and-Epoch.js`**: Epoch time, the 4 ways to create dates, and Timestamp vs. Timezone.
- **`02-Getters-Setters-Gotchas.js`**: Essential methods, the 0-indexed month trap, and validation techniques.
- **`03-Date-Arithmetic-Logic.js`**: Adding/subtracting time, leap year logic, and best practices for storage vs. rendering.
- **`04-Expert-Edge-Cases.js`**: Month overflow bugs, high-precision timing, business day calculation, and the future (Temporal API).

### 🌐 Internationalization (Intl API)

Located in the `/Intl` sub-directory:

- **`01-Formatting-Basics.js`**: Locales and the shortcut `dateStyle`/`timeStyle` APIs.
- **`02-Advanced-Options.js`**: Fine-grained control, `formatToParts`, and custom calendars.
- **`03-TimeZones.js`**: IANA timezone names, DST handling, and offset calculation.
- **`04-Range-and-Relative.js`**: `formatRange` and `Intl.RelativeTimeFormat` (e.g., "2 days ago").
- **`05-Interview-Questions.js`**: Targeted challenges and common pitfalls.
- **`06-Expert-Level-Intl.js`**: Millisecond precision, day periods, and `resolvedOptions()` mastery.

### 🏆 Challenges

- **`Complete-Date-Challenges.js`**: 20 hand-picked interview tasks covering every level from beginner to expert.

---

## 🚀 Key Takeaways for Interview Mastery

### 1. The "Month" Trap

In JavaScript, months are **0-indexed** (January is `0`, December is `11`). However, days of the month are **1-indexed**.
_Tip: `new Date(2026, 2, 0)` gives you the last day of February!_

### 2. Storage vs. Display

- **Rule:** Always **Store** in UTC (Timestamps or ISO-8601 strings) and **Display** in Local time using `Intl.DateTimeFormat`.

### 3. Timestamp vs. Timezone

- A **Timestamp** is a single point in time globally (UTC).
- A **Timezone** is just a "lens" through which we view that point.

### 4. Why `Intl` over `Date`?

- `Intl` handles Daylight Saving Time (DST) and locale-specific formatting (like Arabic or Japanese calendars) automatically.
- `Intl.DateTimeFormat` instances should be **cached** for performance if used in loops.

### 5. DST Transitions

Dates are tricky during "Spring Forward" (an hour disappears) and "Fall Back" (an hour happens twice). Use `setDate(getDate() + n)` for human-safe arithmetic instead of raw millisecond math.

---

## ⚡ Quick Snippets for the Interview

### Create Local Midnight Date

```javascript
const [y, m, d] = '2026-03-15'.split('-').map(Number);
const localDate = new Date(y, m - 1, d);
```

### Format for Indian User (24h)

```javascript
new Intl.DateTimeFormat('en-IN', {
  timeStyle: 'medium',
  hourCycle: 'h23',
  timeZone: 'Asia/Kolkata',
}).format(new Date());
```

### Relative Time ("Yesterday")

```javascript
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
rtf.format(-1, 'day'); // "yesterday"
```

### Range Formatting

```javascript
const fmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
fmt.formatRange(new Date(), new Date(Date.now() + 86400000)); // "Oct 25 – 26, 2023"
```
