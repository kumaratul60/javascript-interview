/**
 * 04 - Mutation & Resize Observers
 *
 * Tracks DOM changes and size changes (responsive components).
 */

// --- 1. Mutation Observer ---
// Monitors for changes in the DOM tree.
const targetNode = document.body;
const config = { attributes: true, childList: true, subtree: true };

const mutationCallback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

const mutationObserver = new MutationObserver(mutationCallback);
mutationObserver.observe(targetNode, config);
// mutationObserver.disconnect();

// --- 2. Resize Observer ---
// Monitors for changes in an element's size.
// Much better than window.onresize for specific components.
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`Element size changed to: ${width}x${height}`);

    // Example: Responsive card layout
    // if (width < 300) entry.target.classList.add('mobile-layout');
  }
});

const myCard = document.createElement('div');
// resizeObserver.observe(myCard);

/**
 * INTERVIEW TIP:
 * - Mutation: Use for dynamic UI libraries (e.g., reacting to another plugin's DOM changes).
 * - Resize: Use for components that change size independently of the window (e.g., inside a sidebar).
 * - Performance: Both are more performant than polling with setInterval().
 */
