# The Ultimate Regex Guide

Regular Expressions (shortened to Regex or RegExp) are powerful search patterns used to find, edit, and manipulate text. This guide is structured to take you from a absolute beginner to a regex professional.

---

## The Regex Logic Flow

Understanding how the regex engine "thinks" is the first step.

```text
[START]
   |
   V
[MATCH LITERALS?] ---> No ---> [CHECK METACHARACTERS]
   |                                 |
   | Yes                             V
   |                        [CHARACTER CLASSES? (\d, \w, [a-z])]
   V                                 |
[APPLY QUANTIFIERS?] <---------------/
   | (*, +, {3})
   V
[CHECK BOUNDARIES?] ( ^, $, \b )
   |
   V
[LOOKAROUNDS? (Optional)] (?=...)
   |
   V
[END MATCH]
```

---

## Module 1: The Basics

### 1.1 Literal Matching

Characters like `a`, `b`, `1`, `@` match themselves exactly.

- **Pattern:** `cat`
- **Input:** "The **cat** sat." -> Matches "cat".

### 1.2 Character Classes

Match types of characters.

- `.` : Any character except newline.
- `\d` : Any digit `[0-9]`.
- `\w` : Any word character (alphanumeric + underscore).
- `\s` : Any whitespace (space, tab, newline).
- `[aeiou]` : Any one character in the set.
- `[^0-9]` : Any character NOT in the set (Negation).

### 1.3 Quantifiers

- `*` : 0 or more.
- `+` : 1 or more.
- `?` : 0 or 1 (Optional).
- `{3}` : Exactly 3 times.
- `{2,5}` : Between 2 and 5 times.

---

## Module 2: Intermediate

### 2.1 Anchors

Anchors match positions, not characters.

- `^` : Start of string/line.
- `$` : End of string/line.
- `\b` : Word boundary (start or end of a word).

### 2.2 Greedy vs Lazy

- **Greedy (`+`, `*`)**: Matches as MUCH as possible.
- **Lazy (`+?`, `*?`)**: Matches as LITTLE as possible.
  - Input: `<div>hello</div>`
  - `<.+>` (Greedy) -> Matches `<div>hello</div>`
  - `<.+?>` (Lazy) -> Matches `<div>`

### 2.3 Grouping and OR

- `(abc)` : Capturing group.
- `(?:abc)` : Non-capturing group (saves performance).
- `a|b` : Match `a` OR `b`.

---

## Module 3: Advanced

### 3.1 Lookarounds

Check what follows or precedes without including it in the match.

- `(?=...)` : Positive Lookahead (Check ahead for match).
- `(?!...)` : Negative Lookahead (Check ahead for NO match).
- `(?<=...)`: Positive Lookbehind.
- `(?<!...)`: Negative Lookbehind.

### 3.2 Named Groups

Makes regex results much more readable.

- **Pattern:** `(?<year>\d{4})-(?<month>\d{2})`
- **Result:** `groups.year` will give you "2024".

---

## Module 4: Professional Features

### 4.1 Unicode and Flags

- `g` : Global (don't stop after first match).
- `i` : Case-insensitive.
- `m` : Multiline.
- `u` : Unicode (handles emojis and special characters).
- `y` : Sticky (matches only from the lastIndex).

### 4.2 Backreferences

Match the same text as previously matched by a group.

- **Pattern:** `<(\w+)>.*?</\1>`
- **Explanation:** `\1` matches exactly whatever string was captured in the first group (e.g., `div`).

---

## Essential Patterns Cheat Sheet

| Task             | Pattern                                                                | Description                                      |
| :--------------- | :--------------------------------------------------------------------- | :----------------------------------------------- |
| **Only Letters** | `^[a-zA-Z]+$`                                                          | Matches strings containing ONLY alphabets.       |
| **Only Numbers** | `^\d+$`                                                                | Matches strings containing ONLY digits.          |
| **Alphanumeric** | `^[a-zA-Z0-9]+$`                                                       | No spaces or special characters allowed.         |
| **Email**        | `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`                                     | Standard email format validation.                |
| **Phone (US)**   | `^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$`                                | Matches (123) 456-7890, 123-456-7890, etc.       |
| **Password**     | `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$`                                | Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number. |
| **URL**          | `https?://[\w\.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]*` | Web address validation.                          |

---

## Building and Testing Custom Validators

### 1. The .test() Method for Validation

The most common way to validate a string against a regex in JavaScript is using `RegExp.prototype.test()`. It returns `true` if there is a match, and `false` otherwise.

```javascript
const regex = /^[a-zA-Z]+$/;
const input = 'Hello';

if (regex.test(input)) {
  console.log('Validation Passed!');
} else {
  console.log('Validation Failed!');
}
```

**Why use .test()?**

- **Performance:** It is faster than `.match()` because it stops as soon as it finds a match and doesn't build a results array.
- **Simplicity:** Perfect for `if/else` logic where you only need a Yes/No answer.

### 2. Creating a Validator Function in JavaScript

To make your code reusable, you can wrap the logic in a factory function.

```javascript
/**
 * Generic Validator Factory
 * @param {RegExp} regex
 * @returns {Function}
 */
const createValidator = (regex) => (input) => regex.test(input);

// Usage Examples:
const isOnlyLetters = createValidator(/^[a-zA-Z]+$/);
const isValidEmail = createValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

console.log(isOnlyLetters('Hello')); // true
console.log(isOnlyLetters('Hello123')); // false
console.log(isValidEmail('test@example.com')); // true
```

### 2. How to Test and Debug Your Regex

Building a custom regex is an iterative process. Follow these steps:

1.  **Define Requirements:** Write down exactly what characters are allowed and what the minimum/maximum length is.
2.  **Use Online Tools:** Use [Regex101.com](https://regex101.com/).
    - Paste your test strings in the "Test String" area.
    - Write your pattern in the "Regular Expression" field.
    - Use the **"Explanation"** pane on the right to understand what each part of your regex is doing.
3.  **Test Edge Cases:** Always test with:
    - Empty strings.
    - Strings with only spaces.
    - Extreme lengths (very short or very long).
    - Special characters you want to forbid.
4.  **Check Performance:** If your regex takes thousands of steps for a simple string, it may be prone to "Catastrophic Backtracking". Simplify nested quantifiers like `(a+)+`.

---

## Pro Tips for Interviews

1. **Compiling:** In JS, use `const regex = /pattern/` for literal regex or `new RegExp('pattern')` for dynamic strings.
2. **Readability:** For complex regex, use named groups and comments to explain the logic.
3. **Validation Location:** Always validate on the server even if you validate on the client.
