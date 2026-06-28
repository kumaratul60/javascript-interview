/**
 * 04 - Mutation & Resize Observers: DOM State & Dimension Tracking
 *
 * This file serves as a reference script and design pattern for monitoring DOM changes
 * and element-level responsive sizing.
 */

// ==========================================
// 1. MutationObserver: Tracking DOM Updates
// ==========================================
const targetNode = document.body;

// Config options: You must declare at least one main category
const mutationConfig = {
  childList: true, // Listen to adding/removing child elements
  subtree: true, // Watch all descendants recursively (deep observe)
  attributes: true, // Listen to attribute changes (e.g., class, disabled)
  attributeFilter: ['class', 'data-state'], // Optimization: only watch these attributes
  attributeOldValue: true, // Keeps the value prior to modification in the record
};

const mutationCallback = (mutationsList, observerInstance) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('Nodes added or removed:', mutation.addedNodes, mutation.removedNodes);
    } else if (mutation.type === 'attributes') {
      console.log(
        `Attribute "${mutation.attributeName}" was changed from "${mutation.oldValue}" to "${mutation.target.getAttribute(mutation.attributeName)}"`,
      );
    }
  }
};

const mutationObserver = new MutationObserver(mutationCallback);
mutationObserver.observe(targetNode, mutationConfig);

// Clean up/unobserve
// mutationObserver.disconnect();

// ==========================================
// 2. ResizeObserver: Responsive Dimension Sizing
// ==========================================
/**
 * Monitors element sizing changes in real time. Perfect for responsive dashboards
 * and canvas elements.
 */
const cardContainer = document.createElement('div');

const resizeObserver = new ResizeObserver((entries, observerInstance) => {
  for (const entry of entries) {
    // entry.contentRect contains element bounds (width, height, top, left)
    const { width, height } = entry.contentRect;
    console.log(`Component resized: ${width}px x ${height}px`);

    // A. Element-level Media Query pattern
    if (width < 320) {
      entry.target.classList.add('mobile-compact');
    } else {
      entry.target.classList.remove('mobile-compact');
    }

    // B. High-DPI canvas buffer resizing (CSS vs Physical Pixels)
    if (entry.devicePixelContentBoxSize) {
      const physicalWidth = entry.devicePixelContentBoxSize[0].inlineSize;
      const physicalHeight = entry.devicePixelContentBoxSize[0].blockSize;
      // Now safe to map canvas buffer: canvas.width = physicalWidth;
    }
  }
});

// Configure options box: 'content-box', 'border-box' or 'device-pixel-content-box'
resizeObserver.observe(cardContainer, { box: 'border-box' });

// ==========================================
// 3. Avoiding the "ResizeObserver Loop Limit Exceeded" Warning
// ==========================================
/**
 * Pitfall: Modifying layout styles inside the ResizeObserver callback can trigger another resize,
 * causing infinite layout calculations.
 *
 * Solution: Defer state modifications using requestAnimationFrame (rAF) to decouple
 * sizing detection from visual layout updates.
 */
const safeResizeObserver = new ResizeObserver((entries) => {
  // Batch updates inside rAF
  requestAnimationFrame(() => {
    for (const entry of entries) {
      const currentWidth = entry.contentRect.width;

      // Read & update class lists safely
      if (currentWidth < 500) {
        entry.target.classList.add('collapsed');
      } else {
        entry.target.classList.remove('collapsed');
      }
    }
  });
});

// ==========================================
// 4. Interview Hot Corners
// ==========================================
/**
 * Q1: How do you prevent DOM mutation memory leaks inside single-page apps?
 * - When elements are unmounted, MutationObservers attached to them do not auto-collect if they reference
 *   callbacks bound to parent state classes. You must explicitly call `.disconnect()` during components'
 *   unmount lifecycles.
 *
 * Q2: What is the "takeRecords()" method on MutationObserver?
 * - If you call `.disconnect()`, any pending mutations still waiting in the microtask queue are dropped.
 *   If you need to process these pending items right before cleaning up, call `.takeRecords()`.
 *   It synchronously returns any pending mutation records and empties the queue.
 */
