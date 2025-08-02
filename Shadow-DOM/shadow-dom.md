# 🌑 Shadow DOM: Complete Guide

Shadow DOM is a core part of Web Components that provides encapsulation for HTML, CSS, and JS. It allows developers to build reusable, maintainable UI components without fear of style or behavior leaks.

---

## 🧐 What Is Shadow DOM?

**Shadow DOM** is a way to **encapsulate DOM and CSS** within a component so that it doesn't interfere with the rest of the page (and vice versa). Think of it as a "mini-DOM" scoped inside an element.

```js
const shadowRoot = element.attachShadow({ mode: "open" });
```

---

## ✅ Why Shadow DOM?

* **Style encapsulation**: Avoid global CSS pollution.
* **DOM isolation**: JS/HTML is scoped inside the component.
* **Maintainability**: Build self-contained components.
* **Composition**: Enables powerful UI abstractions.

---

## 🧬 Shadow DOM vs Light DOM

| Feature           | Light DOM                 | Shadow DOM                          |
| ----------------- | ------------------------- | ----------------------------------- |
| Scope             | Global                    | Encapsulated within element         |
| Styles leak       | Yes                       | No (isolated by default)            |
| JavaScript access | Standard DOM APIs         | Access via `shadowRoot` only        |
| CSS styling       | Affected by global styles | Scoped using `:host`, `::slotted()` |

---

## ⚖️ `attachShadow` Modes: `open` vs `closed`

When creating a shadow root, you can choose between:

* **`mode: "open"`** – shadow root is accessible via `element.shadowRoot`.
* **`mode: "closed"`** – shadow root is not accessible from outside the element.

```js
const openShadow = el.attachShadow({ mode: "open" });
console.log(el.shadowRoot); // returns shadowRoot

const closedShadow = el.attachShadow({ mode: "closed" });
console.log(el.shadowRoot); // returns null
```

Use `closed` mode when you want to **fully encapsulate** the internal structure (like for third-party widgets or secure components).

---

## 📝 Example Without `constructor`

You don't always need to use a constructor; you can also attach shadow DOM manually:

```html
<div id="wrapper"></div>
<script>
  const wrapper = document.getElementById('wrapper');
  const box = document.createElement('div');
  box.textContent = "Hello from shadow";

  const shadowRoot = wrapper.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(box);
</script>
```

---

## ❓ When to Use Shadow DOM?

Use Shadow DOM when:

* You want to create **reusable components** with isolated DOM/CSS.
* You are building **design systems** or **UI libraries**.
* You want to **prevent external styles from leaking in**.
* You are developing **widgets or third-party embeds**.
* You need to scope styles (e.g. inside a modal, tooltip, dropdown).

Avoid it if:

* You rely heavily on global styling or themes.
* You need full React/Vue/Angular integration without wrappers.

---

## 🧱 Core Concepts

### 🧹 `attachShadow({ mode: "open" })`

Attaches a shadow root to a host element.

### 🌟 `:host`

Styles the custom element itself from within shadow DOM.

```css
:host {
  display: block;
  border: 1px solid #ccc;
}
```

### 🕳️ `<slot>`

Used to project light DOM content into the shadow DOM.

```html
<slot name="title"></slot>
```

### 🎯 `::slotted()`

A pseudo-selector to style light DOM content projected into slots.

```css
::slotted(h1) {
  font-weight: bold;
}
```

---

## 🧪 Example: Custom `<user-card>` Component

```html
<user-card>
  <span slot="name">Atul Awasthi</span>
  <span slot="email">atul@example.com</span>
</user-card>
```

```js
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        ::slotted([slot="name"]) {
          font-weight: bold;
        }

        ::slotted([slot="email"]) {
          color: gray;
        }
      </style>
      <div>
        <slot name="name"></slot><br>
        <slot name="email"></slot>
      </div>
    `;
  }
}
customElements.define("user-card", UserCard);
```

---

## ⚛️ Shadow DOM in React?

React doesn’t support Shadow DOM natively, but you can integrate it:

```tsx
import React, { useRef, useEffect } from "react";

function ShadowWrapper({ children }) {
  const hostRef = useRef();

  useEffect(() => {
    const shadowRoot = hostRef.current.attachShadow({ mode: "open" });
    shadowRoot.appendChild(children);
  }, []);

  return <div ref={hostRef}></div>;
}
```

📍 Better yet, use React with a **custom element** that already implements Shadow DOM.

---

## 🔥 Advanced: Fallback Content, Events, Isolation

* **Fallback** in slot:

  ```html
  <slot>Default content</slot>
  ```
* **Events from Shadow DOM:**

  ```js
  this.dispatchEvent(new CustomEvent("clicked", { composed: true }));
  ```
* **Style isolation**: Global styles can't affect your component unless exposed.

---

## ❌ Limitations

* `::slotted()` cannot style deep nested content.
* Shadow DOM is harder to theme globally (use CSS custom properties or `part` API).
* React doesn't render directly into Shadow DOM unless using portals.

---

## 🛠️ Tooling & Debugging

* In Chrome DevTools: Enable **"Show user agent shadow DOM"**.
* Inspect shadowRoot via `$0.shadowRoot`.
* Use [Web Component Dev Tools](https://chromewebstore.google.com/detail/web-components-devtools/) for better inspection.

---

## 📦 Resources

* [MDN - Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
* [Web Components - Google Developers](https://developers.google.com/web/fundamentals/web-components/shadowdom)

---

## ✅ Summary

| Feature          | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| `attachShadow`   | Creates isolated DOM tree                        |
| `<slot>`         | Projects external content into component         |
| `::slotted()`    | Styles projected light DOM content               |
| `:host`          | Styles the custom element itself                 |
| `shadowRoot`     | Access the shadow DOM tree                       |
| `composed: true` | Ensures events can bubble outside the shadow DOM |

---

## 🚀 Explore some examples like:

* [ ] Build a modal dialog using Shadow DOM + slots
* [ ] Create themeable web components with CSS variables
* [ ] Use Tailwind inside a shadow root (with inline styles or static style injection)
* [ ] Use Shadow DOM with Lit or Stencil

---

