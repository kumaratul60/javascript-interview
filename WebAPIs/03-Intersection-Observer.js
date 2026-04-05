/**
 * 03 - Intersection Observer API
 *
 * Perfect for Infinite Scroll, Lazy Loading, and Visibility Tracking.
 * Way more performant than 'scroll' event listeners.
 */

// --- 1. Basic Setup ---
const options = {
  root: null, // Use the viewport as root
  rootMargin: '0px',
  threshold: 0.5, // Trigger when 50% of the element is visible
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Element is visible!', entry.target);

      // --- 2. Common Pattern: Lazy Loading ---
      // entry.target.src = entry.target.dataset.src;

      // --- 3. Stop observing after it becomes visible (one-time load) ---
      // obs.unobserve(entry.target);
    }
  });
}, options);

// Mock element to observe
const sentinel = document.createElement('div');
// observer.observe(sentinel);

// --- 4. Infinite Scroll Logic ---
/**
 * Pattern:
 * 1. Place a "sentinel" div at the bottom of the list.
 * 2. Observe the sentinel.
 * 3. When isIntersecting === true, fetch more data and append to the list.
 */

/**
 * INTERVIEW TIP:
 * - Why use this instead of scroll events?
 *   Scroll events fire many times per second (heavy UI thread),
 *   Intersection Observer runs asynchronously (less lag).
 * - Threshold: [0, 0.25, 0.5, 0.75, 1.0] can track visibility in steps.
 */
