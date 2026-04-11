/**
 * @file 03-cba-polyfills.js
 * @description Implementing Call, Apply, and Bind using Symbols to avoid property collisions.
 * @level Advanced (Interview Special)
 */

/**
 * WHY SYMBOLS: avoids property collision + hidden key
 * In old polyfills, we used `context.fn = this`.
 * If the object already had a property named 'fn', we would overwrite it (bad!).
 * Symbols are guaranteed to be unique, so we can safely attach our function
 * to the context object without any side effects.
 */

// 1. myCall Implementation
Function.prototype.myCall = function (context, ...args) {
  // Handle null/undefined context
  context = context === null || context === undefined ? globalThis : Object(context);

  const fnSymbol = Symbol('fn'); // Unique key to avoid key collision
  // const key or fnSymbol  = '__fn__'; // without symbol simple
  // const key = '__fn__' + Date.now(); // more
  context[fnSymbol] = this; // Attach function to object

  const result = context[fnSymbol](...args); // Execute as method (Implicit Binding)

  delete context[fnSymbol]; // Cleanup
  return result;
};

// 2. myApply Implementation
Function.prototype.myApply = function (context, argsArray) {
  context = context === null || context === undefined ? globalThis : Object(context);

  if (argsArray && !Array.isArray(argsArray)) {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  // Spread the array into the call
  const result = argsArray ? context[fnSymbol](...argsArray) : context[fnSymbol]();

  delete context[fnSymbol];
  return result;
};

// 3. myBind Implementation (Using Symbols internally)
Function.prototype.myBind = function (context, ...args) {
  const originalFn = this;

  return function (...newArgs) {
    // We use our custom myApply to maintain the "No Native" rule
    // This ensures the bind context is also handled via Symbols
    return originalFn.myApply(context, [...args, ...newArgs]);
  };
};

// --- ALTERNATIVE: myBind without using myApply ---
/*
Function.prototype.myBindPure = function(context, ...args) {
    const originalFn = this;
    return function(...newArgs) {
        const fnSymbol = Symbol('fn');
        const targetContext = (context === null || context === undefined) ? globalThis : Object(context);
        targetContext[fnSymbol] = originalFn;
        const result = targetContext[fnSymbol](...args, ...newArgs);
        delete targetContext[fnSymbol];
        return result;
    };
};
*/

// bind (handles new)

Function.prototype.myBindNew = function (context, ...presetArgs) {
  const fn = this;

  function boundFn(...laterArgs) {
    const isNew = this instanceof boundFn;

    return fn.apply(isNew ? this : context, [...presetArgs, ...laterArgs]);
  }

  boundFn.prototype = Object.create(fn.prototype);
  return boundFn;
};

// --- TESTING THE SYMBOL-BASED POLYFILLS ---

const person = {
  name: 'Atul',
  // This existing property would be safe from collision
  fn: "I am a string, don't overwrite me!",
};

function greet(city, state) {
  console.log(`Hi, I am ${this.name} from ${city}, ${state}`);
  console.log(`Object protection check (person.fn):`, this.fn);
}

console.log('--- Testing .myCall ---');
greet.myCall(person, 'Bahraich', 'UP');

console.log('\n--- Testing .myApply ---');
greet.myApply(person, ['Mumbai', 'MH']);

console.log('\n--- Testing .myBind ---');
const boundGreet = greet.myBind(person, 'LKO');
boundGreet('UP');

function greet(greeting, name) {
  return `${greeting} ${name}`;
}

greet.myCall(null, 'Hi', 'Dev'); // Hi Dev
greet.myApply(null, ['Hi', 'Dev']); // Hi Dev

const bound = greet.myBind(null, 'Hi');
bound('Dev'); // Hi Dev
