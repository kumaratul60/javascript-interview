# JavaScript Functions

## 1. Core Definition: First-Class Citizens
In JavaScript, functions are **First-Class Citizens**. This means they are treated like any other variable. They can be assigned to variables, passed as arguments, returned from other functions, and have properties and methods.

### What makes a function "First-Class"?
*   **Assign to a variable:** `const myFn = () => {}`
*   **Pass as an argument:** `setTimeout(callback, 1000)`
*   **Return from a function:** `return function() {}`
*   **Store in Data Structures:** Stored in objects or arrays.
*   **Properties/Methods:** Functions have methods like `.call()`, `.apply()`, and `.bind()`.

---

## 2. Function Types & Syntax

### A. Function Declaration (Statement)
```javascript
function add(a, b) {
  return a + b;
}
```
*   **Hoisted:** Can be called before it is defined.
*   **Context:** Defines its own `this`.

### B. Function Expression
```javascript
const add = function(a, b) {
  return a + b;
};
```
*   **Not Hoisted:** Results in a `ReferenceError` if called before definition.
*   **Anonymous:** Usually assigned to a variable.

### C. Arrow Function (ES6)
```javascript
const add = (a, b) => a + b;
```
*   **Lexical `this`:** Does not have its own `this`; it inherits from the parent scope.
*   **Implicit Return:** No `{}` needed for single-line expressions.
*   **No `arguments` object:** Use Rest parameters instead.

### D. IIFE (Immediately Invoked Function Expression)
```javascript
(function() {
  console.log("Run immediately and keep variables private.");
})();
```
*   **Purpose:** Data privacy and avoiding global scope pollution.

---

## 3. Function Parameters & Arguments

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **Default Parameters** | `fn(a = 10)` | Sets a fallback value if no argument is passed. |
| **Rest Parameters** | `fn(...args)` | Collects multiple arguments into a single array. |
| **Spread Operator** | `fn(...[1,2])` | Unpacks an array into individual arguments. |
| **Arguments Object** | `arguments` | An array-like object available inside non-arrow functions. |

---

## 4. Advanced Concepts (The "Magic" of JS)

### A. Higher-Order Functions (HOF)
A function that takes a function as an argument or returns a function.
```javascript
const multiplyBy = (factor) => (num) => num * factor;
const double = multiplyBy(2);
console.log(double(5)); // 10
```

### B. Closures
A function "remembers" its lexical scope even when the function is executed outside that scope.
```javascript
function counter() {
  let count = 0;
  return () => ++count;
}
const increment = counter();
increment(); // 1
increment(); // 2 (count is preserved)
```

### C. Function Currying
Transforming a function that takes multiple arguments into a series of functions that take one argument each.
```javascript
const curryAdd = a => b => c => a + b + c;
curryAdd(1)(2)(3); // 6
```

### D. Function Composition
The process of combining two or more functions to produce a new function.
```javascript
const compose = (f, g) => (x) => f(g(x));
const toUpper = s => s.toUpperCase();
const exclaim = s => s + "!";
const shout = compose(exclaim, toUpper);
shout("hello"); // "HELLO!"
```

---

## 5. Scope & Hoisting

1.  **Global Scope:** Accessible everywhere.
2.  **Function Scope:** Variables declared inside are private to the function.
3.  **Block Scope:** `let` and `const` inside `{}` are not accessible outside.
4.  **Hoisting:**
    *   **Declarations** are moved to the top (usable early).
    *   **Expressions/Arrows** are not (stay in the Temporal Dead Zone).

---

## 6. The `this` Keyword & Binding
The value of `this` depends on **how** the function is called.

| Method | Description |
| :--- | :--- |
| **`call()`** | Invokes function immediately with a specified `this` and comma-separated args. |
| **`apply()`** | Invokes function immediately with a specified `this` and an array of args. |
| **`bind()`** | Returns a **new** function with a fixed `this` for later execution. |

---

## 7. Modern Patterns (Async & Classes)

### Async Functions
Functions that always return a Promise.
```javascript
async function getData() {
  const result = await fetch(url);
  return result.json();
}
```

### Generator Functions
Functions that can be paused and resumed using `yield`.
```javascript
function* countSteps() {
  yield 1;
  yield 2;
  return 3;
}
```

---

## 8. Summary Table

| Feature | Function Declaration | Arrow Function |
| :--- | :--- | :--- |
| **Hoisting** | ✅ Yes | ❌ No |
| **`this` Binding** | Dynamic (depends on caller) | Lexical (inherited) |
| **`arguments` object** | ✅ Yes | ❌ No (use `...args`) |
| **Constructor** | ✅ Can use `new` | ❌ Cannot use `new` |
| **Syntax** | Verbose | Concise |

---

## 🎯 Best Practices
1.  **Pure Functions:** Aim for functions with no side effects (same input = same output).
2.  **Naming:** Use verbs (e.g., `getUser`, `calculateTotal`).
3.  **Single Responsibility:** One function should do **one** thing.
4.  **Avoid Anonymous Functions for Debugging:** Named functions show up better in Stack Traces.
5.  **Use Arrows for Callbacks:** Keeps the `this` context predictable.
