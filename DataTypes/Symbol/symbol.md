# JavaScript `Symbol`

## The Basics

### What is a Symbol?

`Symbol` is a **primitive data type** introduced in ES6 (ES2015). Unlike strings or numbers, Symbols are unique identifiers. No two symbols are ever equal, even if they have the same description.

**Symbols are used by libraries and frameworks to attach metadata to objects without risking property name collisions.**

### Syntax & Identity

```js
// 1. Creation
const sym1 = Symbol();
const sym2 = Symbol();

// Each call to Symbol() returns a new, unique Symbol value.

console.log(sym1 === sym2); // false (Always unique)
console.log(typeof sym1);   // "symbol"

// 2. With Description (for debugging only)
const idA = Symbol('id');
const idB = Symbol('id');

console.log(idA === idB); // false (Description does not affect identity)
```

Note: There's also `Symbol.for()` for creating globally shared Symbols, which we'll discuss later.

```js
const id = Symbol('id');

const user = {
  name: 'A',
  [id]: 1234, // Using a Symbol as a key
};

// Adding a regular string key 'id' does NOT conflict with the Symbol(id) key.
user.id = 123;
console.log(user); // { name: 'A', id: 123, [Symbol(id)]: 1234 }
console.log(user.id); // 123
console.log(user[id]); // 1234
```

**Core Characteristic:**

- **Guaranteed Uniqueness:** Prevents property name collisions in objects.

---

## Primitive vs. Non-Primitive

`Symbol` is a **primitive** data type.

*   **Primitives (Undefined, Null, Boolean, Number, String, Symbol, BigInt)**: Stored directly in the call stack. When a primitive value is assigned to a variable, the variable directly holds that value. When assigned to another variable, a copy of the value is made.
*   **Non-Primitives (Objects)**: Stored in the heap, and variables hold references (pointers) to these objects in the heap.

This distinction is crucial for understanding how values are passed and manipulated in JavaScript.

### Memory Allocation (Stack)

For primitive values like `Symbol`, the value itself is typically stored directly on the **call stack**. Each `Symbol()` call creates a new, unique primitive value.

When you declare `const sym1 = Symbol();`, a space is reserved on the stack for `sym1`, and it holds the unique Symbol value. No complex memory allocation on the heap is needed for the value itself, as Symbol values are immutable and don't contain other data structures in the way objects do.

---

## Use Cases & Real-time Applications

Symbols are primarily used as **object keys**. Because they are unique, they don't clash with string keys, allowing for "soft privacy" and collision-free extensions.

### 1. Collision-Free Object Keys & "Soft" Privacy

Symbols enable adding properties to objects without the risk of name collisions with existing or future string keys. They also provide a form of "soft privacy" as they are not easily discoverable through standard enumeration.

```javascript
const METADATA = Symbol('metadata');
const user = {
  name: 'Alice',
  id: 42, // Existing ID
};

// Safe extension: using a Symbol as a key
user[METADATA] = { lastLogin: Date.now() };

console.log(user[METADATA]); // { lastLogin: ... }
console.log(user.METADATA); // undefined (dot notation doesn't work for Symbol keys!)

// Symbols do not show up in standard loops, providing "soft privacy"
const apiKey = Symbol('apiKey');
const config = {
  env: 'production',
  [apiKey]: '12345-SECRET',
};

for (let key in config) {
  console.log(key); // Only prints "env"
}
console.log(Object.keys(config)); // ['env']
console.log(JSON.stringify(config)); // {"env":"production"} (Symbol is stripped!)
```
**Use Case**: Extending third-party objects with your own data without fear of overwriting their properties, or attaching internal state that isn't meant for general iteration.

### 2. React Security and Library Context (React Specific)

Symbols play a critical role in the React ecosystem for both framework internals and advanced application patterns.

#### React Security (The `$$typeof` Security Hole Fix)

React uses a global symbol to tag React Elements.

**The Problem:** If a server accepts JSON and renders it directly, a hacker could send a fake JSON object that looks like a React component, triggering an XSS attack.

**The Solution:** React elements look like this internally:

```js
{
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  props: {},
  // ...
}
```

**Why Symbol?** JSON **cannot** store Symbols. If a hacker sends a malicious JSON blob from an API, the `$$typeof` property will be missing (or a string). React checks if `$$typeof` is the specific Symbol. If not, it refuses to render. This effectively prevents XSS attacks via JSON injection of fake React elements.

#### Custom Hooks & Library Context

If you are building a complex React library (like a data grid or form library) that injects props into a user's component, using Strings is risky due to potential name collisions.

```javascript
// ❌ Risky: Might overwrite user's 'isLoading' prop
const injectedProps = { isLoading: true };

// ✅ Safe: Symbol ensures no collision
const IS_LOADING = Symbol('isLoading');
const injectedProps = { [IS_LOADING]: true };
```
**Use Case**: Preventing prop-name collisions when building libraries or injecting meta-data into components.

---

## Advanced Meta-Programming

Symbols allow you to hook into JavaScript language internals. These are called **Well-Known Symbols**.

### 1. `Symbol.iterator` (Making objects loopable)

You can teach JS how to loop over your custom object using `for...of`.

```js
const collection = {
  items: { a: 10, b: 20 },
  // Define how this object behaves in a loop
  [Symbol.iterator]() {
    const values = Object.values(this.items);
    let i = 0;
    return {
      next: () => ({
        done: i >= values.length,
        value: values[i++],
      }),
    };
  },
};

for (const val of collection) {
  console.log(val); // 10, 20
}
// This also enables spread syntax: [...collection]
```

### 2. `Symbol.toPrimitive` (Custom Type Coercion)

Control what happens when your object is converted to a number or string.

```js
const money = {
  amount: 100,
  currency: 'USD',
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return `${this.amount} ${this.currency}`;
    if (hint === 'number') return this.amount;
    return this.amount; // default
  },
};

console.log(+money); // 100
console.log(`${money}`); // "100 USD"
console.log(money + 50); // 150
```

### 3. `Symbol.toStringTag` (Custom `Object.prototype.toString` Output)

Control the value returned by `Object.prototype.toString()` when called on your object. This is often used for debugging or type checking.

```js
class MyCustomClass {
  get [Symbol.toStringTag]() {
    return 'MyCustomClass';
  }
}

const instance = new MyCustomClass();
console.log(Object.prototype.toString.call(instance)); // "[object MyCustomClass]"
console.log(instance.toString()); // "[object MyCustomClass]" (if toString() isn't overridden)
```

---

## Global Registry (`Symbol.for`)

Sometimes you need a Symbol to be the same across different files, iframes, or service workers (Cross-Realm).

| Method              | Behavior                                                                       |
| :------------------ | :----------------------------------------------------------------------------- |
| `Symbol('foo')`     | Unique every time.                                                             |
| `Symbol.for('foo')` | Checks the **Global Registry**. If 'foo' exists, return it. If not, create it. |

```js
// File A
const tokenA = Symbol.for('app.token');

// File B
const tokenB = Symbol.for('app.token');

console.log(tokenA === tokenB); // true
```

**Application:** This is how React ensures the `$$typeof` symbol works even if you have multiple copies of React loaded in the same page.

---

## Pitfalls & Best Practices

### ❌ Pitfall 1: JSON Serialization

Symbols are completely ignored by `JSON.stringify()`.

```js
const obj = {
  id: 1,
  [Symbol('hidden')]: 'secret',
};

const str = JSON.stringify(obj);
// Output: '{"id":1}'
// The symbol data is LOST.
```

**Fix:** Do not use Symbols for data that needs to be sent to an API/Database.

### ❌ Pitfall 2: Memory Leaks in Global Registry

Symbols created with `Symbol.for()` are kept in the global registry forever. They are not garbage collected unless the realm is destroyed. Don't use unique IDs in the registry.

### ❌ Pitfall 3: False Privacy

Don't rely on Symbols for security.

```js
// A hacker can still find your keys
const hiddenKeys = Object.getOwnPropertySymbols(obj);
const value = obj[hiddenKeys[0]];
```

**Fix:** Use **Private Class Fields (`#field`)** for true privacy.

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Unique primitive identifier.                                   |
| **Main Use Case**  | Unique object keys, avoiding name collisions.                  |
| **React Use Case** | Security (XSS protection via `$$typeof`), Context keys.        |
| **Visibility**     | Hidden from `for...in` and `Object.keys`.                      |
| **Global Access**  | `Symbol.for('key')` shares symbols globally.                   |
| **JSON**           | Ignored. Do not use for API data.                              |
| **Internals**      | `Symbol.iterator`, `Symbol.toStringTag` customize JS behavior. |

---

### Final Decision: When to use?

1.  **Building a Library?** ✅ YES. Prevents your props/methods from clashing with the user's code.
2.  **Meta-Programming?** ✅ YES. Needed for custom iterators or type coercion.
3.  **Hiding internal flags?** ✅ YES. Keeps `console.log` and loops clean.
4.  **storing User Data?** ❌ NO. Use Strings.
5.  **Sending data to Backend?** ❌ NO. Symbols don't survive JSON serialization.
