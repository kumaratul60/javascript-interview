# 🧰 Browser DevTools Shortcuts & Tips (Inspect Element Based)

This guide collects useful DevTools tricks, console shortcuts, and inspect tools for efficient front-end development and debugging directly in your browser.

---

## 📌 Console & DOM Interaction Shortcuts

### 1. 🔁 Get the result of the last expression

```js
$_
```

* Returns the result of the last evaluated expression in the Console.

---

### 2. 🔍 Get the recently selected DOM element

```js
$0
```

* `$0` → currently selected element in the Elements panel
* `$1` to `$4` → previous 4 selected elements (`$1` is second-last)

---

### 3. 🔗 Query selector shortcut (single element)

```js
$('selector')
```

* Equivalent to `document.querySelector('selector')`

---

### 4. 🔗 Query selector all shortcut (multiple elements)

```js
$$('selector')
```

* Equivalent to `document.querySelectorAll('selector')`

---

### 5. 📣 View all event listeners on a DOM element

#### 🔸 Using DOM reference (from Elements panel)

```js
getEventListeners($0)
```

#### 🔸 Using regular DOM reference

```js
getEventListeners(document.querySelector('#myBtn'))
```

---

### 6. 👀 Monitor specific events on an element

```js
monitorEvents($0, 'click')
```

* Logs every click event fired on `$0`
* You can pass multiple event types as an array:

```js
monitorEvents($0, ['click', 'keydown'])
```

To stop monitoring:

```js
unmonitorEvents($0)
```

---

### 7. 🎨 Enable design mode (edit content on page)

```js
document.designMode = "on";
```

* Makes the entire page content editable
* To turn off:

```js
document.designMode = "off";
```

---

## 👡️ Right-Click DevTools Options

### 8. 📍 Right-click options on DOM nodes

* Copy → selector / outerHTML / JS path
* Scroll into view
* Break on → subtree/attribute/child modification
* Force state → \:hover, \:active, \:focus
* Reveal in source panel

---

### 9. 🔧 Enable rendering insights (Chrome DevTools)

Right-click inside DevTools > **More tools** > **Rendering**
Then toggle options like:

* Paint flashing
* Layout shift regions
* Container queries
* Layer borders

👉 Useful to visualize what causes DOM reflows or repaints.

---

## 📦 DOM Tools

* **Break on changes:** Right-click on element > "Break on..." to pause when subtree/attributes/children change.
* **Force element states:** Simulate `:hover`, `:focus`, `:active` to debug pseudo-classes.
* **Copy full CSS path / JS path** for selected nodes.
* **Edit HTML/CSS directly in Elements panel.**
* **Use `$0`, `$1`, etc.** to programmatically inspect previously selected elements.

---

## ⚙️ Performance Tools

* **Performance Panel:** Record runtime behavior (paint, script execution, layout reflows).
* **Memory Panel:** Detect memory leaks and snapshot heap usage.
* **Coverage Tab:** Shows unused CSS/JS.
* **Lighthouse Panel:** Audit for performance, accessibility, SEO.
* **FPS Meter:** Toggle via Rendering tab to monitor frame rate.

---

## 🎨 CSS Debugging Tools

* **Computed Tab:** View final computed styles.
* **Layout Tab:** (or Box Model in older versions) Visualize margin/padding/border.
* **CSS Overview:** Summarize color usage, font stacks, unused declarations (available under More Tools).
* **Flex/Grid Overlays:** Highlight layout structure directly over UI.
* **Force element state + modify in real time** to debug transitions and visual states.

---

## 📋 Quick Summary Table

| Shortcut/Method              | Purpose                                |
| ---------------------------- | -------------------------------------- |
| `$_`                         | Last evaluated expression result       |
| `$0` - `$4`                  | Last 5 selected DOM elements           |
| `$()`                        | `document.querySelector()`             |
| `$$()`                       | `document.querySelectorAll()`          |
| `getEventListeners(el)`      | List event listeners on an element     |
| `monitorEvents(el, evt)`     | Live monitor event trigger on DOM node |
| `document.designMode = "on"` | Edit page content directly             |

---

## ➕ Additional Helpful Tools & Tips

* `copy($0)`
  → Copies the selected DOM node's outerHTML to clipboard
* `$0.getBoundingClientRect()`
  → View position/size info of selected element
* `$0.style`
  → Inline styles of selected element
* `inspect(document.querySelector('selector'))`
  → Opens the element directly in the Elements tab
* `clear()`
  → Clears the console

---
