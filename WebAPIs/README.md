# Essential Web APIs - Mastery Guide (0-100)

This directory contains a detailed guide to the most important browser APIs requested in senior-level JavaScript interviews.

## 📁 Directory Structure

- **`01-Fetch-AbortController.js`**: Modern data fetching, request cancellation, and implementing timeouts.
- **`02-Event-System.js`**: Master Capturing, Bubbling, Event Delegation, and Performance-oriented listeners.
- **`03-Intersection-Observer.js`**: Efficiently handling Infinite Scroll, Lazy Loading, and Visibility Tracking.
- **`04-Mutation-and-Resize-Observers.js`**: Monitoring DOM changes and element-level responsiveness.

---

## 🚀 Key Concepts for Interviews

### 1. Fetch API Pitfalls

`fetch()` is great, but remember:

- It **doesn't reject** on 404 or 500 errors (only network failure).
- Use `AbortController` to handle user navigation or search-box "debouncing" of requests.
- No built-in timeout—you must implement it using `setTimeout` + `AbortController`.

### 2. The Event Loop vs. Events

DOM events are handled by the browser and queued in the **Callback Queue**. Understanding bubbling/capturing is essential for writing efficient code using **Event Delegation**.

- **Delegation**: Put one listener on a parent instead of 100 on children.
- **Passive**: Improves scrolling performance on high-frequency events.

### 3. The Power of Observers

Why use an Observer instead of a scroll listener?

- **Performance**: Observers are asynchronous and highly optimized. They don't fire on every pixel scroll, but only when specific thresholds are crossed.
- **Infinite Scroll**: Use an `IntersectionObserver` on a "sentinel" div at the bottom of your list.

---

## ⚡ Quick Snippets

### Implement a Fetch Timeout

```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000); // 5 sec timeout
const response = await fetch(url, { signal: controller.signal });
```

### Event Delegation Pattern

```javascript
document.querySelector('#parent').addEventListener('click', (e) => {
  if (e.target.matches('.child-class')) {
    console.log('Child clicked:', e.target.id);
  }
});
```

### Intersection Observer (Lazy Load)

```javascript
const obs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    entries[0].target.src = entries[0].target.dataset.src;
    obs.unobserve(entries[0].target); // One-time load
  }
});
```
