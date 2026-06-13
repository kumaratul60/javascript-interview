/**
 * @fileoverview
 * Advanced Debounce with Leading & Trailing options.
 * A "Gold Standard" frontend interview question.
 * 
 * Target: Implement a debounce function that can trigger:
 * 1. At the beginning of the timeout (leading).
 * 2. At the end of the timeout (trailing).
 * 3. Both.
 */

/**
 * @param {Function} func 
 * @param {number} wait 
 * @param {Object} options 
 * @returns {Function}
 */
function debounce(func, wait, options = { leading: false, trailing: true }) {
  let timerId = null;
  let lastArgs = null;
  let lastThis = null;

  return function(...args) {
    lastArgs = args;
    lastThis = this;

    const invoke = () => {
      if (options.trailing && lastArgs) {
        func.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
      timerId = null;
    };

    const isInvoking = options.leading && !timerId;

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(invoke, wait);

    if (isInvoking) {
      func.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }
  };
}

/**
 * 📈 Interview Insights:
 * -----------------------
 * 1. Leading: Useful for buttons where you want immediate feedback on the 
 *    first click but want to ignore subsequent rapid clicks (e.g., "Submit").
 * 2. Trailing: Useful for search inputs where you want to wait until the 
 *    user stops typing.
 * 3. Closures: This implementation heavily relies on closures to maintain 
 *    timerId and arguments across calls.
 * 4. Context (this): Using .apply(this, args) ensures the debounced function 
 *    maintains the correct execution context.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

const log = (msg) => console.log(`${new Date().toLocaleTimeString()}: ${msg}`);

console.log("--- Testing Trailing (Default) ---");
const dTrailing = debounce(() => log("Trailing Executed"), 1000);
dTrailing();
dTrailing(); // Should only see one execution 1s after the LAST call

setTimeout(() => {
  console.log("\n--- Testing Leading ---");
  const dLeading = debounce(() => log("Leading Executed"), 1000, { leading: true, trailing: false });
  dLeading(); // Executes immediately
  dLeading(); // Ignored
}, 1500);

setTimeout(() => {
  console.log("\n--- Testing Both ---");
  const dBoth = debounce((i) => log(`Both Executed ${i}`), 1000, { leading: true, trailing: true });
  dBoth(1); // Executes immediately (leading)
  dBoth(2); // Will execute 1s after this call (trailing)
}, 3000);
