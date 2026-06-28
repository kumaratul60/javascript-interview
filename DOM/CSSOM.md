# CSS Object Model (CSSOM): The Style Tree & Rendering Path

The **CSS Object Model (CSSOM)** is a set of APIs that allows JavaScript to inspect and manipulate CSS stylesheets, rules, and styles at runtime.

---

## 1. The Critical Rendering Path

The browser combines the DOM and CSSOM to build the **Render Tree**, which calculates layout geometry and paints pixels to the screen.

```
       HTML ──► [ DOM Construction ] ──────┐
                                           ├─► [ Render Tree ] ──► [ Layout ] ──► [ Paint ] ──► [ Composite ]
       CSS  ──► [ CSSOM Construction ] ────┘
```

> [!IMPORTANT]
> **CSS is a Render-Blocking Resource.** The browser will parse HTML and construct the DOM tree, but it will **suspend page rendering (painting)** until the CSSOM tree is fully constructed. Without a completed CSSOM, the Render Tree cannot determine style values, layout boundaries, or visibility properties (`display: none`), which could cause flashes of unstyled content (FOUC).

---

## 2. Programmatic CSSOM Rule Manipulation

While toggling CSS classes (`element.classList.add()`) is the preferred method for component styling, direct CSSOM manipulation allows you to dynamically inject rules for micro-theme layers or editor platforms.

```javascript
// 1. Retrieve stylesheets loaded in the document
const stylesheetsList = document.styleSheets;
const mainSheet = stylesheetsList[0];

// 2. Safely insert a new CSS rule at the top index
// Syntax: sheet.insertRule(ruleString, indexPosition)
const insertedIndex = mainSheet.insertRule('.dynamic-card { border: 2px solid #6366f1; padding: 16px; }', 0);

// 3. Retrieve rule text
console.log(mainSheet.cssRules[insertedIndex].cssText);

// 4. Remove a rule dynamically
// Syntax: sheet.deleteRule(indexPosition)
mainSheet.deleteRule(insertedIndex);
```

---

## 3. Reading Styles: Inline vs. Computed Styles

A common point of confusion is retrieving style values via JavaScript.

### 3.1 `element.style` (Inline Styles Only)

`element.style` only reads styles set directly inline on the HTML element (e.g., `<div style="width: 100px;">`). It cannot read styles defined in external CSS files or `<style>` blocks.

### 3.2 `window.getComputedStyle(element)` (Calculated Values)

`getComputedStyle` resolves all stylesheets and rules to return the final computed styles applied to the element.

```javascript
const el = document.getElementById('hero-box');

// ❌ Reads empty string if styled via external CSS file
console.log(el.style.width); // ""

// ✅ Resolves rules and returns computed value in absolute pixels
const computed = window.getComputedStyle(el);
console.log(computed.width); // "250px"
```

> [!WARNING]
> Calling `getComputedStyle(element)` forces the browser to synchronously recalculate styles and layout if changes are pending. Repeated calls can trigger **Forced Synchronous Layout (FSL)** and degrade page performance.

---

## 4. CSS Custom Properties (CSS Variables)

CSS Variables allow you to modify global theme variables dynamically using JavaScript.

```javascript
const root = document.documentElement; // Root element <html>

// 1. Read CSS variable value
const primaryColor = window.getComputedStyle(root).getPropertyValue('--primary-color').trim();
console.log('Primary Color:', primaryColor);

// 2. Set new variable value (updates all children inheriting this variable)
root.style.setProperty('--primary-color', '#4f46e5');
```

---

## 5. Interview Hot Corners

### Q1: What is the difference between Reflow (Layout) and Repaint?

- **Reflow (Layout):** The browser calculates the geometry (size, position) of elements on the page. It is triggered by geometric modifications:
  ```javascript
  element.style.width = '300px';
  element.style.padding = '12px';
  ```
- **Repaint:** The browser draws the visual elements onto the screen. It is triggered by stylistic changes that do not affect layout geometry:
  ```javascript
  element.style.color = '#fff';
  element.style.backgroundColor = 'blue';
  ```
- **Performance Impact:** Reflow is significantly more expensive because modifying the geometry of one element can trigger cascades of layout calculations on its siblings and parent containers.

### Q2: What are CSSOM Stylesheet Access Origin Limits?

- **Answer:** If a stylesheet is loaded from a different origin (e.g. via CDN: `<link rel="stylesheet" href="https://cdn.com/style.css">`), accessing its rules (`sheet.cssRules`) will throw a **Security Error** (cross-origin frame block).
- **Solution:** Add the `crossorigin="anonymous"` attribute to the `<link>` tag, and ensure the server responds with appropriate CORS headers (`Access-Control-Allow-Origin: *`):
  ```html
  <link rel="stylesheet" href="https://cdn.com/style.css" crossorigin="anonymous" />
  ```
