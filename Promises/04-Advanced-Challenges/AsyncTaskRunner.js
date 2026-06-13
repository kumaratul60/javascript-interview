/**
 * @fileoverview
 * Async Task Runner with Concurrency Limit
 * A high-signal senior JavaScript interview question.
 * 
 * Target: Implement a class that can run multiple async tasks 
 * but limits the number of tasks running simultaneously to 'N'.
 */

class TaskRunner {
  /**
   * @param {number} limit - Maximum number of concurrent tasks.
   */
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.runningCount = 0;
  }

  /**
   * Adds a task to the runner.
   * @param {Function} task - A function that returns a Promise.
   * @returns {Promise} - Resolves/rejects when the specific task finishes.
   */
  push(task) {
    return new Promise((resolve, reject) => {
      // Wrap the task to include resolution/rejection logic
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this._process();
    });
  }

  /**
   * Internal method to process the queue.
   */
  async _process() {
    // If we have capacity and tasks in the queue, run a task
    while (this.runningCount < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.runningCount++;

      // Run task and decrement count when finished
      task().finally(() => {
        this.runningCount--;
        this._process(); // Trigger next task
      });
    }
  }
}

/**
 * 📈 Interview Insights:
 * -----------------------
 * 1. Queue Management: Why use a queue? To handle burst requests gracefully.
 * 2. .finally(): Ensures the running count is decremented even if the task fails.
 * 3. Recursion/Loop: Using _process() recursively (or via a loop) ensures the 
 *    next task starts immediately after one finishes.
 * 4. Use Cases: 
 *    - Throttling API calls (e.g., uploading 100 images but only 5 at a time).
 *    - Database connection pooling.
 *    - Crawler rate-limiting.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

const runner = new TaskRunner(2); // Limit concurrency to 2

const mockTask = (id, delay, shouldFail = false) => {
  return () => new Promise((resolve, reject) => {
    console.log(`Task ${id} started (running: ${runner.runningCount + 1})`);
    setTimeout(() => {
      if (shouldFail) {
        console.log(`Task ${id} failed ❌`);
        reject(`Error ${id}`);
      } else {
        console.log(`Task ${id} finished ✅`);
        resolve(`Result ${id}`);
      }
    }, delay);
  });
};

// Push multiple tasks
console.log("Starting tasks with limit = 2...");

runner.push(mockTask(1, 1000));
runner.push(mockTask(2, 500));
runner.push(mockTask(3, 300)); // Should wait for Task 2 to finish
runner.push(mockTask(4, 800)); // Should wait for Task 1 to finish
runner.push(mockTask(5, 100, true)); // Testing failure

/*
Expected Sequence:
- Task 1 & 2 start immediately.
- Task 2 finishes at 500ms.
- Task 3 starts at 500ms.
- Task 3 finishes at 800ms (500 + 300).
- Task 5 starts at 800ms.
- Task 5 fails at 900ms.
- Task 1 finishes at 1000ms.
- Task 4 starts at 1000ms.
- Task 4 finishes at 1800ms.
*/
