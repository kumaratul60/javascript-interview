/**
 * 02 - The DOM Event System: Capturing, Bubbling, Delegation, and Performance
 *
 * This file serves as a comprehensive, production-grade guide and reference script
 * for the JavaScript Event Loop, rendering loop, and Event handling mechanisms.
 */

// ==========================================
// 1. Bubbling vs. Capturing (Propagation Phases)
// ==========================================
/**
 * When an event occurs on a DOM element, the event propagates in three phases:
 * 1. Capture Phase: Goes from Root (Window) down to the target element (top to bottom).
 * 2. Target Phase: The event triggers on the clicked target element.
 * 3. Bubble Phase: Bubbles from target back up to the Root (bottom to top - default behavior).
 */

const parent = document.createElement('div');
const child = document.createElement('button');
parent.appendChild(child);

// A. Capture Phase Event Listener (useCapture = true / { capture: true })
parent.addEventListener(
  'click',
  (e) => {
    console.log('1. Parent Capturing (Triggers first)');
  },
  { capture: true },
);

// B. Bubble Phase Event Listener (useCapture = false - Default behavior)
parent.addEventListener('click', (e) => {
  console.log('3. Parent Bubbling (Triggers last)');
});

// C. Target Element Listener
child.addEventListener('click', (e) => {
  console.log('2. Target Child Executing (Target Phase)');
});

// To test this flow, mock a click event
// child.dispatchEvent(new Event('click'));

// ==========================================
// 2. Target vs. CurrentTarget (Interview Hot Corner)
// ==========================================
/**
 * - e.target: Resolves to the specific, deep element that triggered the event (the origin element).
 * - e.currentTarget: Resolves to the element that currently owns the executing event listener.
 */
parent.addEventListener('click', (e) => {
  console.log('Clicked element (target):', e.target); // e.g., Child <button>
  console.log('Owner of listener (currentTarget):', e.currentTarget); // Parent <div>
});

// ==========================================
// 3. Propagation Control: stopPropagation vs. stopImmediatePropagation
// ==========================================
child.addEventListener('click', (e) => {
  // Scenario A: e.stopPropagation()
  // Prevents the event from bubble-traveling up to parent listeners.
  e.stopPropagation();

  // Scenario B: e.stopImmediatePropagation()
  // Prevents bubbling AND immediately halts any other listeners on THIS same element.
  e.stopImmediatePropagation();
});

child.addEventListener('click', (e) => {
  // This listener WILL NOT run if stopImmediatePropagation() was called in the previous listener.
  console.log('Additional listener on child');
});

// ==========================================
// 4. Advanced Event Listeners Options Flag
// ==========================================
/**
 * - once: true -> Automatically unbinds/removes the listener after it executes once.
 * - passive: true -> Tells the browser's compositor thread that the listener will NEVER invoke
 *   preventDefault(). This allows the browser to scroll the page instantly without waiting
 *   for JS thread execution. Essential for high-frequency touch/scroll inputs.
 */
window.addEventListener(
  'touchstart',
  (e) => {
    // Passive allows smooth scrolling
  },
  { passive: true },
);

child.addEventListener(
  'click',
  (e) => {
    console.log('I only run once!');
  },
  { once: true },
);

// ==========================================
// 5. Event Delegation Pattern (Performance Optimizer)
// ==========================================
/**
 * Pitfall: Attaching 10,000 click listeners to 10,000 table rows degrades CPU/RAM performance.
 * Solution: Bind ONE listener to the parent element, and inspect the target click target dynamically.
 */
const table = document.createElement('table');

// Delegation Helper Utility
function delegate(parentElement, eventType, selector, callback) {
  parentElement.addEventListener(eventType, (e) => {
    // e.target.closest search goes up parent tree resolving target elements inside svg/path
    const targetElement = e.target.closest(selector);

    // Ensure target element is inside parent container
    if (targetElement && parentElement.contains(targetElement)) {
      callback.call(targetElement, e, targetElement);
    }
  });
}

// Usage
delegate(table, 'click', 'tr', (event, targetRow) => {
  console.log('Delegated click on table row:', targetRow);
});

// ==========================================
// 6. Custom Events API
// ==========================================
/**
 * CustomEvents allow decoupled UI components to communicate via DOM events.
 * Passing details is done inside the 'detail' attribute config.
 */
const customEmitter = document.createElement('div');

customEmitter.addEventListener('userStatusChanged', (e) => {
  console.log('Custom event caught! Data:', e.detail); // { userId: 42, role: 'Admin' }
});

const customEvent = new CustomEvent('userStatusChanged', {
  bubbles: true, // Allows event to bubble up the DOM tree
  cancelable: true, // Allows preventDefault() calls
  detail: { userId: 42, role: 'Admin' }, // Payload
});

customEmitter.dispatchEvent(customEvent);
