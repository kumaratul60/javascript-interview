/**
 * @fileoverview
 * Flatten a deeply nested object without using built-in flat() methods.
 * Must handle:
 * 1. Deeply nested objects/arrays.
 * 2. Circular references (prevent infinite loops).
 * 3. Dot notation for keys.
 */

/**
 * Flattens an object into a single-level object with dot-notation keys.
 * 
 * @param {Object|Array} obj - The object to flatten.
 * @param {string} prefix - The current key prefix (used for recursion).
 * @param {WeakSet} seen - Track visited objects to handle circular references.
 * @returns {Object} - The flattened object.
 */
function flattenObject(obj, prefix = '', seen = new WeakSet()) {
  let result = {};

  // If the value is a primitive or null, we can't iterate it.
  if (obj === null || typeof obj !== 'object') {
    return { [prefix]: obj };
  }

  // Handle Circular References
  if (seen.has(obj)) {
    return { [prefix]: '[Circular]' };
  }
  seen.add(obj);

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value !== null && typeof value === 'object') {
        // Recursive call for nested objects/arrays
        const nestedFlattened = flattenObject(value, newKey, seen);
        Object.assign(result, nestedFlattened);
      } else {
        // Primitive value
        result[newKey] = value;
      }
    }
  }

  return result;
}

/**
 * 📈 Complexity Analysis:
 * -----------------------
 * Time Complexity: O(N) 
 * where N is the total number of keys/elements in the nested structure.
 * Every key is visited exactly once.
 * 
 * Space Complexity: O(D + N)
 * - O(D) where D is the depth of the object (recursion stack).
 * - O(N) for the resulting flattened object and the 'seen' WeakSet.
 * 
 * 💡 Optimizations & Edge Cases:
 * 1. WeakSet: Used for memory efficiency as it doesn't prevent garbage collection.
 * 2. Array handling: In this implementation, arrays are treated as objects with numeric keys.
 * 3. Dot Notation: Standard way to represent depth in flattened objects.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

// Case 1: Standard Deeply Nested Object
const nested = {
  user: {
    id: 1,
    details: {
      name: 'John Doe',
      address: {
        city: 'New York',
        zip: 10001
      }
    }
  },
  roles: ['admin', 'editor']
};

console.log("Standard Flatten:");
console.log(flattenObject(nested));

// Case 2: Circular Reference
const circular = { a: 1 };
circular.self = circular;

console.log("\nCircular Reference Handling:");
console.log(flattenObject(circular));

// Case 3: Mixed Types
const mixed = {
  a: null,
  b: undefined,
  c: 0,
  d: false,
  e: [1, { f: 2 }]
};

console.log("\nMixed Types Flatten:");
console.log(flattenObject(mixed));
