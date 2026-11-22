# 🍛 JavaScript Absolute Authority: Currying & Partial Application

> _The comprehensive guide to currying in JavaScript: from functional programming mathematics and closure mechanics to production-grade utility implementations, point-free pipelines, and real-world UI patterns._

---

## 🎯 Part 1: Core Fundamentals

### ❓ What is Currying?

- **Formal Definition:** Currying is a functional programming technique where a function that takes multiple arguments `f(a, b, c)` is transformed into a chain of nested functions, each taking **exactly one argument** at a time: `f(a)(b)(c)`.
- **Origin:** Named after the American mathematician and logician **Haskell Brooks Curry** (and Moses Schönfinkel, who originally conceptualized it).
- **Core Mental Model:** Breaking down a multi-step task into smaller, single-step tasks. Instead of requiring all inputs upfront, a curried function receives an argument, remembers it via a **lexical closure**, and waits for the remaining arguments before computing the final result.

```javascript
// Normal function (all arguments required upfront):
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried function (sequence of unary functions):
function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// Modern ES6 Arrow Syntax:
const curriedAddArrow = (a) => (b) => (c) => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6
```

---

### ❓ Currying vs. Partial Application (Top Interview Trap!)

While developers often use these terms interchangeably, they are mathematically and practically distinct:

| Characteristic                  | Currying                                                                               | Partial Application                                                                           |
| :------------------------------ | :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Arity of Returned Functions** | **Always unary:** returns a chain of functions that each take **strictly 1 argument**. | **Flexible:** returns a function of lower arity (can take 1, 2, or more remaining arguments). |
| **Number of Steps**             | Converts an $N$-ary function into $N$ single-argument steps: `f(a)(b)(c)`.             | Binds 1 or more arguments upfront in a single step: `f(a, b, c)` $\to$ `f(1)(2, 3)`.          |
| **Execution**                   | Only computes when **all $N$ single arguments** have been provided one by one.         | Computes when the remaining arguments are supplied to the partially applied function.         |

#### Visual Comparison in Code:

```javascript
function multiply(a, b, c) {
  return a * b * c;
}

// 1. Currying: Each call accepts STRICTLY ONE argument
const curriedMultiply = (a) => (b) => (c) => a * b * c;
curriedMultiply(2)(3)(4); // 24

// 2. Partial Application: Fixes 'a' (and optionally 'b'), returns a function taking remaining arguments
function partialMultiply(a) {
  return function (b, c) {
    return a * b * c; // Accepts multiple arguments at once!
  };
}
const multiplyByTwo = partialMultiply(2);
console.log(multiplyByTwo(3, 4)); // 24
```

---

## 🛠 Part 2: Implementation Techniques

### Technique 1: Currying via Closures

The simplest way to implement currying is using lexical closures to retain each parameter in memory:

```javascript
function volume(length) {
  return function (width) {
    return function (height) {
      return length * width * height;
    };
  };
}

const forLength10 = volume(10);
const forLength10AndWidth5 = forLength10(5);
console.log(forLength10AndWidth5(2)); // 100
```

---

### Technique 2: Currying via `Function.prototype.bind()`

JavaScript's built-in `bind()` method allows you to preset arguments without manually writing nested closures:

```javascript
function multiply(x, y) {
  return x * y;
}

// Bind preset argument (thisArg = null, firstArg = 2)
const double = multiply.bind(null, 2);
console.log(double(5)); // 10

const triple = multiply.bind(null, 3);
console.log(triple(5)); // 15
```

---

### Technique 3: The Generic / Dynamic `curry(fn)` Utility (Production Grade)

In interviews and production libraries (like Lodash `_.curry` or Ramda `R.curry`), you don't write nested functions manually for every function. Instead, you write a **universal `curry()` wrapper** that inspects `fn.length` (the function's arity):

```javascript
function curry(fn) {
  return function curried(...args) {
    // Case 1: If enough arguments are collected, call the original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // Case 2: Not enough arguments yet; return a new function that accumulates them
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// Usage:
function sum4(a, b, c, d) {
  return a + b + c + d;
}

const curriedSum = curry(sum4);

// All invocations yield the exact same result:
console.log(curriedSum(1, 2, 3, 4)); // 10 (Direct invocation)
console.log(curriedSum(1)(2)(3)(4)); // 10 (Pure curried)
console.log(curriedSum(1, 2)(3, 4)); // 10 (Batched calls)
console.log(curriedSum(1)(2, 3, 4)); // 10 (Mixed calls)
```

> [!IMPORTANT]
> **The `fn.length` Trap:** `fn.length` only reflects the number of parameters **before the first parameter with a default value**, and it **ignores rest parameters** (`...args`).
>
> ```javascript
> function test(a, b = 1, c) {}
> console.log(test.length); // 1 (stops at default parameter!)
>
> function rest(a, ...others) {}
> console.log(rest.length); // 1 (ignores rest parameter!)
> ```
>
> Therefore, dynamic arity currying requires functions with explicit, fixed parameters.

---

### Technique 4: Infinite Currying with Empty Invocation Terminator `sum(1)(2)...()`

A staple FAANG interview question: _"Write a sum function that can take any number of chained arguments and returns the total when invoked with no arguments."_

```javascript
function sum(a) {
  let total = a;

  return function next(b) {
    // Base Case: If called with no arguments (), return accumulated total
    if (b === undefined) {
      return total;
    }
    // Recursive Case: Accumulate and return the same function
    total += b;
    return next;
  };
}

console.log(sum(1)(2)(3)(4)()); // 10
console.log(sum(10)(20)(30)(40)(50)()); // 150
```

**Alternative (Pure Functional / Immutable approach):**

```javascript
const sumImmutable = (a) => (b) => (b !== undefined ? sumImmutable(a + b) : a);

console.log(sumImmutable(1)(2)(3)(4)()); // 10
```

---

### Technique 5: Infinite Currying using Implicit Coercion (`valueOf` / `toString`)

What if the interviewer says: _"Make `sum(1)(2)(3) == 6` work without the empty `()` at the end?"_

You override the function's internal `valueOf` or `Symbol.toPrimitive` hook:

```javascript
function sum(a) {
  const inner = (b) => sum(a + b);

  // Hook into JavaScript's type coercion:
  inner.valueOf = () => a;
  inner.toString = () => a;

  return inner;
}

const result = sum(1)(2)(3)(4);
console.log(+result); // 10 (Unary plus triggers valueOf)
console.log(result == 10); // true (Loose equality triggers coercion)
console.log(`Total: ${result}`); // "Total: 10" (String template triggers toString)
```

---

## 💼 Part 3: Real-World Engineering Use Cases

Why should you curry in real-world production code?

### 1. Configurable Logger & Diagnostic Middleware

Avoid passing identical configuration parameters (like app name or log level) across hundreds of log statements:

```javascript
const createLogger = (environment) => (serviceName) => (level) => (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${environment.toUpperCase()}] [${serviceName}] [${level}]: ${message}`);
};

// Create a specialized logger for production payment service:
const prodPaymentLogger = createLogger('production')('PaymentGateway');

// Specialize further by log level:
const logPaymentError = prodPaymentLogger('ERROR');
const logPaymentInfo = prodPaymentLogger('INFO');

// Real-world usage:
logPaymentInfo('Webhook received from Stripe');
logPaymentError('Transaction 8492 timed out while communicating with bank');
```

---

### 2. Event Handling & Form Binding in React / UI Frameworks

In UI development, currying eliminates the need for inline anonymous arrow functions inside JSX or template event handlers:

```jsx
// React Component Example
function UserProfileForm() {
  const [formData, setFormData] = useState({ username: '', email: '', role: 'user' });

  // Curried handler: receives field name first, returns the DOM event handler
  const handleChange = (fieldName) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  };

  return (
    <form>
      {/* Clean, memoizable handler references without inline () => handleChange(...) */}
      <input type="text" value={formData.username} onChange={handleChange('username')} />
      <input type="email" value={formData.email} onChange={handleChange('email')} />
    </form>
  );
}
```

---

### 3. Localization & Currency Formatting

Pre-configure currency, locale, and options once, then reuse the formatter across large financial datasets:

```javascript
const formatCurrency = (locale) => (currency) => (amount) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

const formatUSD = formatCurrency('en-US')('USD');
const formatGBP = formatCurrency('en-GB')('GBP');
const formatINR = formatCurrency('en-IN')('INR');

console.log(formatUSD(1250.5)); // "$1,250.50"
console.log(formatGBP(1250.5)); // "£1,250.50"
console.log(formatINR(1250.5)); // "₹1,250.50"
```

---

### 4. Functional Composition & Point-Free Pipelines

In functional programming, currying enables **point-free style** (tacit programming), where functions do not explicitly mention the data they operate on:

```javascript
// Generic pipe utility:
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((val, fn) => fn(val), x);

// Curried utility functions:
const get = (key) => (obj) => obj[key];
const filter = (predicate) => (arr) => arr.filter(predicate);
const map = (transform) => (arr) => arr.map(transform);

// Sample Data:
const users = [
  { id: 1, name: 'Alice', active: true, score: 85 },
  { id: 2, name: 'Bob', active: false, score: 40 },
  { id: 3, name: 'Charlie', active: true, score: 92 },
];

// Composed point-free pipeline:
const getActiveUserScores = pipe(filter(get('active')), map(get('score')));

console.log(getActiveUserScores(users)); // [85, 92]
```

---

### 5. Reusable API Client & Query Parameter Builders

```javascript
const apiRequest = (baseUrl) => (endpoint) => (headers) => async (params) => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

  const response = await fetch(url, { headers });
  return response.json();
};

// Configure Github API Base:
const githubApi = apiRequest('https://api.github.com')('/repos/facebook/react');
const authenticatedGithubApi = githubApi({ Authorization: 'Bearer TOKEN_123' });

// Calling with just the query params:
// authenticatedGithubApi({ state: 'open', sort: 'created' });
```

---

## ⚠️ Part 4: Performance, Memory & Gotchas

1. **Closure Memory Retention:**
   - Every curried call creates an activation frame and a Lexical Environment object retained in memory until all nested functions are evaluated and garbage collected.
   - Avoid creating deep curried chains inside tight, high-frequency render or animation loops (`60fps / 120fps`).

2. **Call Stack Overhead:**
   - Deep currying (e.g., 50+ arguments chained) creates a stack frame per argument. While typical usage is 2–5 arguments, extremely deep infinite currying without tail-call optimization can hit `Maximum call stack size exceeded`.

3. **Function Arity Inaccuracies:**
   - Always remember that `fn.length` is unreliable when functions use default parameters or rest parameters.

---

## 💡 Top Interview "Grilling" Questions

1. **"What is the mathematical difference between Currying and Partial Application?"**
   - _Ans:_ Currying transforms an $N$-ary function into a chain of $N$ unary functions (each accepting strictly 1 argument). Partial Application fixes a given number of arguments upfront, producing a function with a lower arity that can still accept multiple arguments at once.

2. **"How does `fn.length` work in JavaScript, and why is it critical for generic curry implementations?"**
   - _Ans:_ `fn.length` returns the number of formal parameters defined in the function signature. A generic `curry(fn)` function compares the number of accumulated arguments `args.length` against `fn.length` to determine whether to execute the target function or return another curried wrapper.

3. **"Can you write a dynamic `curry(fn)` implementation on a whiteboard?"**
   - _Ans:_
     ```javascript
     function curry(fn) {
       return function curried(...args) {
         if (args.length >= fn.length) {
           return fn.apply(this, args);
         }
         return (...moreArgs) => curried.apply(this, args.concat(moreArgs));
       };
     }
     ```

4. **"How do you implement `sum(1)(2)(3)...()` (infinite currying with empty call terminator)?"**
   - _Ans:_
     ```javascript
     const sum = (a) => (b) => (b !== undefined ? sum(a + b) : a);
     ```

5. **"How do you implement `sum(1)(2)(3) == 6` without an empty invocation?"**
   - _Ans:_ By overriding `valueOf` / `toString` on the returned function so JavaScript's type coercion unwraps the accumulated numeric value when evaluated in comparison, math, or string contexts.

6. **"Why is currying useful in React event handlers?"**
   - _Ans:_ It allows you to pass parameters (such as form field keys) into event handlers cleanly without writing inline anonymous arrow functions `onChange={(e) => handleChange('name', e)}` in JSX, preserving component readability and memoization stability.

7. **"What is 'Point-Free' style, and how is it related to currying?"**
   - _Ans:_ Point-free style (tacit programming) is writing functions without explicitly declaring their arguments (e.g. `arr.map(Double)` instead of `arr.map(x => Double(x))`). Curried functions are naturally composable with utilities like `pipe` or `compose` because they can be pre-configured to expect exactly one parameter (the value passed through the pipeline).
