# JavaScript `Error` (Object)

## The Basics

### What is `Error`?

In JavaScript, an `Error` is a **non-primitive (reference) data type** that represents an abnormal event or a problem that occurred during the execution of a program. When an error occurs, JavaScript "throws" an `Error` object, which can then be "caught" and handled using `try...catch` blocks.

The `Error` object serves as the base class for several built-in error types, allowing for more specific error handling.

### Key Characteristics

*   **Non-Primitive (Reference Type)**: `Error` instances are objects.
*   **Built-in Types**: JavaScript provides several standard error types that inherit from `Error` (e.g., `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError`, `URIError`, `EvalError`).
*   **Properties**: `Error` objects typically have at least two main properties:
    *   `message`: A human-readable description of the error.
    *   `name`: The name of the error type (e.g., "Error", "TypeError").
    *   `stack`: (Non-standard but widely supported) A string representing the call stack at the time the error was thrown, useful for debugging.
*   **Throwing and Catching**: Errors are `throw`n to interrupt normal program flow and are `catch`ed in `try...catch` blocks to gracefully handle exceptions.
*   **`typeof` Operator**: For `Error` objects, `typeof` returns `"object"`.
    ```js
    const myError = new Error('Test');
    console.log(typeof myError); // "object"
    ```

### Syntax & Examples

```js
// 1. Creating a generic Error object
const myError = new Error('Something went wrong!');
console.log(myError.name);    // "Error"
console.log(myError.message); // "Something went wrong!"
console.log(myError.stack);   // Stack trace (implementation-dependent)

// 2. Throwing and Catching Errors
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log('Result:', result); // This line won't be reached
} catch (error) {
  console.error('Caught an error:', error.message); // Caught an error: Division by zero is not allowed.
  console.error('Error type:', error.name);         // Error type: Error
} finally {
  console.log('Finally block always executes.');
}

// 3. Using specific Error types
function accessProperty(obj, prop) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object.');
  }
  if (!(prop in obj)) {
    throw new ReferenceError(`Property "${prop}" not found.`);
  }
  return obj[prop];
}

try {
  accessProperty(null, 'name');
} catch (error) {
  console.error(error.name + ': ' + error.message); // TypeError: Expected an object.
}

try {
  accessProperty({}, 'nonexistent');
} catch (error) {
  console.error(error.name + ': ' + error.message); // ReferenceError: Property "nonexistent" not found.
}

// 4. Custom Error Types (Inheriting from Error)
class CustomValidationError extends Error {
  constructor(message, field) {
    super(message); // Call parent Error constructor
    this.name = "CustomValidationError"; // Set a specific name
    this.field = field; // Add custom property
  }
}

function validateInput(input) {
  if (!input || input.length < 5) {
    throw new CustomValidationError('Input too short', 'username');
  }
  return true;
}

try {
  validateInput('abc');
} catch (error) {
  if (error instanceof CustomValidationError) {
    console.error(`Validation Failed for field "${error.field}": ${error.message}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## Primitive vs. Non-Primitive

`Error` is a **non-primitive (reference) data type**.

*   **Primitives**: Value-based, immutable, stack-allocated, compared by value.
*   **Non-Primitives (Objects, Arrays, Functions, Error, etc.)**:
    *   **Reference-based**: Variables hold a *reference* (memory address/pointer) to the actual data.
    *   **Mutable**: The `Error` object itself (its properties like `message`, `stack`) can be modified, though this is rarely done outside of specific error handling patterns.
    *   **Heap Allocation**: Stored in the heap memory.
    *   **Comparison**: Compared by reference (`===` checks if two variables point to the exact same `Error` object in memory).

```js
// Reference vs. Value Example
const err1 = new Error('Test');
const err2 = err1; // err2 holds a *reference* to the same Error object as err1

console.log(err1 === err2); // true

const err3 = new Error('Test');
const err4 = new Error('Test');
console.log(err3 === err4); // false (different Error objects in memory)
```

### Memory Allocation (Heap vs. Stack)

*   **Stack**: When an `Error` object is created (e.g., `new Error(...)`), the variable that holds the error instance is stored on the **call stack**. This variable contains a reference (memory address) to the actual `Error` object.
*   **Heap**: The actual `Error` object, including its `message`, `name`, and generated `stack` trace, is stored in the **heap memory**. The stack trace itself can contain references to other objects (e.g., function contexts), which also reside in the heap.

---

## Use Cases & Real-time Applications

Error handling is critical for building robust and resilient applications.

1.  **Indicating Failure in Functions/APIs**: Signalling that an operation could not be completed successfully.
    ```js
    function saveUserData(data) {
      if (!data || !data.userId) {
        throw new Error('User data is invalid.');
      }
      // ... save to DB
    }
    ```
2.  **Graceful Error Recovery**: Using `try...catch` to prevent application crashes and provide user-friendly feedback or alternative actions.
    ```js
    try {
      const response = await fetch('/non-existent-api');
      const data = await response.json();
      renderData(data);
    } catch (networkError) {
      displayOfflineMessage();
      logErrorToServer(networkError);
    }
    ```
3.  **Validation**: Throwing errors when input data does not meet expected criteria.
4.  **Asynchronous Error Handling**: Promises (and `async/await`) use `Error` objects for rejections.
    ```js
    async function getUser(id) {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Could not fetch user:', error);
        throw error; // Re-throw to propagate the error
      }
    }
    ```
5.  **Debugging and Logging**: The `stack` property is invaluable for pinpointing where an error occurred.
    ```js
    try {
      // ... risky code
    } catch (e) {
      console.error('An unexpected error occurred:', e.message);
      console.error('Stack trace:', e.stack); // Send this to an error monitoring service
    }
    ```

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Catching All Errors vs. Specific Errors

A `catch` block catches *any* error thrown within its `try` block. While convenient, it can mask unexpected errors.
```js
try {
  // Potential network error
  const data = JSON.parse('invalid json'); // JSON.parse throws SyntaxError
} catch (e) {
  // This will catch SyntaxError, not just network errors.
  // It might lead to incorrect handling if you expected only one type of error.
  console.error('An error occurred:', e.message);
}
```
**Fix**: Use `instanceof` to check for specific error types, or implement custom errors for clearer distinctions.
```js
try {
  // ...
} catch (e) {
  if (e instanceof TypeError) {
    console.error('Type-related error:', e.message);
  } else if (e instanceof CustomValidationError) {
    console.error('Custom validation error:', e.message);
  } else {
    console.error('Unhandled generic error:', e);
  }
}
```

### 2. `Error` vs. Throwing Strings/Primitives

While you *can* throw any value in JavaScript (`throw 'Error!'`), it's highly recommended to *always throw `Error` objects*.
```js
try {
  throw 'Simple string error';
} catch (e) {
  console.log(e);        // "Simple string error"
  console.log(e.name);   // undefined
  console.log(e.message); // undefined
  console.log(e.stack);  // undefined (no stack trace)
}
```
**Pitfall**: Throwing primitives loses valuable debugging information like `name` and `stack` trace.
**Fix**: `throw new Error('Your custom message');` or `throw new TypeError('Invalid type');`.

### 3. Asynchronous Error Handling

`try...catch` blocks only work for synchronous code. They *do not* catch errors from asynchronous operations unless the asynchronous operation itself is wrapped in an `async` function and `await`ed.
```js
try {
  setTimeout(() => {
    throw new Error('Async error!'); // This error will NOT be caught by the try/catch
  }, 0);
} catch (e) {
  console.error('Caught sync error:', e.message);
}
// Output: Uncaught Error: Async error! (in browsers)
```
**Fix**: Handle asynchronous errors using Promise `.catch()` handlers or `try...catch` within `async/await` functions.
```js
async function doAsyncStuff() {
  try {
    await new Promise((_, reject) => setTimeout(() => reject(new Error('Async error!')), 0));
  } catch (e) {
    console.error('Caught async error:', e.message);
  }
}
doAsyncStuff();
```

### 4. Custom Error Types and `instanceof`

For custom error types, ensure proper inheritance from `Error` to make `instanceof` checks reliable and to get the full `Error` object benefits (like `stack`).
```js
// Correct way (ES6 classes)
class MyCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyCustomError';
    // Optional: capture stack trace if not automatically done by environment
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MyCustomError);
    }
  }
}
```

### 5. Suppressing Errors

Catching an error and then doing nothing with it (swallowing the error) can lead to silent failures and hard-to-debug issues.
**Fix**: Always log caught errors, display them to the user, or re-throw them if they cannot be handled locally.

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Object representing an abnormal program event/problem.         |
| **Type**           | Non-Primitive (Reference Type).                                |
| **Properties**     | `message`, `name`, `stack` (non-standard).                     |
| **Inheritance**    | Base class for specific error types (e.g., `TypeError`).       |
| **`typeof`**       | Returns `"object"`.                                            |
| **Memory**         | Variable on **Stack** holds **Heap** reference to Error object (with stack trace). |
| **Handling**       | `throw`, `try...catch`, Promise `.catch()`, `async/await` `try...catch`. |
| **Creation**       | `new Error()`, `new TypeError()`, etc.                         |
| **Pitfall**        | Catching generic errors, throwing primitives, async error handling, suppressing errors. |

---

### Final Decision: When to use?

*   **To signal an unexpected or unrecoverable situation in your code**: ✅ ALWAYS.
*   **For robust program flow control when problems occur**: ✅ ALWAYS.
*   **To provide clear, debuggable information when something goes wrong**: ✅ ALWAYS, by throwing `Error` objects (or their descendants) with descriptive messages.
*   **For handling asynchronous operation failures**: ✅ Use Promise `.catch()` or `async/await` `try...catch`.
*   **Throwing strings or other primitives as errors**: ❌ NEVER. Always throw `Error` objects.
*   **Suppressing errors without logging or handling**: ❌ NEVER. This makes debugging impossible.
*   **Creating custom error types for specific application scenarios**: ✅ YES, by extending the base `Error` class.
