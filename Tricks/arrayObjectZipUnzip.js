// ============================================================
// SECTION 1: TRANSFORMING ARRAYS TO OBJECTS (ZIP)
// ============================================================

const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];

/**
 * 1️⃣ Arrays → Object (Classic for loop)
 * Note: If values.length < keys.length, missing values will be 'undefined'.
 */
const obj = {};
for (let i = 0; i < keys.length; i++) {
  obj[keys[i]] = values[i];
}

/**
 * 2️⃣ Arrays → Object (Reduce - Optimized Mutation)
 * While this uses reduce, it mutates the accumulator 'acc' for performance (O(n)).
 */
const objReduce = keys.reduce((acc, key, i) => {
  acc[key] = values[i];
  return acc;
}, {});

/**
 * 3️⃣ Arrays → Object (Reduce - Truly Immutable)
 * Creates a NEW object on every iteration using the spread operator.
 * Warning: This is O(n²) due to object copying; avoid for large arrays.
 */
const objImmutable = keys.reduce(
  (acc, key, i) => ({
    ...acc,
    [key]: values[i],
  }),
  {},
);

/**
 * 4️⃣ Arrays → Object (Object.fromEntries)
 * Modern, readable, but also results in 'undefined' for missing values.
 */
const objFromEntries = Object.fromEntries(keys.map((k, i) => [k, values[i]]));

// ============================================================
// SECTION 2: TRANSFORMING OBJECTS TO ARRAYS (UNZIP)
// ============================================================

const sampleObj = { a: 1, b: 2 };

/**
 * 5️⃣ Manual Object → Keys/Values (Compatibility Note)
 */
for (let key in sampleObj) {
  // Modern (ES2022+):
  if (Object.hasOwn(sampleObj, key)) {
    /* ... */
  }

  // Legacy/High Compatibility:
  if (Object.prototype.hasOwnProperty.call(sampleObj, key)) {
    // This is safer than sampleObj.hasOwnProperty(key) because
    // it works even if the object has a null prototype.
  }
}

// ============================================================
// SECTION 3: INTERVIEW TRAPS & EDGE CASES
// ============================================================

/**
 * Trap 1: Duplicate Keys
 * Last-one-wins behavior.
 */

/**
 * Trap 2: Length Mismatch
 * zip(['a','b'], [1]) → { a: 1, b: undefined }
 * Solution: Always check if i < values.length or use a "Safe Zip" utility.
 */

/**
 * Trap 3: Prototype Pollution
 * for...in includes inherited properties. Use Object.keys() or hasOwn().
 */

/**
 * Trap 4: Object Key Types
 * Correction: Object keys can ONLY be Strings or Symbols.
 * All other types (Numbers, Booleans, Objects) are coerced to Strings.
 */
const sym = Symbol('id');
const keyTypeObj = {
  [sym]: 'symbol value', // Valid Symbol key
  1: 'number key', // Becomes string "1"
  true: 'boolean key', // Becomes string "true"
};

// ============================================================
// SECTION 4: CONCISE INTERVIEW QUESTIONS
// ============================================================

/**
 * Q: How do you handle a "Zip" where keys might be null or objects?
 * A: Use a Map. Maps allow ANY data type as a key and preserve type.
 */
const map = new Map();
map.set({ id: 1 }, 'user1'); // Valid: Object as key

// ============================================================
// SENIOR TAKEAWAY & MENTAL MODEL
// ============================================================
/**
 * Senior Engineer Mindset:
 * 1. Immutability vs. Performance: In reduce, mutating the accumulator is
 *    often preferred over spread (...acc) for O(n) performance in hot paths.
 * 2. Key Precision: Objects = Strings/Symbols. Maps = Anything.
 * 3. Compatibility: Be aware that Object.hasOwn is newer; use hasOwnProperty.call
 *    for library code or legacy environments.
 * 4. Safety: Explicitly handle length mismatches (e.g., throwing or defaults)
 *    rather than relying on 'undefined' behavior.
 */
