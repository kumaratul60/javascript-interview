/**
 * @fileoverview
 * Deep Merge Objects
 * A frequent interview question for frontend/fullstack roles.
 * 
 * Target: Implement a function that merges two or more objects 
 * recursively.
 */

/**
 * Deep merges two objects.
 * 
 * @param {Object} target - The destination object.
 * @param {Object} source - The object to merge into target.
 * @returns {Object} - The merged target.
 */
function deepMerge(target, source) {
  // If either is not an object, return the source (override)
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        // Option 1: Concatenate arrays
        target[key] = targetValue.concat(sourceValue);
        // Option 2: Override (sourceValue) - depends on requirements
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        // Recursive merge for nested objects
        target[key] = deepMerge({ ...targetValue }, sourceValue);
      } else {
        // Primitive override
        target[key] = sourceValue;
      }
    }
  }

  return target;
}

/**
 * Helper to check if a value is a plain object
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * 📈 Complexity Analysis:
 * -----------------------
 * Time Complexity: O(N) where N is the total number of keys across all objects.
 * Space Complexity: O(D) where D is the maximum depth of the objects (recursion stack).
 * 
 * 💡 Practical Note:
 * Libraries like Lodash (`_.merge`) or deepmerge are used in production, 
 * but implementing it from scratch shows understanding of recursion and 
 * type checking.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

const obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 },
  c: [1, 2]
};

const obj2 = {
  b: { b2: 20, b3: 30 },
  c: [3],
  d: 4
};

console.log("Deep Merge Result:");
console.log(JSON.stringify(deepMerge(obj1, obj2), null, 2));

/*
Expected Output:
{
  "a": 1,
  "b": { "b1": 1, "b2": 20, "b3": 30 },
  "c": [1, 2, 3],
  "d": 4
}
*/
