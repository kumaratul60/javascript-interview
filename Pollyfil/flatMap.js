/**
 * Array.prototype.flatMap
 * Concept: map() + flat(1) in a single pass.
 */

/* ---------------------------------------------------------
   QUICK GUIDE
   ---------------------------------------------------------

   Implementation" vs. "Polyfill"
    - The Implementation: This is just the logic (the reduce or for loop). To understand how the method works under the hood.
    - The Polyfill: This is the delivery mechanism. A polyfill's job is to "plug a hole." If there is no hole (the  browser already has the method), a polyfill should do nothing.

   USE WHEN:
   - Your map function returns an array (e.g., .split() or [val, val*2]).
   - You want to Filter + Map in one go (by returning [] to skip items).
   - Performance matters (it avoids iterating twice).

   AVOID WHEN:
   - You need to flatten deeper than 1 level.
   - Your map returns simple values (use .map() instead).
   - Simple filtering is the only goal (use .filter() for readability).

   PITFALL:
   - Always flattens exactly 1 level deep.
     [[x]] becomes [x], not x.
   --------------------------------------------------------- */

// --- EXAMPLES ---

// 1. Splitting strings into a flat list
const tags = ['js logic', 'css style'].flatMap((s) => s.split(' '));
// ['js', 'logic', 'css', 'style']

// 2. Filter + Map pattern (The "Selective Map")
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
];
const activeIds = users.flatMap((u) => (u.active ? [u.id] : []));
// [1]

// --- POLYFILL ---

/**
 * Polyfill logic: Using reduce + concat.
 * concat() handles both arrays and primitive values seamlessly.
 */
// if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (callback, thisArg) {
    return this.reduce((acc, cur, i, arr) => {
      const res = callback.call(thisArg, cur, i, arr);

      // concat is preferred here because it handles both arrays and single values automatically.
      return acc.concat(res);
    }, []);
  };
// }

// If you are working with very large arrays, a more performant (though slightly longer) polyfill uses a loop and push:

// if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      const val = callback.call(thisArg, this[i], i, this);
      if (Array.isArray(val)) {
        result.push(...val); // Spread for arrays
      } else {
        result.push(val); // Simple push for non-arrays
      }
    }
    return result;
  };
// }

// Usage:
const arr = [1, 2, 3];
const result = arr.flatMap((x) => [x, x * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]

// Testing the Polyfill
const nums = [1, 2, 3];
const doubled = nums.flatMap((x) => [x, x * 2]);
// [1, 2, 2, 4, 3, 6]

// A. Filter + Map in one pass
const activeIds1 = [{id: 1, act: true}, {id: 2, act: false}].flatMap(u => u.act ? [u.id] : []);
// Result: [1]

// B. String Splitting
const words = ['hello world', 'js logic'].flatMap(s => s.split(' '));
// Result: ['hello', 'world', 'js', 'logic']

/**
 * POLYFILL CHECK: Why "if (!Array.prototype.method)" is Essential
 *
 * 1. PERFORMANCE (NATIVE IS FASTER)
 *    Native browser methods are written in low-level languages (like C++) and
 *    highly optimized by engines (V8, SpiderMonkey). A JS polyfill using .reduce()
 *    is significantly slower because it creates new objects and executes JS logic
 *    for every item. The check ensures modern browsers use the optimized path.
 *
 * 2. AVOIDING "MONKEY PATCHING" BUGS
 *    Overwriting standard methods ("Monkey Patching") can cause unexpected bugs.
 *    If a third-party library expects the native behavior of flatMap and you’ve
 *    replaced it with a custom version, it can lead to hard-to-debug crashes.
 *
 * 3. FUTURE-PROOFING & EVOLUTION
 *    If the official ECMAScript spec is updated with better edge-case handling
 *    or efficiency, a manual overwrite prevents your app from benefiting from
 *    those browser updates.
 *
 * 4. THE AGE GAP (ES5 vs. ES2019)
 *    The necessity of a check depends on the method's age:
 *    | Method             | Year | Check Needed? | Use Case Today               |
 *    |--------------------|------|---------------|------------------------------|
 *    | map/filter/reduce  | 2009 | Yes           | Only for Interviews / IE8    |
 *    | flatMap            | 2019 | Yes           | Real apps targeting < 2019  |
 *
 * WHAT HAPPENS IF YOU REMOVE THE CHECK?
 * - Redundant Work: The browser re-defines a function it already has.
 * - Loss of Optimization: The engine loses its internal "fast-path" logic.
 * - Potential Conflicts: If other libraries also try to define the same method,
 *   you enter a "last-one-wins" conflict.
 *
 * RECOMMENDATION & INTERVIEW NOTE:
 * - In production: Use Babel or Core-js to handle polyfills automatically.
 * - In interviews: ALWAYS include the 'if' check when asked to write a polyfill.
 *   It proves you understand prototype safety and performance best practices.
 *
 * Start with the check:if (!Array.prototype.methodName) { ... }
 * Explain why: "I'm adding this check because the native engine version is written in C++ and is  much faster. We only want to use my Javascript version if the native one is missing."
 */
