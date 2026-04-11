/**
 * @file PromisePool.js
 * @description Advanced Challenge: Controlling Concurrency
 * @level Advanced (Senior Level Interview)
 *
 * PROBLEM STATEMENT:
 * You have an array of 50 tasks (async functions), but you are only allowed
 * to run a maximum of 3 tasks concurrently. Implement a "Promise Pool"
 * that executes all tasks while respecting this limit.
 *
 * WHY IT'S ASKED:
 * Tests your understanding of:
 * - Asynchronicity control.
 * - Queue management.
 * - Managing shared state in an async environment.
 *
 * REAL-WORLD USE CASE:
 * - Rate-limiting API calls.
 * - Processing large datasets without crashing the server.
 * - Handling bulk image uploads.
 */

/**
 * Executes a pool of promises with a concurrency limit.
 * @param {Array<() => Promise<any>>} tasks - Array of functions that return a promise.
 * @param {number} limit - Maximum concurrent tasks allowed.
 * @returns {Promise<Array<any>>} - Resolves when all tasks are complete.
 */
async function promisePool(tasks, limit) {
  const results = [];
  const executing = new Set(); // To track currently active promises

  for (const task of tasks) {
    // Create a new task and add it to the 'executing' set
    const promise = task().then((res) => {
      executing.delete(promise); // Remove from set when done
      return res;
    });

    results.push(promise);
    executing.add(promise);

    // If the limit is reached, wait for at least one promise to finish
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// --- EXAMPLE USAGE ---

const mockTask = (id, delay) => () => {
  console.log(`Task ${id} started (takes ${delay}ms)`);
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`✅ Task ${id} finished`);
      resolve(`Result ${id}`);
    }, delay),
  );
};

const tasks = [
  mockTask(1, 1000),
  mockTask(2, 500),
  mockTask(3, 300),
  mockTask(4, 800),
  mockTask(5, 200),
  mockTask(6, 400),
];

console.log('Starting Promise Pool (Limit: 2)...');
promisePool(tasks, 2).then((allResults) => {
  console.log('All tasks complete:', allResults);
});
