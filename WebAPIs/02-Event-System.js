/**
 * 02 - The DOM Event System
 *
 * Master Capturing, Bubbling, Delegation, and Performance.
 */

// --- 1. Bubbling vs Capturing ---
// Capture Phase: Root -> Target (top to bottom)
// Bubble Phase: Target -> Root (bottom to top - Default)

const outer = document.createElement('div');
const inner = document.createElement('button');
outer.appendChild(inner);

// default: bubble=true
outer.addEventListener('click', () => console.log('Outer BUBBLE (Level 2)'));
inner.addEventListener('click', () => console.log('Inner BUBBLE (Level 1)'));

// useCapture=true
outer.addEventListener('click', () => console.log('Outer CAPTURING'), true);

/*
Expected Output when clicking Inner:
1. Outer CAPTURING
2. Inner BUBBLE
3. Outer BUBBLE
*/

// --- 2. Event Delegation ---
// Why? Instead of 100 listeners on 100 <li>, put 1 listener on <ul>.
// Better performance and works for dynamic elements.
const list = document.createElement('ul');
list.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Delegated click on:', event.target.textContent);
  }
});

// --- 3. stopPropagation vs stopImmediatePropagation ---
inner.addEventListener('click', (e) => {
  // e.stopPropagation(); // Prevents BUBBLING up to 'outer'.
  // e.stopImmediatePropagation(); // Prevents bubbling AND other listeners on the SAME element.
});

// --- 4. Passive Listeners & Once ---
// passive: true - Promises browser the listener won't call preventDefault().
// Great for performance on scroll/touch events.
window.addEventListener('scroll', () => {}, { passive: true });

// once: true - Listener is removed automatically after one trigger.
inner.addEventListener('click', () => console.log('I run only once!'), { once: true });

/**
 * INTERVIEW TIP:
 * - Delegation: Mention it when asked about list/table performance.
 * - Passive: Use for high-frequency events (scroll/mouse).
 * - Target vs CurrentTarget:
 *   target is who was clicked (inner),
 *   currentTarget is who owns the listener (outer).
 */
