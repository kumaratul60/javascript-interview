/**
 * INTERVIEW PROBLEM: SWAPPING VALUES/ELEMENTS
 * 
 * Problem Statement: Given two values or elements in an array, swap them 
 * using different techniques, ranging from basic to advanced.
 */

// ==========================================
// 🟢 LEVEL 1: THE CLASSIC TEMPORARY VARIABLE
// ==========================================
/**
 * Focus: Fundamental logic, readability.
 * Pros: Works in all languages, very fast, easy to understand.
 */
function swapBasic(a, b) {
    console.log(`Before: a=${a}, b=${b}`);
    let temp = a;
    a = b;
    b = temp;
    console.log(`After:  a=${a}, b=${b}`);
}
swapBasic(5, 10);


// ==========================================
// 🟡 LEVEL 2: ES6 DESTRUCTURING (Modern JS)
// ==========================================
/**
 * Focus: Clean syntax, modern standards.
 * Pros: Concise, works with any data type (objects, strings, etc.).
 */
let x = "First", y = "Second";
[x, y] = [y, x];
console.log(`Level 2 (Destructuring): x=${x}, y=${y}`);


// ==========================================
// 🟠 LEVEL 3: ARITHMETIC SWAP (No extra space)
// ==========================================
/**
 * Focus: Math logic. 
 * Warning: Only works with numbers and can suffer from overflow in some languages 
 * (though JS handles large numbers as floats).
 */
function swapArithmetic(a, b) {
    a = a + b; // 5 + 10 = 15
    b = a - b; // 15 - 10 = 5
    a = a - b; // 15 - 5  = 10
    console.log(`Level 3 (Arithmetic): a=${a}, b=${b}`);
}
swapArithmetic(5, 10);


// ==========================================
// 🔵 LEVEL 4: BITWISE XOR SWAP
// ==========================================
/**
 * Focus: Low-level optimization (mostly theoretical in JS).
 * Pros: No extra memory, extremely fast in lower-level languages.
 * Note: Only works with Integers.
 */
function swapXOR(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    console.log(`Level 4 (XOR): a=${a}, b=${b}`);
}
swapXOR(12, 21);


// ==========================================
// 🟣 LEVEL 5: SWAPPING ARRAY ELEMENTS
// ==========================================
/**
 * Task: Swap elements at specific indices in an array.
 */
function swapInArray(arr, index1, index2) {
    // Check bounds
    if (index1 >= arr.length || index2 >= arr.length) return arr;
    
    // Using Destructuring for the swap
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    return arr;
}
let fruits = ["Apple", "Banana", "Cherry"];
console.log("Level 5 (Array Swap):", swapInArray(fruits, 0, 2));


// ==========================================
// 🔴 LEVEL 6: ROTATION (Advanced Swapping)
// ==========================================
/**
 * Task: Move the first element to the end (Circular swap).
 */
function rotateArray(arr) {
    if (arr.length <= 1) return arr;
    let first = arr.shift();
    arr.push(first);
    return arr;
}
console.log("Level 6 (Rotation):", rotateArray([1, 2, 3, 4]));


// ==========================================
// ⚫ LEVEL 7: PERFORMANCE & DISCUSSION
// ==========================================

/**
 * 🔹 INTERVIEWER FOLLOW-UPS:
 * 
 * 1. Which method is fastest?
 *    - The temporary variable (Level 1) is generally the fastest in most JS engines 
 *      because it doesn't involve creating an temporary array like destructuring does.
 * 
 * 2. Why avoid Arithmetic/XOR?
 *    - Readability is poor. 
 *    - Arithmetic can fail with non-numbers.
 *    - XOR only works with integers.
 * 
 * 3. Can you swap without changing the reference?
 *    - Yes, by mutating the indices of the array (Level 5) rather than reassigning the array itself.
 * 
 * 4. What about Deep Swapping?
 *    - If swapping objects, remember you are swapping references, not copying data.
 */

// Example of swapping object properties
let user1 = { name: "Alice" };
let user2 = { name: "Bob" };

function swapProperties(obj1, obj2, prop) {
    [obj1[prop], obj2[prop]] = [obj2[prop], obj1[prop]];
}
swapProperties(user1, user2, "name");
console.log("Level 7 (Prop Swap):", user1.name, user2.name);
