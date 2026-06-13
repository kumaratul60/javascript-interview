/**
 * @fileoverview
 * Valid Parentheses
 * (LeetCode Easy: 20. Valid Parentheses)
 * 
 * Target: Given a string containing '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 */

/**
 * Strategy: Use a Stack
 * 1. Initialize an empty stack.
 * 2. Traverse the string char by char.
 * 3. If it's an opening bracket, push it to the stack.
 * 4. If it's a closing bracket, check if the top of the stack matches.
 *    - If match, pop and continue.
 *    - If no match (or stack empty), return false.
 * 5. After the loop, if stack is empty, return true.
 * 
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      // It's a closing bracket
      const top = stack.pop();
      if (top !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

/**
 * 📈 Complexity Analysis:
 * -----------------------
 * Time Complexity: O(N) - We traverse the string exactly once.
 * Space Complexity: O(N) - In the worst case (all opening brackets), 
 *                           the stack grows to N.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

console.log("()[]{} :", isValid("()[]{}")); // true
console.log("(] :", isValid("(]"));         // false
console.log("([)] :", isValid("([)]"));     // false
console.log("{[]} :", isValid("{[]}"));     // true
console.log("( :", isValid("("));           // false
console.log(") :", isValid(")"));           // false
