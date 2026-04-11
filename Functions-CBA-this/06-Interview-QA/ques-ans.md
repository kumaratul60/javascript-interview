# JavaScript Functions: Comprehensive Interview Q&A

This document consolidates key concepts, interview questions, and practical code examples for JavaScript Functions.

---

## 📑 Table of Contents

1. [Core Definitions & First-Class Functions](#1-core-definitions--first-class-functions)
2. [Function Types & Syntax (Declaration vs. Expression vs. Arrow)](#2-function-types--syntax)
3. [Parameters & Arguments](#3-parameters--arguments)
4. [Closures & Scoping](#4-closures--scoping)
5. [Function Currying & Composition](#5-function-currying--composition)
6. [The `this` Keyword & Explicit Binding (Call, Apply, Bind)](#6-the-this-keyword--explicit-binding)
7. [Higher-Order Functions & Callbacks](#7-higher-order-functions--callbacks)
8. [Machine Coding & Advanced Challenges](#8-machine-coding--advanced-challenges)

---

## 1. Core Definitions & First-Class Functions

### Q: What does it mean for functions to be "First-Class Citizens"?

**A:** In JavaScript, functions are treated like any other variable. They can be:

- Assigned to variables.
- Passed as arguments to other functions (callbacks).
- Returned from other functions (HOFs).
- Stored in objects or arrays.
- Have their own properties and methods (like `.call()`).

**Example:**

```javascript
const sayHello = () => 'Hello!';
const greet = (fn) => console.log(fn());
greet(sayHello); // Passing as an argument
```

---

## 2. Function Types & Syntax

### Q: Difference between Function Declaration and Function Expression?

| Feature      | Function Declaration     | Function Expression              |
| :----------- | :----------------------- | :------------------------------- |
| **Syntax**   | `function name() {}`     | `const name = function() {}`     |
| **Hoisting** | ✅ Fully Hoisted         | ❌ Not Hoisted (Stay in TDZ)     |
| **Use Case** | Global utility functions | Closures, callbacks, local scope |

### Q: How do Arrow Functions differ from Regular Functions?

1.  **Lexical `this`:** Arrow functions do not have their own `this`; they inherit it from the parent scope.
2.  **No `arguments` Object:** Use `...args` (Rest parameters) instead.
3.  **Cannot be used as Constructors:** You cannot use `new` with an arrow function.
4.  **Implicit Return:** Single-line arrows return the expression automatically.

---

## 3. Parameters & Arguments

### Q: Difference between Rest and Spread?

- **Rest (`...args`):** Used in function _parameters_ to collect multiple arguments into an array.
- **Spread (`...arr`):** Used in function _calls_ to unpack an array into individual arguments.

```javascript
function sum(...nums) {
  // Rest
  return nums.reduce((a, b) => a + b, 0);
}
const myArr = [1, 2, 3];
sum(...myArr); // Spread
```

---

## 4. Closures & Scoping

### Q: What is a Closure?

**A:** A closure is a function that "remembers" its outer lexical scope even when it is executed outside that scope.

**Example: Private Counter**

```javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

## 5. Function Currying & Composition

### Q: What is Currying?

**A:** Currying is a technique of transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.

```javascript
// Normal
const add = (a, b) => a + b;
// Curried
const curriedAdd = (a) => (b) => a + b;
console.log(curriedAdd(1)(2)); // 3
```

---

## 6. Understanding `this` Binding (Implicit vs. Explicit)

### Q: What is Implicit Binding?

**A:** Implicit binding occurs when a function is called as a method of an object. The object to the left of the dot at call-time becomes the `this` context.

```javascript
const user = {
  name: 'Atul',
  greet() {
    console.log(this.name);
  },
};
user.greet(); // Implicitly binds 'this' to 'user'
```

### Q: What is Explicit Binding?

**A:** Explicit binding is when we manually tell the JavaScript engine exactly what `this` should point to using `call()`, `apply()`, or `bind()`.

```javascript
function greet() {
  console.log(this.name);
}
const user = { name: 'Atul' };
greet.call(user); // Explicitly binds 'this' to 'user'
```

### Q: Comparison: Implicit vs. Explicit?

| Feature       | Implicit Binding                                         | Explicit Binding                               |
| :------------ | :------------------------------------------------------- | :--------------------------------------------- |
| **Control**   | Automatic (based on call-site)                           | Manual (developer-defined)                     |
| **Syntax**    | `obj.method()`                                           | `.call()`, `.apply()`, `.bind()`               |
| **Stability** | Context can be lost if method is assigned to a variable. | Context is locked (especially with `.bind()`). |
| **Use Case**  | Standard object-oriented patterns.                       | Callbacks, event listeners, utility borrowing. |

### Q: Difference between `call`, `apply`, and `bind`?

- **`call(thisArg, arg1, arg2...)`:** Invokes function immediately.
- **`apply(thisArg, [argsArray])`:** Invokes function immediately with arguments as an array.
- **`bind(thisArg, arg1...)`:** Returns a **new function** with a fixed `this` for later execution.

**Example: Polyfill for Bind**

```javascript
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};
```

---

## 7. Higher-Order Functions & Callbacks

### Q: What is a Higher-Order Function (HOF)?

**A:** A function that either takes another function as an argument (like `map`, `filter`, `reduce`) or returns a function.

---

## 8. Machine Coding & Advanced Challenges

### Q: Implement a Toggle Function

```javascript
function toggle(...values) {
  let index = -1;
  return function () {
    index = (index + 1) % values.length;
    return values[index];
  };
}
const onOff = toggle('on', 'off');
onOff(); // 'on'
onOff(); // 'off'
```

### Q: Find Min/Max in an array using `apply`

```js
const numbers = [10, 5, 20];
const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);
```

---

## 9. Modern Template Patterns: Tagged Template Literals

### Q: What are Tagged Template Literals?

**A:** A Tagged Template is a function call that uses a template literal instead of parentheses. The function (the "tag") receives the string parts and the interpolated values as separate arguments.

**Example:**

```javascript
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return `${acc}${str}<span class="hl">${values[i] || ''}</span>`;
  }, '');
}

const name = 'Atul';
const role = 'Developer';
const result = highlight`User ${name} is a ${role}.`;
console.log(result);
// Output: "User <span class=\"hl\">Atul</span> is a <span class=\"hl\">Developer</span>."
```

### Q: Real-World Use Cases of Tagged Template Literals

1.  **Styled-components (`css` / `styled`):**
    - **Usage:** `` const Button = styled.button`color: red;` ``
    - **Benefit:** Allows writing actual CSS inside JS (CSS-in-JS) while maintaining dynamic logic.
2.  **GraphQL (`gql`):**
    - **Usage:** `` const GET_USER = gql`query { user { name } }` ``
    - **Benefit:** Parses query strings into a type-safe Abstract Syntax Tree (AST).
3.  **LitHTML (`html`):**
    - **Usage:** `` html`<div>${content}</div>` ``
    - **Benefit:** High-performance HTML templating engine for Web Components.
4.  **SQL Safe Queries (`sql`):**
    - **Usage:** `` sql`SELECT * FROM users WHERE id = ${userId}` ``
    - **Benefit:** Automatically prevents SQL Injection by parameterizing inputs.
5.  **Localization/i18n:**
    - **Benefit:** Translating strings while preserving place-holders for dynamic data safely.

---

## 10. Ways of Function Calling in JavaScript

There are **6 primary ways** to invoke a function in JavaScript:

| Method              | Syntax             | Description                                              |
| :------------------ | :----------------- | :------------------------------------------------------- |
| **Direct Call**     | `fn()`             | The standard way. `this` is global/undefined.            |
| **Method Call**     | `obj.method()`     | Calling a function stored in an object. `this` is `obj`. |
| **Constructor**     | `new Fn()`         | Creates a new object. `this` is the new instance.        |
| **Explicit (C/A)**  | `fn.call(obj)`     | Manually setting `this` using `call` or `apply`.         |
| **Tagged Template** | ``fn`hello` ``     | Invoking via a template literal tag.                     |
| **IIFE**            | `(function(){})()` | Immediately invoking a function after defining it.       |

### Detailed Examples:

```javascript
const user = {
  name: 'Atul',
  greet: function (msg) {
    console.log(`${msg}, I am ${this.name}`);
  },
};

// 1. Direct Call
const myFn = user.greet;
// myFn("Hi"); // Error: this.name is undefined (or global) in strict mode

// 2. Method Call
user.greet('Hello'); // "Hello, I am Atul" (this is user)

// 3. Constructor Call
function Person(name) {
  this.name = name;
}
const john = new Person('John'); // Creates new object, this is john

// 4. Explicit Binding (Call/Apply)
const alien = { name: 'Zog' };
user.greet.call(alien, 'Greetings'); // "Greetings, I am Zog"

// 5. Tagged Template Literal
function myTag(strings, ...values) {
  console.log('Strings:', strings);
  console.log('Values:', values);
}
myTag`Hello ${user.name}!`; // Invokes myTag with parts of the string

// 6. IIFE (Immediately Invoked Function Expression)
(function (name) {
  console.log('IIFE for', name);
})('Atul');

/**
 * Tagged Template Literal: The "Highlight" pattern
 * 💡 Interview Tip: Remember that strings.length is always values.length + 1.
 * We must handle the last empty string to avoid appending 'undefined'.
 */
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return `${acc}${str}${values[i] || ''}`;
  }, '');
}

const dogName = 'Snickers';
const dogAge = '100';
const sentence = highlight`My dog's name is ${dogName} and he is ${dogAge} years old`;
console.log(sentence);

/*
How it works under the hood:
highlight`Hi ${name} age ${age}`
becomes:
highlight(
  ["Hi ", " age ", ""], // Strings (Note the trailing empty string)
  name,                 // Value 1
  age                   // Value 2
);
*/
```

---

## 🎯 Best Practices

1.  **Pure Functions:** Aim for functions with no side effects (same input = same output).
2.  **Naming:** Use verbs (e.g., `getUser`, `calculateTotal`).
3.  **Single Responsibility:** One function should do **one** thing.
4.  **Avoid Anonymous Functions for Debugging:** Named functions show up better in Stack Traces.
5.  **Use Arrows for Callbacks:** Keeps the `this` context predictable.
