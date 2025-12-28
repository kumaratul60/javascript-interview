/**
 * Array.prototype.flat(depth)
 * Concept: Creates a new array with all sub-array elements concatenated nto it recursively up to the specified depth.
 */

/* ---------------------------------------------------------
   QUICK GUIDE
   ---------------------------------------------------------
   USE WHEN:
   - You have nested arrays (e.g., [[1, 2], [3]]) and want a single list.
   - You need to "clean" an array by removing empty slots (holes).
   - You receive data from multiple API calls that result in a nested structure.

   AVOID WHEN:
   - You are only flattening 1 level AND mapping (use .flatMap() instead).
   - You are dealing with massive, deeply nested arrays where memory is a concern.

   PITFALLS:
   - Default depth is 1. If you have 3 levels and use .flat(), you'll still have nesting.
   - Using 'Infinity' as depth can be dangerous if the array structure is circular.
   - Each level of flattening creates a new array, which can be slow for large datasets.
   --------------------------------------------------------- */

// --- POLYFILL IMPLEMENTATIONS ---

// why start with if condition: Because flat didn’t exist earlier. map / reduce / filter did.
// Array.prototype.flat === undefined // Older browsers


/**
 * 1. RECURSIVE
 * Balanced between readability and handling the depth logic correctly.
 */
// if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    const flatten = (arr, d) => {
      // BASE CASE: If depth is exhausted, return a shallow copy
      // slice() ensures we always return a NEW array, matching native behavior
      if (d <= 0) return arr.slice();

      return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
          // RECURSIVE STEP:
          // 1. Dig into the child array
          // 2. Decrease depth by 1
          // 3. Spread results into our accumulator
          acc.push(...flatten(val, d - 1));
        } else {
          // HOLE HANDLING:
          // reduce() naturally skips empty slots in sparse arrays [1, , 2]
          acc.push(val);
        }
        return acc;
      }, []);
    };

    return flatten(this, depth);
  };
// }

/**
 * 2. ITERATIVE (Performance-Focused)
 * Better for very deep arrays to avoid "Maximum call stack size exceeded" errors.
 */
/*
// if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    let result = this.slice();
    while (depth-- > 0) {
      let hasNested = false;
      result = result.reduce((acc, val) => {
        if (Array.isArray(val)) {
          acc.push(...val);
          hasNested = true;
        } else {
          acc.push(val);
        }
        return acc;
      }, []);
      if (!hasNested) break; // Optimization: stop early if nothing left to flatten
    }
    return result;
  };
// }
*/

// --- EXAMPLES & EDGE CASES ---

// Standard use
const nested = [1, [2, [3, [4]]]];
console.log(nested.flat(1)); // [1, 2, [3, [4]]]
console.log(nested.flat(2)); // [1, 2, 3, [4]]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4]

// Cleaning "Holey" Arrays
const holey = [1, , 2, , 3];
console.log(holey.flat()); // [1, 2, 3] (Holes are removed)

/**
 * THE POLYFILL CHECK:
 * ---------------------------------------------------------
 * Question: Why do we use 'if (!Array.prototype.flat)' but often skip it for 'map', 'filter', or 'reduce'?
 * ---------------------------------------------------------
 *
 * THE "AGE GAP" (THE REAL REASON)
 * flat() and flatMap() are NEW (ES2019).
 * map(), filter(), and reduce() are OLD (ES5, 2009).
 *
 * - map/reduce: Supported by every browser for 15+ years (even IE9).
 * - flat: Only ~5 years old. Many "legacy" environments still lack it.
 *
 * POLYFILL vs. RE-IMPLEMENTATION
 * - A Polyfill (flat): Its job is to fix a missing feature. You use
 *   the 'if' check so you don't overwrite the native, ultra-fast C++
 *   version if the browser already has it.
 *
 * - Practice Code (map): When you write 'Array.prototype.map = ...'
 *   without an 'if', you are performing an OVERRIDE. You are deleting he browser's engine-optimized method and replacing it with a slower JS function.
 *
 * ---------------------------------------------------------
 * THE DANGER OF SKIPPING THE "IF" (MONKEY PATCHING)
 * ---------------------------------------------------------
 * If you skip the check in a real app:
 * 1. Performance Loss: Native methods are optimized at the CPU level.
 * 2. Bugs: You might break 3rd-party libraries that rely on native-spec behavior (like handling "holey" arrays).
 * 3. Collisions: If two libraries both override .map(), the last one loaded "wins," causing chaotic bugs.
 *
 * ---------------------------------------------------------
 * RULE OF THUMB
 * ---------------------------------------------------------
 * - LEARNING / INTERVIEW: Skip the 'if' to show you know the logic.
 * - REAL PRODUCTION: ALWAYS use the 'if' (or better, use Core-JS).
 * - MODERN BEST PRACTICE: Avoid prototypes entirely (see below).
 *
 * ---------------------------------------------------------
 * THE CLEANEST APPROACH (NO GLOBALS)
 * ---------------------------------------------------------
 * Don't touch the prototype at all. Create a standalone utility.
 */

// Standalone Utility
const flat = (arr, depth = 1) => {
  if (depth < 1) return arr.slice();
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val);
  }, []);
};

// Usage
const result = flat([1, [2, [3]]], 2); // [1, 2, 3]

/**
 * INTERVIEW TIPS FOR .flat():

 * Mention "Holes": Point out that .flat() naturally removes empty slots in sparse arrays.
 * Mention "Infinity": Show you know that passing Infinity flattens everything regardless of depth.
 * Recursive vs Iterative: If asked to write it, explain that Recursion is cleaner, but Iterative is safer for extremely deep nesting to prevent stack overflow.
 * "I use the 'if' check for flat() because it's a true polyfill meant
 * to fill a gap; for map/reduce, I'm usually just demonstrating
 * internal logic, so I skip the check for brevity."
 */
