// Scroll handles deterministic virtualization with DOM recycling; IntersectionObserver only controls data boundaries and never rendering.

/***********************
 * CONFIG
 ***********************/
const viewport = document.getElementById('viewport');
const spacer = document.getElementById('spacer');
const itemsEl = document.getElementById('items');
const topSentinel = document.getElementById('top-sentinel');
const bottomSentinel = document.getElementById('bottom-sentinel');

const ROW_HEIGHT = 32;
const OVERSCAN = 5;

let totalItems = 100_000;

/***********************
 * SPACER (scroll height)
 ***********************/
function updateSpacer() {
  spacer.style.height = `${totalItems * ROW_HEIGHT}px`;
}
updateSpacer();

/***********************
 * DOM RECYCLING POOL: here POOL size means Maximum number of DOM nodes ever needed
 * Only render what can be visible
 * Reuse nodes instead of creating/destroying
 * Keep DOM size constant
 ***********************/
const poolSize = Math.ceil(viewport.clientHeight / ROW_HEIGHT) + OVERSCAN * 2;

const pool = [];

for (let i = 0; i < poolSize; i++) {
  const row = document.createElement('div');
  row.className = 'row';
  row.style.position = 'absolute';
  row.style.height = `${ROW_HEIGHT}px`;
  itemsEl.appendChild(row);
  pool.push(row);
}

/***********************
 * VIRTUALIZED RENDER
 ***********************/
function render() {
  const scrollTop = viewport.scrollTop;

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);

  itemsEl.style.transform = `translateY(${startIndex * ROW_HEIGHT}px)`;

  for (let i = 0; i < pool.length; i++) {
    const itemIndex = startIndex + i;
    const row = pool[i];

    if (itemIndex >= totalItems) {
      row.style.display = 'none';
      continue;
    }

    row.style.display = 'block';
    row.style.transform = `translateY(${i * ROW_HEIGHT}px)`;
    row.textContent = `Row ${itemIndex}`;
  }
}

/***********************
 * SCROLL LISTENER
 ***********************/
viewport.addEventListener('scroll', render, { passive: true });

/***********************
 * INTERSECTION OBSERVER
 * (DATA LOADING ONLY)
 ***********************/
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      if (entry.target === bottomSentinel) {
        // simulate fetch
        totalItems += 1000;
        updateSpacer();
      }

      if (entry.target === topSentinel) {
        // optional: prepend logic
      }
    }
  },
  {
    root: viewport,
    rootMargin: '300px',
  }
);

io.observe(bottomSentinel);
io.observe(topSentinel);

/***********************
 * INIT
 ***********************/
render();

/*
Virtualization is about decoupling scroll position from DOM size. Scroll math decides visibility, a spacer preserves height, a fixed DOM pool ensures performance, and observers handle data boundaries

poolSize equals the number of rows that can appear in the viewport plus overscan for smooth scrolling. It caps DOM nodes to a constant size.

| Question                           | Signal               |
| ---------------------------------- | ----------------------------- |
| Why not IntersectionObserver only? | IO not precise                |
| Why spacer div?                    | Preserve scroll height        |
| Why transform not top?             | GPU, no reflow                |
| Why passive scroll?                | No main-thread block          |
| Why overscan?                      | Prevent blank gaps            |
| Why pool reuse?                    | Constant DOM size             |
| What about fast scroll?            | Overscan + buffer             |
| How to support dynamic data?       | IO boundary fetch             |
| How to test this?                  | Scroll + DOM count assertions |


*/
