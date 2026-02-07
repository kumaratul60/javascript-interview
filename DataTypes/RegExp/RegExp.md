# JavaScript `RegExp`

## The Basics

### What is `RegExp`?

In JavaScript, `RegExp` (short for Regular Expression) is a **non-primitive (reference) data type** that defines a search pattern. Regular expressions are used to perform powerful pattern-matching, search-and-replace, and validation operations on strings.

They are an extremely versatile tool for text processing and are commonly used in various programming languages, not just JavaScript.

### Key Characteristics

*   **Non-Primitive (Reference Type)**: `RegExp` instances are objects, and variables holding them store a reference to the `RegExp` object in the heap.
*   **Pattern Matching**: Defines a sequence of characters that forms a search pattern.
*   **Flags**: Can modify the search behavior (e.g., case-insensitive, global search).
*   **Methods**: Provides methods for testing for a match (`test()`) and executing a search (`exec()`). String methods (`match()`, `replace()`, `search()`, `split()`) also accept `RegExp` objects.
*   **Stateful (with `g` flag)**: A regular expression with the `g` (global) flag maintains a `lastIndex` property, which makes it stateful across multiple `exec()` calls. This is a common source of confusion.
*   **`typeof` Operator**: For `RegExp` objects, `typeof` returns `"object"`.
    ```js
    const regexLiteral = /abc/;
    const regexConstructor = new RegExp('def');
    console.log(typeof regexLiteral);     // "object"
    console.log(typeof regexConstructor); // "object"
    ```

### Syntax & Examples

There are two ways to create a `RegExp` object:

```js
// 1. Literal Notation (Preferred for fixed patterns)
//    - Pattern is compiled when the script loads.
//    - No need to escape backslashes within the pattern itself (e.g., '\d' for digit).
const patternLiteral = /abc/i; // 'i' flag for case-insensitive

// 2. Constructor Notation (Useful for dynamic patterns)
//    - Pattern is compiled at runtime.
//    - Backslashes must be escaped with another backslash (e.g., '\d' for digit).
const patternConstructor = new RegExp('abc', 'i');

// Using the RegExp
const text = "Is this an Abc example? Yes, Abc it is.";

// test() method: returns true/false
console.log(patternLiteral.test(text)); // true

// exec() method: returns an array with match details or null
// Without 'g' flag, it always finds the first match
let match = patternLiteral.exec(text);
console.log(match);
// [ 'Abc', index: 11, input: 'Is this an Abc example? Yes, Abc it is.', groups: undefined ]
console.log(match.index); // 11
console.log(match[0]);    // 'Abc'

// With 'g' flag, it finds successive matches
const globalPattern = /abc/gi;
let firstMatch = globalPattern.exec(text);
console.log(firstMatch); // ['Abc', ...]
console.log(globalPattern.lastIndex); // 14 (position after 'Abc')

let secondMatch = globalPattern.exec(text);
console.log(secondMatch); // ['Abc', ...]
console.log(globalPattern.lastIndex); // 32 (position after second 'Abc')

let noMatch = globalPattern.exec(text);
console.log(noMatch); // null
console.log(globalPattern.lastIndex); // 0 (resets after no match)

// String methods that use RegExp
console.log(text.match(/abc/gi)); // ['Abc', 'Abc']
console.log(text.replace(/abc/gi, 'XYZ')); // "Is this an XYZ example? Yes, XYZ it is."
console.log(text.search(/Abc/)); // 11
console.log("apple,banana,cherry".split(/,/)); // ["apple", "banana", "cherry"]
```

---

## Primitive vs. Non-Primitive

`RegExp` is a **non-primitive (reference) data type**.

*   **Primitives**: Value-based, immutable, stack-allocated, compared by value.
*   **Non-Primitives (Objects, Arrays, Functions, RegExp, etc.)**:
    *   **Reference-based**: Variables hold a *reference* (memory address/pointer) to the actual data.
    *   **Mutable**: While the pattern itself is generally fixed after creation, flags can be read/modified, and the `lastIndex` property (with `g` flag) is mutable.
    *   **Heap Allocation**: Stored in the heap memory.
    *   **Comparison**: Compared by reference (`===` checks if two variables point to the exact same `RegExp` object in memory).

```js
// Reference vs. Value Example
const re1 = /test/g;
const re2 = re1; // re2 holds a *reference* to the same RegExp object as re1

re1.lastIndex = 5; // Modifying re1
console.log(re2.lastIndex); // 5 (re2 sees the change)

const re3 = /pattern/;
const re4 = /pattern/;
console.log(re3 === re4); // false (different RegExp objects in memory, even if patterns are identical)
```

### Memory Allocation (Heap vs. Stack)

*   **Stack**: When a `RegExp` variable is declared (e.g., `patternLiteral`), the variable itself is stored on the **call stack**. This variable holds the *memory address* (reference) of where the actual `RegExp` object data is located.
*   **Heap**: The actual `RegExp` object data, which includes the compiled pattern, flags, and `lastIndex` property, is stored in the **heap memory**.

---

## Use Cases & Real-time Applications

Regular expressions are powerful tools for various text processing tasks.

1.  **Input Validation**: Checking if user input (e.g., email, phone number, password strength) matches a required format.
    ```js
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test('test@example.com')); // true
    console.log(emailRegex.test('invalid-email'));    // false
    ```
2.  **Search and Replace**: Finding and replacing specific text patterns in a string.
    ```js
    const text = "My phone number is 123-456-7890. Call me!";
    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    const censoredText = text.replace(phoneRegex, 'XXX-XXX-XXXX');
    console.log(censoredText); // "My phone number is XXX-XXX-XXXX. Call me!"
    ```
3.  **Parsing and Extracting Information**: Extracting specific data points from structured or semi-structured text (e.g., log files, URLs).
    ```js
    const url = "https://www.example.com/products/123?color=red";
    const productIdRegex = /\/products\/(\d+)/;
    const match = url.match(productIdRegex);
    console.log(match[1]); // "123"
    ```
4.  **Syntax Highlighting/Text Editors**: Identifying different parts of code or text.
5.  **Data Cleaning**: Removing unwanted characters or formatting data consistently.
    ```js
    const messyText = "  Hello   World!  ";
    const cleanedText = messyText.replace(/\s+/g, ' ').trim();
    console.log(cleanedText); // "Hello World!"
    ```

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Statefulness with the `g` (Global) Flag

This is arguably the most common and confusing pitfall. When a `RegExp` object has the `g` flag, its `lastIndex` property is updated after each successful `exec()` or `test()` call. If you reuse the same `RegExp` object, it will start searching from `lastIndex`.

```js
const re = /a/g;
console.log(re.test("abc")); // true (lastIndex is now 1)
console.log(re.test("abc")); // true (lastIndex is now 0 - wrapped around)
console.log(re.test("abc")); // true (lastIndex is now 1)

// To avoid this, either:
// 1. Reset lastIndex manually
re.lastIndex = 0;
console.log(re.test("abc")); // true
// 2. Create a new RegExp instance each time (for dynamic patterns)
// 3. Use string methods (like `match` or `replace`) which handle this internally (or return all matches at once)
```
**Implication**: For repeated `exec()` or `test()` calls on the *same* `RegExp` object, always remember to reset `lastIndex` or create a new `RegExp` instance if you want to search from the beginning.

### 2. Using `RegExp` Constructor for Fixed Patterns

`new RegExp('pattern')` requires escaping backslashes.
```js
// If you want to match a literal dot (.), you need to escape it
const pattern1 = /\./; // Literal notation: ok
const pattern2 = new RegExp('.'); // Constructor: '.' matches any character!
console.log(pattern1.test('foo.bar')); // true
console.log(pattern2.test('foobar')); // true (oops!)

const pattern3 = new RegExp('\.'); // Correct for constructor
console.log(pattern3.test('foo.bar')); // true
```
**Fix**: Use literal notation `/pattern/flags` for fixed, known patterns. Use the constructor `new RegExp(dynamicPattern, flags)` only when the pattern string needs to be built dynamically.

### 3. Catastrophic Backtracking (ReDoS Attacks)

Poorly constructed regular expressions, especially those with nested quantifiers (`+`, `*`) applied to optional groups, can lead to exponential time complexity for certain inputs. This is known as Catastrophic Backtracking and can be exploited for Denial of Service (DoS) attacks (ReDoS).
```js
// Example of a vulnerable regex (simplified):
// /(a+)+b/
// For input 'aaaaaaaaaaaaaaaaaaaaaaaaab', it might take a very long time.

// Another example: email validation with too many optional groups and repetitions
// /^([a-zA-Z0-9]+)*$/ // Highly vulnerable
```
**Fix**: Be very careful with `+` or `*` inside other `+` or `*` groups. Use possessive quantifiers (e.g., `a++b`) if available (JavaScript doesn't have them natively, but some engines optimize). Simplify regex, or use alternative string processing methods for complex parsing. Tools like `https://regex101.com/` often warn about this.

### 4. `matchAll()` for Iterating All Matches

The `String.prototype.match()` method with the global flag (`g`) returns an array of all matches. However, it only returns the full matches, not the capture groups for each match.
For iterating all matches *with capture groups*:
*   Pre-ES2020: Use a `while` loop with `RegExp.prototype.exec()`.
*   ES2020+: Use `String.prototype.matchAll()`.
```js
const text = "Name: John Doe, Age: 30. Name: Jane Smith, Age: 25.";
const nameAgeRegex = /Name: (\w+ \w+), Age: (\d+)/g;

// Using exec()
let currentMatch;
while ((currentMatch = nameAgeRegex.exec(text)) !== null) {
  console.log(`Found: ${currentMatch[0]}, Name: ${currentMatch[1]}, Age: ${currentMatch[2]}`);
}

// Using matchAll() (returns an iterator)
console.log("
Using matchAll:");
for (const match of text.matchAll(nameAgeRegex)) {
  console.log(`Found: ${match[0]}, Name: ${match[1]}, Age: ${match[2]}`);
}
```

### 5. Unicode and `u` Flag

Prior to ES6, JavaScript regular expressions did not handle Unicode code points that occupied more than 16 bits (surrogate pairs) correctly.
```js
console.log(/😊/.test("😊")); // true
console.log("😊".match(/./)); // ['😊']
console.log("😊".match(/./g)); // ['', ''] (oops, matched surrogate halves)
```
**Fix**: Use the `u` (unicode) flag for correct handling of Unicode code points.
```js
console.log("😊".match(/./gu)); // ['😊']
```

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Defines a search pattern for strings.                          |
| **Type**           | Non-Primitive (Reference Type).                                |
| **Mutable**        | Yes (e.g., `lastIndex` with `g` flag).                         |
| **`typeof`**       | Returns `"object"`.                                            |
| **Memory**         | Variable on **Stack** holds **Heap** reference to RegExp object. |
| **Comparison**     | By reference (`===`).                                          |
| **Creation**       | Literal (`/pattern/flags`), Constructor (`new RegExp('pattern', 'flags')`). |
| **Methods**        | `test()`, `exec()`. String methods: `match()`, `replace()`, `search()`, `split()`, `matchAll()`. |
| **Flags**          | `g` (global), `i` (case-insensitive), `m` (multiline), `u` (unicode), `s` (dotAll), `y` (sticky). |
| **Pitfall**        | `g` flag statefulness (`lastIndex`), constructor escaping, catastrophic backtracking (ReDoS), unicode handling, `match()` vs `matchAll()`. |

---

### Final Decision: When to use?

*   **For pattern matching and validation on strings (e.g., emails, phone numbers)**: ✅ ALWAYS.
*   **For complex search and replace operations**: ✅ ALWAYS.
*   **For parsing specific data from text**: ✅ ALWAYS.
*   **Using `RegExp` literals for fixed patterns**: ✅ Recommended for readability and performance.
*   **Using `RegExp` constructor for dynamic patterns**: ✅ Recommended when the pattern itself is built from variables.
*   **When reusing a `RegExp` object with the `g` flag**: ✅ Remember to reset `lastIndex` (`re.lastIndex = 0`) or create a new instance.
*   **For robust Unicode handling (especially emojis)**: ✅ Use the `u` flag.
*   **For extracting all matches with capture groups**: ✅ Use `matchAll()` (ES2020+) or a `while` loop with `exec()`.
