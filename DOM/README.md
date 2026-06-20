# The DOM (Document Object Model)

The DOM is a JavaScript representation of an HTML document.

```html
<div id="app">
  <h1>Hello</h1>
</div>
```

```js
const app = document.getElementById('app');
```

JavaScript can:

- Read elements
- Create elements
- Update elements
- Remove elements
- Listen to events

---

# DOM Manipulation

## 1. Reading

Reading data from the DOM.

### Select Elements

```js
document.getElementById('title');

document.querySelector('.card');

document.querySelectorAll('.card');
```

### Read Content

```js
element.textContent;

element.innerText;

element.innerHTML;
```

### Read Attributes

```js
element.id;

element.className;

element.getAttribute('href');
```

### Interview Question

#### innerText vs textContent

| innerText                 | textContent      |
| ------------------------- | ---------------- |
| Considers CSS visibility  | Ignores CSS      |
| Causes reflow             | Faster           |
| Returns visible text only | Returns all text |

---

## 2. Addition

Creating and inserting elements.

```js
const div = document.createElement('div');

div.textContent = 'Hello';
```

### Append

```js
parent.appendChild(div);
```

Modern:

```js
parent.append(div);
```

### Insert Before

```js
parent.insertBefore(newNode, existingNode);
```

### Insert HTML

```js
container.insertAdjacentHTML('beforeend', '<p>Hello</p>');
```

### Interview Question

#### append vs appendChild

| append          | appendChild |
| --------------- | ----------- |
| Multiple nodes  | Single node |
| Strings allowed | Node only   |
| Modern API      | Older API   |

---

## 3. Updation

### Update Text

```js
element.textContent = 'Updated';
```

### Update HTML

```js
element.innerHTML = '<strong>Hello</strong>';
```

### Update Attributes

```js
element.setAttribute('disabled', true);
```

### Update Classes

```js
element.classList.add('active');

element.classList.remove('active');

element.classList.toggle('active');
```

### Update Styles

```js
element.style.color = 'red';
```

---

## 4. Removal

### Remove Element

```js
element.remove();
```

Older approach:

```js
parent.removeChild(element);
```

### Remove Class

```js
element.classList.remove('active');
```

---

## DOM APIs

DOM APIs provide browser capabilities beyond basic DOM manipulation.

---

## Fetch API

Used to make HTTP requests.

```js
const response = await fetch('/api/users');

const data = await response.json();
```

### POST Request

```js
await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify(user),
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## Interview Question

### fetch vs XMLHttpRequest

| fetch          | XMLHttpRequest |
| -------------- | -------------- |
| Promise based  | Callback based |
| Cleaner syntax | Verbose        |
| Modern API     | Legacy         |

---

## Observer APIs

Observers watch for changes and notify JavaScript.

Think:

```text
Something changes
      ↓
Browser detects
      ↓
Callback executes
```

---

## MutationObserver

Observes DOM changes.

```js
const observer = new MutationObserver((mutations) => {
  console.log(mutations);
});

observer.observe(target, {
  childList: true,
  subtree: true,
});
```

### Detect

- Element added
- Element removed
- Attribute changes
- Text changes

---

## Real World Example

```js
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
```

Useful for:

- Analytics
- Chrome extensions
- Dynamic UI tracking
- Third-party widgets

---

## Interview Question

### Why use MutationObserver instead of polling?

Polling:

```js
setInterval(() => {
  // check DOM
}, 1000);
```

Problems:

- Wastes CPU
- Less accurate

MutationObserver:

```text
Event driven
Efficient
Immediate
```

---

# IntersectionObserver

Observes visibility of an element within viewport.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry.isIntersecting);
  });
});

observer.observe(element);
```

---

## Detect

```text
Element entered viewport
Element left viewport
```

---

## Real World Examples

### Lazy Loading Images

```js
if (entry.isIntersecting) {
  image.src = image.dataset.src;
}
```

### Infinite Scroll

```js
if (entry.isIntersecting) {
  fetchMoreData();
}
```

### Animation Trigger

```js
if (entry.isIntersecting) {
  card.classList.add('show');
}
```

---

## Interview Question

### Why not use scroll events?

```js
window.addEventListener('scroll', handler);
```

Problems:

- Fires hundreds of times
- Expensive calculations
- Performance issues

IntersectionObserver:

```text
Optimized by browser
Better performance
```

---

# ResizeObserver ⭐

(Missing from your roadmap but extremely important)

Observes size changes of an element.

```js
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentRect.width);
  }
});

observer.observe(element);
```

---

## Detect

```text
Width changes
Height changes
Container resize
```

---

## Real World Examples

### Responsive Components

```js
if (width < 600) {
  showMobileLayout();
}
```

### Auto Resizing Charts

```js
chart.resize();
```

### Dynamic Grid Layouts

```js
recalculateColumns();
```

---

## Interview Question

### ResizeObserver vs Window Resize

Window Resize:

```js
window.addEventListener('resize', handler);
```

Only detects browser window changes.

---

ResizeObserver:

```js
observer.observe(card);
```

Detects individual element size changes.

Example:

```text
Sidebar expands
Card width changes

ResizeObserver detects it

Window resize does NOT
```

---

# Observer Comparison

| Observer             | Watches            |
| -------------------- | ------------------ |
| MutationObserver     | DOM changes        |
| IntersectionObserver | Visibility changes |
| ResizeObserver       | Size changes       |

---

# Frontend Interview Scenarios

## Scenario 1

### Detect newly added elements

Answer:

```text
MutationObserver
```

---

## Scenario 2

### Lazy load images

Answer:

```text
IntersectionObserver
```

---

## Scenario 3

### Infinite scrolling feed

Answer:

```text
IntersectionObserver
```

---

## Scenario 4

### Auto resize charts when parent width changes

Answer:

```text
ResizeObserver
```

---

## Scenario 5

### Track attribute changes

Answer:

```text
MutationObserver
```

---

## Scenario 6

### Detect whether element is visible on screen

Answer:

```text
IntersectionObserver
```

---

## Scenario 7

### Responsive card component based on container width

Answer:

```text
ResizeObserver
```

---

# Frequently Asked Interview Questions

## Q1. Difference between innerHTML, innerText, and textContent?

```text
innerHTML
→ includes HTML

innerText
→ visible text only

textContent
→ all text content
```

---

## Q2. append vs appendChild?

```text
append
→ strings + multiple nodes

appendChild
→ single node
```

---

## Q3. What is MutationObserver?

Observes DOM mutations.

---

## Q4. What is IntersectionObserver?

Observes viewport visibility.

---

## Q5. What is ResizeObserver?

Observes element size changes.

---

## Q6. Why use Observer APIs?

```text
Event driven
Efficient
Better performance
Avoid polling
```

---

# Quick Revision

```text
DOM Manipulation
├── Reading
│   ├── querySelector
│   ├── textContent
│   └── getAttribute
│
├── Addition
│   ├── createElement
│   ├── append
│   └── insertAdjacentHTML
│
├── Updation
│   ├── innerHTML
│   ├── classList
│   └── style
│
└── Removal
    ├── remove
    └── removeChild

DOM APIs
├── fetch
│
└── Observers
    ├── MutationObserver
    ├── IntersectionObserver
    └── ResizeObserver

Best Use Cases
├── MutationObserver
│   └── DOM Changes
│
├── IntersectionObserver
│   └── Visibility Tracking
│
└── ResizeObserver
    └── Size Tracking
```

# Interview Scenario: Infinite Scroll

## ❌ Traditional Approach

```js
window.addEventListener('scroll', () => {
  const rect = sentinel.getBoundingClientRect();

  if (rect.bottom <= window.innerHeight) {
    loadMore();
  }
});
```

## Problems

### 1. Scroll Events Fire Too Often

```text
User scrolls 1000px

scroll
scroll
scroll
scroll
scroll
scroll
...
```

The browser can fire **dozens or hundreds of events per second**.

Every event executes your JavaScript.

---

### 2. Layout Calculations Are Expensive

```js
element.getBoundingClientRect();
```

To calculate the rectangle, the browser may need to:

```text
Recalculate layout
Recalculate positions
Update geometry
```

This can trigger **layout/reflow work**.

When done repeatedly during scrolling:

```text
Scroll
 ↓
JS executes
 ↓
Layout calculation
 ↓
Paint
 ↓
Next scroll
```

Result:

```text
Jank
Dropped frames
High CPU
Poor battery life
```

---

### 3. Difficult to Optimize

Developers usually end up adding:

```js
throttle();
debounce();
requestAnimationFrame();
```

to reduce the performance impact.

---

# ✅ Better Solution: IntersectionObserver

```js
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    loadMore();
  }
});

observer.observe(sentinel);
```

## Why Is It Better?

The browser tracks visibility internally.

```text
Browser monitors element
       ↓
Element becomes visible
       ↓
Callback executes
```

Instead of:

```text
Every scroll event
```

You only get notified when something meaningful happens.

---

## Mental Model

### Scroll Event

```text
"Tell me every time the user scrolls,
I'll figure out visibility myself."
```

### IntersectionObserver

```text
"Browser, tell me when this element
becomes visible."
```

The browser is much better at doing that efficiently.

---

## Interview Answer

### Why Use IntersectionObserver Instead of Scroll Events?

1. Avoids continuous scroll handlers.
2. Avoids repeated `getBoundingClientRect()` calls.
3. Browser optimizes visibility detection internally.
4. Better performance and lower CPU usage.
5. Perfect for lazy loading and infinite scrolling.

---

# Interview Scenario: Container Width Changes

Suppose you have:

```html
<div class="sidebar"></div>

<div class="dashboard-card"></div>
```

When the sidebar expands:

```text
Sidebar width: 250px → 400px

Dashboard card width:
1000px → 850px
```

---

## ❌ Using window.resize

```js
window.addEventListener('resize', () => {
  recalculateLayout();
});
```

## Problem

`window.resize` only fires when:

```text
Browser window changes size
```

Example:

```text
User drags browser edge
```

✅ Fires

---

Example:

```text
Sidebar opens
Flexbox recalculates
Card width changes
```

❌ Does NOT fire

Because the browser window size never changed.

---

## Real Interview Trap

```text
Window width = 1440px

Sidebar expands

Card width shrinks

window.resize ?
```

Answer:

```text
No event fired
```

Many developers get this wrong.

---

# ✅ Better Solution: ResizeObserver

```js
const observer = new ResizeObserver(([entry]) => {
  console.log(entry.contentRect.width);
});

observer.observe(card);
```

## What Happens?

```text
Sidebar expands
       ↓
Card width changes
       ↓
Browser detects resize
       ↓
Callback runs
```

No polling.

No manual calculations.

No dependency on window size.

---

## Mental Model

### window.resize

```text
Watch the browser window
```

### ResizeObserver

```text
Watch a specific element
```

---

## Real-World Examples

### Charts

```js
observer.observe(chartContainer);
```

When container width changes:

```text
Resize chart
```

---

### Data Tables

```js
observer.observe(tableContainer);
```

When container shrinks:

```text
Hide columns
```

---

### Responsive Components

```js
observer.observe(card);
```

When card width changes:

```text
Switch to compact layout
```

---

# Senior Frontend Interview Summary

| Problem                      | Bad Choice                         | Why                                   | Recommended            |
| ---------------------------- | ---------------------------------- | ------------------------------------- | ---------------------- |
| Infinite Scroll              | Scroll + `getBoundingClientRect()` | Fires constantly, layout calculations | `IntersectionObserver` |
| Lazy Loading Images          | Scroll Event                       | CPU intensive                         | `IntersectionObserver` |
| Detect DOM Changes           | `setInterval` Polling              | Wasted work                           | `MutationObserver`     |
| Detect Card Width Change     | `window.resize`                    | Misses element resizes                | `ResizeObserver`       |
| Detect Sidebar Layout Impact | `window.resize`                    | Window didn't change                  | `ResizeObserver`       |

---

# Rule of Thumb

```text
Need visibility changes?
→ IntersectionObserver

Need DOM change detection?
→ MutationObserver

Need element size detection?
→ ResizeObserver

Need window size detection?
→ window.resize
```

---

# What Interviewers Are Actually Testing

Most interviewers are not testing whether you know the API name.

They are testing whether you understand:

```text
❌ Polling vs Event Driven

❌ Manual Calculations vs Browser Optimizations

❌ Generic Events vs Specialized Browser APIs

❌ CPU-heavy Solutions vs Performance-friendly Solutions
```

The modern browser already knows:

- When an element becomes visible
- When the DOM changes
- When an element resizes

Use the browser's observer APIs instead of continuously checking yourself.

```js
"Am I constantly checking for a condition?"

if YES
    ↓
Can browser notify me instead?
    ↓
Use an Observer
```
