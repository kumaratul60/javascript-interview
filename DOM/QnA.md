# Browser Rendering Deep Dive (Senior Frontend Interview Guide)

Most browser performance interview questions eventually come back to these 5 topics:

```text
1. How browsers render pages
2. Why CSS blocks rendering
3. Reflow vs Repaint
4. Forced synchronous layouts
5. Performance bottlenecks
```

---

# 1. How Browsers Render Pages

When a browser receives HTML, it does not immediately display pixels.

It follows a rendering pipeline.

```text
HTML
 ↓
DOM

CSS
 ↓
CSSOM

DOM + CSSOM
      ↓
Render Tree
      ↓
Layout (Reflow)
      ↓
Paint
      ↓
Composite
      ↓
Screen
```

---

## Step 1: Parse HTML → DOM

HTML:

```html
<div class="card">Hello</div>
```

Browser creates:

```text
Document
 └── div.card
      └── Text("Hello")
```

This becomes the DOM Tree.

---

## Step 2: Parse CSS → CSSOM

CSS:

```css
.card {
  color: red;
  width: 300px;
}
```

Browser creates:

```text
CSSOM
 └── .card
      ├── color:red
      └── width:300px
```

---

## Step 3: Build Render Tree

Combine:

```text
DOM
+
CSSOM
```

Result:

```text
Render Tree
```

Contains:

```text
Visible Elements
Computed Styles
```

Not included:

```text
display:none elements
```

---

## Step 4: Layout (Reflow)

Calculate:

```text
Width
Height
Position
Margins
Padding
```

Example:

```text
Where should this div appear?
How wide should it be?
```

---

## Step 5: Paint

Draw pixels.

```text
Text
Backgrounds
Borders
Colors
Shadows
```

---

## Step 6: Composite

GPU combines layers.

```text
Layer 1
Layer 2
Layer 3
   ↓
Final Screen
```

---

# Interview Question

## Explain Browser Rendering

Expected Answer:

```text
Browser parses HTML into DOM.

Parses CSS into CSSOM.

Combines them into Render Tree.

Performs Layout.

Paints pixels.

Composites layers on screen.
```

---

# 2. Why CSS Blocks Rendering

Consider:

```html
<link rel="stylesheet" href="style.css" />
```

Browser encounters CSS.

Can it render immediately?

```text
No.
```

Because it doesn't know:

```text
Colors
Sizes
Visibility
Layout
Display Properties
```

---

## Example

HTML:

```html
<div>Hello</div>
```

CSS:

```css
div {
  display: none;
}
```

Without CSS:

```text
Div should be visible
```

With CSS:

```text
Div should not exist in render tree
```

Browser must wait.

---

## Rendering Dependency

```text
No CSSOM
    ↓
No Render Tree
    ↓
No Layout
    ↓
No Paint
```

Therefore:

```text
CSS is render-blocking.
```

---

# Interview Question

## Why Does CSS Block Rendering?

Expected Answer:

```text
Browser needs CSSOM to build the Render Tree.

Without CSSOM it cannot determine final styles,
layout, or visibility.
```

---

# 3. Reflow vs Repaint

Very common interview question.

---

## Reflow (Layout)

Browser recalculates:

```text
Width
Height
Position
Layout Relationships
```

---

### Example

```js
element.style.width = '500px';
```

Browser must recalculate:

```text
Element width
Sibling positions
Parent dimensions
```

---

### Reflow Flow

```text
Style Change
      ↓
Layout
      ↓
Paint
      ↓
Composite
```

---

## Repaint

Visual update only.

Layout remains unchanged.

---

### Example

```js
element.style.color = 'red';
```

Only color changes.

Position stays same.

---

### Repaint Flow

```text
Style Change
      ↓
Paint
      ↓
Composite
```

No layout calculation.

---

# Reflow vs Repaint

| Reflow           | Repaint        |
| ---------------- | -------------- |
| Expensive        | Less Expensive |
| Layout Changes   | Visual Changes |
| Width/Height     | Color          |
| Margin/Padding   | Background     |
| Position Changes | Visibility     |

---

# Interview Question

## Which Is More Expensive?

```js
element.style.width = '500px';
```

or

```js
element.style.color = 'red';
```

Answer:

```text
Width change

Triggers Layout + Paint.
```

---

# 4. Forced Synchronous Layouts

One of the most important Senior/Staff topics.

Also called:

```text
Forced Reflow
Layout Thrashing
```

---

## What Causes It?

Reading layout information after modifying it.

---

### Bad Example

```js
element.style.width = '500px';

console.log(element.offsetWidth);
```

---

Browser Workflow

```text
Change Width
      ↓
Layout invalidated
      ↓
Need offsetWidth?
      ↓
Force Layout NOW
      ↓
Return value
```

Browser cannot delay layout.

Must perform it immediately.

---

## Common Layout Reads

```js
element.offsetWidth;

element.offsetHeight;

element.clientWidth;

element.clientHeight;

element.scrollWidth;

element.scrollHeight;

element.getBoundingClientRect();
```

All may trigger forced layout.

---

# Layout Thrashing

Worst case:

```js
for (let i = 0; i < 100; i++) {
  element.style.width = element.offsetWidth + 1 + 'px';
}
```

---

Browser Executes

```text
Read Layout
Write Layout

Read Layout
Write Layout

Read Layout
Write Layout
```

100 times.

Very expensive.

---

## Better

```js
const width = element.offsetWidth;

element.style.width = width + 100 + 'px';
```

Read once.

Write once.

---

# Interview Question

## What Is Layout Thrashing?

Expected Answer:

```text
Repeated layout reads and writes causing
the browser to perform multiple forced
reflows synchronously.
```

---

# 5. Performance Bottlenecks

Most frontend performance issues come from:

```text
Too Much JavaScript
Too Many Reflows
Too Many Repaints
Large DOM Trees
Heavy CSS Selectors
```

---

## Bottleneck 1

### Large DOM

```html
10000 rows
```

Layout becomes expensive.

---

## Bottleneck 2

### Frequent Reflows

```js
element.style.width = randomWidth;
```

inside loops.

---

## Bottleneck 3

### Expensive Scroll Handlers

```js
window.addEventListener('scroll', handler);
```

Combined with:

```js
getBoundingClientRect();
```

can become costly.

Prefer:

```text
IntersectionObserver
```

---

## Bottleneck 4

### Animating Layout Properties

Bad:

```css
width
height
left
top
margin
```

Triggers layout.

---

Better:

```css
transform
opacity
```

Usually GPU accelerated.

---

## Bottleneck 5

### Layout Thrashing

```js
Read;
Write;
Read;
Write;
Read;
Write;
```

Repeatedly.

---

# Interview Scenario

Question:

Why is this animation janky?

```js
setInterval(() => {
  element.style.left = element.offsetLeft + 1 + 'px';
});
```

Answer:

```text
Repeated layout reads and writes.

Causing forced synchronous layouts
and excessive reflows.
```

---

# Senior Frontend Interview Summary

| Problem                  | Root Cause            | Better Solution      |
| ------------------------ | --------------------- | -------------------- |
| Infinite Scroll          | Scroll + Layout Reads | IntersectionObserver |
| Element Resize Detection | window.resize         | ResizeObserver       |
| DOM Change Detection     | Polling               | MutationObserver     |
| Janky Animation          | Layout Properties     | transform / opacity  |
| Slow UI                  | Layout Thrashing      | Batch Reads/Writes   |

---

# Ultimate Mental Model

```text
HTML
 ↓
DOM

CSS
 ↓
CSSOM

DOM + CSSOM
      ↓
Render Tree
      ↓
Layout (Expensive)
      ↓
Paint
      ↓
Composite
```

## Performance Rule

```text
Avoid triggering Layout.

If possible:

Composite Only
   ↑
Paint Only
   ↑
Layout Last Resort
```

Because:

```text
Layout > Paint > Composite

(Most Expensive → Least Expensive)
```

```
The sequence is:

HTML
 ↓
DOM

CSS
 ↓
CSSOM

DOM + CSSOM
      ↓
Render Tree
      ↓
Layout
      ↓
Paint
      ↓
Composite
      ↓
Screen
```

## Why is changing width slower than changing transform?

width triggers Layout + Paint + Composite

transform usually triggers only Composite

Composite is much cheaper than Layout

```
Change Width
 ↓
Layout
 ↓
Paint
 ↓
Composite

Change Color
 ↓
Paint
 ↓
Composite

Change Transform
 ↓
Composite
```
