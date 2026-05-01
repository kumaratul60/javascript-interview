/**
 * Array Flattening Guide
 * This file contains various methods to flatten nested arrays in JavaScript,
 * ranging from built-in methods to custom recursive implementations.
 */

// ==========================================
// 1. TEST DATA
// ==========================================

const nestedNumbers = [1, [2, 3], [4, [5], [6, [7, 8, 9], 10], 11], [12], 13];
const deeplyNestedNumbers = [1, [2, [3, [4, [5, [6, 7], 8], 9], 10]]];
const nestedStrings = ['A', ['B', [['B11', 'B12', ['B131', 'B132']], 'B2']], 'C', ['D', 'E', 'F', ['G', 'H', 'I']]];
const extremelyDeepArray = [[1, [2, 2, [3, [4, [5, [6]]]]], 1]];
const foodEmojiArray = ['🥗', ['🍌', '🍎', '🍇'], '🍣', ['🐟', '🍚']];
const numberGroupsArray = [1, [2, 3, 4], 5, [6, 7]];
const pairArrays = [[1, 2], [3, 4], [5, 6], [7, 8], [8]];
const mixedNestedArray = [1, [2, 3], [4, [5], [6, [7, 8, 9], 10], 11], [12], 13];

// ==========================================
// 2. BUILT-IN METHODS (ES6+)
// ==========================================

/**
 * Using Array.prototype.flat()
 * The flat() method creates a new array with all sub-array elements concatenated
 * into it recursively up to the specified depth.
 */
let flattenedPriceTags = [['$6'], ['$12'], ['$25'], ['$25'], ['$18'], ['$22'], ['$10']].flat();
console.log('flattenedPriceTags (flat 1):', flattenedPriceTags);
// Output: ['$6', '$12', '$25', '$25', '$18', '$22', '$10']

// Flattening to specific depth or Infinity
console.log('deeplyNestedNumbers (flat Infinity):', deeplyNestedNumbers.flat(Infinity));
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log('extremelyDeepArray (flat Infinity):', extremelyDeepArray.flat(Infinity));
// Output: [1, 2, 2, 3, 4, 5, 6, 1]

console.log('extremelyDeepArray (flat 1):', extremelyDeepArray.flat(1));
// Output: [1, [2, 2, [3, [4, [5, [6]]]]], 1]

console.log('mixedNestedArray (flat default 1):', mixedNestedArray.flat());
// Output: [1, 2, 3, 4, [5], [6, [7, 8, 9], 10], 11, 12, 13]

// ==========================================
// 3. RECURSIVE METHODS (CUSTOM)
// ==========================================

/**
 * Fast Recursive Flattening
 * Iterative loop with recursion for depth.
 */
const flattenFast = function (arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flattenFast(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

const flattenedFastResult = flattenFast(nestedNumbers);
console.log('flattenedFastResult:', flattenedFastResult);
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

console.log('checkAll (large):', flattenFast(Array(200000).fill([1])).length);
// Output: 200000

console.log('checkNested:', flattenFast(Array(2).fill(Array(2).fill(Array(2).fill([1])))));
// Output: [1, 1, 1, 1, 1, 1, 1, 1]

console.log('checkDiffLevelArr:', flattenFast([1, [1], [[1]]]));
// Output: [1, 1, 1]

/**
 * Recursive using Reduce and Concat
 */
const flatten = (arr) => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
console.log('flatten (reduce):', flatten(nestedNumbers));
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

/**
 * Deep Flattening using Reduce
 */
function flattenDeep(arr) {
  return arr.reduce((acc, e) => (Array.isArray(e) ? acc.concat(flattenDeep(e)) : acc.concat(e)), []);
}

/**
 * Recursive check using .some() and Spread
 */
function myFlat(array) {
  let flat = [].concat(...array);
  return flat.some(Array.isArray) ? myFlat(flat) : flat;
}
console.log('myFlat (recursive spread):', myFlat(deeplyNestedNumbers));
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
 * For Older Browsers (Manual loop)
 */
const flatArray = (arr) => {
  const res = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      const subRes = flatArray(item);
      res.push(...subRes);
    } else {
      res.push(item);
    }
  }
  return res;
};
console.log('flatArray (old browser):', flatArray(nestedStrings));

/**
 * Recursive Flat using for...of
 * Time Complexity: O(N) where N is the total number of elements in all levels.
 * Space Complexity: O(N) for the result array + O(D) for the recursion stack where D is depth.
 * Note: The spread operator (...) inside the loop creates a shallow copy, which can
 * slightly impact performance on extremely deep arrays compared to passing a result reference.
 */
function flattenUsingForOf(value) {
  const flatArr = [];
  for (let val of value) {
    if (Array.isArray(val)) {
      flatArr.push(...flattenUsingForOf(val));
    } else {
      flatArr.push(val);
    }
  }
  return flatArr;
}
console.log('flattenUsingForOf result:', flattenUsingForOf(mixedNestedArray));

// ==========================================
// 4. REDUCE & CONCAT METHODS
// ==========================================

/**
 * Simple Single Level Flatten using Reduce
 */
function flatten1(arr) {
  return arr.reduce((acc, e) => acc.concat(e), []);
}

/**
 * Using Function.prototype.apply() with concat
 */
function flatten2(arr) {
  return [].concat.apply([], arr);
}

/**
 * Recursive Reduce (Arrow Function)
 */
let flatIt = (array) => array.reduce((x, y) => x.concat(Array.isArray(y) ? flatIt(y) : y), []);
console.log('flatIt (reduce):', flatIt(deeplyNestedNumbers));

/**
 * Single Level Reduce (without flat)
 */
const flattenedPairsResult = pairArrays.reduce(function (a, b) {
  return a.concat(b);
});
console.log('without flat() reduce =>', flattenedPairsResult);

// ==========================================
// 5. SPREAD OPERATOR & CONCAT
// ==========================================

/**
 * Simple Spread with Concat (Single Level)
 */
const flattenedEmojiArray = [].concat(...foodEmojiArray);
console.log('flattenedEmojiArray (spread):', flattenedEmojiArray);

const flattenedNumberGroups = [].concat(...numberGroupsArray);
console.log('flattenedNumberGroups (spread):', flattenedNumberGroups);

// ==========================================
// 6. STRING MANIPULATION
// ==========================================

/**
 * Using toString() and split()
 * Note: Only works well for arrays of numbers or simple strings.
 */
let parsedIntArray = deeplyNestedNumbers.toString().split(',');
for (let i = 0; i < parsedIntArray.length; i++) parsedIntArray[i] = parseInt(parsedIntArray[i]);
console.log('parsedIntArray (string manipulation):', parsedIntArray);

const flattenedViaStringMethod = mixedNestedArray.toString().split(',').map(Number);
console.log('flattenedViaStringMethod (string manipulation map):', flattenedViaStringMethod);

// ==========================================
// 7. LEVEL CONTROL MECHANISM (CUSTOM DEPTH)
// ==========================================

/**
 * APPROACH 1: Using for...of loop (Most Readable)
 * Time Complexity: O(N) where N is the total number of elements.
 * Space Complexity: O(N + D) where N is the result size and D is recursion depth.
 */
function flattenWithLevel(arr, depth = 1) {
  if (depth <= 0) {
    return arr.slice(); // Return a copy if no more depth
  }

  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      // If it's an array and we still have depth, recurse
      result.push(...flattenWithLevel(item, depth - 1));
    } else {
      // Otherwise just push the value
      result.push(item);
    }
  }
  return result;
}

/**
 * APPROACH 2: Using reduce (Functional approach)
 * Time Complexity: O(N) where N is the total number of elements.
 * Space Complexity: O(N + D) where N is the result size and D is recursion depth.
 */
function flattenWithLevelReduce(arr, depth = 1) {
  if (depth <= 0) return arr.slice();

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenWithLevelReduce(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

console.log('--- Level Control Examples ---');
const depthTestArr = [1, [2, [3, [4, 5]]]];

console.log('No Depth (Default 1):', flattenWithLevel(depthTestArr));
// Output: [1, 2, [3, [4, 5]]]

console.log('Depth 1:', flattenWithLevel(depthTestArr, 1));
// Output: [1, 2, [3, [4, 5]]]

console.log('Depth 2 (using reduce):', flattenWithLevelReduce(depthTestArr, 2));
// Output: [1, 2, 3, [4, 5]]

console.log('Depth 3:', flattenWithLevel(depthTestArr, 3));
// Output: [1, 2, 3, 4, 5]

console.log('Depth Infinity (4):', flattenWithLevel(depthTestArr, 4));
// Output: [1, 2, 3, 4, 5]
