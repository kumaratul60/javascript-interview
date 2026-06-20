/**
 * ============================================================
 * WHY .call() / .apply() / .bind() IN DEBOUNCE & THROTTLE ?
 * ============================================================
 *
 * Problem:
 * setTimeout executes later.
 * When fn() runs later, it loses the original caller (`this`).
 *
 * Example:
 */

const obj = {
  name: 'Deval',

  say() {
    console.log(this.name);
  },
};

/**
 * ============================================================
 * WRONG: loses `this`
 * ============================================================
 */

function debounceBad(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args); // normal function call
    }, delay);
  };
}

obj.debouncedSay = debounceBad(obj.say, 500);
obj.debouncedSay();

/**
 * After 500ms:
 *
 * fn()
 *
 * NOT:
 *
 * obj.fn()
 *
 * therefore:
 *
 * this === undefined (strict mode)
 *
 * Output:
 * undefined
 */

/* ============================================================
   HOW TO PRESERVE `this`
   ============================================================ */

/**
 * call()
 *
 * Executes immediately.
 * Arguments passed one by one.
 */

fn.call(obj, 1, 2, 3);

/**
 * Equivalent:
 */

obj.fn(1, 2, 3);

/* ------------------------------------------------------------ */

/**
 * apply()
 *
 * Executes immediately.
 * Arguments passed as array.
 */

fn.apply(obj, [1, 2, 3]);

/* ------------------------------------------------------------ */

/**
 * bind()
 *
 * Does NOT execute.
 * Returns a new function.
 */

const boundFn = fn.bind(obj);

boundFn(1, 2, 3);

/* ============================================================
   1. OLD ES5 STYLE (self = this)
   ============================================================ */

function debounceES5(fn, delay) {
  var timeoutId;

  return function () {
    var self = this;
    var args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      fn.call(self, ...args);
    }, delay);
  };
}

/**
 * Flow:
 *
 * obj.fn()
 *      ↓
 * self = obj
 *      ↓
 * setTimeout()
 *      ↓
 * fn.call(obj)
 */

/* ============================================================
   2. USING call()
   ============================================================ */

function debounceCall(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}

/* ============================================================
   3. USING apply()
   ============================================================ */

function debounceApply(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/* ============================================================
   4. USING bind()
   ============================================================ */

function debounceBind(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    const boundFn = fn.bind(this);

    timeoutId = setTimeout(() => {
      boundFn(...args);
    }, delay);
  };
}

/* ============================================================
   5. MODERN RECOMMENDED VERSION
   ============================================================ */

function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}

/* ============================================================
   THROTTLE
   ============================================================ */

/**
 * Debounce:
 *
 * A----B----C----D
 *               |
 *               V
 *               Execute once
 *
 * waits until user stops triggering
 */

/**
 * Throttle:
 *
 * A----B----C----D----E
 * |
 * Execute
 *
 *      wait
 *
 *                Execute
 *
 * runs at most once per delay
 */

/* ============================================================
   THROTTLE - ES5
   ============================================================ */

function throttleES5(fn, delay) {
  var waiting = false;

  return function () {
    if (waiting) return;

    var self = this;
    var args = arguments;

    fn.call(self, ...args);

    waiting = true;

    setTimeout(function () {
      waiting = false;
    }, delay);
  };
}

/* ============================================================
   THROTTLE - MODERN
   ============================================================ */

function throttle(fn, delay) {
  let waiting = false;

  return function (...args) {
    if (waiting) return;

    fn.call(this, ...args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}

/* ============================================================
   TESTING
   ============================================================ */

const user = {
  name: 'Deval',

  print(msg) {
    console.log(msg, this.name);
  },
};

user.debouncePrint = debounce(user.print, 1000);
user.throttlePrint = throttle(user.print, 1000);

/**
 * Debounce
 */

user.debouncePrint('Hello');
user.debouncePrint('Hello');
user.debouncePrint('Hello');

/**
 * Output after 1 sec:
 *
 * Hello Deval
 *
 * only last call executes
 */

/**
 * Throttle
 */

user.throttlePrint('Hi');
user.throttlePrint('Hi');
user.throttlePrint('Hi');

/**
 * Output:
 *
 * Hi Deval
 *
 * only first call executes
 */

/* ============================================================
   INTERVIEW SUMMARY
   ============================================================
 *
 * call()
 *   fn.call(this, a, b, c)
 *
 * apply()
 *   fn.apply(this, [a, b, c])
 *
 * bind()
 *   const newFn = fn.bind(this)
 *
 * debounce
 *   Execute AFTER user stops triggering.
 *
 * throttle
 *   Execute AT MOST once per interval.
 *
 * Why call/apply/bind?
 *   To preserve original `this`
 *   when callback runs later.
 *
 * Most common implementation:
 *
 *   fn.call(this, ...args)
 *
 * ============================================================
 */
