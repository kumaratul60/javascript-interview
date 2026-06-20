# JavaScript DOM Events - Complete Interview Notes

## What is an Event?

An event is an action that occurs in the browser and can be detected by JavaScript.

Examples:

- Mouse click
- Keyboard key press
- Page load
- Form submit
- Window resize
- Scrolling

```js
button.addEventListener('click', () => {
  console.log('Button clicked');
});
```

---

# Event Flow (Most Important Interview Topic)

Whenever an event occurs, it goes through 3 phases:

```text
1. Capturing Phase
2. Target Phase
3. Bubbling Phase
```

Example:

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

Flow when button is clicked:

```text
window
  ↓
document
  ↓
html
  ↓
body
  ↓
parent
  ↓
button  ← Target
  ↑
parent
  ↑
body
  ↑
html
  ↑
document
  ↑
window
```

---

# Types of Events

## Mouse Events

Triggered by mouse actions.

```js
button.addEventListener('click', handler);
button.addEventListener('dblclick', handler);
button.addEventListener('mousedown', handler);
button.addEventListener('mouseup', handler);
button.addEventListener('mousemove', handler);
button.addEventListener('mouseenter', handler);
button.addEventListener('mouseleave', handler);
```

### Interview Question

**Difference between mouseenter and mouseover?**

| mouseenter      | mouseover            |
| --------------- | -------------------- |
| Fires once      | Fires multiple times |
| Does not bubble | Bubbles              |

---

## Keyboard Events

```js
document.addEventListener('keydown', handler);
document.addEventListener('keyup', handler);
```

Example:

```js
document.addEventListener('keydown', (e) => {
  console.log(e.key);
});
```

### Interview Question

**keydown vs keyup?**

| keydown                   | keyup                      |
| ------------------------- | -------------------------- |
| Fires when key is pressed | Fires when key is released |
| Used for shortcuts        | Used for validation        |

---

## Window Events

```js
window.addEventListener('load', handler);
window.addEventListener('resize', handler);
window.addEventListener('scroll', handler);
```

### Common Use Cases

```js
window.addEventListener('resize', () => {
  console.log(window.innerWidth);
});
```

---

## Document Events

```js
document.addEventListener('DOMContentLoaded', handler);
```

### DOMContentLoaded vs Load

```js
document.addEventListener('DOMContentLoaded', () => {});
```

```js
window.addEventListener('load', () => {});
```

| DOMContentLoaded        | load                         |
| ----------------------- | ---------------------------- |
| DOM ready               | Entire page ready            |
| Doesn't wait for images | Waits for images, CSS, fonts |

Interviewers ask this frequently.

---

# Event Bubbling

Default behavior.

Event moves from child → parent.

Example:

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```js
parent.addEventListener('click', () => {
  console.log('Parent');
});

child.addEventListener('click', () => {
  console.log('Child');
});
```

Output:

```text
Child
Parent
```

Flow:

```text
button
  ↑
parent
  ↑
body
  ↑
document
  ↑
window
```

---

## Interview Question

Why does parent click execute when button is clicked?

Because events bubble upward by default.

---

# Event Capturing

Opposite of bubbling.

Event moves from parent → child.

```js
parent.addEventListener(
  'click',
  () => {
    console.log('Parent Capture');
  },
  true,
);
```

or

```js
parent.addEventListener('click', () => {}, { capture: true });
```

Output:

```text
Parent Capture
Child
Parent
```

Flow:

```text
window
  ↓
document
  ↓
body
  ↓
parent
  ↓
button
```

---

## Interview Question

How do you enable event capturing?

```js
addEventListener('click', handler, true);
```

or

```js
addEventListener('click', handler, {
  capture: true,
});
```

---

# Event Propagation

Propagation = Complete journey of an event.

```text
Capturing
    ↓
Target
    ↓
Bubbling
```

---

# stopPropagation()

Stops further bubbling.

```js
child.addEventListener('click', (e) => {
  e.stopPropagation();
});
```

Output:

```text
Child
```

Parent will not execute.

---

# stopImmediatePropagation()

Stops:

1. Current element's remaining handlers
2. Further propagation

```js
button.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
});

button.addEventListener('click', () => {
  console.log('Never runs');
});
```

---

# preventDefault()

Stops browser default behavior.

Example:

```html
<a href="/home">Home</a>
```

```js
link.addEventListener('click', (e) => {
  e.preventDefault();
});
```

Browser won't navigate.

Common Uses:

- Form submission
- Anchor navigation
- Drag & Drop

---

# Event Delegation

One of the most asked interview questions.

Instead of attaching listeners to every child, attach one listener to parent.

---

## Without Event Delegation

```js
buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});
```

Problems:

- More memory
- More listeners
- Hard for dynamic elements

---

## With Event Delegation

```js
parent.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    console.log('Button Clicked');
  }
});
```

---

## Why Does Event Delegation Work?

Because of event bubbling.

```text
button click
    ↑
parent receives event
```

Parent catches bubbled event and handles it.

---

## Real World Example

```html
<ul id="todo-list">
  <li>Task 1</li>
  <li>Task 2</li>
</ul>
```

```js
document.getElementById('todo-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

Even newly added `<li>` items work automatically.

---

## Interview Question

Why use event delegation?

Answer:

- Better performance
- Lower memory usage
- Handles dynamic elements
- Fewer event listeners

---

## target vs currentTarget

Very common interview question.

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```js
parent.addEventListener('click', (e) => {
  console.log(e.target);
  console.log(e.currentTarget);
});
```

Click button:

```text
target        → button
currentTarget → parent
```

### Rule

```text
target
= actual element clicked

currentTarget
= element handling event
```

---

# Custom Events

Create your own events.

```js
const loginEvent = new CustomEvent('loginSuccess', {
  detail: {
    userId: 123,
  },
});
```

Dispatch:

```js
document.dispatchEvent(loginEvent);
```

Listen:

```js
document.addEventListener('loginSuccess', (e) => {
  console.log(e.detail.userId);
});
```

Output:

```text
123
```

---

# React Interview Scenario

## Why doesn't React attach click listeners to every component?

Because React uses Event Delegation.

Historically:

```text
Single listener attached to document
```

Modern React:

```text
Single listener attached to root container
```

Benefits:

- Better performance
- Less memory
- Faster updates

---

# Frequently Asked Interview Questions

## Q1. What is Event Bubbling?

Child → Parent propagation.

---

## Q2. What is Event Capturing?

Parent → Child propagation.

---

## Q3. What is Event Delegation?

Attach one listener to parent and use bubbling to handle child events.

---

## Q4. Why is Event Delegation useful?

- Better performance
- Less memory
- Dynamic elements supported

---

## Q5. Difference between target and currentTarget?

```text
target
= actual clicked element

currentTarget
= element with listener
```

---

## Q6. Difference between preventDefault and stopPropagation?

preventDefault:

```js
e.preventDefault();
```

Stops browser action.

Example:

```text
Form submit
Link navigation
```

stopPropagation:

```js
e.stopPropagation();
```

Stops event movement.

---

## Q7. Difference between DOMContentLoaded and load?

DOMContentLoaded:

```text
DOM parsed
```

load:

```text
Everything loaded
(images, CSS, fonts)
```

---

## Q8. Why does Event Delegation work?

Because events bubble from child to parent.

---

## Q9. What is event.currentTarget?

Element currently executing the listener.

---

## Q10. What are the 3 phases of Event Flow?

```text
1. Capturing
2. Target
3. Bubbling
```

---

# Quick Revision

```text
Mouse Events
 ├─ click
 ├─ dblclick
 ├─ mouseenter
 └─ mouseleave

Keyboard Events
 ├─ keydown
 └─ keyup

Window Events
 ├─ load
 ├─ resize
 └─ scroll

Document Events
 └─ DOMContentLoaded

Event Flow
 ├─ Capturing
 ├─ Target
 └─ Bubbling

Propagation Controls
 ├─ stopPropagation()
 ├─ stopImmediatePropagation()
 └─ preventDefault()

Event Delegation
 └─ Parent listener handles child events

Custom Events
 └─ dispatchEvent()
```
