/**
 * 03 - Intersection Observer API: Viewport & Visibility Tracking
 *
 * This file serves as a reference script and design pattern for infinite scroll,
 * lazy-loading assets, and visibility tracking.
 */

// ==========================================
// 1. Basic Setup & Configuration Options
// ==========================================
const options = {
  root: null, // Uses viewport as the scrolling container. Set to a parent node for nested scrolls.
  rootMargin: '200px', // Pre-fetches element 200px before it enters the viewport. Accepts px/%.
  threshold: [0, 0.5, 1.0], // Fires callback at 0% visible, 50% visible, and 100% visible.
};

const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach((entry) => {
    // entry.isIntersecting is true if the threshold conditions are met
    if (entry.isIntersecting) {
      console.log('Target element is intersecting the root view boundary:', entry.target);
      console.log('Intersection Ratio:', entry.intersectionRatio);

      // Stop observing if you only need a one-time operation (e.g., lazy loading)
      // observerInstance.unobserve(entry.target);
    }
  });
}, options);

// ==========================================
// 2. Production Pattern: Image Lazy Loading
// ==========================================
/**
 * Keeps initial page footprint low by swapping placeholders only when the image comes into view.
 */
function initializeLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy-load');

  const imageObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Swap low-res placeholder/dataset to actual source
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }

          img.classList.remove('lazy-load');

          // Clean up: Once loaded, we no longer need to track this image
          observerInstance.unobserve(img);
        }
      });
    },
    {
      rootMargin: '0px 0px 200px 0px', // Trigger load 200px before image reaches viewport bottom
      threshold: 0.01, // Trigger as soon as the first pixel shows up
    },
  );

  lazyImages.forEach((image) => imageObserver.observe(image));
}

// ==========================================
// 3. Production Pattern: Infinite Scroll (Sentinel Pattern)
// ==========================================
/**
 * Rather than binding listeners to the scroll event (which thrashes the main thread),
 * place a tiny invisible element (the sentinel) at the bottom of the content container.
 */
function initializeInfiniteScroll(sentinelElement, contentContainer, fetchMoreDataCallback) {
  let isFetching = false;

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      const sentinelEntry = entries[0];

      // If sentinel enters viewport and we are not currently fetching, fetch more
      if (sentinelEntry.isIntersecting && !isFetching) {
        isFetching = true;

        fetchMoreDataCallback()
          .then((newElements) => {
            // Append items before the sentinel
            newElements.forEach((el) => contentContainer.insertBefore(el, sentinelElement));
            isFetching = false;
          })
          .catch((err) => {
            console.error('Failed to fetch infinite page items:', err);
            isFetching = false;
          });
      }
    },
    {
      rootMargin: '100px', // Fetch data 100px before hitting page bottom
      threshold: 0.1,
    },
  );

  scrollObserver.observe(sentinelElement);
}

// ==========================================
// 4. Performance & Interview Hot Corners
// ==========================================
/**
 * Q1: Why is IntersectionObserver better than scroll event listeners?
 * - Scroll event listeners run synchronously on the main thread and fire dozens of times per second.
 *   Reading layout geometry inside scroll callbacks forces the browser to reflow the layout repeatedly.
 * - IntersectionObserver calculates boundaries asynchronously, off the main thread during the browser's
 *   rendering cycle, preventing UI jank.
 *
 * Q2: How do you handle element visibility tracking under occlusion?
 * - Standard IntersectionObserver only checks bounding box math. If a modal overlays the element,
 *   isIntersecting still returns true.
 * - To check if the element is actually visible to the human eye, use IntersectionObserver V2:
 *   Configure: { trackVisibility: true, delay: 100 }
 *   Check inside callback: entry.isVisible
 */
