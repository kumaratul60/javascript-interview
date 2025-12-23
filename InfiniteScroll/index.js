// Root elements where content and loader will be rendered
const list = document.getElementById('list');
const loader = document.getElementById('loader');

// Pagination state
let page = 0; // which page to load next
let loading = false; // prevents duplicate API calls
const PAGE_SIZE = 20; // items per request

/**
 * Simulates an API call.
 * In real apps, replace this with fetch()/axios().
 * Returns a new "page" of items every time.
 */
function fetchItems(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from({ length: PAGE_SIZE }, (_, i) => {
        return `Item ${page * PAGE_SIZE + i}`;
      });
      resolve(items);
    }, 600);
  });
}

/**
 * Appends new items to the DOM.
 * NOTE: In infinite scroll, DOM keeps growing.
 * This is why virtualization is often added later.
 */
function renderItems(items) {
  items.forEach((text) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = text;
    list.appendChild(div);
  });
}

/**
 * Loads the next page of data.
 * - Guards against parallel requests
 * - Shows loader
 * - Fetches data
 * - Renders items
 */
async function loadMore() {
  if (loading) return;

  loading = true;
  loader.style.display = 'block';

  const items = await fetchItems(page);
  renderItems(items);

  page++;
  loading = false;
  loader.style.display = 'none';
}

/**
 * Scroll listener:
 * When user scrolls close to the bottom,
 * trigger loading of next page.
 */
window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMore();
  }
});

// Initial data load
loadMore();
