# Chrome DevTools Debugger Guide

A markdown guide to mastering Chrome DevTools debugging from basic to advanced usage.

---

## Table of Contents

- [Chrome DevTools Debugger Guide](#chrome-devtools-debugger-guide)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [Sources Panel Overview](#sources-panel-overview)
  - [File Navigation](#file-navigation)
  - [Code Navigation](#code-navigation)
  - [🐞 Debugger Controls](#-debugger-controls)
  - [Breakpoints](#breakpoints)
  - [Watch Expressions](#watch-expressions)
  - [Call Stack \& Scope](#call-stack--scope)
  - [References](#references)

---

## Quick Start

1. Open DevTools:
   - Right-click page → **Inspect** → **Sources** tab
   - Shortcut: `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac) [[6]]

---

## Sources Panel Overview

Three main sections:

1. **File Navigator Pane**: Browse project files (HTML/JS/CSS): File Navigator Pane: Displays the file structure of your project, including HTML, JavaScript, CSS, and other resources.​ [[9]]
2. **Code Editor Pane**: View/edit file contents: Shows the contents of the selected file, allowing you to view and edit code.​
3. **JavaScript Debugger Pane**: Control execution, view breakpoints, and monitor variables, Provides tools for debugging, including breakpoints, call stack, scope variables, and watch expressions.​

---

## File Navigation

- Expand folders with ▶️ arrows
- Open files by clicking names
- Quick search: `Ctrl+P` (Windows/Linux) / `Cmd+P` (Mac) [[9]]

---

## Code Navigation

| Action         | Shortcut (Windows/Linux) | Shortcut (Mac) |
| -------------- | ------------------------ | -------------- | ----- |
| Go to Line     | `Ctrl+G`                 | `Cmd+G`        |
| Find Function  | `Ctrl+Shift+O`           | `Cmd+Shift+O`  |
| Search in File | `Ctrl+F`                 | `Cmd+F`        | [[9]] |

---

## 🐞 Debugger Controls

| Icon / Action            | Shortcut    | Description                                                                     |
| ------------------------ | ----------- | ------------------------------------------------------------------------------- |
| ▶️ **Resume**            | `F8`        | Continue execution until the next breakpoint.                                   |
| ⏭️ **Step Over**         | `F10`       | Execute the current line of code without stepping into functions.               |
| 🔎 **Step Into**         | `F11`       | Enter the next function call and pause at its first line.                       |
| 🔙 **Step Out**          | `Shift+F11` | Finish executing the current function and pause at the line following its call. |
| 🎯 **Toggle Breakpoint** | `F9`        | Enable or disable a breakpoint on the current line.                             |

---

## Breakpoints

1. **Standard**: Click line number in gutter
2. **Conditional**:
   - Right-click line number → **Add conditional breakpoint**
   - Enter JS expression (e.g., `x > 5`) [[9]]

---

## Watch Expressions

Monitor variables/expression:

1. Open **Watch** tab
2. Click ➕ → Enter expression (e.g., `user.name`)
3. Values update dynamically during debugging [[9]]

---

## Call Stack & Scope

- **Call Stack**: Shows function execution path
- **Scope**: Displays local/global variables available at current breakpoint [[9]]

---

## References

- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/)
- [JavaScript Debugging Guide](https://javascript.info/debugging-chrome)
- [Advanced Debugging Techniques](https://developer.chrome.com/docs/devtools/javascript/)
- [GIT Cheat sheet](https://www.freecodecamp.org/news/git-cheat-sheet)
