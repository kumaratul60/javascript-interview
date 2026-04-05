/**
 * 01 - Fetch API & AbortController
 *
 * Modern data fetching with built-in timeout and cancellation support.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// --- 1. Basic Fetch with Error Handling ---
// Pitfall: fetch() ONLY rejects on network failure. 404/500 are "resolved".
async function fetchData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Data:', data.title);
  } catch (error) {
    console.error('Fetch failed:', error.message);
  }
}

// --- 2. AbortController: Canceling Requests ---
// Use Case: User navigates away from a page or types in a search box.
const controller = new AbortController();
const signal = controller.signal;

async function cancelableFetch() {
  try {
    const response = await fetch(API_URL, { signal });
    const data = await response.json();
    console.log('Result:', data);
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Fetch was successfully canceled!');
    } else {
      console.error('Other error:', err);
    }
  }
}

// Trigger cancellation after 10ms
// cancelableFetch();
// controller.abort();

// --- 3. Implementing a Fetch Timeout ---
// Fetch doesn't have a built-in 'timeout' option yet.
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out!');
    throw err;
  }
}

// fetchWithTimeout(API_URL, 5000).catch(console.error);

/**
 * INTERVIEW TIP:
 * - fetch() is promise-based.
 * - Always check 'response.ok' before parsing JSON.
 * - AbortController is the standard way to handle timeouts and cleanup in React's useEffect.
 */
