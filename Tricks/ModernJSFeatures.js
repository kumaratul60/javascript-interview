/**
 * MODERN JAVASCRIPT FEATURES (ES2020+)
 * 
 * This file covers modern syntax and methods that make JavaScript more 
 * readable, concise, and robust.
 */

// ==========================================
// 1. OPTIONAL CHAINING (?.) (ES2020)
// ==========================================
/**
 * Safely access nested object properties without manually checking if each level exists.
 * Returns undefined if any part of the chain is nullish (null/undefined).
 */
const profile = {
    family: {
        father: { age: 54 },
        sister: { age: 16 }
    }
};

const fatherAge = profile.family.father.age; // 54
const brotherAge = profile?.family?.brother?.age; // undefined (Safe, no error!)

console.log(`Father's Age: ${fatherAge}`);
console.log(`Brother's Age: ${brotherAge}`);


// ==========================================
// 2. NUMERIC SEPARATORS (_) (ES2021)
// ==========================================
/**
 * Improve readability of large numbers by using underscores as visual separators.
 * This does not change the value of the number.
 */
const oldWay = 1000000;
const modernWay = 1_000_000; // Much easier to read!

console.log("Is 1_000_000 same as 1000000?", modernWay === oldWay);


// ==========================================
// 3. String.prototype.replaceAll() (ES2021)
// ==========================================
/**
 * replaceAll() replaces all occurrences of a substring or pattern.
 * Previously, you had to use global regex (/pattern/g) to achieve this.
 */
const greeting = "Hello World World";

// Old Way (Regex)
const regexResult = greeting.replace(/World/g, "Earth");

// Modern Way (Direct String)
const simpleResult = greeting.replaceAll("World", "Earth");

console.log("Regex Replace:", regexResult);
console.log("replaceAll Result:", simpleResult);


// ==========================================
// 4. NULLISH COALESCING (??) (ES2020)
// ==========================================
/**
 * Returns the right-hand side operand when the left-hand side is null or undefined.
 * Unlike ||, it doesn't trigger for 0, false, or "".
 */
const count = 0;
const defaultValue = count ?? 10; // Result: 0 (because count is not null/undefined)
const fallbackValue = count || 10; // Result: 10 (because count is falsy)

console.log(`?? Result: ${defaultValue}`);
console.log(`|| Result: ${fallbackValue}`);
