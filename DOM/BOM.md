# Browser Object Model (BOM)

The **Browser Object Model (BOM)** provides JavaScript APIs to interact with the browser itself.

Unlike the DOM, which represents the webpage, the BOM represents the browser environment.

```text
Browser
│
├── window
│   ├── document (DOM)
│   ├── history
│   ├── location
│   ├── navigator
│   └── screen
```

---

# Window Object

The global object in the browser.

Everything in the browser hangs off `window`.

```js
window.alert('Hello');

alert('Hello'); // same thing
```

---

## Common Window APIs

### Current Window Size

```js
window.innerWidth;
window.innerHeight;
```

### Scroll Position

```js
window.scrollX;
window.scrollY;
```

### Scroll Programmatically

```js
window.scrollTo({
  top: 1000,
  behavior: 'smooth',
});
```

### Open New Tab

```js
window.open('https://example.com', '_blank');
```

---

## Interview Question

### window vs document

```text
window
→ Browser

document
→ Web Page
```

Example:

```js
window.innerWidth;
```

Browser information.

```js
document.querySelector('.card');
```

Page information.

---

# Screen Object

Provides information about the user's screen.

```js
screen.width;
screen.height;
```

Example:

```js
console.log(screen.width);
console.log(screen.height);
```

Output:

```text
1920
1080
```

---

## Common Properties

```js
screen.width;
screen.height;

screen.availWidth;
screen.availHeight;

screen.colorDepth;
```

---

## Real World Use Cases

### Analytics

```js
console.log(screen.width);
```

Track device resolutions.

### Fullscreen Applications

```js
screen.availWidth;
```

Calculate available space.

---

## Interview Question

### screen.width vs window.innerWidth

```text
screen.width
→ Physical screen width

window.innerWidth
→ Browser viewport width
```

Example:

```text
Monitor Width = 1920px

Browser Width = 1200px
```

```js
screen.width; // 1920
window.innerWidth; // 1200
```

---

# Navigator Object

Provides browser and device information.

```js
navigator.userAgent;
```

---

## Common Properties

### Browser Info

```js
navigator.userAgent;
```

### Language

```js
navigator.language;
```

### Online Status

```js
navigator.onLine;
```

### Clipboard API

```js
navigator.clipboard.writeText('Hello');
```

### Geolocation

```js
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
});
```

---

## Real World Examples

### Detect Offline Mode

```js
if (!navigator.onLine) {
  showOfflineBanner();
}
```

### Copy To Clipboard

```js
await navigator.clipboard.writeText(text);
```

---

## Interview Question

### Can you trust navigator.userAgent?

Answer:

```text
No.
```

Reasons:

- Can be spoofed
- Browser vendors changing support
- User-Agent reduction initiatives

Prefer:

```text
Feature Detection
```

Instead of:

```js
if (navigator.userAgent.includes("Chrome"))
```

Use:

```js
if ("clipboard" in navigator)
```

---

# History Object

Allows navigation through browser history.

```js
window.history;
```

---

## Common Methods

### Go Back

```js
history.back();
```

Equivalent:

```text
Browser Back Button
```

---

### Go Forward

```js
history.forward();
```

---

### Move N Steps

```js
history.go(-2);
history.go(1);
```

---

### Push New History Entry

```js
history.pushState({}, '', '/dashboard');
```

---

### Replace Current History Entry

```js
history.replaceState({}, '', '/dashboard');
```

---

## SPA Routing (React/Next.js)

Modern routers use:

```js
history.pushState();
history.replaceState();
```

instead of:

```text
Full page reload
```

---

## Interview Question

### pushState vs replaceState

#### pushState

```js
history.pushState({}, '', '/profile');
```

Creates a new history entry.

```text
Home
 ↓
Profile
```

Back button works.

---

#### replaceState

```js
history.replaceState({}, '', '/profile');
```

Replaces current history entry.

```text
Home
```

becomes

```text
Profile
```

Back button cannot return to Home.

---

## Real Interview Scenario

Question:

Why does React Router not reload the page?

Answer:

```text
Uses History API

history.pushState()

instead of

window.location.href
```

---

# Location Object

Provides information about the current URL.

```js
window.location;
```

---

## Common Properties

### Full URL

```js
location.href;
```

### Origin

```js
location.origin;
```

### Pathname

```js
location.pathname;
```

### Query Params

```js
location.search;
```

### Hash

```js
location.hash;
```

---

Example URL:

```text
https://app.com/users?id=1#profile
```

Values:

```js
location.href;
// https://app.com/users?id=1#profile

location.pathname;
// /users

location.search;
// ?id=1

location.hash;
// #profile
```

---

## Navigation

### Redirect

```js
location.href = '/dashboard';
```

### Reload

```js
location.reload();
```

### Replace URL

```js
location.replace('/dashboard');
```

---

## Interview Question

### location.href vs location.replace

#### href

```js
location.href = '/dashboard';
```

Creates history entry.

Back button works.

---

#### replace

```js
location.replace('/dashboard');
```

Replaces current page.

Back button won't return.

---

# Frequently Asked Interview Questions

## Q1. BOM vs DOM

```text
DOM
→ Web Page

BOM
→ Browser
```

Examples:

```js
document.querySelector();
```

DOM

```js
window.location;
```

BOM

---

## Q2. window vs document

```text
window
→ Browser object

document
→ HTML document
```

---

## Q3. screen.width vs window.innerWidth

```text
screen.width
→ Monitor width

window.innerWidth
→ Browser viewport width
```

---

## Q4. pushState vs replaceState

```text
pushState
→ Adds history entry

replaceState
→ Replaces history entry
```

---

## Q5. location.href vs location.replace

```text
href
→ Adds history entry

replace
→ Replaces history entry
```

---

## Q6. Why do React Routers use History API?

```text
Avoid full page reloads

Enable SPA navigation
```

---

## Q7. Why should you avoid userAgent detection?

```text
Can be spoofed

Use feature detection instead
```

---

# Senior Frontend Interview Scenarios

## Scenario 1

Question:

Implement SPA navigation without page reload.

Answer:

```js
history.pushState({}, '', '/dashboard');
```

---

## Scenario 2

Question:

Redirect after login and prevent back navigation to login page.

Answer:

```js
location.replace('/dashboard');
```

or

```js
history.replaceState({}, '', '/dashboard');
```

---

## Scenario 3

Question:

Determine if user is offline.

Answer:

```js
navigator.onLine;
```

---

## Scenario 4

Question:

Get current route path.

Answer:

```js
location.pathname;
```

---

## Scenario 5

Question:

Get viewport width.

Answer:

```js
window.innerWidth;
```

Not:

```js
screen.width;
```

---

# Quick Revision

```text
BOM
│
├── Window
│   ├── innerWidth
│   ├── innerHeight
│   └── scrollTo
│
├── Screen
│   ├── width
│   ├── height
│   └── colorDepth
│
├── Navigator
│   ├── userAgent
│   ├── language
│   ├── onLine
│   └── clipboard
│
├── History
│   ├── back
│   ├── forward
│   ├── go
│   ├── pushState
│   └── replaceState
│
└── Location
    ├── href
    ├── pathname
    ├── search
    ├── hash
    ├── reload
    └── replace
```

## Staff-Level Takeaway

Most BOM interview questions are actually testing:

```text
Do you understand:

1. Browser Navigation?
2. SPA Routing?
3. URL Manipulation?
4. Browser vs Page distinction?
5. Feature Detection vs Browser Detection?
```

If you understand those five areas, you'll answer 90% of BOM interview questions correctly.
