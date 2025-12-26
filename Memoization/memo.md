# Memoization: Comparison and Best Practices

Memoization is an optimization technique used to speed up programs by **storing the results of expensive function calls** and returning the cached result when the same inputs occur again.

> Mental model: Trade memory for speed.

---

## 1. Analysis of Implementations

### Version A and C: Single Argument (Basic)

```javascript
const memoize = (fn) => {
  // Use Object.create(null) to create a plain object with NO prototype.
  // This is the best approach for defensive programming in caches.
  const cache = Object.create(null);

  return (...args) => {
    let n = args[0]; // [Limitation] Only looks at the first argument

    // [Correct] Uses 'in' operator to handle falsy values (0, null, false)
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};
```

```js
// This is ONLY safe if the object has no prototype.
if (key in cache) {
  return cache[key];
}
```

- **Best for:** Simple mathematical functions with one argument.
- **Pitfall:** If you call `add(1, 2)` and then `add(1, 5)`, it will return the result of `add(1, 2)` because it only checks the first argument (`args[0]`).

### Version B: Multi-Argument (JSON Strategy)

```javascript
function memo(fn) {
  const cache = Object.create(null);
  return function (...args) {
    const key = JSON.stringify(args); // [Good] Handles multiple arguments
    if (key in cache) {
      return cache[key];
    } else {
      // [Correct] Preserves 'this' context using regular function and .apply
      const result = fn.apply(this, args);
      cache[key] = result;
      return result;
    }
  };
}
```

- **Best for:** General purpose functions with multiple primitive arguments.
- **Pitfall:** `JSON.stringify` is slow. If the function calculation is faster than the stringification, memoization makes the code slower. It also fails on circular objects.

### Version D: The Accumulator (Special Case)

- **Pitfall:** This version uses a reduce pattern internally. This is not a standard memoizer; it is a specific utility. It changes how the original function is called, which is dangerous for a generic wrapper.

---

## 2. Pitfalls (Why these aren't always Production Ready)

| Pitfall          | Why it happens          | Result                                                                                                                                         |
| :--------------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **Falsy Values** | Using `if (cache[arg])` | If the function returns `0` or `false`, the cache thinks it is empty and re-calculates. (Fixed by using `in` or `Map.has`).                    |
| **Context Loss** | Using Arrow Functions   | If you memoize a method inside a Class, `this` will be undefined. (Arrow functions lexically bind `this`, so `.apply/.call` cannot change it.) |
|                  |
| **Memory Leak**  | Unbounded cache growth  | The cache grows forever, which can eventually crash the browser or server (Unbounded cache growth (logical memory leak)                        |
| ) memory.        |
| **Object Keys**  | `cache[arg]`            | In standard objects, keys are stringified. `memo({a:1})` and `memo({b:2})` both resolve to `[object Object]`.                                  |

> Why: this isn’t always undefined; it’s just not rebindable.

---

## 3. The Best Version

To be truly robust, use a `Map` (for performance and non-string keys) and a regular `function` (to preserve `this`).

```javascript
const memoize = (fn) => {
  const cache = new Map();

  return function (...args) {
    // Create a unique key.
    // Use the argument directly for single-arg, or JSON for multi-arg.
    const key = args.length === 1 ? args[0] : JSON.stringify(args);

    if (cache.has(key)) {
      console.log('Fetching from cache');
      return cache.get(key);
    }

    console.log('Calculating result');
    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
};
```

---

## 4. Deep Dive: Why use Object.create(null)?

In JavaScript, a standard object `{}` inherits from `Object.prototype`.

### The Problem in Memoization

A normal object `const cache = {}` secretly contains keys like:

- `toString`
- `constructor`
- `hasOwnProperty`

If your function is called with the string `"toString"`, the check `if ("toString" in cache)` will return `true` even before you store anything. This leads to:

1. False cache hits.
2. Hard-to-debug bugs.
3. Security risks (Prototype Pollution).

### The Solution

`const cache = Object.create(null)` creates an object with:

- `__proto__` is `undefined`.
- No inherited keys.
- Safe for `in` checks.
- Perfect for dictionaries and caches.

### Side-by-Side Comparison

```javascript
const a = {};
const b = Object.create(null);

'toString' in a; // true  [Inherited Problem]
'toString' in b; // false [Correct/Clean]

// or

'a' in a; // false
'toString' in a; // true  ❌

'a' in b; // false
'toString' in b; // false ✅
```

## When should you use it?

### Use `Object.create(null)` when:

- Building a cache
- Building a lookup table
- Using the `in` operator
- Keys come from user input

### Don’t use it when:

- You need methods like `.hasOwnProperty()`
- You’re modeling real objects (use `{}` or a `class`)

---

## 5. Summary Table

| Use Case                | Recommended Version    | Reason                                                                     |
| :---------------------- | :--------------------- | :------------------------------------------------------------------------- |
| **Simple Math (1 arg)** | Version C              | Fast, uses 'in' operator, low overhead.                                    |
| **Complex Multi-Args**  | Map Version            | Distinguishes between different argument sets accurately.                  |
| **Class Methods**       | Non-arrow Version      | Uses `fn.apply(this, args)` to keep the class instance context.            |
| **High Performance**    | Professional Libraries | Lodash often only memoizes the first argument to keep key-generation fast. |

---

## 6. Objects as Keys: Use WeakMap

If your function accepts objects and you do not want to prevent garbage collection of those objects, use `WeakMap`.

> WeakMap keys are garbage-collected automatically when no other references to the object exist.

```javascript
const memoizeObject = (fn) => {
  const cache = new WeakMap();
  return function (obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
};
```

### Rule of thumb:

> If key generation costs more than the function itself, memoization hurts performance.

### [Tip]

If asked why you used `Object.create(null)`, answer:
"I used it to create a clean dictionary. Standard objects inherit properties from `Object.prototype`, which can cause false cache hits. `Object.create(null)` ensures the `in` operator only returns true for values I have explicitly cached."
