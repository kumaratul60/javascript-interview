## Utility Functions (The "Tools")

Before starting the tasks, we define the core optimization patterns.

```javascript
// 1. Debounce: Wait until typing/action pauses
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// 2. Throttle: Execute at most once every X ms
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// 3. Memoize: Cache results of expensive function calls
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

---

## 1. Debounced Live Character Counter

```javascript
// HTML: <textarea id="textInput"></textarea> <p id="charCount"></p>

const textarea = document.getElementById('textInput');
const display = document.getElementById('charCount');

const updateCount = debounce((text) => {
  const count = text.length;
  display.textContent = `Characters typed: ${count}`;

  if (count > 200) {
    display.style.color = 'red';
    console.warn('Character limit exceeded!');
  } else {
    display.style.color = 'black';
  }
}, 500);

textarea.addEventListener('input', (e) => updateCount(e.target.value));
```

---

## 2. Throttled Window Resize Logger

```javascript
// HTML: <div id="resizeDisplay"></div>

const resizeDisplay = document.getElementById('resizeDisplay');

const handleResize = throttle(() => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  let category = 'Desktop';
  if (w < 768) category = 'Mobile';
  else if (w < 1024) category = 'Tablet';

  resizeDisplay.textContent = `${w} × ${h} (${category})`;
  console.log(`Resized: ${w}x${h}`);
}, 250);

window.addEventListener('resize', handleResize);
```

---

## 3. Memoized Temperature Converter

```javascript
let callCounter = 0;

const convertTemp = (value, toType) => {
  callCounter++;
  console.log('Real function running...');
  return toType === 'F' ? (value * 1.8 + 32).toFixed(2) : ((value - 32) / 1.8).toFixed(2);
};

const memoizedConvert = memoize(convertTemp);

console.log(memoizedConvert(25, 'F')); // Real function runs
console.log(memoizedConvert(25, 'F')); // Cached
console.log(memoizedConvert(100, 'C')); // Real function runs
console.log(`Total real executions: ${callCounter}`);
```

---

## 4. Debounced API Search Simulation

```javascript
const searchInput = document.getElementById('search');
const spinner = document.getElementById('loader');

const mockAPISearch = debounce(async (query) => {
  spinner.style.display = 'block'; // Show loading

  // Simulate API delay
  await new Promise((res) => setTimeout(res, 1000));

  console.log(`Search results for: ${query}`);
  spinner.style.display = 'none'; // Hide loading
}, 600);

searchInput.addEventListener('input', (e) => mockAPISearch(e.target.value));
```

---

## 5. Cleanup Event Listeners (Modal)

```javascript
function toggleModal() {
  const modal = document.getElementById('modal');

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  function openModal() {
    modal.classList.add('open');
    document.addEventListener('keydown', handleEsc);
    console.log('EventListener Added: keydown');
  }

  function closeModal() {
    modal.classList.remove('open');
    // CLEANUP to prevent memory leaks
    document.removeEventListener('keydown', handleEsc);
    console.log('EventListener Removed: Cleanup success.');
  }

  openModal();
}
```

---

## 6. Profile and Optimize List Rendering

```javascript
const listContainer = document.getElementById('list');
const data = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

function renderList(items) {
  const startTime = performance.now();

  // Optimization: Using DocumentFragment to batch DOM updates
  const fragment = document.createDocumentFragment();

  items.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    fragment.appendChild(li);
  });

  listContainer.innerHTML = ''; // Clear old list
  listContainer.appendChild(fragment);

  const endTime = performance.now();
  console.log(`Render Time: ${(endTime - startTime).toFixed(4)}ms`);
}

// Initial render
renderList(data);
```

---

## 7. Performance Race: Comparison

```javascript
let metrics = { debounce: 0, throttle: 0, memo: 0 };

const dbSearch = debounce(() => metrics.debounce++, 500);
const trSearch = throttle(() => metrics.throttle++, 500);
const memoSearch = memoize((q) => {
  metrics.memo++;
  return `Result for ${q}`;
});

// Simulate high-frequency input
function simulateUsage() {
  console.time('Performance Race');
  for (let i = 0; i < 10; i++) {
    dbSearch();
    trSearch();
    memoSearch('query');
  }
  console.timeEnd('Performance Race');

  setTimeout(() => {
    console.log('--- Performance Metrics ---');
    console.log('Debounce calls (Expected 1):', metrics.debounce);
    console.log('Throttle calls (Expected 1-2):', metrics.throttle);
    console.log('Memoization real calls (Expected 1):', metrics.memo);
  }, 1000);
}

simulateUsage();
```

---

### Best Practice Summary for Performance

1.  **Debounce** for user input (search bars, window resizing logic that calculates layout).
2.  **Throttle** for scroll listeners or frequent UI updates (progress bars).
3.  **Memoize** for complex calculations that repeat the same input (sorting large data, math conversions).
4.  **DocumentFragment** for bulk DOM injections to avoid "Layout Thrashing" (reflow/repaint).
5.  **removeEventListener** is critical inside component-based logic to avoid memory leaks.
