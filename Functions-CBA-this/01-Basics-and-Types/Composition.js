/**
 * @file Composition.js
 * @description Master Function Composition: Compose and Pipe.
 * @level Advanced
 */

/**
 * 1. COMPOSE (Right to Left)
 * logic: f(g(x))
 */
const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((acc, fn) => fn(acc), val);

/**
 * 2. PIPE (Left to Right)
 * logic: g(f(x))
 */
const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((acc, fn) => fn(acc), val);

// --- EXAMPLE USAGE ---

const toUpper = (s) => s.toUpperCase();
const getFirstThree = (s) => s.substring(0, 3);
const exclaim = (s) => `${s}!`;

const processShout = compose(exclaim, toUpper, getFirstThree);
const processStepByStep = pipe(getFirstThree, toUpper, exclaim);

console.log('Compose Result:', processShout('hello world')); // "HEL!"
console.log('Pipe Result:', processStepByStep('hello world')); // "HEL!"

/**
 * 🎯 INTERVIEW TIP:
 * Compose is like mathematical nesting f(g(x)).
 * Pipe is like a assembly line (First this, then that).
 */
