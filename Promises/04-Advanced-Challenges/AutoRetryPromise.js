/**
 * @file AutoRetryPromise.js
 * @description Advanced Challenge: Automatic Retry Logic
 * @level Advanced (Senior Level Interview)
 *
 * PROBLEM STATEMENT:
 * Implement a function `autoRetry(fn, retries, delay)` that takes an async
 * function `fn` and attempts to execute it. If it fails, it should retry
 * up to `retries` times with a specified `delay` between attempts.
 *
 * WHY IT'S ASKED:
 * Tests your understanding of:
 * - Recursive or loop-based asynchronicity.
 * - Error handling and recovery.
 * - Implementing delays in async logic.
 *
 * REAL-WORLD USE CASE:
 * - Retrying network requests (e.g., fetching user data from a flaky API).
 * - Connecting to a database that might be temporarily unavailable.
 */

/**
 * Retries an async function multiple times upon failure.
 * @param {() => Promise<any>} fn - The async function to execute.
 * @param {number} retries - Maximum number of retry attempts.
 * @param {number} delay - Delay between retries in milliseconds.
 * @returns {Promise<any>} - Resolves with the value or rejects after final attempt.
 */
async function autoRetry(fn, retries, delay) {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) {
      throw new Error(`Failed after all retry attempts. Last error: ${err.message}`);
    }

    console.warn(`Attempt failed. Retrying... (${retries} left)`);

    // Wait for the specified delay before the next attempt
    await new Promise((resolve) => setTimeout(resolve, delay));

    return autoRetry(fn, retries - 1, delay);
  }
}

// --- EXAMPLE USAGE ---

let attempts = 0;
const flakyTask = async () => {
  attempts++;
  console.log(`Task Attempt #${attempts} executing...`);

  // Fail for the first 3 attempts, succeed on the 4th
  if (attempts < 4) {
    throw new Error('Temporary Network Failure');
  }

  return '✅ Data successfully fetched!';
};

console.log('Starting Auto-Retry (Max: 5 retries, Delay: 1000ms)...');
autoRetry(flakyTask, 5, 1000)
  .then((result) => console.log('Final Result:', result))
  .catch((err) => console.error('Final Error:', err.message));
