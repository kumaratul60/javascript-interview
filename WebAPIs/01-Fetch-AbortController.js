/**
 * 01 - Fetch API & AbortController: Advanced HTTP Networking in Browsers
 *
 * This file serves as a reference script and design pattern for handling modern data fetching,
 * request timeouts, automatic cancellation, connection retries with backoff, and streaming.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// ==========================================
// 1. Production-Grade Fetch with Strict Error Handling
// ==========================================
/**
 * Pitfall: fetch() ONLY rejects on network failure (DNS error, offline, CORS block).
 * A 404 Not Found or 500 Internal Server Error is resolved successfully, returning response.ok = false.
 * Another Gotcha: Calling response.json() when the server returned HTML (like a 500 page)
 * will throw a SyntaxError.
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);

    // 1. Verify HTTP transport status
    if (!response.ok) {
      throw new Error(`HTTP Transport Error! status: ${response.status}`);
    }

    // 2. Read content-type safely
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError('Response format is not JSON!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Type validation error:', error.message);
    } else {
      console.error('Fetch operation failed:', error.message);
    }
    throw error; // Re-throw for downstream handlers
  }
}

// ==========================================
// 2. AbortController: Client-Side Request Cancellation
// ==========================================
/**
 * Use Case: Search-box autocomplete debouncing (discarding old keystroke queries)
 * or cleaning up network requests when a React/Vue component unmounts.
 */
function initializeCancelableFetch() {
  const controller = new AbortController();
  const { signal } = controller;

  async function startRequest() {
    try {
      const response = await fetch(API_URL, { signal });
      const data = await response.json();
      console.log('Successfully completed request:', data);
    } catch (error) {
      // Catch AbortError specifically to avoid logging false errors
      if (error.name === 'AbortError') {
        console.warn('Network request was successfully aborted by the client.');
      } else {
        console.error('Request failed due to other error:', error);
      }
    }
  }

  startRequest();

  // Cancel the request after 50ms
  setTimeout(() => {
    controller.abort();
  }, 50);
}

// ==========================================
// 3. Implementing Fetch with Timeout & Combined Signals
// ==========================================
/**
 * Modern browsers support AbortSignal.any(signals), which returns a signal that
 * aborts as soon as ANY of the source signals abort (e.g. user-aborted or timed out).
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);

  // Set up combined signal if user passed their own controller signal
  let signal;
  if (options.signal) {
    if (typeof AbortSignal.any === 'function') {
      // ES2023 feature: link both signals
      signal = AbortSignal.any([options.signal, timeoutController.signal]);
    } else {
      // Fallback: manually trigger timeout abort if user signal aborts
      options.signal.addEventListener('abort', () => timeoutController.abort());
      signal = timeoutController.signal;
    }
  } else {
    signal = timeoutController.signal;
  }

  try {
    const response = await fetch(url, { ...options, signal });
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      // Inspect if timeout triggered it
      if (timeoutController.signal.aborted) {
        throw new Error(`Request timed out after exceeding ${timeoutMs}ms limit.`);
      }
    }
    throw error;
  } finally {
    clearTimeout(timeoutId); // Prevent memory leak by clearing timeout
  }
}

// ==========================================
// 4. Request Retries with Exponential Backoff
// ==========================================
/**
 * Retries network requests with progressively longer delays on transport errors.
 */
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000, backoffFactor = 2) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status >= 500 && retries > 0) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response; // Resolve immediately on 4xx user errors
    }
    return response;
  } catch (error) {
    if (retries <= 0 || error.name === 'AbortError') {
      throw error; // Don't retry if client aborted or out of retries
    }

    console.warn(`Request failed. Retries remaining: ${retries}. Retrying in ${delay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, retries - 1, delay * backoffFactor, backoffFactor);
  }
}

// ==========================================
// 5. Streaming Response Bodies (Large Files)
// ==========================================
/**
 * Shows how to consume response chunks incrementally using ReadableStream,
 * allowing you to track download progress without holding the entire file in RAM.
 */
async function fetchLargeStream(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length') || 0;

  let receivedLength = 0;
  let chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    chunks.push(value);
    receivedLength += value.length;

    if (contentLength) {
      const percentComplete = ((receivedLength / contentLength) * 100).toFixed(2);
      console.log(`Download progress: ${percentComplete}%`);
    }
  }

  // Concatenate chunks back into a single Uint8Array
  let allChunks = new Uint8Array(receivedLength);
  let position = 0;
  for (let chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }

  return new TextDecoder('utf-8').decode(allChunks);
}

// ==========================================
// 6. Interview Hot Corners & Dig Deep
// ==========================================
/**
 * Q1: Can a single AbortController instance abort multiple fetch calls?
 * Yes. You can share a single AbortController.signal across multiple calls.
 * Calling controller.abort() will cancel all active requests using that signal.
 *
 * Q2: How does AbortController affect CORS preflight requests?
 * If you abort a request before the browser issues the preflight OPTIONS request,
 * the preflight options request itself is aborted and never lands on the server.
 * If the preflight has already finished, the main GET/POST request is canceled.
 *
 * Q3: How do you use AbortController to clean up React standard useEffect hooks?
 * Return an abort trigger inside the cleanup callback function:
 *
 * useEffect(() => {
 *   const controller = new AbortController();
 *   fetch(url, { signal: controller.signal })
 *     .then(r => r.json())
 *     .then(data => setData(data))
 *     .catch(e => { if (e.name !== 'AbortError') handleErrors(e); });
 *
 *   return () => controller.abort(); // Cancel request when component unmounts/re-runs
 * }, [url]);
 */
