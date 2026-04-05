# Browser Storage APIs - Master Guide

This guide explains the four main ways to store data in the browser, their differences, and when to use which.

## 📊 Comparison Table

| Feature           | Cookies              | LocalStorage           | SessionStorage      | IndexedDB            |
| ----------------- | -------------------- | ---------------------- | ------------------- | -------------------- |
| **Capacity**      | 4 KB                 | 5-10 MB                | 5 MB                | ~80% of disk space   |
| **Lifetime**      | Set by 'expires'     | Until manually deleted | Until tab is closed | Permanent            |
| **Accessibility** | All windows (origin) | All windows (origin)   | Same tab (origin)   | All windows (origin) |
| **Network Send**  | Auto-sent with HTTP  | No                     | No                  | No                   |
| **API Style**     | String manipulation  | Key/Value (Sync)       | Key/Value (Sync)    | NoSQL (Async)        |

---

## 🚀 Use Cases

### 1. LocalStorage

- **Ideal for**: User preferences (Dark mode, language), "Remember me" settings, or persisting app state across browser restarts.
- **Limitation**: Synchronous (can block UI), size limited, and only stores strings.

### 2. SessionStorage

- **Ideal for**: Sensitive data during a session (one-time form data), temporary state of a multi-step checkout process.
- **Limitation**: Data is lost when the tab is closed.

### 3. Cookies

- **Ideal for**: Authentication tokens (JWT), session tracking, tracking user behavior.
- **Limitation**: Sent with every request (performance hit), very small size, and security risks (CSRF).

### 4. IndexedDB

- **Ideal for**: Storing large amounts of structured data, offline-first web apps (PWAs), complex data with relationships.
- **Limitation**: Complex API, low-level (often used with wrappers like Dexie.js).

## 🛡️ Security & Safety: Why move away from Cookies?

In modern web development, using Cookies for general data storage is considered a **security anti-pattern**. Here is why:

### 1. CSRF (Cross-Site Request Forgery)

- **The Cookie Problem**: Browsers automatically attach cookies to **every** HTTP request to that domain. An attacker can trick a user's browser into sending a request to your server with the user's credentials attached.
- **The IndexedDB Solution**: Data in IndexedDB (or LocalStorage) is **never** sent automatically. You must manually retrieve it via JavaScript and add it to a request (e.g., in a `Bearer` header). This completely eliminates the risk of CSRF for that data.

### 2. Request Bloat & Privacy

- **The Cookie Problem**: Since cookies are sent in headers, if you store 4KB of data, every single image, script, and API call on your site carries an extra 4KB of overhead. This slows down your app and leaks data patterns to anyone sniffing the network.
- **The IndexedDB Solution**: It stays strictly on the client. Zero network overhead.

### 3. XSS (Cross-Site Scripting)

- **Warning**: Both LocalStorage and IndexedDB are accessible via JavaScript. If a hacker runs a malicious script on your site, they can read this data.
- **Best Practice**: Only use **HttpOnly** Cookies for sensitive session tokens (JWTs) to prevent JS access. For everything else (user data, app state, offline cache), use **IndexedDB**.

---

## 💡 Interview Tip: Storage Events

If you have two tabs open for the same site and you change `localStorage` in one, the **other tab** can listen to this change via the `storage` event. This is great for keeping tabs in sync!

```javascript
window.addEventListener('storage', (e) => {
  console.log(`Key ${e.key} changed!`);
});
```
