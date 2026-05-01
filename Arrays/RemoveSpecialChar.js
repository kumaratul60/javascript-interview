/**
 * INTERVIEW PROBLEM: REMOVE SPECIAL CHARACTERS
 *
 * Problem Statement: Given a string, remove all non-alphabetic characters
 * (special characters, numbers, spaces, etc.) and return the cleaned string.
 *
 * Input:  "$Gee*k;s..fo, r'Ge^eks?"
 * Output: "GeeksforGeeks"
 */

// ==========================================
// 🟢 LEVEL 1: BASIC FILTERING (Array Manipulation)
// ==========================================
/**
 * Focus: Loops, conditionals, array handling.
 * Approach: Split to array, iterate, and store valid chars at the front.
 */
function removeSpecialCharBasic(str) {
  let chars = str.split('');
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < chars.length; readIndex++) {
    const char = chars[readIndex];
    // Check if character is alphabetic
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      chars[writeIndex] = char;
      writeIndex++;
    }
  }
  // Join and trim to the length of valid characters
  return chars.join('').substring(0, writeIndex);
}

const input = "$Gee*k;s..fo, r'Ge^eks?";
console.log('Level 1 (Basic):', removeSpecialCharBasic(input));

// ==========================================
// 🟡 LEVEL 2: REGEX vs MANUAL
// ==========================================
/**
 * Focus: Readability vs Control.
 */
// Approach A: Regex (Declarative)
const removeWithRegex = (str) => str.replace(/[^a-zA-Z]/g, '');

// Approach B: String Concatenation (Memory efficient if input is small)
function removeWithLoop(str) {
  let result = '';
  for (let char of str) {
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      result += char;
    }
  }
  return result;
}
console.log('Level 2 (Regex):', removeWithRegex(input));
console.log('Level 2 (Loop): ', removeWithLoop(input));

// ==========================================
// 🟠 LEVEL 3: FLEXIBLE API (Configurable)
// ==========================================
/**
 * Focus: API Design. Allow digits if requested.
 */
function cleanString(str, options = { allowDigits: false }) {
  const regex = options.allowDigits ? /[^a-zA-Z0-9]/g : /[^a-zA-Z]/g;
  return str.replace(regex, '');
}
console.log('Level 3 (With Digits):', cleanString('G1eeks2!', { allowDigits: true }));

// ==========================================
// 🔵 LEVEL 4: TWO-POINTER OPTIMIZATION
// ==========================================
/**
 * Focus: Space efficiency. Minimizing allocations.
 */
function cleanInPlace(str) {
  // Note: Strings in JS are immutable, so we use an array to simulate in-place
  let arr = Array.from(str);
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (/[a-zA-Z]/.test(arr[i])) {
      arr[j++] = arr[i];
    }
  }
  return arr.slice(0, j).join('');
}

// ==========================================
// 🟣 LEVEL 5: UNICODE SUPPORT
// ==========================================
/**
 * Focus: Globalization. Handling non-ASCII letters (like 'é', 'ñ').
 */
function cleanUnicode(str) {
  // \p{L} matches any kind of letter from any language
  // 'u' flag is required for Unicode support
  return str.replace(/[^\p{L}]/gu, '');
}
console.log('Level 5 (Unicode):', cleanUnicode('Héllö, Wörld!'));

// ==========================================
// 🔴 LEVEL 6: STREAMING / LARGE INPUT
// ==========================================
/**
 * Discussion Point: What if the string is 10GB?
 * Concept: Process in chunks using a Transform Stream.
 */
/*
const { Transform } = require('stream');
const cleanerStream = new Transform({
    transform(chunk, encoding, callback) {
        const cleaned = chunk.toString().replace(/[^a-zA-Z]/g, '');
        this.push(cleaned);
        callback();
    }
});
*/

// ==========================================
// ⚫ LEVEL 7: STABLE PARTITION VARIANT
// ==========================================
/**
 * Task: Move valid chars to front, special chars to end, preserve order.
 * Input:  "a$bc#d"
 * Output: "abcd$#"
 */
function stablePartition(str) {
  let valid = '';
  let special = '';
  for (let char of str) {
    if (/[a-zA-Z]/.test(char)) {
      valid += char;
    } else {
      special += char;
    }
  }
  return valid + special;
}
console.log('Level 7 (Partition):', stablePartition('a$bc#d'));

// ==========================================
// ⚪ LEVEL 8-10: ARCHITECTURE & DESIGN
// ==========================================

/**
 * 🔹 EDGE CASES to mention:
 * 1. Empty string "" -> return ""
 * 2. Only special chars "$#@" -> return ""
 * 3. Already clean "Geeks" -> return same string
 * 4. Input is not a string (null/undefined) -> Handle gracefully
 *
 * 🔹 PERFORMANCE DEEP DIVE:
 * - Loop vs Regex: Regex is often faster for complex patterns but has overhead.
 * - String Immutability: In JS, `res += char` creates a new string every time.
 *   For massive strings, using an array and `join('')` is usually more performant.
 *
 * 🔹 SYSTEM DESIGN:
 * - Sanitize on Client: For UX/Immediate feedback.
 * - Sanitize on Server: For Security (XSS, Injection). NEVER trust client input.
 */

// 🔥 Final Library-style Utility
class StringSanitizer {
  static sanitize(str, rules = {}) {
    if (!str) return '';
    let pattern = rules.allowDigits ? /[a-zA-Z0-9]/ : /[a-zA-Z]/;
    if (rules.custom) {
      return str.split('').filter(rules.custom).join('');
    }
    return str
      .split('')
      .filter((c) => pattern.test(c))
      .join('');
  }
}
