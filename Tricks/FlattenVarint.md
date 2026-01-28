# Flattening: Arrays, Objects, and Mixed Structures

## 1. Concept Overview

**Definition:** Flattening is the process of converting a nested data structure (tree-like) into a single-level structure (list or map). Algorithmically, this is a **Depth-First Search (DFS)** traversal.

**Core Interview Question:** "Convert this nested structure into a flat one."

---

## 2. Flatten ARRAY (The Basics)

### 1️⃣ Flatten ARRAY (1 Level)

**Problem:** Flatten an array by exactly one level.
**Input:** `[1, [2, 3], [4]]`
**Output:** `[1, 2, 3, 4]`

**Solution:**

```javascript
// Modern (ES2019+)
const flat = arr.flat();

// Legacy (Pre-ES6)
const flat = [].concat(...arr);
```

### 2️⃣ Flatten ARRAY (Deep / Infinite)

**Problem:** Flatten an array completely, no matter how deep.
**Input:** `[1, [2, [3, [4]]]]`
**Output:** `[1, 2, 3, 4]`

**Solution (Recursive - Interview Safe):**

```javascript
function flattenDeep(arr, out = []) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      flattenDeep(item, out);
    } else {
      out.push(item);
    }
  }
  return out;
}
```

### 3️⃣ Flatten ARRAY with DEPTH

**Problem:** Flatten array up to depth `d`.
**Input:** `([1, [2, [3]]], 1)`
**Output:** `[1, 2, [3]]`

**Solution:**

```javascript
function flattenArrayDepth(arr, d) {
  return d === 0
    ? arr
    : arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArrayDepth(val, d - 1) : val), []);
}
```

---

## 3. Flatten OBJECT (Dot Notation)

### 4️⃣ Flatten OBJECT (Deep / Complete)

**Problem:** Flatten object into dot-path keys.
**Input:** `{ a: { b: { c: 1 } } }`
**Output:** `{ "a.b.c": 1 }`

**Solution:**

```javascript
function flattenObj(obj, path = '', out = {}) {
  for (const k in obj) {
    const p = path ? `${path}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      flattenObj(obj[k], p, out);
    } else {
      out[p] = obj[k];
    }
  }
  return out;
}
```

### 5️⃣ Flatten OBJECT with DEPTH (The Hybrid) ⭐

**Problem:** Flatten nested objects, but stop after `N` levels. Useful for partial normalization.

**Input:**

```javascript
const input = {
  user: {
    details: {
      address: { city: 'NY' },
    },
  },
};
const depth = 2;
```

**Output:**

```javascript
{
  "user.details.address": { city: "NY" } // Stops flattening here
}
```

**Solution:**

```javascript
function flattenObjDepth(obj, depth, path = '', out = {}) {
  // Base case: Depth limit reached, non-object, or null
  if (depth === 0 || typeof obj !== 'object' || obj === null) {
    out[path] = obj;
    return out;
  }

  for (const k in obj) {
    const newPath = path ? `${path}.${k}` : k;
    flattenObjDepth(obj[k], depth - 1, newPath, out);
  }
  return out;
}
```

---

## 4. Advanced / Mixed Cases

### 6️⃣ Flatten OBJECT + ARRAY (Mixed Structure)

**Problem:** Flatten objects and arrays together, using indices as keys.
**Input:** `{ a: [1, { b: 2 }] }`
**Output:** `{ "a.0": 1, "a.1.b": 2 }`

**Solution (Recursive):**

```javascript
function flattenMixed(val, path = '', out = {}) {
  if (typeof val !== 'object' || val === null) {
    out[path] = val;
    return out;
  }

  // Handle Array vs Object iteration generic way
  const entries = Array.isArray(val) ? val.entries() : Object.entries(val);

  for (const [k, v] of entries) {
    const newPath = path ? `${path}.${k}` : String(k);
    flattenMixed(v, newPath, out);
  }
  return out;
}
```

### 7️⃣ Flatten OBJECT but KEEP ARRAYS

**Problem:** Common in Form Libraries. Flatten the object structure, but array values should remain arrays.
**Input:** `{ a: { tags: ["news", "tech"] } }`
**Output:** `{ "a.tags": ["news", "tech"] }`

**Solution:**

```javascript
function flattenKeepArray(obj, path = '', out = {}) {
  for (const k in obj) {
    const p = path ? `${path}.${k}` : k;
    const val = obj[k];

    // Logic: If it IS an array, treat it as a primitive (stop recursion)
    if (Array.isArray(val) || typeof val !== 'object' || val === null) {
      out[p] = val;
    } else {
      flattenKeepArray(val, p, out);
    }
  }
  return out;
}
```

### 8️⃣ The Iterative (Stack-Safe) Pattern ⭐

**Problem:** The recursive solutions are elegant but can cause a `RangeError: Maximum call stack size exceeded` for very deep objects (e.g., over 10,000 levels). An iterative approach using a manual stack is safer.

**Solution:**

```javascript
function flattenIterative(val) {
  if (typeof val !== 'object' || val === null) {
    return { '': val }; // Handle root primitives
  }

  const out = {};
  const stack = [[val, '']]; // Stack holds tuples of [value, path]

  while (stack.length > 0) {
    const [current, path] = stack.pop();
    const entries =
      typeof current === 'object' && current !== null
        ? Array.isArray(current)
          ? [...current.entries()]
          : Object.entries(current)
        : null;

    if (entries === null) {
      // It's a primitive value
      out[path] = current;
      continue;
    }

    if (entries.length === 0) {
      // It's an empty object or array
      if (path) out[path] = current; // Assign only if it's not the root
      continue;
    }

    // Push to the stack in reverse order to maintain original traversal order
    for (let i = entries.length - 1; i >= 0; i--) {
      const [key, value] = entries[i];
      const newPath = path ? `${path}.${key}` : String(key);
      stack.push([value, newPath]);
    }
  }
  return out;
}
```

---

## 5. Edge Case Analysis

The flattening logic must gracefully handle non-standard values. Here is how the `flattenMixed` / `flattenIterative` functions behave:

| Input               | Flattened Output    | Reason                                                                           |
| :------------------ | :------------------ | :------------------------------------------------------------------------------- |
| `null`              | `{ "": null }`      | `null` is treated as a primitive value.                                          |
| `undefined`         | `{ "": undefined }` | `undefined` is treated as a primitive value.                                     |
| `""` (Empty String) | `{ "": "" }`        | Primitives are assigned to their path. The root path is `""`.                    |
| `{}` (Empty Object) | `{}`                | There are no keys to iterate over, so nothing is added.                          |
| `[]` (Empty Array)  | `{}`                | There are no entries to iterate over.                                            |
| `{ a: [] }`         | `{ "a": [] }`       | An empty array is a value with no entries, so it's assigned directly.            |
| `new Date()`        | (Corrupted Object)  | `typeof Date` is "object". The logic will try to iterate its keys. See Pitfalls. |

---

## 6. The Inverse

### 9️⃣ Unflatten (Reverse Operation)

**Problem:** Convert flat object back to nested.
**Input:** `{ "a.b.c": 1 }`
**Output:** `{ a: { b: { c: 1 } } }`

**Solution:**

```javascript
function unflatten(obj) {
  const result = {};
  for (const k in obj) {
    k.split('.').reduce((curr, key, index, arr) => {
      // If last key, assign value. Else, create object if missing.
      return (curr[key] ??= index === arr.length - 1 ? obj[k] : {});
    }, result);
  }
  return result;
}
```

---

## 7. In-Depth Real-World Use Cases

### A. Internationalization (i18n) Libraries

Translation files are often stored as nested JSON. Flattening them makes key access uniform and simple.

**Nested translations file (`en.json`):**

```json
{
  "common": { "submit": "Submit" },
  "user": { "profile": { "title": "User Profile" } }
}
```

**Usage in a React Component:**
A component can consume these flattened keys without knowing the nesting structure.

```jsx
// const translations = flattenObj(enJson);
// translations['user.profile.title'] -> "User Profile"

function UserProfile({ translations }) {
  return <h1>{translations['user.profile.title']}</h1>;
}
```

### B. Form State Management (e.g., React Hook Form, Formik)

Form libraries map field names to a nested state object. The dot notation from flattening is the standard way to do this. The "Flatten but KEEP ARRAYS" pattern is crucial here.

**Form State Object:**

```javascript
const formState = {
  user: { name: 'Atul', email: 'test@example.com' },
  tags: ['react', 'javascript'],
};
```

**Mapping to HTML Fields:**
The flattened key becomes the `name` attribute of the input.

```jsx
// Using flattenKeepArray(formState) would produce:
// { "user.name": "Atul", "user.email": "...", "tags": ["react", ...] }

<input name="user.name" defaultValue={formState.user.name} />
<input name="user.email" defaultValue={formState.user.email} />
{/* The 'tags' field would be handled by a special array-aware component */}
```

---

## 8. Real World Summary & Pitfalls

### Summary Table

| Scenario                 | Best Variant           | Why?                                                                          |
| :----------------------- | :--------------------- | :---------------------------------------------------------------------------- |
| **API Response Cleanup** | `Array Flat (1 level)` | Removing empty slots or combining paginated results.                          |
| **Analytics Events**     | `Object Flat (Deep)`   | Sending `{ "checkout.cart.total": 50 }` to Google Analytics.                  |
| **Form State**           | `Flat Keep Arrays`     | Form libraries need dot-notation for fields but keep multi-selects as arrays. |
| **Debug Logs**           | `Object Flat (Depth)`  | Prevents console spam by only showing top-level context.                      |
| **CSV Export**           | `Mixed Flat`           | Converting complex JSON to columns for Excel/CSV.                             |
| **Deep/Unsafe Data**     | `Iterative Pattern`    | Avoids stack overflow errors on data with unknown, potentially extreme depth. |

### Top Pitfalls to Mention in an Interview

1.  **Circular References:** Recursive (and iterative) solutions will loop infinitely if Object A -> Object B -> Object A. (Fix: Use a `Set` or `WeakSet` to track visited objects).
2.  **Date Objects & Other Classes:** `typeof new Date()` is "object". Flattening will try to iterate its internal properties, corrupting it. The same applies to any class instance. (Fix: Add an `instanceof Date` check and treat it as a primitive value).
3.  **Null Pointer:** `typeof null` is "object". Always check `val !== null`.
4.  **Sparse Arrays:** An array like `const a = [1,,3]` has empty slots. `a.length` is 3 but `a[1]` is `undefined`. Using `arr.entries()` (as the solutions do) correctly handles this by skipping empty slots, but a manual `for (let i=0...)` loop could behave unexpectedly.

---

## 9. Interview Verdict

- **A:** Can use `.flat()` and write a basic recursive array flattener.
- **A+:** Can write the Object flattener and knows how to **stop** recursion for Arrays (Variant 7).
- **A++:** Discusses **Stack Overflow** risks with recursion vs. the iterative stack approach, implements **Depth Control** (Variant 5), and is aware of all pitfalls including circular references and class instances.
