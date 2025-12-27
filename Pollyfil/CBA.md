# JavaScript Core: Function Borrowing & Prototypes

## 1. Function Borrowing (`call`, `apply`, `bind`)

Function borrowing allows an object to use methods from another object without duplicating code.

### Mental Models

- **`call`** → Invoke NOW, arguments passed individually.
- **`apply`** → Invoke NOW, arguments passed as an array.
- **`bind`** → Invoke LATER, returns a new function (useful for context locking and Partial Application).

---

### A. `call()`

**Syntax:** `fn.call(thisArg, arg1, arg2, ...)`

**Polyfill:**

```javascript
Function.prototype.customCall = function (obj, ...args) {
  // 0, '', and false are valid objects; null/undefined should map to globalThis
  obj = obj == null ? globalThis : Object(obj);

  const fnSymbol = Symbol();
  obj[fnSymbol] = this; // 'this' refers to the function being called

  const result = obj[fnSymbol](...args);
  delete obj[fnSymbol];
  return result;
};
```

### B. `apply()`

**Syntax:** `fn.apply(thisArg, [argsArray])`

**Polyfill:**

```javascript
Function.prototype.customApply = function (obj, args = []) {
  obj = obj == null ? globalThis : Object(obj);

  const fnSymbol = Symbol();
  obj[fnSymbol] = this;

  const result = obj[fnSymbol](...args);
  delete obj[fnSymbol];
  return result;
};
```

### C. `bind()`

**Syntax:** `const newFn = fn.bind(thisArg, arg1)`

**Polyfill:**
Native `bind` has two critical features:

1. **Partial Application:** It can pre-fill arguments.
2. **`new` compatibility:** If the bound function is used as a constructor, the bound `thisArg` is ignored.

```javascript
Function.prototype.customBind = function (thisArg, ...boundArgs) {
  const originalFn = this;
  if (typeof originalFn !== 'function') throw new TypeError('Not callable');

  return function boundFn(...args) {
    // If called with `new`, 'this' is the new instance, not thisArg
    const isNew = this instanceof boundFn;
    return originalFn.apply(isNew ? this : thisArg, [...boundArgs, ...args]);
  };
};
```

---

## 2. Prototypes & Inheritance

### `prototype` vs `__proto__`

This is the most common point of confusion:

- **`.prototype`**: A property **only functions** have. It is the "blueprint" used to build objects when you call `new`.
- **`__proto__`**: A property **every object** has. It is the "link" pointing to the blueprint it was created from.
- **The Connection:** `myDog.__proto__ === Dog.prototype`.

### Memory Efficiency: The "Why"

- **Methods in Constructor:** If you define `this.greet = function...` inside a constructor, 1,000 instances create 1,000 identical function objects in memory.
- **Methods on Prototype:** Defining `User.prototype.greet = function...` creates **one** function in memory that all 1,000 instances reference.

### Best Practice: `Object.create()`

Use `Object.create()` to establish inheritance without the side effects of calling a constructor.

```javascript
const animal = {
  eats: true,
  walk() {
    console.log('Moving...');
  },
};

// dog inherits from animal
const dog = Object.create(animal);
dog.bark = function () {
  console.log('Woof!');
};

dog.walk(); // "Moving..." (Found via __proto__ chain)
```

---

## 3. `this` Resolution Priority

When multiple rules overlap, JS follows this order of precedence:

1.  **`new` Binding:** `this` is the new object.
2.  **Explicit Binding:** (`call`, `apply`, `bind`) `this` is the specified object.
3.  **Implicit Binding:** (`obj.method()`) `this` is the object before the dot.
4.  **Default Binding:** `globalThis` (non-strict) or `undefined` (strict).

---

## 4. Do's, Don'ts, and Pitfalls

### Do's

- **Use `Object.getPrototypeOf(obj)`** instead of `obj.__proto__` for cleaner code.
- **Partial Application:** Use `bind` to create specialized functions (e.g., `const double = multiply.bind(null, 2)`).
- **Arrow Functions for Callbacks:** Use them inside classes/methods to lexically capture `this` without needing `.bind(this)`.

### Don'ts

- **Monkey Patching:** Do not modify `Array.prototype` or `Object.prototype` in production. It’s only acceptable for spec-compliant polyfills.
- **Arrow Functions as Methods:** They do not have a `this` context. `const obj = { run: () => console.log(this) }` will log the global/window object, not `obj`.
- **Deep Chains:** Property lookup is **O(depth)**. Deeply nested prototype chains cause performance lag.

### Pitfalls

- **The "Lost Context" Trap:** `setTimeout(obj.method, 100)` results in `this` being the global object. Fix with `obj.method.bind(obj)`.
- **Boxing:** In non-strict mode, passing a primitive (like `5`) to `call` will "box" it into an object (`Number {5}`).
- **Large Arrays in `apply`:** `apply` can crash the stack if the array is too large (e.g., 100k+ elements). Use the spread operator `...` or a loop instead.

---

### Summary Table

| Feature          | Mental Model         | Best Used For                                     |
| :--------------- | :------------------- | :------------------------------------------------ |
| **`call`**       | Invoke NOW (args)    | Method borrowing.                                 |
| **`apply`**      | Invoke NOW ([array]) | Dynamic arguments/Arrays.                         |
| **`bind`**       | Invoke LATER         | Fixing `this` in callbacks & Partial Application. |
| **`.prototype`** | Shared Blueprint     | Defining methods once for all instances (Memory). |
| **`__proto__`**  | The Search Path      | The internal link used for property lookups.      |
