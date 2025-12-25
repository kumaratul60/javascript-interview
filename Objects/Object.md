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

## 2. Accessing & Modifying Properties

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

## 3. Iteration & Existence

### Existence Check

- **`in` operator:** `"key" in obj` (Checks the object AND its prototype chain).
- **`Object.hasOwn(obj, "key")`:** (Modern) Checks only the object itself, not inherited properties.

### Iteration Methods

- **`for...in` loop:** Iterates over all enumerable keys (including inherited ones).
- **`Object.keys(obj)`:** Returns an array of the object's own keys.
- **`Object.values(obj)`:** Returns an array of values.
- **`Object.entries(obj)`:** Returns an array of `[key, value]` pairs.

---

## 4. References & Mutability

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

## 5. Cloning Objects (Shallow vs. Deep)

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

## 6. Protection & Immutability

| Method                           | Add Props? | Delete Props? | Modify Values? | Configurable? |
| :------------------------------- | :--------: | :-----------: | :------------: | :-----------: |
| **`Object.preventExtensions()`** |     ❌     |      ✅       |       ✅       |      ✅       |
| **`Object.seal()`**              |     ❌     |      ❌       |       ✅       |      ❌       |
| **`Object.freeze()`**            |     ❌     |      ❌       |       ❌       |      ❌       |

---

## 7. Advanced Mechanics

### Property Descriptors

Every property has hidden flags: `writable`, `enumerable`, and `configurable`.

```javascript
Object.defineProperty(user, 'id', {
  value: 101,
  writable: false, // Read-only
  enumerable: false, // Won't show up in for...in or Object.keys
});
```

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

## 8. Tricky Interview Questions (Logic Lab)

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

## 9. Practical Coding Patterns

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

## 10. JavaScript Engines & Trivia

- **V8 Engine:** Developed by Google (Chrome/Node.js). High performance.
- **SpiderMonkey:** Created by Brendan Eich (Firefox). First JS engine ever.
- **Rhino:** Managed by Mozilla, written in Java.
- **Trivia:** `typeof null` returns `"object"`. This is a bug in the language that will never be fixed.

---

## 🎯 Quick-Reference Checklist

1.  **Use `const`** by default for objects to protect the reference.
2.  **Use `hasOwn()`** instead of `hasOwnProperty()` for safer checks.
3.  **Use `structuredClone()`** for deep copying.
4.  **Use Bracket Notation** when keys are dynamic or invalid identifiers.
5.  **Use Arrow Functions** only when you **don't** want a separate `this` context.
