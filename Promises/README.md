# JavaScript Promises:

This directory is a comprehensive collection of Promise-related concepts, from basic usage to building a Promise library from scratch. It's organized to help you master asynchronous JavaScript for interviews and real-world development.

## ⚡ Quick Reference: Features & Versions

| Feature                 | Version | Best For                                                                |
| :---------------------- | :------ | :---------------------------------------------------------------------- |
| `Promise.allSettled`    | ES2020  | **Audit results:** When you need to know the outcome of every promise.  |
| `Promise.any`           | ES2021  | **Fallback strategy:** Take the first success and ignore failures.      |
| `Promise.withResolvers` | ES2024  | **External Control:** Create a promise and its controllers in one line. |
| `Promise.try`           | ES2025  | **Safety Net:** Ensure sync code entry always returns a promise.        |

---

## 🏗️ Core Terminology

- **State:** `resolve` / `reject` (How a promise transitions).
- **Handlers:** `.then()` / `.catch()` / `.finally()` (How we respond to state changes).
- **Orchestration:** `static methods` (How we manage multiple promises together).

---

## 🚦 Strategic Usage Guide

| Goal                  | Use                     |
| :-------------------- | :---------------------- |
| Simple async logic    | `await`                 |
| Ensure all succeed    | `Promise.all`           |
| Collect all results   | `Promise.allSettled`    |
| First success wins    | `Promise.any`           |
| First finished wins   | `Promise.race`          |
| Implement a timeout   | `Promise.race`          |
| Unify sync/async code | `Promise.try`           |
| Manual resolve/reject | `Promise.withResolvers` |

---

## 🛡️ Best Practices

- **Readability:** Prefer `async/await` over raw `.then()` chains for cleaner, linear code.
- **Safety:** Use `Promise.try` or wrap risky sync code to prevent unhandled exceptions.
- **Memory:** Always clean up timers or listeners in `.finally()`.

---

## 📂 Directory Structure

### [01-Core-Concepts](./01-Core-Concepts)

The building blocks: Async/Await, the Event Loop, Callback Hell, and basic Promise syntax.

- **Goal:** Understand _how_ and _why_ Promises were introduced.

### [02-Polyfills-From-Scratch](./02-Polyfills-From-Scratch)

The "Deep Dive" section. Implementing `MyPromise` from scratch.

- **Goal:** Understand the internal state machine, microtasks (`queueMicrotask`), and chaining.

### [03-Static-Methods](./03-Static-Methods)

Mastering the Promise API: `all`, `allSettled`, `race`, and `any`.

- **Goal:** Know which method to use for different concurrency requirements.

### [04-Advanced-Challenges](./04-Advanced-Challenges)

Real-world complex problems: Auto-retry, Promise Pooling, Throttling, and Custom Timeouts.

- **Goal:** Solve high-level machine coding rounds and architectural problems.

### [05-Interview-QA](./05-Interview-QA)

A curated list of common (and tricky) interview questions and answers.

- **Goal:** Quick revision and practice with "What's the output?" style questions.

---

## 🚀 How to Practice

1. Start with **Core Concepts** to build your foundation.
2. Move to **Polyfills** to understand the "magic" under the hood.
3. Solve the **Advanced Challenges** to prepare for senior-level interviews.
4. Review **Interview QA** before your actual interview.

---

## 💡 Pro-Tip for Interviews

When asked about Promises, always mention:

- **State Machine:** Pending, Fulfilled, Rejected.
- **Microtask Queue:** Promises have higher priority than `setTimeout`.
- **Inversion of Control:** How Promises solve the callback-to-callback problem.
