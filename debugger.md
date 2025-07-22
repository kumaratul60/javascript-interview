# Masterful Debugger: A Comprehensive Guide to Chrome DevTools and Git

This guide provides a comprehensive overview of debugging with Chrome DevTools, from fundamental techniques to advanced features. It also includes a handy Git cheat sheet for version control.

---

## Table of Contents

- [Masterful Debugger: A Comprehensive Guide to Chrome DevTools and Git](#masterful-debugger-a-comprehensive-guide-to-chrome-devtools-and-git)
  - [Table of Contents](#table-of-contents)
  - [Chrome DevTools Debugger Guide](#chrome-devtools-debugger-guide)
    - [Quick Start](#quick-start)
    - [Sources Panel Overview](#sources-panel-overview)
    - [File and Code Navigation](#file-and-code-navigation)
    - [🐞 Debugger Controls](#-debugger-controls)
    - [Breakpoints](#breakpoints)
      - [Standard Breakpoints](#standard-breakpoints)
      - [Conditional Breakpoints](#conditional-breakpoints)
      - [Logpoints](#logpoints)
      - [DOM Change Breakpoints](#dom-change-breakpoints)
      - [Event Listener Breakpoints](#event-listener-breakpoints)
      - [XHR/Fetch Breakpoints](#xhrfetch-breakpoints)
    - [Watch Expressions](#watch-expressions)
    - [Call Stack \& Scope](#call-stack--scope)
    - [Advanced Debugging Techniques](#advanced-debugging-techniques)
      - [Blackboxing Scripts](#blackboxing-scripts)
      - [Async Call Stack Tracing](#async-call-stack-tracing)
      - [Performance \& Memory Profiling](#performance--memory-profiling)
      - [Snippets \& Live Editing](#snippets--live-editing)
  - [Git Cheat Sheet](#git-cheat-sheet)
    - [Setup and Initialization](#setup-and-initialization)
    - [Staging and Committing](#staging-and-committing)
    - [Branching and Merging](#branching-and-merging)
    - [Remote Repositories](#remote-repositories)
    - [Undoing Changes](#undoing-changes)

---

## Chrome DevTools Debugger Guide

### Quick Start

To open Chrome DevTools:

- Right-click on a webpage, select **Inspect**.
- Use the keyboard shortcut: `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac).

### Sources Panel Overview

The Sources panel is your primary tool for JavaScript debugging and is divided into three main sections:

- **File Navigator Pane**: Browse through all the files loaded by the page, including HTML, CSS, and JavaScript.
- **Code Editor Pane**: View and edit the content of the selected file.
- **JavaScript Debugger Pane**: This pane contains a set of powerful tools for debugging, including controls for stepping through code, and sections for managing breakpoints, the call stack, and variable scope.

### File and Code Navigation

- Use the ▶️ arrows to expand folders in the File Navigator.
- Click on a file name to open it in the Code Editor.
- Quickly find files with `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac).

| Action         | Shortcut (Windows/Linux) | Shortcut (Mac) |
| :------------- | :----------------------- | :------------- |
| Go to Line     | `Ctrl+G`                 | `Cmd+G`        |
| Find Function  | `Ctrl+Shift+O`           | `Cmd+Shift+O`  |
| Search in File | `Ctrl+F`                 | `Cmd+F`        |

### 🐞 Debugger Controls

| Icon / Action            | Shortcut    | Description                                                                                                                                      |
| :----------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| ▶️ **Resume**            | `F8`        | Continue execution until the next breakpoint.                                                                                                    |
| ⏯️ **Step**              | `F9`        | Execute the next line of code. If the line contains a function call, the debugger will step into it.                                             |
| ⏭️ **Step Over**         | `F10`       | Execute the current line of code without stepping into any function calls.                                                                       |
| 🔎 **Step Into**         | `F11`       | If the current line contains a function call, the debugger will enter that function and pause at its first line.                                 |
| 🔙 **Step Out**          | `Shift+F11` | Continue execution to the end of the current function and then pause at the next line in the calling function or come out back to prev function. |
| 🎯 **Toggle Breakpoint** | `Ctrl+B`    | Add or remove a breakpoint on the current line.                                                                                                  |

### Breakpoints

Breakpoints are essential for pausing code execution to examine the state of your application.

#### Standard Breakpoints

Click on a line number in the gutter of the Code Editor to set a standard breakpoint. A blue icon will appear.

#### Conditional Breakpoints

These breakpoints only trigger when a specific condition is met. Right-click a line number, select "Add conditional breakpoint," and enter a JavaScript expression that evaluates to true or false. This is particularly useful for debugging loops. The breakpoint will be marked with an orange icon.

#### Logpoints

Logpoints allow you to log messages to the console without pausing execution. This is a great way to inspect variable values without cluttering your code with `console.log()` statements. Right-click a line number, choose "Add logpoint," and enter your log message or an expression to be evaluated. A pink icon with two dots represents a logpoint.

#### DOM Change Breakpoints

These breakpoints are triggered when a specific DOM element changes. In the **Elements** panel, right-click an element and hover over "Break on" to select from:

- **Subtree modifications**: Pauses when a child element is added, removed, or its content changes.
- **Attribute modifications**: Pauses when an attribute of the selected element is changed.
- **Node removal**: Pauses when the selected node is removed from the DOM.

#### Event Listener Breakpoints

These breakpoints pause execution when a specific event, like a mouse click or a keyboard press, occurs. In the **Sources** panel, expand the "Event Listener Breakpoints" pane and select the events or event categories you want to pause on.

#### XHR/Fetch Breakpoints

These allow you to pause execution when a specific XHR or Fetch request is made. In the **Sources** panel, expand the "XHR/Fetch Breakpoints" pane and click "Add breakpoint" to specify a URL or a string to match against the request URL.

### Watch Expressions

The "Watch" section in the debugger pane allows you to monitor the value of variables and expressions in real-time. Click the ➕ icon to add a new expression. The values will update as you step through your code.

### Call Stack & Scope

- **Call Stack**: This section shows the execution path that led to the current breakpoint, with the most recent function at the top. This is especially helpful for understanding asynchronous operations.
- **Scope**: This displays all the variables accessible at the current breakpoint, categorized as local, closure, and global. You can inspect and even modify these variables on the fly.

### Advanced Debugging Techniques

#### Blackboxing Scripts

To prevent the debugger from stepping into third-party library code, you can "blackbox" those scripts. Right-click the script in the File Navigator and select "Blackbox Script". You can manage your blackboxed scripts in the DevTools settings.

#### Async Call Stack Tracing

DevTools provides a feature to trace asynchronous operations. When this is enabled, the call stack will show the full sequence of asynchronous events that led to the current point, making it easier to debug promises and other async code.

#### Performance & Memory Profiling

- **Performance**: The **Performance** panel helps you identify bottlenecks by recording and analyzing runtime performance.
- **Memory**: The **Memory** panel helps you find and fix memory leaks by taking heap snapshots and tracking memory allocation.

#### Snippets & Live Editing

- **Snippets**: You can create and save reusable JavaScript snippets in the **Sources** panel to run on any page.
- **Live Editing**: Edit HTML, CSS, and JavaScript directly within the DevTools and see the changes reflected immediately on the page.

---

## Git Cheat Sheet

Git is a distributed version control system that is essential for modern software development.

### Setup and Initialization

| Command                                    | Description                                                |
| :----------------------------------------- | :--------------------------------------------------------- |
| `git config --global user.name "[name]"`   | Sets the name that will be attached to your commits.       |
| `git config --global user.email "[email]"` | Sets the email that will be attached to your commits.      |
| `git init`                                 | Initializes a new Git repository in the current directory. |
| `git clone [url]`                          | Creates a local copy of a remote repository.               |

### Staging and Committing

| Command                     | Description                                                               |
| :-------------------------- | :------------------------------------------------------------------------ |
| `git status`                | Shows the status of your working directory and staging area.              |
| `git add [file]`            | Adds a file's changes to the staging area for the next commit.            |
| `git diff`                  | Shows the differences between the working directory and the staging area. |
| `git commit -m "[message]"` | Records the staged changes to the repository with a descriptive message.  |
| `git commit --amend`        | Modifies the most recent commit.                                          |

### Branching and Merging

| Command                      | Description                                                    |
| :--------------------------- | :------------------------------------------------------------- |
| `git branch`                 | Lists all local branches.                                      |
| `git branch [branch-name]`   | Creates a new branch.                                          |
| `git checkout [branch-name]` | Switches to the specified branch.                              |
| `git merge [branch-name]`    | Merges the specified branch's history into the current branch. |

### Remote Repositories

| Command                         | Description                                                              |
| :------------------------------ | :----------------------------------------------------------------------- |
| `git remote add origin [url]`   | Adds a remote repository.                                                |
| `git fetch`                     | Fetches changes from the remote repository without merging.              |
| `git pull`                      | Fetches changes from the remote and merges them into the current branch. |
| `git push origin [branch-name]` | Pushes the specified branch to the remote repository.                    |

### Undoing Changes

| Command                  | Description                                                           |
| :----------------------- | :-------------------------------------------------------------------- |
| `git reset [file]`       | Unstages a file, but keeps the changes in the working directory.      |
| `git checkout -- [file]` | Discards changes in a file in the working directory.                  |
| `git revert [commit]`    | Creates a new commit that undoes the changes from a specified commit. |
