# JavaScript Objects

## 1. Fundamentals & Creation

Objects are collections of key-value pairs used to store complex entities.

### Ways to Create

| Method                   | Syntax                     | Use Case                                                            |
| :----------------------- | :------------------------- | :------------------------------------------------------------------ |
| **Object Literal**       | `const obj = {}`           | Standard, most common.                                              |
| **Constructor**          | `const obj = new Object()` | Rarely used; identical to literal.                                  |
| **Object.create(proto)** | `Object.create(person)`    | Creates an object using another as a prototype.                     |
| **Object.create(null)**  | `Object.create(null)`      | Creates a "Pure" object with **no prototype** (no `toString`, etc). |
| **Classes/Constructors** | `new User()`               | Blueprinting for multiple instances.                                |

### Property Key Rules

- **Auto-Conversion:** Property keys are automatically converted into strings.
- **Reserved Keywords:** Objects have no restrictions. You can use `let`, `return`, `function`, etc., as keys (which is forbidden for variable names).
- **Computed Keys:** Use `[]` in literals to evaluate a variable as a key name.
- **Symbols:** Use `Symbol()` for unique, non-enumerable keys that won't collide.

---

## 2. The Prototype & Prototype Chain

At its core, JavaScript is a prototypal language. Every object can have another object as its **prototype**. When you try to access a property on an object, the engine first looks at the object itself. If it can't find it, it looks at the object's prototype, then the prototype's prototype, and so on, until it either finds the property or reaches the end of the chain.

This **prototype chain** is how JavaScript implements inheritance.

### Key Concepts

- **`[[Prototype]]`**: An internal, hidden property on an object that links to its prototype.
- **`Object.getPrototypeOf(obj)`**: The standard, reliable way to get an object's prototype.
- **`__proto__` (dunder proto)**: A non-standard, legacy getter/setter for `[[Prototype]]`. Avoid using it in modern code, but you will see it and must understand it.
- **`Object.create(proto)`**: As seen in section 1, this is the primary way to create an object with a *specific* prototype.

### How the Chain Ends

The chain ends when we reach a prototype that is `null`. `Object.prototype` is the base prototype for all standard objects, and it has `null` as its prototype.

```javascript
const obj = {}; // Prototype is Object.prototype
const protoOfObj = Object.getPrototypeOf(obj);

console.log(protoOfObj === Object.prototype); // true

const endOfChain = Object.getPrototypeOf(Object.prototype);
console.log(endOfChain); // null
```

### Why It Matters (Staff-Level Insight)

- **Performance**: Accessing properties deep in the prototype chain is slower than accessing an object's own properties. A long prototype chain can be a performance bottleneck.
- **`in` vs `hasOwn`**: The `in` operator traverses the prototype chain, while `Object.hasOwn()` does not. This is why `hasOwn()` is preferred for checking if an object *itself* has a property, avoiding accidental checks for things like `toString` on `Object.prototype`.

---

## 3. Accessing & Modifying Properties

### Dot vs. Bracket Notation

| Feature                  | Dot (`.`)      | Bracket (`[]`)          |
| :----------------------- | :------------- | :---------------------- |
| **Standard Property**    | ✅ `user.name` | ✅ `user["name"]`       |
| **Spaces/Special Chars** | ❌ Error       | ✅ `user["likes code"]` |
| **Starts with Digit**    | ❌ Error       | ✅ `user["2"]`          |
| **Dynamic Variables**    | ❌ Error       | ✅ `user[variable]`     |

### CRUD Operations

```javascript
let user = { name: 'Atul' };
user.isAdmin = true; // ADD
user.name = 'Rahul'; // UPDATE
delete user.isAdmin; // DELETE (Returns true even if prop doesn't exist)
```

---

## 4. Iteration & Existence

### Existence Check

- **`in` operator:** `"key" in obj` (Checks the object AND its prototype chain).
- **`Object.hasOwn(obj, "key")`:** (Modern) Checks only the object itself, not inherited properties.

### Iteration Methods

- **`for...in` loop:** Iterates over all enumerable keys (including inherited ones).
- **`Object.keys(obj)`:** Returns an array of the object's own keys.
- **`Object.values(obj)`:** Returns an array of values.
- **`Object.entries(obj)`:** Returns an array of `[key, value]` pairs.
- **`Object.fromEntries(iterable)`:** Transforms a list of `[key, value]` pairs into an object. The inverse of `Object.entries()`.

---

## 5. References & Mutability

### Memory Address (The Pointer)

Objects are stored and copied by **reference**, not by value.

```javascript
let a = { name: 'ak' };
let b = a; // Both point to the same memory address
b.name = 'cb';
console.log(a.name); // "cb" (Changed because 'a' and 'b' are the same object)
```

### The `const` Behavior

A `const` object cannot be **reassigned**, but its **properties** can be modified.

```javascript
const user = { age: 25 };
user.age = 26; // ✅ Allowed
user = { age: 30 }; // ❌ TypeError: Assignment to constant variable.
```

---

## 6. Mastering `this` (Context is Everything)

The `this` keyword is one of the most powerful and misunderstood parts of JavaScript. Its value is determined entirely by **how the function is called** (its "call-site").

| Context of `this`           | How It's Determined                                                                        | Example                                                                          |
| :-------------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| **Global Context**          | In non-strict mode, `this` refers to the global object (`window` in browsers). In strict mode, it's `undefined`. | `console.log(this);`                                                             |
| **As an Object Method**     | `this` is the object the method was called on (the part before the dot).                     | `user.sayHi()` -> `this` is `user`.                                              |
| **As a Simple Function**    | Same as Global Context (global object or `undefined` in strict mode). This is a common bug source. | `const fn = user.sayHi; fn();` -> `this` is `window` or `undefined`.             |
| **Arrow Function**          | `this` is **lexically inherited** from the surrounding scope. It does *not* get its own `this`. | See Q4 in the interview section. It inherits `this` from the scope where it was defined. |
| **`call`, `apply`, `bind`** | You can **explicitly set** `this`. `bind` creates a new function with a bound `this`.        | `fn.call(user, arg1, arg2)`                                                      |
| **DOM Event Handler**       | `this` is the element that the event was fired on.                                         | `button.addEventListener('click', function() { console.log(this) });` -> the button |
| **As a Constructor**        | When a function is called with `new`, `this` refers to the brand new object being created. | `new User()` -> `this` is the new user instance.                                 |

---

## 7. Cloning Objects (Shallow vs. Deep)

### A. Shallow Copy (Nested objects still share references)

```javascript
const original = { a: 1, b: { c: 2 } };

const copy1 = { ...original }; // Spread Operator
const copy2 = Object.assign({}, original); // Object.assign
```

### B. Deep Copy (Complete independence)

```javascript
// 1. Modern API (Recommended)
const deep = structuredClone(original);

// 2. The JSON trick (Loses functions and Dates)
const deep2 = JSON.parse(JSON.stringify(original));
```

---

## 8. Protection & Immutability

| Method                           | Add Props? | Delete Props? | Modify Values? | Configurable? |
| :------------------------------- | :--------: | :-----------: | :------------: | :-----------: |
| **`Object.preventExtensions()`** |     ❌     |      ✅       |       ✅       |      ✅       |
| **`Object.seal()`**              |     ❌     |      ❌       |       ✅       |      ❌       |
| **`Object.freeze()`**            |     ❌     |      ❌       |       ❌       |      ❌       |

---

## 9. Advanced Mechanics

### Property Descriptors

Every property has hidden flags: `writable`, `enumerable`, and `configurable`.

```javascript
Object.defineProperty(user, 'id', {
  value: 101,
  writable: false, // Read-only
  enumerable: false, // Won't show up in for...in or Object.keys
});
```

### Performance: Hidden Classes (Shapes)

To speed up property access, JavaScript engines like V8 use a concept called **Hidden Classes** (or "Shapes"). Objects with the same structure (same keys in the same order) will share the same internal Hidden Class.

```javascript
const user1 = { name: 'Atul' }; // V8 creates Hidden Class C0
user1.age = 25;                // V8 creates C1, which links to C0

const user2 = { name: 'Rahul' }; // V8 reuses C0
user2.age = 30;                 // V8 reuses C1
```

**Why It Matters (Staff-Level Insight):**

- **Consistency is Key:** Always try to initialize objects with the same shape. Avoid adding or deleting properties after creation, especially inside loops.
- **De-optimization:** If you change an object's shape too much (e.g., `delete user1.age`), the engine may de-optimize access to it, making it much slower. This is why `Object` is not ideal for highly dynamic collections where keys are frequently added/removed (use `Map` instead).

### Optional Chaining (`?.`)

Prevents "Cannot read property of undefined" errors.

```javascript
console.log(user?.address?.city); // undefined instead of crashing
```

### Prototype Deletion

Deleting an inherited property must be done on the prototype, not the instance.

```javascript
const person = Object.create({ height: '5.3' });
delete person.height; // Fails
delete Object.getPrototypeOf(person).height; // Success
```

---

## 10. Object vs. Map: When to Use Which?

A plain `Object` is often used as a dictionary or hash map, but since ES6, the `Map` object is often a better choice. A Staff-level engineer knows the trade-offs.

| Feature                      | `Object`                                                                  | `Map`                                                                          |
| :--------------------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------------------------- |
| **Keys**                     | **Strings or Symbols only**. Other types are stringified.                 | **Any type**, including objects, functions, etc. Retains original type.        |
| **Key Order**                | Not guaranteed (though modern engines are consistent).                    | **Guaranteed** to be in insertion order.                                       |
| **Size**                     | No direct way. Must be calculated manually (`Object.keys().length`).      | Easy and direct: `map.size`.                                                   |
| **Performance**              | Fast for static structures. Slows down if keys are added/deleted often.   | **Highly optimized** for frequent additions and deletions of keys.             |
| **Prototype & Collisions**   | Inherits from `Object.prototype`. Can lead to accidental key collisions. | No prototype issues. A clean dictionary.                                       |
| **Iteration**                | Requires methods like `Object.keys()` or `for...in`.                      | Directly iterable (e.g., `for...of map`).                                      |

### The Verdict

- **Use `Object` when:**
    - You have a simple, fixed collection of properties known at creation time.
    - You are creating a specific "thing" or entity (e.g., a `user`, a `config`).
- **Use `Map` when:**
    - You need a dictionary for dynamic key-value storage.
    - Keys are not strings or symbols.
    - You need to preserve insertion order.
    - You perform a lot of additions/deletions and need high performance.

---

## 11. Tricky Interview Questions (Logic Lab)

### 🧠 Q1: The "Object as Key" Trap

```javascript
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };
a[b] = 123;
a[c] = 456;
console.log(a[b]); // Output: 456
```

**Reason:** Objects are stringified to `"[object Object]"` when used as keys. Both `a[b]` and `a[c]` target `a["[object Object]"]`.

### 🧠 Q2: Comparison

```javascript
console.log({} === {}); // false
```

**Reason:** Every object literal creates a new reference in memory. No two distinct objects are ever equal.

### 🧠 Q3: Duplicate Keys

```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj); // { a: "three", b: "two" }
```

**Reason:** LIFO (Last In First Out). The later key overwrites the earlier one.

### 🧠 Q4: Self-Referencing `this`

```javascript
const obj = {
  n: 10,
  f1() {
    return this.n;
  },
  f2: () => this.n,
};
console.log(obj.f1()); // 10
console.log(obj.f2()); // undefined (Arrows inherit 'this' from global scope)
```

---

## 12. Practical Coding Patterns

### Multi-Property Counter (Reduce)

```javascript
const countBy = (arr, prop) =>
  arr.reduce((prev, curr) => {
    prev[curr[prop]] = (prev[curr[prop]] || 0) + 1;
    return prev;
  }, {});
```

### Recursive Numeric Modifier

```javascript
function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'number') obj[key] *= 2;
  }
}
```

---

## 13. JavaScript Engines & Trivia

- **V8 Engine:** Developed by Google (Chrome/Node.js). High performance.
- **SpiderMonkey:** Created by Brendan Eich (Firefox). First JS engine ever.
- **Rhino:** Managed by Mozilla, written in Java.
- **Trivia:** `typeof null` returns `"object"`. This is a bug in the language that will never be fixed.

---

## 14. Quick-Reference Checklist

1.  **Use `const`** by default for objects to protect the reference.
2.  **Use `hasOwn()`** instead of `hasOwnProperty()` for safer checks.
3.  **Use `structuredClone()`** for deep copying.
4.  **Use Bracket Notation** when keys are dynamic or invalid identifiers.
5.  **Use Arrow Functions** only when you **don't** want a separate `this` context.
6.  **Use `Map`** for dynamic dictionaries, especially with non-string keys.
7.  **Keep object shapes consistent** for better performance.
