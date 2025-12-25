// ES6+ Features

// Arrow Functions
const add = (a, b) => a + b;
console.log(add(2, 3));

// Template Literals
const name = 'World';
console.log(`Hello ${name}!`);

// Destructuring
const [first, second] = [1, 2];
const {name: personName, age} = {name: 'John', age: 30};

// Modules (assuming module environment)
// import { add } from './math.js';
// export const multiply = (a, b) => a * b;

// Generators
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generatorFunction();
console.log(generator.next().value); // 1

// Symbols
const symbol = Symbol('description');
const obj = {[symbol]: 'value'};
console.log(obj[symbol]);

// Sets and Maps
const set = new Set([1, 2, 3, 3]);
console.log(set.size); // 3

const map = new Map();
map.set('key', 'value');
console.log(map.get('key'));

// WeakMap and WeakSet
const weakMap = new WeakMap();
const objKey = {};
weakMap.set(objKey, 'value');