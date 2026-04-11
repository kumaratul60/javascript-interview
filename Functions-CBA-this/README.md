# JavaScript Functions: The 0-100 Interview Guide

A comprehensive roadmap to mastering JavaScript functions, from basic syntax to advanced architectural patterns.

---

## 📑 Roadmap

### The Foundations

- **Concepts:** Function Declarations vs. Expressions, Arrow Functions, IIFEs.
- **Key Files:** `01-Basics-and-Types/`
- **Goal:** Understand syntax, hoisting, and the `arguments` object.

### The Execution Context

- **Concepts:** The `this` keyword, Implicit/Explicit Binding (`call`, `apply`, `bind`).
- **Key Files:** `02-This-Call-Apply-Bind/`
- **Goal:** Master function borrowing and context management.

### Functional Programming

- **Concepts:** Closures, Currying, Higher-Order Functions (HOF), Callbacks.
- **Key Files:** `03-Currying-and-Closures/`, `04-Higher-Order-and-Callbacks/`
- **Goal:** Understand memory persistence (Closures) and function transformation (Currying).

### Advanced Machine Coding

- **Concepts:** Debouncing, Throttling, Memoization, Recursion, Pipe/Compose.
- **Key Files:** `05-Machine-Coding-Challenges/`
- **Goal:** Solve real-world performance problems and build utility libraries.

---

## 🚦 Strategic Usage Guide

| Goal                           | Use                     |
| :----------------------------- | :---------------------- |
| Privacy / Encapsulation        | `IIFE` / `Closures`     |
| Method Borrowing               | `.call()` / `.apply()`  |
| Event Listeners / Delays       | `.bind()`               |
| Optimization (expensive calls) | `Memoization`           |
| Rate Limiting (UI events)      | `Debounce` / `Throttle` |
| Complex logic chaining         | `Pipe` / `Compose`      |

---

## 🛡️ Best Practices

- **Pure Functions:** Same input, same output. No side effects.
- **Naming:** Use verbs (e.g., `fetchData`, `validateEmail`).
- **Arrow vs. Regular:** Use Arrows for callbacks (lexical `this`), Regular functions for object methods.
- **Cleanup:** Always remove event listeners and clear timers in `finally` or component unmounts.

---

## 📂 Folder Overview

1. **01-Basics-and-Types:** Foundational syntax.
2. **02-This-Call-Apply-Bind:** Deep dive into context.
3. **03-Currying-and-Closures:** Power of lexical scope.
4. **04-Higher-Order-and-Callbacks:** Functional orchestration.
5. **06-Interview-QA:** Quick revision & logic puzzles.
