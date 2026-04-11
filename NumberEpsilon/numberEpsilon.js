/**
 * @file numberEpsilon.js
 * @description Deep dive into JavaScript Number Precision, EPSILON, and IEEE-754 limitations.
 * @level Intermediate-Advanced
 *
 * TOPICS COVERED:
 * 1. Floating Point Approximation (The 0.1 + 0.2 problem)
 * 2. Number.EPSILON for safe comparisons
 * 3. Integer Precision limits (MAX_SAFE_INTEGER)
 * 4. Error-free summation (twoSum pattern)
 * 5. JSON Serialization quirks with NaN/Infinity
 */

// --- 1. THE FLOATING POINT PROBLEM ---
/**
 * In JavaScript, numbers are 64-bit float (IEEE-754).
 * Some decimals cannot be represented exactly in binary.
 */
console.log('0.1 + 0.2 =', 0.1 + 0.2); // 0.30000000000000004
console.log('0.1 + 0.2 === 0.3 ?', 0.1 + 0.2 === 0.3); // false

// --- 2. THE SOLUTION: Number.EPSILON ---
/**
 * Number.EPSILON represents the smallest interval between two representable numbers.
 * It is roughly 2.22e-16.
 */
function areTheNumbersAlmostEqual(num1, num2) {
  // We check if the absolute difference is smaller than the machine epsilon
  return Math.abs(num1 - num2) < Number.EPSILON;
}
console.log('Safe comparison (0.1+0.2 vs 0.3):', areTheNumbersAlmostEqual(0.1 + 0.2, 0.3)); // true

/**
 * ⚠️ PRO-TIP: For larger numbers, you might need to scale EPSILON.
 */
const largeSum = 1000.1 + 1000.2;
const expectedLarge = 2000.3;
// Scaling EPSILON by the magnitude of the numbers
if (Math.abs(largeSum - expectedLarge) < 2000 * Number.EPSILON) {
  console.log('Large numbers equal within tolerance');
}

// --- 3. INTEGER PRECISION LIMITS ---
/**
 * Number.MAX_SAFE_INTEGER (2^53 - 1) = 9007199254740991.
 * Beyond this, integers are "skipped" because the 53-bit mantissa cannot hold them.
 */
const max = Number.MAX_SAFE_INTEGER;
console.log('Max Safe:', max); // 9007199254740991
console.log('Max + 1:', max + 1); // 9007199254740992
console.log('Max + 2:', max + 2); // 9007199254740992 (Same as +1! Precision lost)
console.log('Broken equality:', max + 1 === max + 2); // true

// --- 4. ADVANCED PATTERN: Error-Free Summation (TwoSum) ---
/**
 * Problem: Implement twoSum(x, y) returning { hi, lo } where hi + lo is the exact sum.
 * Constraint: Do not use BigInt.
 */
function twoSum(x, y) {
  const hi = x + y;
  // We calculate the part of 'y' that was "lost" during the addition to 'x'
  const lo = y - (hi - x);
  return { hi, lo };
}
console.log('TwoSum for 0.1 + 0.2:', twoSum(0.1, 0.2)); // { hi: 0.30000000000000004, lo: -2.7755575615628914e-17 }

// --- 5. JSON & SPECIAL VALUES ---
/**
 * JSON does not support NaN or Infinity.
 * JSON.stringify() silently converts them to null per spec.
 */
const specialValues = { a: NaN, b: Infinity, c: -Infinity };
console.log('JSON Special Values:', JSON.stringify(specialValues)); // {"a":null,"b":null,"c":null}

// Custom Replacer to preserve them as strings
const safeJson = JSON.stringify(specialValues, (_, value) =>
  typeof value === 'number' && !Number.isFinite(value) ? String(value) : value,
);
console.log('Preserved Special Values:', safeJson); // {"a":"NaN","b":"Infinity","c":"-Infinity"}

// --- 6. MISCELLANEOUS QUIRKS (Preserved from original) ---

// A. Arrow Function Scope vs Object Return
const fn = () => ({ a: 1 }); // Wrapped in parens to return object literal
const fnRegular = function () {
  return { a: 1 };
};

// B. Intl.RelativeTimeFormat (Modern Web API)
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log('RTF Example (-2 months):', rtf.format(-2, 'month')); // "2 months ago"

// C. Object Keys & Labels
// Labels in JS: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
const labelExample = () => {
  label: 1; // This is a label, not an object key!
};

// D. Objects as Keys (Stringification)
const mapObj = {};
const k1 = {};
const k2 = {};
mapObj[k1] = 'xy'; // k1 becomes "[object Object]"
console.log('Key [object Object]:', mapObj[k2]); // 'xy' (because k2 also stringifies to same thing)
