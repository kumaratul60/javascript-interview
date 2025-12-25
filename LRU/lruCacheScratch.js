// Interview-Specific Topics

// System Design Basics (High-level, code-focused)
class Cache {
  constructor(limit = 5) {
    this.limit = limit;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.limit) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

// Usage
const lruCache = new Cache();
lruCache.put('a', 1);
lruCache.put('b', 2);
console.log(lruCache.get('a')); // 1

// Behavioral Questions (Code examples)
// Problem: Implement a function to check if a string is a palindrome
function isPalindrome(str) {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true

// Problem: Find the first non-repeating character
function firstUniqChar(s) {
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}

console.log(firstUniqChar('leetcode')); // 0

// Big O Notation Notes
// O(1): Constant time - accessing array element
// O(n): Linear time - looping through array
// O(n^2): Quadratic time - nested loops
// O(log n): Logarithmic time - binary search