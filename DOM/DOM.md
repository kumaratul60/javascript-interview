# 📘 Deep Dive: DOM & DOM Manipulation in JavaScript

A complete, in-depth markdown guide for learning and interviewing with DOM fundamentals, manipulation techniques, performance tuning, and advanced comparisons.

---

## 📌 Table of Contents

- [📘 Deep Dive: DOM \& DOM Manipulation in JavaScript](#-deep-dive-dom--dom-manipulation-in-javascript)
  - [📌 Table of Contents](#-table-of-contents)
  - [What is the DOM?](#what-is-the-dom)
  - [DOM Types](#dom-types)
  - [DOM Access Methods](#dom-access-methods)
  - [DOM Manipulation Techniques](#dom-manipulation-techniques)
  - [Event Delegation \& Propagation](#event-delegation--propagation)
  - [DOM Reflow vs Repaint](#dom-reflow-vs-repaint)
  - [DOM + CSSOM + Render Tree](#dom--cssom--render-tree)
  - [Real-world DOM Interview Q\&A](#real-world-dom-interview-qa)
  - [innerText vs textContent vs innerHTML](#innertext-vs-textcontent-vs-innerhtml)
  - [innerHTML vs outerHTML vs createTextNode](#innerhtml-vs-outerhtml-vs-createtextnode)
- [DOM Manipulation Deep-Dive Guide](#dom-manipulation-deep-dive-guide)
  - [📚 DOM Fundamentals](#-dom-fundamentals)
    - [What is the DOM?](#what-is-the-dom-1)
    - [Key DOM Object Types:](#key-dom-object-types)
  - [🔍 DOM Selection APIs](#-dom-selection-apis)
    - [1. `getElementById()`](#1-getelementbyid)
    - [2. `getElementsByClassName()`](#2-getelementsbyclassname)
    - [3. `getElementsByTagName()`](#3-getelementsbytagname)
    - [4. `getElementsByName()`](#4-getelementsbyname)
    - [5. `getElementsByTagNameNS(namespace, name)`](#5-getelementsbytagnamensnamespace-name)
    - [6. `querySelector()` vs `querySelectorAll()`](#6-queryselector-vs-queryselectorall)
    - [Comparison: Live vs Static Collections](#comparison-live-vs-static-collections)
    - [Special Accessors](#special-accessors)
  - [🌐 DOM vs CSSOM vs BOM vs Render Tree](#-dom-vs-cssom-vs-bom-vs-render-tree)
    - [Browser Rendering Pipeline:](#browser-rendering-pipeline)
  - [⚙️ Reflow vs Repaint vs Composite](#️-reflow-vs-repaint-vs-composite)
  - [What is the DOM?](#what-is-the-dom-2)
  - [DOM, CSSOM, BOM, and the Rendering Pipeline](#dom-cssom-bom-and-the-rendering-pipeline)
    - [The Rendering Process](#the-rendering-process)
    - [Reflow, Repaint, and Composite](#reflow-repaint-and-composite)
  - [DOM Access Methods](#dom-access-methods-1)
    - [Comparison: `querySelectorAll` vs. `getElementsByTagName`/`ClassName`](#comparison-queryselectorall-vs-getelementsbytagnameclassname)
    - [Other Notable Accessor Methods](#other-notable-accessor-methods)
  - [DOM Manipulation](#dom-manipulation)
  - [🧠 Event Delegation \& Propagation](#-event-delegation--propagation)
    - [Event Propagation Phases](#event-propagation-phases)
    - [Stopping Event Flow](#stopping-event-flow)
    - [Event Delegation](#event-delegation)
    - [Event Propagation: Bubbling and Capturing](#event-propagation-bubbling-and-capturing)
    - [Stopping Propagation](#stopping-propagation)
    - [Event Delegation](#event-delegation-1)
  - [🧪 Shadow DOM](#-shadow-dom)
  - [🧩 DOM Manipulation Patterns](#-dom-manipulation-patterns)
    - [Module Pattern](#module-pattern)
    - [Observer Pattern](#observer-pattern)
    - [Virtual DOM](#virtual-dom)
    - [Event Delegation Pattern](#event-delegation-pattern)
    - [2. Shadow DOM](#2-shadow-dom)
  - [🚀 Performance and Optimization](#-performance-and-optimization)
    - [Rendering 10,000 DOM nodes: Best Practices](#rendering-10000-dom-nodes-best-practices)
    - [Tackling 10,000 DOM Elements](#tackling-10000-dom-elements)
- [DOM Manipulation Deep Dive (Interview \& Real-World)](#dom-manipulation-deep-dive-interview--real-world)
  - [📌 Advanced Interview Questions with Answers](#-advanced-interview-questions-with-answers)
    - [1. Describe the rendering flow: DOM → CSSOM → Render Tree → Layout → Paint → Composite](#1-describe-the-rendering-flow-dom--cssom--render-tree--layout--paint--composite)
    - [2. Difference between `querySelector` vs `getElementsByClassName`](#2-difference-between-queryselector-vs-getelementsbyclassname)
    - [3. What causes Reflow vs Repaint? How to optimize?](#3-what-causes-reflow-vs-repaint-how-to-optimize)
    - [4. How does Shadow DOM help in style encapsulation?](#4-how-does-shadow-dom-help-in-style-encapsulation)
    - [5. Why is Event Delegation more performant?](#5-why-is-event-delegation-more-performant)
    - [6. Explain how to render large lists efficiently.](#6-explain-how-to-render-large-lists-efficiently)
    - [7. What’s the difference between live `HTMLCollection` and static `NodeList`?](#7-whats-the-difference-between-live-htmlcollection-and-static-nodelist)
    - [8. What happens when you trigger `innerHTML` on a large tree?](#8-what-happens-when-you-trigger-innerhtml-on-a-large-tree)
    - [9. Explain `getRootNode()` in Shadow DOM context.](#9-explain-getrootnode-in-shadow-dom-context)
    - [10. How would you throttle DOM updates on window resize?](#10-how-would-you-throttle-dom-updates-on-window-resize)

---

## What is the DOM?

**DOM (Document Object Model)** is a tree-like representation of HTML elements, allowing JavaScript to read and manipulate content, structure, and styles of the page.

```js
console.log(document); // Root node
console.log(document.body); // <body>
console.log(document.URL); // Current page URL
```

---

## DOM Types

| Type           | Description                         |
| -------------- | ----------------------------------- |
| Document       | Root node of the DOM tree           |
| Element        | HTML tags like `<p>`, `<div>`       |
| Text           | Text inside an element              |
| Attribute      | Attributes like `id`, `class`, etc. |
| NodeList       | Array-like list of DOM nodes        |
| HTMLCollection | Live collection of DOM elements     |

---

## DOM Access Methods

```js
// By ID
const el = document.getElementById("heading");

// By class
const items = document.getElementsByClassName("info");

// By tag
const paras = document.getElementsByTagName("p");

// Query selector (first match)
const para = document.querySelector("p.info");

// Query selector all (NodeList)
const allParas = document.querySelectorAll("p.info");
```

---

## DOM Manipulation Techniques

```js
// Text content
el.textContent = "New text";

// Inner HTML
el.innerHTML = "<span>Hello</span>";

// Attributes
el.setAttribute("id", "box");

// Styles
el.style.backgroundColor = "blue";

// Create & append
const div = document.createElement("div");
document.body.appendChild(div);

// Remove
div.remove();
```

---

## Event Delegation & Propagation

```js
// Event bubbling
child.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent parent handler
});

// Delegation pattern
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});
```

> Use delegation for dynamic content & memory efficiency.

---

## DOM Reflow vs Repaint

| Operation                          | Triggers Reflow? | Triggers Repaint? |
| ---------------------------------- | ---------------- | ----------------- |
| `el.style.width = "100px"`         | ✅ Yes           | ✅ Yes            |
| `el.style.backgroundColor = "red"` | ❌ No            | ✅ Yes            |

**Avoid layout thrashing:**

```js
// ❌ Bad:
el.style.width = "100px";
console.log(el.offsetHeight);

// ✅ Good:
el.style.width = "100px";
el.style.height = "200px";
const h = el.offsetHeight;
```

---

## DOM + CSSOM + Render Tree

```
HTML → DOM
CSS → CSSOM
DOM + CSSOM → Render Tree
Render Tree → Layout → Paint → Composite
```

| Step        | Result                         |
| ----------- | ------------------------------ |
| DOM         | Structure of HTML              |
| CSSOM       | Parsed style rules             |
| Render Tree | Only visible + styled elements |
| Layout      | Calculates positions           |
| Paint       | Renders pixels                 |
| Composite   | GPU paints to screen           |

---

## Real-world DOM Interview Q\&A

- Use `textContent` for safe, fast updates
- Use `innerHTML` carefully with sanitization
- Avoid reflows by batching DOM reads/writes
- Use `DocumentFragment` to reduce layout recalculations

```js
// Remove all children
document.getElementById("app").innerHTML = "";

// Safe template render
const template = document.createElement("template");
template.innerHTML = `<div>${user.name}</div>`;
document.body.appendChild(template.content.cloneNode(true));
```

---

## innerText vs textContent vs innerHTML

| Feature          | `innerText` | `textContent` | `innerHTML` |
| ---------------- | ----------- | ------------- | ----------- |
| Hidden elements? | ❌ Skipped  | ✅ Included   | ✅ Included |
| Human readable   | ✅ Yes      | ❌ Raw text   | ❌ No       |
| Parses HTML?     | ❌ No       | ❌ No         | ✅ Yes      |
| Performance      | ❌ Slower   | ✅ Fastest    | ❌ Medium   |
| Triggers reflow? | ✅ Yes      | ❌ No         | ✅ Yes      |

---

## innerHTML vs outerHTML vs createTextNode

```js
// Replacing content only
el.innerHTML = "<b>Hi</b>";

// Replacing full element
el.outerHTML = "<section>New</section>";

// Safe text insertion
const text = document.createTextNode(userInput);
el.appendChild(text);
```

> ✅ Use `<template>` + `cloneNode()` for scalable UI rendering

```html
<template id="card-template">
  <div class="card"><h2 class="name"></h2></div>
</template>
```

```js
const tpl = document.getElementById("card-template");
const clone = tpl.content.cloneNode(true);
clone.querySelector(".name").textContent = "Atul";
document.body.appendChild(clone);
```

---

> 💡 For best performance: Use `textContent` > `innerText` > `innerHTML`, and avoid reflows.

---

# DOM Manipulation Deep-Dive Guide

This markdown document is designed for **frontend interviews**, deep learning, and real-world usage. It spans beginner to advanced topics, including performance tips, DOM internals, and event systems.

---

## 📚 DOM Fundamentals

### What is the DOM?

- The **Document Object Model (DOM)** is a tree-like API representation of HTML and XML documents.
- It allows JavaScript to access, traverse, and manipulate web page content, structure, and style.

### Key DOM Object Types:

| Object Type    | Description                                   |
| -------------- | --------------------------------------------- |
| `document`     | Root object of the DOM tree                   |
| `Node`         | Base interface for all DOM nodes              |
| `Element`      | Subtype of Node representing HTML tags        |
| `Attr`         | Represents attributes of Elements             |
| `NodeList`     | Array-like object of Nodes                    |
| `NamedNodeMap` | Collection of Attrs, accessible by name/index |

---

## 🔍 DOM Selection APIs

### 1. `getElementById()`

- Returns: a **single** element with the matching `id`.

### 2. `getElementsByClassName()`

- Returns: a **live HTMLCollection** of elements with the given class.

### 3. `getElementsByTagName()`

- Returns: a **live HTMLCollection** by tag name.

### 4. `getElementsByName()`

- Returns: NodeList of elements with a matching `name` attribute.

### 5. `getElementsByTagNameNS(namespace, name)`

- Used for namespaced XML documents (like SVG).

### 6. `querySelector()` vs `querySelectorAll()`

| Method               | Returns         | Notes                                |
| -------------------- | --------------- | ------------------------------------ |
| `querySelector()`    | First match     | Uses CSS selector syntax             |
| `querySelectorAll()` | Static NodeList | Use `forEach()` or spread to iterate |

### Comparison: Live vs Static Collections

- `getElementsBy*` methods return **live** collections
- `querySelectorAll` returns a **static NodeList**

### Special Accessors

- `document.rootNode()` → Gets the root of DOM tree (useful for Shadow DOM)
- `document.getSelection()` → Returns selected text on the page

---

## 🌐 DOM vs CSSOM vs BOM vs Render Tree

| Component   | Description                                      |
| ----------- | ------------------------------------------------ |
| DOM         | HTML content structure                           |
| CSSOM       | CSS as an object tree (includes computed values) |
| BOM         | Browser-specific APIs (window, navigator, etc)   |
| Render Tree | Combination of visible DOM + CSSOM               |

### Browser Rendering Pipeline:

1. **Parse HTML → DOM**
2. **Parse CSS → CSSOM**
3. **DOM + CSSOM → Render Tree**
4. **Layout (Reflow)**: calculate size & position
5. **Paint**: draw pixels
6. **Composite**: assemble layers

---

## ⚙️ Reflow vs Repaint vs Composite

| Step          | Triggered By                          | Expensive?  |
| ------------- | ------------------------------------- | ----------- |
| **Reflow**    | Geometry/layout change (width/height) | ✅ Yes      |
| **Repaint**   | Visual changes (color, shadow)        | ⚠️ Moderate |
| **Composite** | Layer assembly (transform, opacity)   | ❌ Least    |

> ❗ Avoid frequent Reflows by batching DOM changes & avoiding layout thrashing.

---

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page's structure and content as a tree of objects, where each object corresponds to a part of the document, like an element or a text node. JavaScript can use the DOM to access and manipulate all the elements of an HTML document.

Key characteristics:
*   **Tree-like structure:** Represents the hierarchy of HTML elements.
*   **Language-agnostic API:** While commonly used with JavaScript, the DOM is a language-neutral interface.
*   **Dynamic:** Scripts can add, remove, and change elements and attributes.

```javascript
// Example: Accessing the document object
console.log(document.documentElement); // Logs the <html> element
```

---

## DOM, CSSOM, BOM, and the Rendering Pipeline

To understand the DOM's role, it's crucial to know how a browser renders a webpage.

*   **DOM (Document Object Model):** A tree structure created from the parsed HTML, representing the document's content.
*   **CSSOM (CSS Object Model):** A tree structure created from the parsed CSS, representing the styles associated with the DOM nodes.
*   **BOM (Browser Object Model):** A collection of browser-specific objects that allow JavaScript to interact with the browser, outside the content of the page. The `window` object is a key part of the BOM.

### The Rendering Process

1.  **Parsing:** The browser parses the HTML into a DOM tree and the CSS into a CSSOM tree.
2.  **Render Tree:** The DOM and CSSOM are combined to form a render tree. This tree only includes visible elements; for example, elements with `display: none` are excluded.
3.  **Layout / Reflow:** The browser calculates the size and position of each element in the render tree.
4.  **Paint:** The browser draws the pixels for each element on the screen.
5.  **Composite:** The browser combines the painted layers to display the final image on the screen.

### Reflow, Repaint, and Composite

*   **Reflow (or Layout):** Occurs when the geometry of an element changes (e.g., width, height, position), affecting the layout of other elements. It's the most expensive operation.
*   **Repaint:** Happens when the visual style of an element changes without affecting its layout (e.g., `background-color`, `color`). It's less expensive than a reflow.
*   **Composite:** The least expensive operation, where the browser combines layers, often handled by the GPU. Changes to properties like `transform` and `opacity` often only trigger a composite.

---

## DOM Access Methods

| Method | Description | Returns |
| --- | --- | --- |
| `getElementById(id)` | Selects a single element by its unique ID. | A single element object. |
| `getElementsByTagName(tagName)` | Selects all elements with the given tag name. | A live `HTMLCollection`. |
| `getElementsByClassName(className)` | Selects all elements with the given class name. | A live `HTMLCollection`. |
| `querySelector(selector)` | Selects the first element that matches the specified CSS selector. | The first matching element object. |
| `querySelectorAll(selector)` | Selects all elements that match the specified CSS selector(s). | A static `NodeList`. |

### Comparison: `querySelectorAll` vs. `getElementsByTagName`/`ClassName`

| Feature | `querySelectorAll` | `getElementsByTagName`/`ClassName` |
| --- | --- | --- |
| **Return Value** | Static `NodeList` | Live `HTMLCollection` |
| **"Live" vs. "Static"** | A snapshot in time; doesn't update if the DOM changes. | Updates automatically with changes to the DOM. |
| **Performance** | Generally slower for simple class or tag selections. | Generally faster for simple selections. |
| **Flexibility** | Supports complex CSS selectors. | Limited to tag or class names. |

### Other Notable Accessor Methods

*   `document.getElementsByName(elementName)`: Returns a `NodeList` of elements with a given `name` attribute.
*   `document.getElementsByTagNameNS(namespaceURI, localName)`: Used for XML documents with namespaces, like SVG.
*   `document.getRootNode()`: Returns the root of the document, which can be the `document` itself or a `shadowRoot`.
*   `document.getSelection()`: Returns a `Selection` object representing the text selected by the user.

---

## DOM Manipulation

JavaScript can dynamically alter the DOM.

```javascript
// Create a new element
const newDiv = document.createElement('div'); [19]

// Add content
newDiv.textContent = 'Hello, World!';

// Add a class
newDiv.classList.add('my-class');

// Set an attribute
newDiv.setAttribute('id', 'my-div');

// Append to the body
document.body.appendChild(newDiv);

// Remove the element
newDiv.remove(); [19]
```

---

## 🧠 Event Delegation & Propagation

### Event Propagation Phases

1. **Capturing Phase** (top-down)
2. **Target Phase** (actual target)
3. **Bubbling Phase** (bottom-up, default)

### Stopping Event Flow

- `event.stopPropagation()` → Stops bubbling
- `event.stopImmediatePropagation()` → Stops all handlers

### Event Delegation

Attach one event listener to a common parent:

```js
ul.addEventListener("click", (e) => {
  if (e.target.matches("li.item")) {
    console.log("Clicked item:", e.target.textContent);
  }
});
```

✅ Useful for dynamic lists and performance optimization

### Event Propagation: Bubbling and Capturing

When an event occurs on an element, it doesn't just happen on that one element. The event travels through the DOM in two phases:

1.  **Capturing Phase:** The event travels from the root of the document down to the target element.
2.  **Bubbling Phase:** The event travels from the target element back up to the root of the document. This is the default behavior.

You can specify which phase to handle the event in by using the third argument of `addEventListener`:
`element.addEventListener('click', myFunction, useCapture);`
If `useCapture` is `true`, the event is handled during the capturing phase. If `false` or omitted, it's handled during the bubbling phase.

### Stopping Propagation

You can prevent an event from traveling further through the DOM:

*   `event.stopPropagation()`: Prevents the event from moving to the next element in the capturing or bubbling phase.
*   `event.stopImmediatePropagation()`: If multiple event listeners are attached to the same element for the same event type, this method prevents other listeners from being called.

### Event Delegation

Event delegation is a pattern where you attach a single event listener to a parent element to manage events for multiple child elements. This is more efficient than attaching an event listener to every single child, especially for large or dynamic lists.

```javascript
// Get the parent list
const list = document.getElementById('myList');

// Add a single event listener to the parent
list.addEventListener('click', function(event) {
  // Check if the clicked element is a list item
  if (event.target && event.target.tagName === 'LI') {
    console.log('Clicked list item:', event.target.textContent);
  }
});
```

**Benefits of Event Delegation:**
*   **Improved Performance:** Fewer event listeners mean less memory usage.
*   **Dynamic Elements:** It works automatically for child elements added to the DOM after the listener is attached.

---

## 🧪 Shadow DOM

- A **scoped**, encapsulated DOM subtree attached to an element

```js
const host = document.createElement("div");
const shadow = host.attachShadow({ mode: "open" });
shadow.innerHTML = `<style>p {color: red}</style><p>Hello Shadow</p>`;
document.body.appendChild(host);
```

- Prevents style leaks and improves modularity (used in Web Components)

---

## 🧩 DOM Manipulation Patterns

### Module Pattern

Encapsulates logic to avoid global scope pollution.

### Observer Pattern

Using `MutationObserver` to track DOM changes.

### Virtual DOM

Used by React/Vue for diffing and batching updates.

### Event Delegation Pattern

Use single parent listener instead of multiple child listeners.

---




### 2. Shadow DOM

The Shadow DOM is a web standard that allows for the encapsulation of an element's structure, style, and behavior. It creates a hidden, separate DOM tree attached to an element, known as the "shadow host".

This encapsulation means:
*   Styles defined inside a shadow DOM don't leak out to the main document.
*   Styles from the main document don't affect elements inside the shadow DOM.

This is crucial for creating reusable components, like those in Web Components.

```javascript
// Get the host element
const host = document.getElementById('shadow-host');

// Create a shadow root
const shadowRoot = host.attachShadow({ mode: 'open' });

// Add content to the shadow DOM
shadowRoot.innerHTML = `
  <style>
    p {
      color: red;
    }
  </style>
  <p>This is inside the Shadow DOM!</p>
`;
```

```js
const container = document.createElement("div");
const shadowRoot = container.attachShadow({ mode: "open" });
shadowRoot.innerHTML = `<style>p {color: red;}</style><p>Shadow DOM content</p>`;
document.body.appendChild(container);
```

---

## 🚀 Performance and Optimization

### Rendering 10,000 DOM nodes: Best Practices

- Use **virtualization/windowing** (`react-window`, `virtual-scroller`)
- Batch DOM updates via **DocumentFragment**
- Minimize **layout thrashing** (read → write → read = BAD)
- Prefer **CSS transform/opacity** over costly properties (top/left)
- Use **debounce/throttle** for scroll/resize events

### Tackling 10,000 DOM Elements

Rendering thousands of DOM elements can significantly impact performance. Here's how to handle it:

*   **Virtualization (Windowing):** Only render the elements that are currently visible in the viewport. As the user scrolls, elements that move out of view are recycled or replaced with new ones. This is a common technique in frameworks like React (`react-window`).
*   **DocumentFragment:** When adding multiple elements to the DOM, it's more efficient to append them to a `DocumentFragment` first and then append the fragment to the DOM. This results in a single reflow and repaint, rather than one for each element.
    ```javascript
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 10000; i++) {
      const newItem = document.createElement('li');
      newItem.textContent = `Item ${i + 1}`;
      fragment.appendChild(newItem);
    }

    document.getElementById('my-list').appendChild(fragment);
    ```
*   **Debouncing and Throttling:** For events that fire rapidly, like `scroll` or `resize`, use debouncing or throttling to limit the number of times your event handler function is called.

---

# DOM Manipulation Deep Dive (Interview & Real-World)

---

## 📌 Advanced Interview Questions with Answers

### 1. Describe the rendering flow: DOM → CSSOM → Render Tree → Layout → Paint → Composite

```txt
1. **DOM**: Browser parses HTML into a tree structure (Document Object Model).
2. **CSSOM**: Browser parses CSS (internal, external, inline) into a tree structure.
3. **Render Tree**: DOM + CSSOM merged, contains only visible elements and computed styles.
4. **Layout (Reflow)**: Calculates exact positions and dimensions for each visible element.
5. **Paint**: Fills pixels on screen (color, text, shadows, borders).
6. **Composite**: Combines painted layers for the final rendered result (especially for GPU-accelerated elements).
```

---

### 2. Difference between `querySelector` vs `getElementsByClassName`

```txt
- `querySelector`: Returns the **first matching** element. Accepts **complex CSS selectors**.
- `getElementsByClassName`: Returns **live HTMLCollection** of all elements with the class.

| Feature                   | querySelector       | getElementsByClassName     |
|--------------------------|---------------------|-----------------------------|
| Return type              | Single Element (first match) | Live HTMLCollection     |
| Supports complex selectors | ✅                  | ❌                          |
| Performance (simple case) | ⚠️ Slightly slower   | ✅ Faster                  |
| Live vs Static           | Static               | Live                        |
```

---

### 3. What causes Reflow vs Repaint? How to optimize?

```txt
- **Reflow (Layout):**
  Triggered by DOM structure/size changes → position/geometry recalculations.
  Examples: Adding/removing elements, resizing, font changes.

- **Repaint:**
  Triggered by style changes not affecting layout.
  Examples: Changing `color`, `background`, `visibility`, `box-shadow`.

✅ Optimization Techniques:
- Batch DOM reads/writes.
- Use `DocumentFragment`.
- Debounce resize/input listeners.
- Avoid layout thrashing (reading after writing repeatedly).
- Prefer `transform` & `opacity` for animation (GPU accelerated).
```

---

### 4. How does Shadow DOM help in style encapsulation?

```txt
- Creates scoped DOM subtree attached to a host element.
- Styles inside Shadow DOM don’t leak out.
- External styles cannot affect internal content.
- Enables reusable, style-safe components.
- Supports `:host`, `::part`, `::slotted` for scoped targeting.
```

---

### 5. Why is Event Delegation more performant?

```txt
- Attaches single listener on parent instead of many on children.
- Reduces memory usage.
- Dynamically handles future children (great for dynamic lists).
- Leverages event bubbling phase to intercept events.
- Useful when rendering large, dynamic UIs.
```

---

### 6. Explain how to render large lists efficiently.

```txt
- Use **virtual scrolling / windowing** libraries like `react-window`, `virtual-scroller`, or custom logic.
- Render only the items visible in viewport.
- Batch DOM updates using `requestAnimationFrame`.
- Use `DocumentFragment` for batch DOM insertions.
- Avoid nested loops and deep hierarchies.
```

---

### 7. What’s the difference between live `HTMLCollection` and static `NodeList`?

```txt
- `HTMLCollection` (e.g. from `getElementsByClassName`): Live. Updates automatically if DOM changes.
- `NodeList` (e.g. from `querySelectorAll`): Static. Snapshot at time of selection.

Live collections can lead to bugs if DOM is mutated after selection.
```

---

### 8. What happens when you trigger `innerHTML` on a large tree?

```txt
- Removes all children and re-parses entire HTML string.
- Triggers full reflow and repaint.
- Breaks event listeners attached to inner elements.
- **Use with caution** for large/complex DOM trees.
```

---

### 9. Explain `getRootNode()` in Shadow DOM context.

````txt
- Returns the root node of the calling node.
- In standard DOM → returns the `document`.
- In Shadow DOM → returns the shadow root.
- Helpful to detect shadow boundary.

Example:
```js
const root = someElement.getRootNode();
console.log(root instanceof ShadowRoot); // true if inside shadow DOM
````

---

### 10. How would you throttle DOM updates on window resize?

```js
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Perform layout update
  }, 100);
});

// Or using lodash:
window.addEventListener("resize", _.throttle(updateLayout, 100));
```

✅ Prevents layout thrashing and unnecessary recalculations.

---

11. **What's the difference between a live `HTMLCollection` and a static `NodeList`?**
    An `HTMLCollection` (returned by `getElementsByTagName` or `getElementsByClassName`) is "live," meaning it automatically updates when the underlying document is changed. A `NodeList` returned by `querySelectorAll` is "static," meaning it's a snapshot of the elements at the time it was created and does not update with subsequent DOM changes.

12. **What causes "layout thrashing" and how can you avoid it?**
    Layout thrashing occurs when you alternate between reading a layout-sensitive property (like `offsetHeight` or `offsetWidth`) and writing to the DOM (changing a style). This forces the browser to perform a reflow with each iteration. To avoid it, batch your reads and then batch your writes.

13. **Explain `innerText` vs. `textContent` vs. `innerHTML`.**


    *   `innerHTML`: Parses and renders HTML content. It's slower and can be a security risk (XSS) if you're not careful with the input.
    *   `textContent`: Gets or sets the raw text content of an element and its descendants. It's faster than `innerHTML` and is not a security risk.
    *   `innerText`: Similar to `textContent`, but it is aware of the rendered appearance of the text. It won't return text from hidden elements and is significantly slower because it triggers a reflow.

14. **How would you efficiently update a large list of items with new data?**
    The most efficient way is to use a Virtual DOM library (like React or Vue) that will "diff" the old and new states and only update the parts of the DOM that have actually changed. Manually, you would aim to minimize direct DOM manipulations by building the new list in a `DocumentFragment` and then replacing the old list.

15. **What is the purpose of the `requestAnimationFrame()` method?**
    `requestAnimationFrame()` tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. This is more efficient than using `setTimeout` for animations because it allows the browser to optimize when the function is called, leading to smoother animations and better battery life.
