function initVirtualList({ viewportId, totalItems, itemHeight, buffer = 5 }) {
  // Get the scrollable container
  const viewport = document.getElementById(viewportId);
  console.log('list render');

  // Spacer creates the full scroll height (fake list)
  const spacer = document.createElement('div');
  spacer.style.height = totalItems * itemHeight + 'px'; // total height of all items
  spacer.style.position = 'relative';
  viewport.appendChild(spacer);

  // Container holds ONLY the visible items
  const container = document.createElement('div');
  container.style.position = 'absolute'; // positioned inside spacer
  container.style.top = '0';
  container.style.left = '0';
  spacer.appendChild(container);

  function render() {
    // Current scroll position
    const scrollTop = viewport.scrollTop;

    // Height of visible area
    const viewportHeight = viewport.clientHeight;

    // First visible item index based on scroll
    const start = Math.floor(scrollTop / itemHeight);

    // How many items can fit in the viewport
    const visibleCount = Math.ceil(viewportHeight / itemHeight);

    // Render a small buffer above and below for smooth scrolling
    const from = Math.max(0, start - buffer);
    const to = Math.min(totalItems, start + visibleCount + buffer);

    // Move container to the correct vertical position
    container.style.transform = `translateY(${from * itemHeight}px)`;

    // Clear old DOM nodes
    //This is where old items die and new ones are born. That’s virtualization.
    container.innerHTML = '';

    // Create DOM nodes ONLY for visible items
    for (let i = from; i < to; i++) {
      const div = document.createElement('div');
      div.className = 'v-item';
      div.textContent = 'Item ' + i;
      container.appendChild(div);
    }
  }

  // Re-render on scroll
  viewport.addEventListener('scroll', render);

  // Initial render
  render();
}
