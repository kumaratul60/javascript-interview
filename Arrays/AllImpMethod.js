/**
 * Comprehensive Guide to Important JavaScript Array Methods
 * This file covers basic, intermediate, and advanced array methods with examples.
 *
 * NOTE ON MUTABILITY:
 * Using 'const' with an array means the variable reference cannot be reassigned,
 * but the content of the array is still mutable (you can push, pop, or modify elements).
 */

const techStocks = [
  { name: 'Apple', price: 321.85 },
  { name: 'Tesla', price: 2471.04 },
  { name: 'Disney', price: 118.77 },
  { name: 'Google', price: 1434.87 },
  { name: 'Netflix', price: 425.92 },
];

const companyNames = ['Apple', 'Tesla', 'Disney', 'Google', 'Netflix'];

// ==========================================
// 1. ITERATION METHODS
// ==========================================

/*
forEach(): Executes a provided function once for each array element.
Note: It returns 'undefined' and does not break unless an error is thrown.
*/
console.log('--- forEach ---');
techStocks.forEach((stock) => console.log(`Stock: ${stock.name}, Price: ${stock.price}`));

/*
map(): Creates a new array populated with the results of calling a provided function on every element.
*/
console.log('\n--- map ---');
const justNames = techStocks.map((stock) => stock.name);
console.log('Names only:', justNames);

/*
filter(): Creates a new array with all elements that pass the test implemented by the provided function.
*/
console.log('\n--- filter ---');
const affordableStocks = techStocks.filter((stock) => stock.price < 500);
console.log('Cheap Stocks (< 500):', affordableStocks);

/*
reduce(): Executes a reducer function on each element, resulting in a single output value.
Parameters: (accumulator, currentValue, currentIndex, array)
*/
console.log('\n--- reduce ---');
const portfolioValue = techStocks.reduce((total, stock) => total + stock.price, 0);
console.log('Total Portfolio Value:', portfolioValue.toFixed(2));

// Advanced Reduce Pattern: Grouping Objects
const groupedByPriceRange = techStocks.reduce((acc, stock) => {
  const category = stock.price > 500 ? 'expensive' : 'cheap';
  if (!acc[category]) acc[category] = [];
  acc[category].push(stock);
  return acc;
}, {});
console.log('Grouped by Price category:', groupedByPriceRange);

// Advanced Reduce Pattern: Frequency Counting
const fruitBasket = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitFrequency = fruitBasket.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log('Frequency count:', fruitFrequency);

/*
reduceRight(): Same as reduce() but works from right-to-left.
*/
console.log('\n--- reduceRight ---');
const reversedNamesString = companyNames.reduceRight((acc, name) => acc + ' ' + name);
console.log('Names reversed via reduceRight:', reversedNamesString);

/*
some(): Tests whether at least one element passes the test. Returns Boolean.
*/
console.log('\n--- some ---');
const containsExpensiveStock = techStocks.some((stock) => stock.price > 2000);
console.log('Any stock > 2000?', containsExpensiveStock);

/*
every(): Tests whether ALL elements pass the test. Returns Boolean.
*/
console.log('\n--- every ---');
const allStocksAbove100 = techStocks.every((stock) => stock.price > 100);
console.log('All stocks > 100?', allStocksAbove100);

/*
find(): Returns the value of the FIRST element that satisfies the testing function.
Returns undefined if not found.
*/
console.log('\n--- find ---');
const teslaStock = techStocks.find((stock) => stock.name === 'Tesla');
console.log('Found Tesla:', teslaStock);

/*
findIndex(): Returns the INDEX of the first element that satisfies the testing function.
Returns -1 if not found.
*/
console.log('\n--- findIndex ---');
const teslaIndexInList = techStocks.findIndex((stock) => stock.name === 'Tesla');
console.log('Index of Tesla:', teslaIndexInList);

/*
findLast() & findLastIndex() (ES2023):
Search from the end of the array.
*/
console.log('\n--- findLast & findLastIndex ---');
const lastAffordable = techStocks.findLast((stock) => stock.price < 500);
const lastAffordableIndex = techStocks.findLastIndex((stock) => stock.price < 500);
console.log(`Last cheap stock found: ${lastAffordable.name} at index ${lastAffordableIndex}`);

// ==========================================
// 2. SEARCHING & INDEXING
// ==========================================

/*
includes(): Determines whether an array includes a certain value. Returns Boolean.
*/
console.log('\n--- includes ---');
console.log('Includes Apple?', companyNames.includes('Apple'));
console.log('Includes Microsoft?', companyNames.includes('Microsoft'));

/*
indexOf(): Returns the first index of a given element, or -1.
*/
console.log('\n--- indexOf ---');
console.log('Index of Disney:', companyNames.indexOf('Disney'));

/*
lastIndexOf(): Returns the last index of a given element, or -1.
*/
console.log('\n--- lastIndexOf ---');
const duplicateEntries = ['Apple', 'Tesla', 'Apple'];
console.log('Last Index of Apple:', duplicateEntries.lastIndexOf('Apple'));

// ==========================================
// 3. MUTATING METHODS (Modifies the original array)
// ==========================================

console.log('\n--- Mutating Methods ---');
let fruitsToModify = ['Apple', 'Banana'];

/* push(): Adds one or more elements to the END and returns new length. */
fruitsToModify.push('Orange', 'Peach');

/* pop(): Removes the LAST element and returns it. */
let poppedFruit = fruitsToModify.pop();

/* unshift(): Adds to the BEGINNING and returns new length. */
fruitsToModify.unshift('Mango');

/* shift(): Removes the FIRST element and returns it. */
let shiftedFruit = fruitsToModify.shift();

/*
splice(): Adds/Removes elements at any position.
Syntax: arr.splice(fromIndex, itemsToDelete, item1ToAdd, item2ToAdd, ...);
Splice modifies the original array and returns the deleted elements.
*/
console.log('\n--- splice ---');
const originalNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// 1. Removing elements: At index 3, delete 2 elements
const removedNumbers = [...originalNumbers].splice(3, 2);
console.log('Deleted items from [0...8] at index 3 (2 items):', removedNumbers); // [3, 4]

// 2. Adding new elements: At index 2, delete 0, add 100, 101
let insertArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const addResult = insertArray.splice(2, 0, 100, 101);
console.log('Splice add result (deleted items):', addResult); // []
console.log('Array after insertion:', insertArray); // [0, 1, 100, 101, 2, 3, 4, 5, 6, 7, 8]

// 3. Modifying/Replacing an element
let replaceArray = [10, 20, 30, 40];
const replacedItems = replaceArray.splice(2, 1, 100); // Index 2 (value 30), delete 1, insert 100
console.log('Replaced (deleted) item:', replacedItems); // [30]
console.log('Array after replacement:', replaceArray); // [10, 20, 100, 40]

/* reverse(): Reverses an array in place. */
fruitsToModify.reverse();

/*
sort(): Sorts elements in place.
Default sort is lexicographical (string-based) which can lead to unexpected results with numbers.
Example: [1, 10, 2] sorted lexicographically becomes [1, 10, 2].
*/
console.log('\n--- sort ---');
const unsortedMonths = ['march', 'jan', 'Jun', 'Feb', 'Dec'];
unsortedMonths.sort();
console.log('Months sorted (lexicographical):', unsortedMonths); // [ 'Dec', 'Feb', 'Jun', 'jan', 'march' ]

const unsortedNumbers = [1, 1000, 4, 25, 56, 2, 85, 100000];
// Correct numeric sort:
unsortedNumbers.sort((a, b) => a - b);
console.log('Numbers sorted (numeric ascending):', unsortedNumbers);
/*
Comparison Logic:
If return > 0: sort b before a.
If return < 0: leave a and b unchanged.
If return = 0: leave a and b unchanged.
*/

/* fill(): Fills elements with a static value. */
const filledArray = [1, 2, 3, 4].fill(0, 1, 3); // Fill with 0 from index 1 to 3 (exclusive)
console.log('Fill example:', filledArray);

/* copyWithin(): Shallow copies part of an array to another location in the same array. */
const copiedWithinArray = [1, 2, 3, 4, 5].copyWithin(0, 3); // Copy elements from index 3 to the end, starting at index 0
console.log('copyWithin example:', copiedWithinArray);

// ==========================================
// 4. NON-MUTATING ACCESSORS (Returns new value/array)
// ==========================================

/*
slice(): Returns a shallow copy of a portion of an array.
Original array is NOT modified.
Syntax: arr.slice(startIndex, endIndex);
startIndex: inclusive.
endIndex: exclusive (optional).
*/
console.log('\n--- slice ---');
const baseArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const subset = baseArray.slice(2, 6); // Elements from index 2 to 5
console.log('Original array after slice:', baseArray); // Unchanged
console.log('Sliced subset (index 2 to 5):', subset); // [2, 3, 4, 5]

/* concat(): Merges arrays into a new one. */
const combinedCompanyList = companyNames.concat(['Microsoft', 'Amazon']);

/* join(): Joins all elements into a string with a separator. */
console.log('\n--- join ---');
console.log('Joined names:', companyNames.join(' | '));

/* toString(): Returns a comma-separated string of the array. */
console.log('toString:', companyNames.toString());

/*
at() (ES2022): Returns item at index. Supports negative (from end).
*/
console.log('\n--- at ---');
console.log('Last element using at(-1):', companyNames.at(-1));

/*
entries(), keys(), values(): Returns iterators for the array.
*/
console.log('\n--- Iterators (entries, keys, values) ---');
for (const [index, name] of companyNames.entries()) {
  console.log(`Index ${index}: ${name}`);
}

// ==========================================
// 5. FLATTENING
// ==========================================

/* flat(): Flattens nested arrays. */
console.log('\n--- flat ---');
const nestedList = [1, [2, [3, [4]]]];
console.log('Flat depth 1:', nestedList.flat());
console.log('Flat depth Infinity:', nestedList.flat(Infinity));

/* flatMap(): Maps then flattens (1 level). Useful for splitting strings into words. */
console.log('\n--- flatMap ---');
const phraseList = ['Hello world', 'Learning JS'];
const wordList = phraseList.flatMap((phrase) => phrase.split(' '));
console.log('Words from phrases:', wordList);

// ==========================================
// 6. STATIC METHODS (Called on Array class)
// ==========================================

console.log('\n--- Static Methods ---');
/* Array.isArray(): Checks if value is an array. */
console.log('Is techStocks an array?', Array.isArray(techStocks));

/* Array.from(): Creates array from iterable (string, Set, etc.) */
const charArray = Array.from('JS');
console.log("Array.from 'JS':", charArray);

/* Array.of(): Creates array from arguments. */
const valueList = Array.of(10, 20, 30);

// ==========================================
// 7. MODERN ES2023 NON-MUTATING ALTERNATIVES
// ==========================================

/*
toReversed(), toSorted(), toSpliced(), with()
These return a NEW array instead of mutating the original.
*/
console.log('\n--- ES2023 Non-mutating versions ---');
const sortedNamesCopy = companyNames.toSorted();
const reversedNamesCopy = companyNames.toReversed();
const splicedNamesCopy = companyNames.toSpliced(0, 1, 'Meta'); // Remove index 0 and add "Meta"

console.log('Original names:', companyNames);
console.log('toSorted copy:', sortedNamesCopy);
console.log('toReversed copy:', reversedNamesCopy);
console.log('toSpliced copy:', splicedNamesCopy);

const substitutedName = companyNames.with(1, 'Nvidia'); // Replaces index 1 with "Nvidia" in NEW array
console.log("Array 'with' index 1 changed:", substitutedName);

// ==========================================
// 8. METHOD CHAINING & PERFORMANCE
// ==========================================

console.log('\n--- Method Chaining ---');
// Get names of stocks cheaper than 1000, sorted by name
const filteredSortedNames = techStocks
  .filter((stock) => stock.price < 1000)
  .map((stock) => stock.name)
  .sort();
console.log('Chained result:', filteredSortedNames);

console.log('\n--- Performance: Single Pass vs Chaining ---');
/*
Performance Tip: Chaining creates intermediate arrays.
For massive datasets, use a single reduce() to perform multiple operations.
*/
const singlePassResult = techStocks.reduce((acc, stock) => {
  if (stock.price < 1000) {
    acc.push(stock.name.toUpperCase());
  }
  return acc;
}, []);
console.log('Single pass result:', singlePassResult);

// ==========================================
// 9. CLONING (SHALLOW VS DEEP)
// ==========================================

console.log('\n--- Cloning ---');
const originalData = [1, 2, { key: 'value' }];

// Shallow Copy (using Spread)
const shallowCopy = [...originalData];
shallowCopy[2].key = 'changed'; // MODIFIES the original because it copies the reference
console.log('Original after shallow mod:', originalData[2].key); // 'changed'

// Deep Copy (using structuredClone - ES2022+)
const modernDeepCopy = structuredClone(originalData);
modernDeepCopy[2].key = 'independant';
console.log('Original after deep mod:', originalData[2].key); // Still 'changed'
console.log('Deep copy value:', modernDeepCopy[2].key); // 'independant'

// ==========================================
// 10. SLICE VS SPLICE: WHICH ONE TO USE?
// ==========================================

/**
 * 💡 COMPARISON TABLE:
 *
 * Feature       | Array.slice()                     | Array.splice()
 * --------------|-----------------------------------|-----------------------------------
 * Purpose       | Extracts a portion of an array    | Adds/Removes/Replaces elements
 * Mutability    | NON-MUTATING (Returns new array)  | MUTATING (Modifies original array)
 * Return Value  | The extracted subset              | Array of deleted elements
 * Arguments     | (start, end)                      | (start, deleteCount, ...items)
 *
 * ✅ USE SLICE WHEN:
 * - You need a copy of a sub-section.
 * - You want to avoid side effects (functional programming).
 * - You are working with React state or other immutable patterns.
 *
 * ✅ USE SPLICE WHEN:
 * - You need to modify the original data source.
 * - You are adding/replacing items at a specific index.
 * - Performance is a concern (no new array allocation if modifying in place).
 */

console.log('\n--- slice vs splice Example ---');
let originalList = ['A', 'B', 'C', 'D'];

// Slice: safe extraction
let slicedPart = originalList.slice(1, 3);
console.log('Slice result:', slicedPart); // ['B', 'C']
console.log('Original after slice:', originalList); // ['A', 'B', 'C', 'D'] (Unchanged)

// Splice: dangerous modification
let splicedPart = originalList.splice(1, 2);
console.log('Splice result (deleted):', splicedPart); // ['B', 'C']
console.log('Original after splice:', originalList); // ['A', 'D'] (Changed!)

// ==========================================
// 11. COMMON PITFALLS & INTERVIEW GOTCHAS
// ==========================================

/**
 * ❌ PITFALL 1: sort() Default Behavior
 * The default sort is lexicographical (string-based).
 * [1, 2, 10].sort() becomes [1, 10, 2].
 * FIX: Always provide a comparator for numbers: .sort((a, b) => a - b)
 */

/**
 * ❌ PITFALL 2: forEach() Returns Undefined
 * You cannot chain methods after forEach.
 * FIX: Use .map() if you need to transform and chain.
 */

/**
 * ❌ PITFALL 3: Shallow Cloning with Nested Objects
 * Spread syntax [...] only clones the top level.
 * Nested objects still share references.
 * FIX: Use structuredClone() or a deep clone library for nested data.
 */

/**
 * ❌ PITFALL 4: map() on Empty Slots
 * map() skips empty slots (e.g., in `new Array(3)`).
 * FIX: Use Array.from({ length: 3 }) or .fill() before mapping.
 */

/**
 * ❌ PITFALL 5: length Property can Delete Data
 * Setting `arr.length = 0` clears the array.
 * Setting it smaller than current size truncates data permanently.
 */

/**
 * ❌ PITFALL 6: includes() vs some()
 * `includes` only checks for primitives.
 * `[ {id: 1} ].includes({id: 1})` is FALSE because references differ.
 * FIX: Use .some() or .find() for objects.
 */

/* Empty Array Comparison */
const emptyArr = [];
console.log('\n--- Falsy values check ---');
console.log('[] == false:', emptyArr == false); // true (type coercion)
console.log('[] === false:', emptyArr === false); // false (strict comparison)

/* Array Addition (String Coercion) */
console.log('\n--- Array Addition behavior ---');
console.log('[1, 2] + [3, 4] =', [1, 2] + [3, 4]); // "1,23,4" (converted to strings)
