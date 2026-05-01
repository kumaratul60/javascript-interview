/**
 * Custom Array Method Polyfills
 * This file provides custom implementations for core Array methods.
 * Useful for understanding internal workings and for coding interviews.
 */

// ==========================================
// 1. Array.prototype.myForEach
// ==========================================
/**
 * Description: Executes a provided function once for each array element.
 */
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

console.log('--- myForEach ---');
[1, 2, 3].myForEach((val) => console.log(val * 10));
// Output: 10, 20, 30

// ==========================================
// 2. Array.prototype.myMap
// ==========================================
/**
 * Description: Creates a new array with the results of calling a provided 
 * function on every element in the calling array.
 */
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log('\n--- myMap ---');
const mapped = [1, 2, 3].myMap((val) => val * 2);
console.log(mapped); 
// Output: [2, 4, 6]

// ==========================================
// 3. Array.prototype.myFilter
// ==========================================
/**
 * Description: Creates a new array with all elements that pass the test 
 * implemented by the provided function.
 */
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log('\n--- myFilter ---');
const filtered = [1, 2, 3, 4, 5].myFilter((val) => val > 2);
console.log(filtered); 
// Output: [3, 4, 5]

// ==========================================
// 4. Array.prototype.myReduce
// ==========================================
/**
 * Description: Executes a reducer function on each element of the array, 
 * resulting in a single output value.
 */
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

console.log('\n--- myReduce ---');
const sum = [1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0);
console.log(sum); 
// Output: 10

// ==========================================
// 5. Array.prototype.mySome
// ==========================================
/**
 * Description: Tests whether at least one element in the array passes the 
 * test implemented by the provided function.
 */
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return true;
  }
  return false;
};

console.log('\n--- mySome ---');
console.log([1, 2, 3].mySome((val) => val > 2)); // Output: true
console.log([1, 2, 3].mySome((val) => val > 5)); // Output: false

// ==========================================
// 6. Array.prototype.myEvery
// ==========================================
/**
 * Description: Tests whether all elements in the array pass the test 
 * implemented by the provided function.
 */
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) return false;
  }
  return true;
};

console.log('\n--- myEvery ---');
console.log([1, 2, 3].myEvery((val) => val > 0)); // Output: true
console.log([1, 2, 3].myEvery((val) => val > 1)); // Output: false

// ==========================================
// 7. Array.prototype.myFind
// ==========================================
/**
 * Description: Returns the value of the first element in the provided array 
 * that satisfies the provided testing function.
 */
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return this[i];
  }
  return undefined;
};

console.log('\n--- myFind ---');
const found = [{ id: 1 }, { id: 2 }].myFind((item) => item.id === 2);
console.log(found); 
// Output: { id: 2 }
