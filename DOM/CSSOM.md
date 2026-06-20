# CSSOM (CSS Object Model)

The CSSOM is JavaScript's representation of all CSS loaded by the browser.

> DOM → CSSOM → Render Tree → Layout → Paint → Composite

Just as:

```text id="5wrtdq"
HTML
  ↓
DOM
```

CSS becomes:

```text id="t0qk8n"
CSS
  ↓
CSSOM
```

The browser combines both to create the Render Tree.

```text id="l9yvj7"
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
```

---

# Why CSSOM Exists

The browser cannot render elements using only HTML.

Example:

```html id="r7s5ny"
<div>Hello</div>
```

```css id="0qv1n2"
div {
  color: red;
  display: flex;
}
```

The browser must understand:

* color
* font-size
* display
* width
* height
* visibility

This information is stored in the CSSOM.

---

# Accessing CSSOM

## Read Stylesheets

```js id="ud4kui"
document.styleSheets;
```

Output:

```text id="n3krlm"
StyleSheetList
```

---

## Read CSS Rules

```js id="k3j6el"
const sheet =
  document.styleSheets[0];

console.log(sheet.cssRules);
```

Output:

```text id="l3zc7g"
CSSRuleList
```

---

## Access Specific Rule

```js id="q7nh3o"
const rule =
  document.styleSheets[0]
    .cssRules[0];

console.log(rule.cssText);
```

Example:

```css id="ydmr5h"
body {
  margin: 0;
}
```

---

# Modifying CSSOM

## Add Rule Dynamically

```js id="yv49jx"
const sheet =
  document.styleSheets[0];

sheet.insertRule(
  ".active { color: red; }"
);
```

---

## Remove Rule

```js id="kudx4s"
sheet.deleteRule(0);
```

---

# Reading Computed Styles

One of the most important CSSOM APIs.

```js id="j4a2je"
const styles =
  getComputedStyle(element);

console.log(styles.width);
```

---

## Why Not Use element.style?

```js id="rf6hva"
element.style.width;
```

Only returns inline styles.

Example:

```html id="l2wgvv"
<div style="width:100px"></div>
```

Returns:

```text id="w31df3"
100px
```

---

But:

```css id="4w6t0i"
.card {
  width: 300px;
}
```

```js id="o0vcti"
element.style.width;
```

Returns:

```text id="w7mn40"
""
```

---

Use:

```js id="4tnw93"
getComputedStyle(element)
  .width;
```

Returns:

```text id="xq5w2s"
300px
```

---

# CSSOM and Rendering

The browser must build:

```text id="fvlh6s"
DOM
CSSOM
```

before rendering.

Therefore:

```text id="lzlc2m"
CSS blocks rendering
```

This is a very common interview question.

---

# Interview Question

## Why Does CSS Block Rendering?

Suppose:

```html id="bsixyo"
<link rel="stylesheet" href="style.css">
```

The browser cannot render until it knows:

```text id="4x3ywo"
Colors
Sizes
Layouts
Visibility
Display values
```

Without CSSOM, the Render Tree cannot be created.

```text id="ef6j1t"
No CSSOM
    ↓
No Render Tree
    ↓
No Paint
```

---

# CSSOM vs DOM

| DOM                    | CSSOM              |
| ---------------------- | ------------------ |
| Represents HTML        | Represents CSS     |
| Built from HTML        | Built from CSS     |
| Manipulates elements   | Manipulates styles |
| document.querySelector | getComputedStyle   |

---

# Layout (Reflow)

Layout determines element positions and sizes.

Example:

```js id="9n2epd"
element.style.width =
  "500px";
```

Browser must recalculate:

```text id="r1u2sl"
Width
Height
Position
Relationships
```

This is called:

```text id="6j5lbx"
Reflow
(Layout)
```

---

# Paint

After layout:

```text id="72jv4f"
Draw pixels
Draw text
Draw borders
Draw colors
```

This is called:

```text id="mgo4n7"
Paint
```

---

# Reflow vs Repaint

## Reflow (Expensive)

Triggers:

```js id="x8zq0r"
element.style.width =
  "500px";
```

Because layout changes.

---

## Repaint (Cheaper)

Triggers:

```js id="mjlwmc"
element.style.color =
  "red";
```

Position unchanged.

Only color changes.

---

# Layout Thrashing

Very common performance interview question.

❌ Bad

```js id="k1k4zg"
for (let i = 0; i < 100; i++) {
  element.style.width =
    element.offsetWidth + 10 + "px";
}
```

Why?

```text id="2ezj46"
Read Layout
Write Layout
Read Layout
Write Layout
Read Layout
Write Layout
```

Browser repeatedly recalculates layout.

---

## Better

```js id="nld6vk"
const width =
  element.offsetWidth;

element.style.width =
  width + 100 + "px";
```

Read once.

Write once.

---

# Frequently Asked Interview Questions

## Q1. What is CSSOM?

```text id="jjm5va"
JavaScript representation of CSS.
```

---

## Q2. What creates the Render Tree?

```text id="j6rffr"
DOM + CSSOM
```

---

## Q3. Why does CSS block rendering?

```text id="mj7q1u"
Render Tree cannot be built
without CSSOM.
```

---

## Q4. Difference Between style and getComputedStyle?

```js id="gq4nwy"
element.style
```

Inline styles only.

```js id="cy8q4v"
getComputedStyle(element)
```

Final calculated styles.

---

## Q5. What is Reflow?

```text id="aw4xbm"
Layout recalculation.
```

Examples:

```js id="7mms3d"
width
height
margin
padding
display
```

changes.

---

## Q6. What is Repaint?

```text id="fow3xf"
Visual redraw without layout changes.
```

Example:

```js id="2rlj5m"
color
background
visibility
```

---

## Q7. Which is more expensive?

```text id="t9ln86"
Reflow > Repaint
```

---

# Senior Frontend Interview Scenarios

## Scenario 1

Question:

Why does CSS block rendering but not DOM parsing?

Answer:

```text id="mdjlwm"
Render Tree requires CSSOM.

Without CSSOM,
browser cannot paint correctly.
```

---

## Scenario 2

Question:

Need final width after all CSS applied.

Answer:

```js id="u5gnk8"
getComputedStyle(element)
  .width;
```

---

## Scenario 3

Question:

Page feels janky during animations.

Check for:

```text id="o8w8w5"
Layout Thrashing
Forced Reflow
Excessive Repaints
```

---

## Scenario 4

Question:

What's more expensive?

```js id="o98lv7"
element.style.width =
  "500px";
```

or

```js id="9nhx4m"
element.style.color =
  "red";
```

Answer:

```text id="teb5ei"
Width change

Triggers Reflow + Paint.
```

---

# Quick Revision

```text id="ndww6g"
CSS
 ↓
CSSOM

HTML
 ↓
DOM

DOM + CSSOM
      ↓
Render Tree
      ↓
Layout (Reflow)
      ↓
Paint
      ↓
Composite

Key APIs
├── document.styleSheets
├── cssRules
├── insertRule
├── deleteRule
└── getComputedStyle

Performance
├── Reflow (Expensive)
├── Repaint
└── Layout Thrashing
```
