/**
 * @file ES6FeaturesExamples.js
 * @description Comprehensive guide to ES6 and modern (ES2020+) JavaScript features.
 * @level Beginner-Intermediate
 */

// --- 1. ARROW FUNCTIONS & SCOPE ---
// No 'this' binding, implicit return
const add = (a, b) => a + b;
const getObj = () => ({ status: 'success' }); // Paren wrapper needed for implicit object return
console.log('Arrow Add:', add(2, 3));

// --- 2. TEMPLATE LITERALS ---
const user = 'Gemini';
const greeting = `Hello ${user}!
This is a multi-line
string.`;
console.log(greeting);

// --- 3. DESTRUCTURING (Arrays & Objects) ---
const [first, second, ...rest] = [10, 20, 30, 40]; // Array + Spread
const { name: personName, age, country = 'Unknown' } = { name: 'John', age: 30 }; // Rename + Default
console.log(`Name: ${personName}, Age: ${age}, Country: ${country}`);

// --- 4. SPREAD & REST OPERATORS ---
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // Spread into new array
const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0); // Rest parameter
console.log('Sum All:', sumAll(1, 2, 3, 4, 5));

// --- 5. ENHANCED OBJECT LITERALS ---
const key = 'dynamicKey';
const value = 100;
const modernObj = {
  value, // Shorthand for value: value
  [key]: 'Value for dynamic key', // Dynamic keys
  greet() {
    console.log('Hi!');
  }, // Method shorthand
};

// --- 6. CLASSES ---
class Developer {
  constructor(name, lang) {
    this.name = name;
    this.lang = lang;
  }
  static describe() {
    return 'I build things.';
  }
}
const dev = new Developer('Atul', 'JS');
console.log(Developer.describe());

// --- 7. COLLECTIONS: MAP & SET ---
const uniqueSet = new Set([1, 1, 2, 3]); // [1, 2, 3]
const metadataMap = new Map();
metadataMap.set(dev, { lastLogin: '2024-04-11' }); // Objects as keys!

// --- 8. WEAKMAP & WEAKSET ---
// Key must be an object; allows for garbage collection (no memory leaks)
let privateData = new WeakMap();
let userObj = { id: 1 };
privateData.set(userObj, 'top-secret');
userObj = null; // 'top-secret' will be cleaned from memory automatically

// --- 9. GENERATORS & SYMBOLS ---
function* idGenerator() {
  let id = 1;
  while (true) yield `ID_${id++}`;
}
const gen = idGenerator();
console.log(gen.next().value); // ID_1

const privateKey = Symbol('id'); // Guaranteed unique
const record = { [privateKey]: 12345 };

// --- 10. MODERN "GOLDEN" FEATURES (ES2020+) ---

// A. Optional Chaining (?.)
const data = { profile: { name: 'Alice' } };
console.log('Nested Name:', data?.profile?.name); // Alice
console.log('Missing key:', data?.address?.city); // undefined (No crash!)

// B. Nullish Coalescing (??)
// Only acts on null or undefined, NOT on 0 or false (unlike ||)
const settings = { count: 0, title: '' };
const count = settings.count ?? 10; // 0
const fallback = settings.count || 10; // 10 (incorrectly triggers on 0)
console.log({ count, fallback });

// C. Logical Assignment (&&=, ||=, ??=)
let score = 0;
score ||= 10; // score becomes 10 because 0 is falsy
let userTitle = '';
userTitle ??= 'Guest'; // userTitle stays "" because it's not null/undefined
console.log({ score, userTitle });

// D. Promise.allSettled (ES2020)
// Waits for all, regardless of failure
Promise.allSettled([Promise.resolve('Success'), Promise.reject('Oops')]).then(console.log);
