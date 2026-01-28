# Floating-Point Arithmetic: The TwoSum Problem

## Table of Contents
1. [Problem Statement](#1-problem-statement)
2. [The Contenders: Bad vs. Best](#2-the-contenders-bad-vs-best)
3. [When is one "Better" than the other?](#3-when-is-one-better-than-the-other)
4. [Interview Script: How to explain it](#4-interview-script-how-to-explain-it)
5. [Scenario Examples (To help understanding)](#5-scenario-examples-to-help-understanding)
6. [More Concrete Examples](#6-more-concrete-examples)

## 1. Problem Statement

**Goal:** Implement a function `twoSum(x, y)` that computes the exact sum of two floating-point numbers using error-free transformation (EFT).

**Returns:** An object `{ hi, lo }` where:

- `hi`: The standard IEEE-754 rounded sum.
- `lo`: The rounding error (lost precision).

**Constraints:**

- Do not initialize `lo` to 0.
- Do not use BigInt.
- `hi + lo` must mathematically equal `x + y`.

---

## 2. The Contenders: Bad vs. Best

### Option A: FastTwoSum (The Trap)

_Commonly written by Junior/Mid engineers who find a formula online but do not understand the constraints._

```javascript
function fastTwoSum(x, y) {
  const hi = x + y;
  const lo = y - (hi - x); // Warning: Unsafe
  return { hi, lo };
}
```

#### The Pitfall

This function **only works** if `|x| >= |y|` (the magnitude of x is greater than or equal to y). If you pass a small `x` and a large `y`, the calculation `(hi - x)` loses the information needed to calculate `lo` correctly.

**Failing Example:**

```javascript
// A small number and a large number
const small = 1;
const big = 1e16;

// Calling it with wrong order: (small, big)
const result = fastTwoSum(1, 1e16);
// result.hi = 1e16  (Correct rounded sum)
// result.lo = 0     (Incorrect. The '1' was lost entirely.)

// Why?
// hi - x  => 1e16 - 1 => 1e16 (due to rounding)
// lo = y - 1e16 => 1e16 - 1e16 => 0
```

---

### Option B: Dekker's Algorithm (The Solution)

_The Senior/Staff choice. Safe, robust, and order-independent._

```javascript
function dekkerTwoSum(x, y) {
  const hi = x + y;
  const z = hi - x; // Virtual split point
  const lo = x - (hi - z) + (y - z); // Recovers error from BOTH sides
  return { hi, lo };
}
```

#### Why this is better

It introduces a temporary variable `z`. This variable helps isolate the parts of `x` and `y` that actually contributed to `hi`.

- **Order Independent:** Works for `twoSum(1, 1e16)` AND `twoSum(1e16, 1)`.
- **Handles Cancellation:** Works even when numbers cancel each other out (e.g., `1.000001` and `-1`).

---

## 3. When is one "Better" than the other?

This is a **Staff-Level** discussion point. It is not just about correctness, but about cost.

| Feature    | FastTwoSum (Option A)            | Dekker/Knuth (Option B)    |
| ---------- | -------------------------------- | -------------------------- |
| Operations | 3 Floating-Point Ops             | 6 Floating-Point Ops       |
| Safety     | Unsafe (requires a precondition) | Safe (always correct)      |
| Speed      | Extremely fast                   | ~2× slower than FastTwoSum |

**The Trade-off Decision:**
In modern CPUs, **branching** (checking `if x < y`) is often more expensive than doing extra math due to branch misprediction.

- **Result:** It is usually _better_ to use **Dekker (Option B)** and pay the cost of 3 extra math operations than to use **FastTwoSum** and pay the cost of an `if` statement.

---

## 4. Interview Script: How to explain it

When the interviewer asks you to explain your code, follow this exact script to demonstrate seniority.

### Step 1: Write Dekker's (The long version)

```javascript
function twoSum(x, y) {
  const hi = x + y;
  const z = hi - x;
  const lo = x - (hi - z) + (y - z);
  return { hi, lo };
}
```

### Step 2: The "Why" (Your explanation)

> "I chose Dekker's algorithm here. The key variable is `z`. This line `z = hi - x` helps us virtually split the summation. Because of this, this function handles any magnitude difference between X and Y. It doesn't matter if X is tiny and Y is huge, or vice versa."

### Step 3: Contrast with the "Bad" version

> "There is a shorter version called `FastTwoSum` that only takes 3 lines. However, that version assumes `|x| >= |y|`. If I used that, I would have to manually sort `x` and `y` at the start. In high-performance computing, the cost of that 'if-check' is often higher than the extra math lines here, so Dekker is safer and usually faster in practice."

### Step 4: The Goal (The "Staff" Statement)

> "Ultimately, we are implementing an Error-Free Transformation (EFT). The goal isn't just to add numbers, but to extend precision. This allows us to chain operations (like in a Kahan sum or Dot Product) without the error accumulating to garbage."

---

## 5. Scenario Examples (To help understanding)

Use these concrete examples to explain _why_ we need `lo`.

### Example 1: The "Why isn't lo zero?" Question

**Scenario:**
`twoSum(1e16, 1)` -> `{ hi: 1e16, lo: 1 }`

**Explanation:**
"Imagine you have a suitcase (`hi`) that fits exactly 16 zeros.
You try to pack `1000...000` (16 zeros) and `1`.
The `1` falls out of the suitcase.
If we return `{ hi: 1e16, lo: 0 }`, we pretend the `1` never existed. That is incorrect.
By returning `{ lo: 1 }`, we are handing the user the 'fallen' item so they can use it later."

### Example 2: Catastrophic Cancellation

**Scenario:**
`twoSum(1.000000000000001, -1)`

- **Naive Math:** `0.000000000000001`
- **JS Math:** `1.1102...e-16` (This actually works in JS because the numbers are close).

But if the numbers are far apart:
`x = 1e20 + 1` (Not representable, rounds to `1e20`)
`y = -1e20`

`twoSum(1e20, -1e20)`

- `hi` = 0
- `lo` = 0 (If we lost the `+1` earlier)
- **Dekker** catches this because it reconstructs the error from the inputs.

---

## Summary for the Candidate

1.  **Do not** force `lo = 0`.
2.  **Do** use the 6-line Dekker formula.
3.  **Do** mention that the 3-line formula (FastTwoSum) is buggy without sorting.
4.  **Do** explain that `lo` represents "lost bits," not just "math error."

---

## 6. More Concrete Examples

Let's use the two functions defined in the document to see the difference in practice.

```javascript
// Unsafe: only works if |x| >= |y|
function fastTwoSum(x, y) {
  const hi = x + y;
  const lo = y - (hi - x);
  return { hi, lo };
}

// Safe: works for any input
function dekkerTwoSum(x, y) {
  const hi = x + y;
  const z = hi - x;
  const lo = x - (hi - z) + (y - z);
  return { hi, lo };
}
```

### Case 1: The Safe Case (`|x| >= |y|`)

Both functions work correctly here.

```javascript
const x = 1e16;
const y = 1;

const fastResult = fastTwoSum(x, y);
// fastResult -> { hi: 1e+16, lo: 1 }
// hi + lo mathematically equals 1e16 + 1. Correct.

const dekkerResult = dekkerTwoSum(x, y);
// dekkerResult -> { hi: 1e+16, lo: 1 }
// hi + lo mathematically equals 1e16 + 1. Correct.
```

### Case 2: The Failing Case (`|x| < |y|`)

Here, `fastTwoSum` fails to capture the rounding error.

```javascript
const x = 1;
const y = 1e16;

const fastResult = fastTwoSum(x, y);
// fastResult -> { hi: 1e+16, lo: 0 }
// The '1' is lost. Incorrect.

const dekkerResult = dekkerTwoSum(x, y);
// dekkerResult -> { hi: 1e+16, lo: 1 }
// The '1' is correctly captured in 'lo'. Correct.
```
