/*
 * Web APIs are interfaces provided by browsers to allow scripts to interact with browser features,
 * the user's computer, and the web. They are not part of the core JavaScript language itself but are
 * built on top of it. This guide covers key Web APIs, their use cases, and common pitfalls.
 */

// -------------------------------------------------------------------------------------------------
// Section 1: Fetch API (Network Requests)
// -------------------------------------------------------------------------------------------------
// The Fetch API provides a modern, promise-based interface for making network requests. It is the
// successor to XMLHttpRequest.

console.log("--- Fetch API Examples ---");

// --- 1.1: Basic GET Request ---
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

    // **Pitfall**: fetch() only rejects on network failure. It does NOT reject on HTTP error
    // statuses like 404 or 500. You must check the `response.ok` or `response.status` property.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parses the JSON response body
    console.log("Fetch GET successful:", data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
fetchData();

// --- 1.2: POST Request with Data ---
async function postData() {
  const post = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(post), // Body data must be a string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetch POST successful:", data);
  } catch (error) {
    console.error('Fetch POST error:', error);
  }
}
postData();


// -------------------------------------------------------------------------------------------------
// Section 2: Web Storage API (localStorage and sessionStorage)
// -------------------------------------------------------------------------------------------------
// Provides mechanisms to store key/value pairs in the browser.

console.log("\n--- Web Storage API Examples ---");

// --- 2.1: localStorage ---
// - Persists data even after the browser is closed and reopened.
// - Data is shared across all tabs and windows from the same origin.
// - Storage limit is ~5-10MB.
// **Pitfall**: Do not store sensitive data (like tokens or user info) in localStorage. It is
// vulnerable to Cross-Site Scripting (XSS) attacks. Use secure, HttpOnly cookies instead.

localStorage.setItem('myKey', 'myValue');
console.log("localStorage value:", localStorage.getItem('myKey'));

// Storing objects requires serialization
const user = { id: 1, name: 'Alice' };
localStorage.setItem('user', JSON.stringify(user));
const retrievedUser = JSON.parse(localStorage.getItem('user'));
console.log("Retrieved object from localStorage:", retrievedUser);

localStorage.removeItem('myKey'); // Clean up


// --- 2.2: sessionStorage ---
// - Data persists only for the duration of the page session (as long as the tab is open).
// - Data is isolated to the specific tab that created it.
sessionStorage.setItem('sessionKey', 'sessionValue');
console.log("sessionStorage value:", sessionStorage.getItem('sessionKey'));


// -------------------------------------------------------------------------------------------------
// Section 3: Geolocation API
// -------------------------------------------------------------------------------------------------
// Allows the user to provide their location to web applications if they consent.
// **Real-world use**: Mapping services, location-aware content, check-ins.
// **Pitfall**: Requires user permission and works best over HTTPS. Can be inaccurate.

console.log("\n--- Geolocation API Example ---");
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Geolocation success:');
      console.log('  Latitude:', position.coords.latitude);
      console.log('  Longitude:', position.coords.longitude);
    },
    (error) => {
      // Common errors: PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT
      console.error('Geolocation error:', error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}


// -------------------------------------------------------------------------------------------------
// Section 4: Intersection Observer API
// -------------------------------------------------------------------------------------------------
// Provides a way to asynchronously observe changes in the intersection of a target element with
// an ancestor element or with a top-level document's viewport.
// **Real-world use**: Lazy loading images/videos, infinite scrolling, triggering animations.

console.log("\n--- Intersection Observer API Example ---");
const options = {
  root: null, // `null` means the viewport
  rootMargin: '0px',
  threshold: 0.5, // Trigger when 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is now 50% visible!');
      // For lazy loading, you would load the image source here.
      // observer.unobserve(entry.target); // Stop observing once it's visible
    }
  });
}, options);

// In a real app, you would observe a real element:
// const target = document.querySelector('#my-lazy-element');
// if (target) observer.observe(target);


// -------------------------------------------------------------------------------------------------
// Section 5: Web Workers API
// -------------------------------------------------------------------------------------------------
// Enables running scripts in a background thread, separate from the main execution thread.
// **Real-world use**: Offloading heavy, long-running computations (e.g., image processing,
// complex calculations, parsing large files) to prevent the UI from freezing.

console.log("\n--- Web Workers API Example ---");

// Worker code as a string. In a real app, this would be in a separate 'worker.js' file.
const workerScript = `
  self.onmessage = function(event) {
    console.log('Worker received:', event.data);
    const result = event.data * 2; // Perform some "heavy" computation
    self.postMessage(result);
  };
`;
// Create a self-contained worker using a Blob
const blob = new Blob([workerScript], { type: 'application/javascript' });
const worker_url = URL.createObjectURL(blob);
const myWorker = new Worker(worker_url);

// Send a message to the worker
myWorker.postMessage(10);

// Listen for messages from the worker
myWorker.onmessage = (event) => {
  console.log('Main thread received from worker:', event.data); // Expected: 20
  myWorker.terminate(); // Clean up the worker
};
// **Pitfall**: Workers cannot directly access the DOM. They communicate with the main thread
// using `postMessage()` and the `onmessage` event handler.


// -------------------------------------------------------------------------------------------------
// Section 6: WebSockets API
// -------------------------------------------------------------------------------------------------
// Allows for real-time, bidirectional, full-duplex communication between a client and a server
// over a single, long-lived TCP connection.
// **Real-world use**: Live chat apps, real-time sports tickers, multiplayer browser games.

console.log("\n--- WebSockets API Example ---");
// Note: This requires a running WebSocket server at this address to work.
// const socket = new WebSocket('wss://echo.websocket.org');

// // Connection opened
// socket.onopen = (event) => {
//   console.log('WebSocket connection established.');
//   socket.send('Hello WebSocket Server!');
// };

// // Listen for messages
// socket.onmessage = (event) => {
//   console.log('Message from server:', event.data);
// };

// // Listen for errors
// socket.onerror = (error) => {
//   console.error('WebSocket error:', error);
// };

// // Connection closed
// socket.onclose = (event) => {
//   if (event.wasClean) {
//     console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
//   } else {
//     console.error('WebSocket connection died');
//   }
// };

// -------------------------------------------------------------------------------------------------
// Section 7: Interview Questions & Answers
// -------------------------------------------------------------------------------------------------

/*
Q1: What's the difference between `localStorage` and `sessionStorage`?
A1: `localStorage` persists data even after the browser is closed, and the data is shared across all
    tabs and windows of the same origin. `sessionStorage` only stores data for the duration of a
    session (as long as the tab is open) and the data is isolated to that specific tab.

Q2: How do you handle errors with the Fetch API?
A2: The `fetch()` promise only rejects on network failures. For HTTP errors (like 404 Not Found or
    500 Internal Server Error), the promise resolves successfully. You must manually check the
    `response.ok` property (which is true for statuses 200-299) or the `response.status` code
    and throw an error if the request was not successful.

Q3: What are the security risks of `localStorage`?
A3: The primary risk is Cross-Site Scripting (XSS). If an attacker can inject malicious JavaScript
    onto your site, they can read everything in `localStorage`, including sensitive data like user
    session tokens (JWTs), personal information, etc. For sensitive data, HttpOnly cookies are
    a more secure alternative as they are not accessible to client-side scripts.

Q4: What problem do Web Workers solve, and what is their main limitation?
A4: Web Workers solve the problem of the UI freezing or becoming unresponsive. By moving long-running,
    heavy computations to a separate background thread, the main thread remains free to handle
    user interactions. The main limitation is that workers cannot directly access or manipulate
    the DOM. All communication with the main thread must happen asynchronously via messages.
*/
