// Classic new Promise
const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// usage
await wait(300);

// async-await
const waitAsync = async (ms) => {
  await new Promise((r) => setTimeout(r, ms));
};

// usage
await wait(300);

// Destructured resolve (works, not ideal)
const waitDes = (ms) => {
  let resolve;
  const promise = new Promise((r) => (resolve = r));
  setTimeout(resolve, ms);
  return promise;
};

// Promise.withResolvers() best
const waitRes = (ms) => {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
};

// cancellable wait (real-world useful)

const waitBest = (ms, signal) =>
  new Promise((resolve, reject) => {
    // If already aborted, fail immediately (no timer created)
    if (signal?.aborted) {
      reject('aborted');
      return;
    }

    // Start the timer that will resolve after `ms`
    const id = setTimeout(() => {
      resolve(); // wait completed successfully
    }, ms);

    // Abort handler: cancel the timer and reject the promise
    const onAbort = () => {
      clearTimeout(id); // stop the pending timeout
      reject('aborted'); // signal cancellation to the caller
    };

    // Listen for abort only once to avoid double reject / leaks
    signal?.addEventListener('abort', onAbort, { once: true });
  });

// uses of waitBest
// 1. Basic use (no cancel)
await waitBest(500);
console.log('done');

// 2. Cancel with AbortController
const controller = new AbortController();

waitBest(1000, controller.signal)
  .then(() => console.log('finished'))
  .catch((err) => console.log(err)); // aborted

setTimeout(() => {
  controller.abort();
}, 300);

// 3. async / await style (recommended)
const controllerAsyncWay = new AbortController();

try {
  await waitBest(1000, controller.signal);
  console.log('finished');
} catch {
  console.log('aborted');
}

// 4. Real-world pattern (cleanup on unmount)
// useEffect(() => {
//   const controller = new AbortController();

//   waitBest(2000, controller.signal).then(() => {
//     console.log('safe to run');
//   });

//   return () => controller.abort();
// }, []);

// 5. Multiple waits, one cancel
const controllerMulti = new AbortController();

await Promise.all([
  waitBest(300, controller.signal),
  waitBest(600, controller.signal),
  waitBest(900, controller.signal),
]);

// cancel all
controllerMulti.abort();

// Problem with this version
// it mostly works, but it has two subtle bugs that bite in real apps
const waitBestBug = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) return reject('aborted');

    const id = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      reject('aborted');
    });
  });

/*
────────────────────────────────────────────────────────
Issues in the naive `waitBestBug` implementation
────────────────────────────────────────────────────────

Issue 1: Event listener leak (memory + logic bug)
------------------------------------------------
signal?.addEventListener('abort', () => { ... })

- Uses an anonymous function
- Cannot be removed later
- If `waitBest` is called multiple times with the same `AbortSignal`,
  listeners keep accumulating

Result:
- Unnecessary handlers
- Multiple abort callbacks firing
- Possible duplicate `reject()` attempts


Issue 2: Double-settle race condition (edge case)
-------------------------------------------------
Possible execution order:

1. `setTimeout` fires  → `resolve()`
2. `abort()` fires     → `reject()`

Notes:
- Promises ignore the second settle, BUT
- `clearTimeout()` runs too late
- Extra logic still executes
- Makes debugging timing issues painful


What’s missing in the broken version
------------------------------------
- `{ once: true }` on the event listener
- A named `onAbort` handler
- A clear cleanup strategy


Rule to remember
----------------
If you add an event listener inside a Promise:
→ it must be removable OR registered with `{ once: true }`

Otherwise, it’s a ticking leak.
────────────────────────────────────────────────────────
*/

// updated version:
const waitBestBugFree = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject('aborted');
      return;
    }

    const id = setTimeout(resolve, ms);

    const onAbort = () => {
      clearTimeout(id);
      reject('aborted');
    };

    signal?.addEventListener('abort', onAbort, { once: true });
  });

// Final Version of wait function

/**
 * @param {number} ms - Milliseconds to wait (must be a non-negative finite number).
 * @param {AbortSignal} [signal] - Optional AbortSignal for cancellation.
 * @returns {Promise<void>}
 */

const waitFinal = (ms, signal) =>
  new Promise((resolve, reject) => {
    // 1. Validation:Handles: null, undefined, "", NaN, Infinity, and strings
    if (typeof ms !== 'number' || !Number.isFinite(ms) || ms < 0) {
      return reject(new TypeError('ms must be a non-negative number'));
    }

    // 2. Immediate exit
    // If signal is already aborted, don't even start the timer
    if (signal?.aborted) {
      return reject(signal.reason || new DOMException('Aborted', 'AbortError'));
    }

    let timerId;

    // 3. Centralized Cleanup
    // It ensures that no matter how the promise settles, we leave zero garbage in memory.
    const cleanup = () => {
      clearTimeout(timerId);
      signal?.removeEventListener('abort', onAbort);
    };

    const onAbort = () => {
      cleanup();
      // Use signal.reason if available (standard in modern JS), otherwise fallback to DOMException
      reject(signal.reason || new DOMException('Aborted', 'AbortError'));
    };

    const onSuccess = () => {
      cleanup();
      resolve();
    };

    // 4. Set up side effects
    timerId = setTimeout(onSuccess, ms);

    // { once: true } is a backup, but manual removeEventListener in cleanup()
    // is required to prevent leaks if the timer finishes successfully.
    signal?.addEventListener('abort', onAbort, { once: true });
  });

/* ==========================================================================
   THE USE-CASE CATALOG: HANDLING ALL EDGES
   ========================================================================== */

/**
 * 1. HANDLING "DIRTY" INPUTS (Edge Cases)
 * Ensures the function doesn't crash the event loop or run forever on bad data.
 */
const testDirtyInputs = async () => {
  // A. Passing "0": Executes as soon as the current event loop tick finishes
  await waitFinal(0);

  // B. Passing invalid types: Triggers the TypeError guard
  try {
    await waitFinal(null);
  } catch (e) {
    console.log('Caught Null:', e.message);
  }

  // C. Passing NaN or Infinity
  await waitFinal(NaN).catch((e) => console.log('Caught NaN'));
  await waitFinal(Infinity).catch((e) => console.log('Caught Infinity'));
};

/**
 * 2. THE ASYNC-AWAIT WAY (Cleanest Pattern)
 */
async function delayedExecution() {
  console.log('Start wait...');
  await waitFinal(1000);
  console.log('1 second later, code continues.');
}

/**
 * 3. STANDARD PROMISE WAY (.then / .catch)
 */
const useStandardPromise = () => {
  waitFinal(500)
    .then(() => console.log('Wait finished via .then'))
    .catch((err) => console.error('Wait failed:', err));
};

/**
 * 4. HANDLING CANCELLATION WITH CUSTOM REASON
 * Demonstrates how to stop a pending wait from the outside.
 */
const useCancellation = async () => {
  const controller = new AbortController();

  // Trigger an abort after 500ms
  setTimeout(() => {
    controller.abort("User clicked the 'Stop' button");
  }, 500);

  try {
    // Attempt to wait for 2 seconds
    await waitFinal(2000, controller.signal);
  } catch (err) {
    // err is the custom reason string: "User clicked the 'Stop' button"
    console.log('Rejected with reason:', err);
  }
};

/**
 * 5. USING INSIDE A LOOP (Serial Execution)
 * Correctly pauses the loop iterations.
 */
const useInLoop = async () => {
  const items = ['Task 1', 'Task 2', 'Task 3'];

  for (const item of items) {
    await waitFinal(1000);
    console.log(`Executed ${item} after 1s pause`);
  }
};

/**
 * 6. WAITING FOR MULTIPLE TIMERS (Parallel Execution)
 * Total wait time will be the duration of the longest timer (1000ms).
 */
const useInParallel = async () => {
  await Promise.all([waitFinal(300), waitFinal(600), waitFinal(1000)]);
  console.log('All parallel timers finished.');
};

/**
 * 7. RACING TIMERS (The "Timeout" Pattern)
 * Useful for timing out network requests.
 */
const useAsTimeout = async () => {
  const apiCall = new Promise((res) => setTimeout(() => res('API Data'), 5000));

  // Create a 2-second timeout "bomb"
  const timeout = waitFinal(2000).then(() => {
    throw new Error('API request timed out!');
  });

  try {
    const result = await Promise.race([apiCall, timeout]);
    console.log(result);
  } catch (e) {
    console.log(e.message); // Will print "API request timed out!"
  }
};

// Debounce Pattern use in useEffect
// useEffect(() => {
//   const controller = new AbortController();

//   const search = async () => {
//     try {
//       // Wait 500ms after the user stops typing
//       await waitFinal(500, controller.signal);

//       // If we made it here, perform the API call
//       const data = await fetch(`/api/search?q=${query}`, { signal: controller.signal });
//       // ... handle data
//     } catch (e) {
//       /* ignore aborts */
//     }
//   };

//   search();

//   // If the user types again within 500ms, the previous wait is cancelled!
//   return () => controller.abort();
// }, [query]);

/**
 * SUMMARY: WHY THIS IS THE ONLY WAIT FUNCTION YOU NEED
 *
 * 1. Memory Safe: In long-running apps (React/Node), it prevents listener accumulation. Automatically removes AbortSignal listeners on success or failure.
 * 2. Type Safe: Stops execution immediately on 'null/undefined/NaN', ensuring predictability.
 * 3. Future Proof: Native support for 'signal.reason' (Web Standard).
 * 4. Flexible: Seamless integration with Promise.all and Promise.race patterns.
 */

/**
 * ==========================================================================
 * EXECUTING LOGIC AFTER DELAY (setTimeout replacement)
 * ==========================================================================
 */

// 1. Basic Function Execution
// Traditional: setTimeout(() => { sayHi("John"); }, 1000);
const runFunction = async (name) => {
  await waitFinal(1000);
  console.log(`Hi ${name}!`); // This runs after 1s
};

// 2. Passing Variables and Calculating Data
const calculateLater = async (a, b) => {
  const sum = a + b; // Variable is captured in the scope

  await waitFinal(2000);

  // Logic after the wait
  const result = sum * 2;
  console.log('Calculated Result after 2s:', result);
};

/**
 * 3. EXECUTING LOOPS (The "Sequential" Pattern)
 * This is where waitFinal is MUCH better than setTimeout.
 * Use this to stagger actions (e.g., sending emails one by one).
 */
const staggeredLoop = async (items) => {
  console.log('Starting staggered loop...');

  for (const item of items) {
    // Wait 1 second BEFORE each item
    await waitFinal(1000);

    // Execute logic
    console.log(`Processing: ${item} at ${new Date().toLocaleTimeString()}`);
  }

  console.log('All items processed.');
};

/**
 * 4. THE "DELAYED EXECUTOR" UTILITY
 * If you want a reusable wrapper that looks exactly like setTimeout
 * but uses our safe waitFinal logic.
 */
const delayExec = async (fn, ms, ...args) => {
  try {
    await waitFinal(ms);
    return fn(...args); // Execute the function with passed variables
  } catch (err) {
    if (err.name !== 'AbortError') throw err;
  }
};

// Usage of delayExec:
delayExec(
  (name, city) => {
    console.log(`Hello ${name} from ${city}`);
  },
  1500,
  'Alice',
  'New York'
);

/**
 * 5. ADVANCED: Loop with Cancellation
 * If the user clicks "Cancel", the loop stops immediately.
 */
const cancellableLoop = async (signal) => {
  const tasks = [1, 2, 3, 4, 5];

  try {
    for (const task of tasks) {
      await waitFinal(1000, signal);
      console.log(`Finished Task ${task}`);
    }
  } catch (err) {
    console.log('Loop stopped because:', err);
  }
};

/*
─────────────────────────────────────────────────────────────────────────────
SUMMARY OF DIFFERENCES:
─────────────────────────────────────────────────────────────────────────────

1. VARIABLE SCOPE:
   In `setTimeout`, you often deal with closure issues. In `await waitFinal`,
   your variables stay in the same linear block, making them easier to debug.

2. ORDER OF OPERATIONS:
   With `setTimeout`, if you have a loop, all timers start at once (Parallel).
   With `waitFinal`, each iteration waits for the previous one (Sequential).

3. READABILITY:
   No more "Pyramid of Doom" (nesting). Your code reads like a list of
   instructions: "Do this, wait, then do that."
─────────────────────────────────────────────────────────────────────────────
*/

//----------------------------------------------------------------------------

/**
 * ==========================================================================
 * PROMISE-BASED TIMERS: EVOLUTION & PITFALLS
 * ==========================================================================
 *
 * A comparison of three common implementation strategies.
 * Focus: Memory safety, error handling, and production readiness.
 */

/* -------------------------------------------------------------------------- */
/* 1. waitBestBugFree (The "Naive" Implementation): waitLeaky                 */
/* -------------------------------------------------------------------------- */
/**
 * USE CASE: Small scripts or one-off CLI tools where the process dies quickly.
 *
 * PITFALLS:
 * SUCCESS LEAK: Even with { once: true }, the listener remains attached if
 *    the timer finishes first. Reusing a signal causes memory growth.
 *  STRING REJECTION: Rejecting with 'aborted' (a string) provides no stack
 *    trace, making enterprise-level debugging impossible.
 *  NO TYPE SAFETY: Vulnerable to NaN or non-number inputs.
 */

/* -------------------------------------------------------------------------- */
/* 2. waitBest (The "Verbose" Implementation): waitNaive                      */
/* -------------------------------------------------------------------------- */
/**
 * USE CASE: Almost never. It is simply a wordier version of the naive approach.
 *
 * PITFALLS:
 * REDUNDANT: Adds complexity without fixing the "Success Leak" bug.
 * INCOMPLETE: Fails to remove event listeners on successful resolution.
 */

/* -------------------------------------------------------------------------- */
/* 3. waitFinal (The "Gold Standard" Implementation): waitSafe                */
/* -------------------------------------------------------------------------- */
/**
 * USE CASE: Production apps, React components, and long-running Node.js servers.
 *
 * WHY IT WINS:
 * ZERO MEMORY LEAKS: Manually removes listeners on BOTH success and failure.
 * STANDARDIZED: Rejects with DOMException('AbortError') to match fetch() behavior.
 * CUSTOM REASONS: Supports 'signal.reason' for descriptive cancellation logs.
 * DEFENSIVE: Validates input to ensure 'ms' is a finite, non-negative number.
 */

/* ==========================================================================
   SUMMARY COMPARISON TABLE
   ==========================================================================

   FEATURE              | Naive / Verbose | waitFinal
   ---------------------|-----------------|----------------------
   Abort Cleanup        | Yes             | Yes
   Success Cleanup      | NO (Leak!)      | YES (Clean)
   Type Validation      | No              | Yes
   Error Objects        | No (String)     | Yes (DOMException)
   Production Ready?    | No              | YES

   FINAL VERDICT:
   "Success Leaks" are silent killers in large apps.
   Always use waitFinal as waitSafe to ensure your event-listener count stays at zero.
   ========================================================================== */
