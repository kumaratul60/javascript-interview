# JavaScript & UI Component Best Practices: Patterns, Accessibility, and Architecture

This comprehensive guide covers common UI component patterns, their intended use cases, and best practices for implementation, with a strong focus on JavaScript-driven behaviors, accessibility (ARIA), and front-end architectural considerations often discussed in technical interviews.

## Table of Contents

1.  [Understanding Common UI Components & Their Characteristics](#1-understanding-common-ui-components--their-characteristics)
    1.1 [Side Panel (Drawer)](#11-side-panel-drawer)
    1.2 [Modal](#12-modal)
    1.3 [Dialog](#13-dialog)
    1.4 [Popover](#14-popover)
    1.5 [Tooltip](#15-tooltip)
    1.6 [Dropdown](#16-dropdown)
    1.7 [Bottom Sheet (Mobile)](#17-bottom-sheet-mobile)
2.  [Quick Decision Rules: When to Use Which Component](#2-quick-decision-rules-when-to-use-which-component)
3.  [Architectural & Implementation Best Practices (JavaScript & CSS)](#3-architectural--implementation-best-practices-javascript--css)
    3.1 [The `z-index` Scale & Stacking Contexts](#31-the-z-index-scale--stacking-contexts)
    3.2 [Portal Rendering (Escaping CSS Constraints)](#32-portal-rendering-escaping-css-constraints)
    3.3 [Accessibility (ARIA) & Focus Management with JavaScript](#33-accessibility-aria--focus-management-with-javascript)
    3.4 [Event Delegation & Bubbling for Component Interaction](#34-event-delegation--bubbling-for-component-interaction)
    3.5 [Avoid `MutationObserver` for Layering Issues](#35-avoid-mutationobserver-for-layering-issues)
4.  [Common JavaScript Implementation Patterns for UI Components](#4-common-javascript-implementation-patterns-for-ui-components)
    4.1 [State Management (Open/Closed, Selected)](#41-state-management-openclosed-selected)
    4.2 [Composition vs. Inheritance](#42-composition-vs-inheritance)
    4.3 [Separation of Concerns (HTML, CSS, JS)](#43-separation-of-concerns-html-css-js)
5.  [Interview Questions & Discussion Points](#5-interview-questions--discussion-points)

---

## 1. Understanding Common UI Components & Their Characteristics

Choosing the right UI component is crucial for user experience and accessibility. Here's an overview with a focus on their typical JavaScript interactions.

### 1.1 Side Panel (Drawer)

- **What**: A UI component that slides into view from an edge of the screen (left, right, top, or bottom), often overlaying part of the main content.
- **Use Cases**: Displaying secondary content, filters, settings, extended navigation menus.
- **Blocks Page?**: ❌ Usually no (content behind is often still scrollable).
- **JS Aspects**:
  - **Open/Close Logic**: Toggling `class` names or `style` properties (e.g., `transform: translateX()`) based on user interaction (button click) or programmatic control.
  - **Animation**: `requestAnimationFrame` for smooth transitions or CSS `transition` properties.
  - **Accessibility**: Managing `aria-expanded`, `aria-hidden` on the panel, and potentially `tabindex="-1"` on main content to prevent keyboard focus.

### 1.2 Modal

- **What**: A full-screen overlay that appears above all other content, typically centered, requiring user interaction to dismiss.
- **Use Cases**: Critical flows, decisions required, capturing user input (e.g., login, sign-up forms).
- **Blocks Page?**: ✅ Yes (main content is usually inert and not scrollable).
- **JS Aspects**:
  - **Show/Hide Logic**: Toggling `display` or `visibility` along with `opacity` for transitions.
  - **Focus Management**: Crucially, JavaScript must trap focus within the modal (keyboard `Tab` key should cycle only through modal elements).
  - **Accessibility**: Setting `role="dialog"` or `aria-modal="true"`, linking `aria-labelledby` and `aria-describedby` to modal title/description. Disabling scroll on `body`.
  - **Event Handling**: Closing on `Escape` key press, clicking outside (backdrop).

### 1.3 Dialog

- **What**: A formal modal. The semantic term (`<dialog>` HTML element) for a small, focused window that appears above the rest of the page content.
- **Use Cases**: Alerts, confirmations, small forms, presenting information that requires immediate user attention.
- **Blocks Page?**: ✅ Yes (if `showModal()` is used, it creates a modal dialog, blocking interaction with other content).
- **Key Distinction**: `Modal` is a UX concept; `Dialog` is a semantic HTML/ARIA concept (and an HTML element).
- **JS Aspects**:
  - **Native `<dialog>` API**: Using `dialog.showModal()` and `dialog.close()` methods.
  - **Return Values**: `dialog.returnValue` can capture results.
  - **Accessibility**: Native element handles much of the focus trapping and ARIA roles automatically when `showModal()` is used, but polyfills/manual JS may be needed for broader browser support or custom behavior.

### 1.4 Popover

- **What**: A small floating box anchored to a trigger element, usually appearing on click or hover. It's often transient.
- **Use Cases**: Providing extra information, quick actions, context menus, date pickers.
- **Blocks Page?**: ❌ No (user can typically interact with other page elements).
- **JS Aspects**:
  - **Positioning**: JavaScript often calculates and updates the `top`/`left` (or `transform`) CSS properties to position the popover relative to its trigger element. `Popper.js` is a popular library for this.
  - **Show/Hide Logic**: Toggling `class` or `hidden` attribute. Dismissing on blur, click outside, or `Escape` key.
  - **Accessibility**: Managing `aria-expanded` on the trigger, `aria-haspopup` to indicate a popover.

### 1.5 Tooltip

- **What**: A tiny, non-interactive hint that appears on hover or focus, explaining an icon or label.
- **Use Cases**: Explaining interface elements, providing contextual help.
- **Blocks Page?**: ❌ No.
- **JS Aspects**:
  - **Show/Hide Delay**: JavaScript often implements a small delay (`setTimeout`) before showing and hiding to prevent flicker.
  - **Positioning**: Similar to popovers but often simpler.
  - **Accessibility**: Using `aria-describedby` to link the element to its tooltip.

### 1.6 Dropdown

- **What**: A list of options that appears when a trigger element is clicked or focused.
- **Use Cases**: Selection from a predefined list, navigation menus (e.g., "kebab" or "meatball" menus).
- **Blocks Page?**: ❌ No.
- **JS Aspects**:
  - **Open/Close Logic**: Toggling visibility.
  - **Keyboard Navigation**: Implementing `Up`/`Down` arrow key navigation within the list, `Enter` to select, `Escape` to close.
  - **Accessibility**: Managing `aria-haspopup`, `aria-expanded`, and `role="listbox"` or `role="menu"` for the list.

### 1.7 Bottom Sheet (Mobile)

- **What**: A mobile-specific UI component that slides up from the bottom of the screen, partially overlaying the content.
- **Use Cases**: Mobile-specific actions, contextual options (e.g., share sheets, quick settings).
- **Blocks Page?**: ⚠️ Partial (often main content is dimmed and non-interactive, but not completely blocked like a modal).
- **JS Aspects**:
  - **Gesture Handling**: JavaScript may handle swipe-down gestures to dismiss.
  - **Scroll Management**: Controlling scroll behavior of the sheet and the underlying content.
  - **Accessibility**: Similar to modals/side panels for focus and ARIA.

---

## 2. Quick Decision Rules: When to Use Which Component

Choosing the right component is fundamental. Here are practical guidelines:

### Quick Rule Table

| Component    |  Interrupts User   | Use For                                                                            | Typical JS Management                                               |
| :----------- | :----------------: | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| Tooltip      |       ❌ No        | Info only (non-interactive, transient)                                             | Show/hide delays (`setTimeout`), `aria-describedby`                 |
| Popover      |       ❌ No        | Quick actions, extra interactive info (transient)                                  | Positioning, show/hide on blur/click-outside, `aria-haspopup`       |
| Dropdown     |       ❌ No        | Selection from a list, menus                                                       | Keyboard navigation, `aria-expanded`, selection logic               |
| Side Panel   | ❌ / ⚠️ No/Partial | Extended context, filters, settings, navigation                                    | Open/close state, animation (CSS transitions/rAF), focus delegation |
| Modal        |       ✅ Yes       | Critical flow, decision required, forms (blocks all interaction)                   | Focus trapping, `aria-modal`, body scroll lock, `Escape` key close  |
| Dialog       |       ✅ Yes       | Semantic HTML for alerts/confirmations/forms (modal by default with `showModal()`) | Native `<dialog>` API (`.showModal()`, `.close()`, `.returnValue`)  |
| Bottom Sheet |     ⚠️ Partial     | Mobile-specific actions (partial overlay)                                          | Gesture handling, scroll management, focus delegation               |

### One-line Decision Rule

> Does the user **need** to finish this interaction before interacting with anything else on the page?
> **Yes** → Modal / Dialog (full blocking interaction)
> **No** → Side Panel / Popover / Tooltip / Dropdown / Bottom Sheet (non-blocking or partially blocking)

---

## 3. Architectural & Implementation Best Practices (JavaScript & CSS)

These best practices ensure your UI components are robust, maintainable, and accessible.

### 3.1 The `z-index` Scale & Stacking Contexts

Establishing a consistent `z-index` scale is crucial for managing layers effectively across your application, especially when components overlap. Mismanaging `z-index` can lead to elusive bugs where interactive elements are hidden or unclickable.

**Example Scale (Conceptual):**

- `0–10`: Base layout elements, page content.
- `100`: Dropdowns, context menus, elements that temporarily overlay content.
- `1000`: Tooltips / Popovers, often requiring higher stacking to be visible above most UI.
- `1100`: Side Panels, overlays that might appear over other transient elements.
- `1200`: Modals / Dialogs, typically the highest layer that blocks interaction.
- `1300`: Toasts / Notifications, usually appear over everything else, including modals, to convey system messages.

#### Important Warnings & JavaScript Implications ⚠️

- **Negative `z-index`**: Elements with a negative `z-index` can go behind their parent or even the entire document. From a JavaScript perspective, this means they might become **unreachable for user interaction (clicks, focus)**, leading to inaccessible UI. Use with extreme caution.
- **Positioning is Required**: `z-index` only works on elements with a `position` value of `relative`, `absolute`, `fixed`, or `sticky`. If your JavaScript dynamically adds/removes positioning, be aware of its impact on `z-index`.
- **Stacking Context > `z-index`**: This is a critical concept. A new **stacking context** (created by properties like `transform`, `filter`, `opacity < 1`, `position: relative` + `z-index`, `flex`/`grid` containers with `z-index`, etc.) can "trap" its children. An element with `z-index: 9999` _inside_ one stacking context can still appear _below_ an element with `z-index: 1` from a different, higher stacking context. JavaScript manipulation of these CSS properties can inadvertently create new stacking contexts, leading to unexpected layering issues. Debugging tools are essential here.
- **The "999999" Rule**: If you feel the need to use an extremely high `z-index` like `999999`, it's a strong sign that your stacking context architecture is broken. Don't solve it by increasing the number; fix the underlying CSS/DOM structure or consider **Portal Rendering**.

### 3.2 Portal Rendering (Escaping CSS Constraints)

For components that must truly appear above all other content (e.g., Modals, Dialogs, Global Notifications) regardless of their parent's stacking context or `overflow` properties, it's a best practice to render them in a "portal."

- **Concept**: Instead of rendering the component as a direct child of its logical parent in the DOM tree, it's moved (or rendered directly) to be a direct child of `<body>` or a dedicated, top-level DOM node (e.g., `<div id="portals"></div>`).
- **Why? (JavaScript Perspective)**:
  - **Escapes Stacking Contexts**: Prevents `z-index` conflicts with parent elements. The component lives in its own high-level stacking context.
  - **Avoids `overflow: hidden` Issues**: A parent with `overflow: hidden` will clip its children. Portals circumvent this.
  - **Cleaner Event Handling**: Can simplify event bubbling, though care must be taken with `event.stopPropagation()` if the event's origin is logically within the portal's "parent."
  - **Framework Support**: Modern JS frameworks (React, Vue) provide dedicated APIs for portals, simplifying their implementation and ensuring correct component lifecycle management.

**Simple Vanilla JavaScript Portal Example:**

```javascript
// HTML: <div id="app">...</div> <div id="portal-root"></div>

// JS: Function to render a component into a portal
function renderIntoPortal(elementToRender, portalContainerId) {
  const portalRoot = document.getElementById(portalContainerId);
  if (!portalRoot) {
    console.error(`Portal root #${portalContainerId} not found.`);
    return;
  }
  portalRoot.appendChild(elementToRender);
  // You would typically add logic here to manage lifecycle if using a framework
}

// Example usage:
const myModalContent = document.createElement('div');
myModalContent.innerHTML = '<h2>I am a Modal from a Portal!</h2><button>Close</button>';
myModalContent.style.cssText =
  'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid black; z-index: 9999;';

// renderIntoPortal(myModalContent, 'portal-root');
// After some time, or on close: portalRoot.removeChild(myModalContent);
```

### 3.3 Accessibility (ARIA) & Focus Management with JavaScript

Accessibility is not an afterthought; it's a core aspect of UI component development. JavaScript plays a critical role in dynamic accessibility behaviors.

- **Keyboard Navigation:** All interactive components must be navigable and usable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Escape`, arrow keys).
- **Focus Trapping (for Modals/Dialogs):** When a modal opens, focus must be programmatically moved to the first interactive element _inside_ the modal. The `Tab` key should then cycle _only_ through elements within the modal. When the modal closes, focus should return to the element that triggered the modal.
  - **JS Implementation**:
    - `element.focus()` to move focus.
    - Listen for `keydown` events (especially `Tab`, `Shift+Tab`, `Escape`) to manage focus flow.
    - Store the element that had focus _before_ the modal opened to return focus to it later.
- **ARIA Attributes**: JavaScript dynamically updates ARIA attributes to communicate the component's state and purpose to assistive technologies (screen readers).
  - `aria-expanded`: Indicates if a collapsible element is currently expanded or collapsed (e.g., dropdowns, accordions).
  - `aria-haspopup`: Indicates that an element has a pop-up context menu or sub-level menu.
  - `aria-modal="true"`: On a modal element, indicates that the underlying content is inert and should not be accessible.
  - `aria-hidden="true"`: On background content when a modal is open, visually hides it from screen readers.
  - `role="dialog"`, `role="alertdialog"`, `role="menu"`, `role="listbox"`: Define the component's semantic meaning.

**Simple JavaScript Focus Trap Example (for a modal):**

```javascript
// Basic concept (simplified, for illustration)
function trapFocus(modalElement) {
  const focusableEls = modalElement.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  let previouslyFocusedEl; // To store element that had focus before modal opened

  // Store previously focused element and move focus to first element in modal
  if (document.activeElement) {
    previouslyFocusedEl = document.activeElement;
  }
  firstFocusableEl?.focus();

  modalElement.addEventListener('keydown', function (e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus(); // move focus to the last element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus(); // move focus to the first element
        e.preventDefault();
      }
    }
  });

  // On modal close: previouslyFocusedEl.focus();
}
// Example usage: trapFocus(document.getElementById('myModal'));
```

### 3.4 Event Delegation & Bubbling for Component Interaction

Instead of attaching event listeners to every individual instance of a repeating component (e.g., many list items in a dropdown), use event delegation.

- **Concept**: Attach a single event listener to a common parent element. When an event bubbles up from a child, the parent's listener catches it. JavaScript then determines which child element was the actual target of the event.
- **Why? (JavaScript Benefits)**:
  - **Performance**: Fewer event listeners mean less memory consumption and faster DOM updates.
  - **Dynamic Elements**: Automatically works for dynamically added/removed child elements without needing to attach/detach listeners.
  - **Simplified Code**: Cleaner and more concise event management code.

**Example: Event Delegation for a Dropdown List:**

```javascript
// HTML: <ul id="myDropdownList"><li>Item 1</li><li>Item 2</li>...</ul>

// JS: Instead of:
// document.querySelectorAll('#myDropdownList li').forEach(item => {
//     item.addEventListener('click', handleItemClick);
// });

// Use Event Delegation:
const dropdownList = document.getElementById('myDropdownList');
if (dropdownList) {
  dropdownList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      // Check if the clicked element is a list item
      console.log('Clicked on:', event.target.textContent);
      // Call specific handler for this item
      // handleItemClick(event.target.dataset.value);
    }
  });
}
```

### 3.5 Avoid `MutationObserver` for Layering Issues

> **Never fix UI layering issues with `MutationObserver`.**

A visual layering problem should always have a CSS-based solution. Using JavaScript to react to DOM changes to fix `z-index` (e.g., observing when an element's `z-index` changes to then adjust another) is:

- **Inefficient**: `MutationObserver` callbacks run asynchronously, making real-time visual adjustments difficult and prone to flicker.
- **Expensive**: It adds overhead (CPU/memory) for observing and processing changes.
- **Brittle**: The logic can easily break if the DOM structure or CSS changes.

- **`MutationObserver` is a hammer. For visual layering, `z-index` and stacking contexts are the screwdrivers.**

---

## 4. Common JavaScript Implementation Patterns for UI Components

These patterns guide how you structure the JavaScript logic for your components.

### 4.1 State Management (Open/Closed, Selected)

UI components are inherently stateful. JavaScript manages this state.

- **Component State**: Represents the current condition of the component (e.g., `isOpen: true/false`, `selectedValue: 'optionA'`, `isActive: true/false`).
- **Updating State**:
  - **Vanilla JS**: Directly manipulating DOM properties (`element.classList.add('open')`), updating data attributes (`element.dataset.isOpen = 'true'`).
  - **Frameworks**: Using `useState` (React), `data` properties (Vue), or reactive services (Angular) for declarative state management.
- **Reacting to State Changes**: State changes trigger UI updates (re-rendering in frameworks, direct DOM manipulation in vanilla JS).

**Example: Simple Toggle Component State (Vanilla JS)**

```javascript
// HTML: <button id="toggleBtn">Toggle Content</button><div id="content" class="hidden">My content</div>

// JS:
const toggleBtn = document.getElementById('toggleBtn');
const contentDiv = document.getElementById('content');
let isOpen = false; // Component state

toggleBtn.addEventListener('click', () => {
  isOpen = !isOpen; // Update state
  if (isOpen) {
    contentDiv.classList.remove('hidden');
    contentDiv.setAttribute('aria-expanded', 'true');
  } else {
    contentDiv.classList.add('hidden');
    contentDiv.setAttribute('aria-expanded', 'false');
  }
  toggleBtn.setAttribute('aria-pressed', isOpen); // Update ARIA based on state
});

// Initial setup
contentDiv.classList.add('hidden');
contentDiv.setAttribute('aria-expanded', 'false');
toggleBtn.setAttribute('aria-pressed', 'false');
```

### 4.2 Composition vs. Inheritance

- **Composition (Preferred for UI Components)**: Building components by combining smaller, simpler, independent components or functions.
  - **Benefits**: Flexibility, reusability, easier testing, avoids "inheritance hell."
  - **JS Example**: A `Dropdown` component might _compose_ a `Button` (for the trigger) and a `List` (for options).
- **Inheritance (Less Common for UI Logic)**: Creating new components that derive properties and methods from a base class.
  - **Drawbacks**: Can lead to tight coupling, inflexibility, and difficulties understanding behavior.

### 4.3 Separation of Concerns (HTML, CSS, JS)

Maintain clear boundaries between structure (HTML), presentation (CSS), and behavior (JavaScript).

- **HTML**: Provides semantic structure and content.
- **CSS**: Handles styling and visual presentation. Use classes to toggle states (`.is-open`, `.is-active`).
- **JavaScript**: Manages interaction, state changes, and updates ARIA attributes. Avoid inline styles where possible; use class manipulation instead.

---

## 5. Interview Questions & Discussion Points

These questions cover fundamental concepts and advanced considerations for UI component development.

**Q1: What are the key differences between a Modal and a Popover, and when would you use each?**

**A1:** (Refer to Sections 1.2, 1.4, and 2).
**Modal:** Blocks all interaction, requires a decision, usually for critical flows (login, confirmation).
**Popover:** Non-blocking, contextual, for quick actions or extra info (profile menus, date pickers).
The core difference is the level of user interruption and the importance of the content.

---

**Q2: How does `z-index` work, and what is a "stacking context"? Why is understanding this important for UI components?**

**A2:** (Refer to Section 3.1).
`z-index` controls the stacking order of _positioned_ elements along the z-axis. A **stacking context** is a three-dimensional rendering context created by certain CSS properties (e.g., `position: relative/absolute/fixed/sticky` combined with `z-index`, `opacity < 1`, `transform`, `filter`). Elements within the same stacking context are ordered according to `z-index`. Elements in a new stacking context are rendered entirely above or below other contexts, regardless of their children's `z-index`.
**Importance:** Misunderstanding stacking contexts is the root cause of many layering bugs, where a high `z-index` element might still appear beneath another. It's crucial for correctly layering modals, tooltips, and dropdowns.

---

**Q3: Explain "Portal Rendering" in the context of UI components. What problems does it solve, and how might you implement it in vanilla JavaScript?**

**A3:** (Refer to Section 3.2).
**Portal Rendering** involves rendering a component's DOM (e.g., a modal) into a DOM node that is _outside_ the hierarchical parent of the component in the application's React/Vue/Angular tree, usually directly under `<body>` or a dedicated portal root.
**Problems Solved:**

- **`z-index` conflicts**: Escapes parent stacking contexts.
- **`overflow: hidden` issues**: Avoids clipping by parent containers.
- **Cleaner DOM structure**: Keeps complex overlays at the top level.
  **Vanilla JS Implementation:** Create a target DOM element (e.g., `<div id="portal-root"></div>`). Use `document.getElementById('portal-root').appendChild(myComponentElement)` to move/render the component's DOM there.

---

**Q4: What are the essential JavaScript-driven accessibility considerations for implementing a Modal or Dialog component?**

**A4:** (Refer to Section 3.3).

- **Focus Trapping**: Programmatically move keyboard focus to the first interactive element inside the modal upon opening, and keep it cycling only within the modal.
- **Focus Restoration**: Return focus to the element that triggered the modal upon closing.
- **Keyboard Interaction**: Ensure `Escape` key closes the modal.
- **ARIA Attributes**:
  - `role="dialog"` or `role="alertdialog"` on the modal container.
  - `aria-modal="true"` on the modal container.
  - `aria-labelledby` and `aria-describedby` to link the modal to its visible title and description.
  - `aria-hidden="true"` on the main application content when the modal is open.
- **Scroll Management**: Prevent scrolling of the underlying `<body>` when the modal is open.

---

**Q5: Describe the benefits of using "Event Delegation" when managing interactions for a list-based UI component (e.g., a dropdown or a table).**

**A5:** (Refer to Section 3.4).
**Event Delegation** is the technique of attaching a single event listener to a common parent element, rather than attaching individual listeners to each child element. When an event (like a click) occurs on a child element, it bubbles up the DOM tree, and the parent's listener catches it. The listener then uses `event.target` to identify which specific child triggered the event.
**Benefits:**

- **Performance**: Reduces memory footprint by attaching fewer event listeners, especially for large lists.
- **Dynamic Elements**: Automatically handles events for child elements that are added or removed from the DOM _after_ the initial page load, without needing to re-attach listeners.
- **Simplified Code**: Makes event management cleaner and more concise.

---

**Q6: Why is it generally a bad practice to use `MutationObserver` to solve UI layering (`z-index`) issues?**

**A6:** (Refer to Section 3.5).
Using `MutationObserver` for layering issues is a bad practice because:

- **Inefficient/Expensive**: It involves reactive JavaScript code observing DOM changes, which is generally more CPU/memory intensive than a declarative CSS solution.
- **Asynchronous Nature**: `MutationObserver` callbacks are asynchronous. This means you react to changes _after_ they've occurred, making it difficult to prevent visual flicker or race conditions when trying to adjust `z-index` in real-time.
- **Brittle**: The logic can easily break if the DOM structure or CSS changes.
- **Wrong Tool**: UI layering is a visual problem best solved with CSS (`z-index`, `position`, `stacking contexts`). JavaScript should manage behavior and state, not constantly police CSS visual properties.

---

**Q7: How would you manage the open/closed state of a reusable UI component in plain JavaScript, considering accessibility attributes?**

**A7:** (Refer to Section 4.1).
In plain JavaScript, you would manage state using:

1.  **A JavaScript variable**: `let isOpen = false;`
2.  **CSS Classes**: Toggle classes like `element.classList.toggle('is-open')`. CSS defines the visual changes for these states.
3.  **ARIA Attributes**: Dynamically update `aria-expanded` (for visibility), `aria-hidden` (for screen reader visibility), or `aria-pressed` (for button states) on the component's elements based on the `isOpen` state.
4.  **Event Listeners**: Attach event listeners (e.g., `click`) to the trigger element to update the `isOpen` variable, toggle classes, and update ARIA attributes.

```javascript
// Example: A simple accordion header that toggles content visibility
// <button id="accordionHeader" aria-expanded="false" aria-controls="accordionPanel">Toggle</button>
// <div id="accordionPanel" role="region" aria-hidden="true">Content</div>

// const header = document.getElementById('accordionHeader');
// const panel = document.getElementById('accordionPanel');
// let panelIsOpen = false;

// header.addEventListener('click', () => {
//     panelIsOpen = !panelIsOpen;
//     panel.classList.toggle('hidden', !panelIsOpen); // 'hidden' class would hide it via CSS
//     header.setAttribute('aria-expanded', panelIsOpen);
//     panel.setAttribute('aria-hidden', !panelIsOpen);
// });
```
