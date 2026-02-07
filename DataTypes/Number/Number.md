# JavaScript `Number` and `BigInt`

## The Basics

### What are `Number` and `BigInt`?

In JavaScript, the `Number` type is a **primitive data type** representing floating-point numbers. It is a double-precision 64-bit binary format IEEE 754 value. This means it can represent both integers and decimals.

`BigInt` is a newer **primitive data type** introduced in ES2020. It represents whole numbers larger than 2<sup>53</sup> - 1 (the maximum safe integer for `Number`). It was created to handle arbitrary-precision integers, essential for cryptographic operations, large IDs, and financial calculations.

### Key Characteristics

#### `Number`
*   **Primitive Type**: `Number` values are primitive.
*   **Floating-Point**: All numbers are stored as floating-point. There's no separate integer type.
*   **Finite Range**: `Number` has a maximum safe integer (`Number.MAX_SAFE_INTEGER`, 2<sup>53</sup> - 1) and a minimum safe integer (`Number.MIN_SAFE_INTEGER`). Beyond this range, integer precision is lost.
*   **Special Values**: Includes `Infinity`, `-Infinity`, and `NaN` (Not-a-Number).
*   **Falsy Value**: `0` (and `-0`) is falsy. Other numbers are truthy.

#### `BigInt`
*   **Primitive Type**: `BigInt` values are primitive.
*   **Arbitrary Precision**: Can represent integers of arbitrary size.
*   **Syntax**: Denoted by appending `n` to an integer literal (e.g., `10n`, `9007199254740991n`).
*   **No Mixed Operations**: `BigInt` values cannot be directly mixed with `Number` values in arithmetic operations; you must explicitly convert them.
*   **No Decimals**: `BigInt` only represents whole numbers. Division (`/`) involving `BigInt`s will truncate any fractional part towards zero.
*   **Falsy Value**: `0n` is falsy. Other `BigInt`s are truthy.

### Syntax & Examples

#### `Number`
```js
// Integers
let integer = 10;
let negativeInteger = -5;

// Decimals (Floating-Point)
let float = 3.14;
let scientific = 1.23e-5; // 0.0000123

// Special Values
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log(0 / 0); // NaN (Not-a-Number)

// Safe Integer Range
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992 (precise)
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 (precision loss begins)
```

#### `BigInt`
```js
// Creating BigInts
const largeNumber = 9007199254740991n; // Add 'n' suffix
const anotherLargeNumber = BigInt("90071992547409912345"); // From string
const fromNumber = BigInt(123); // From Number primitive

console.log(largeNumber + 1n); // 9007199254740992n (no precision loss)

// Cannot mix Number and BigInt directly
// console.log(largeNumber + 1); // TypeError: Cannot mix BigInt and other types

// Explicit conversion required
console.log(largeNumber + BigInt(1)); // 9007199254740992n

// Division truncates
console.log(7n / 2n); // 3n (not 3.5n)

// Falsy value
console.log(Boolean(0n)); // false
console.log(Boolean(1n)); // true
```

---

## Primitive vs. Non-Primitive

Both `Number` and `BigInt` are **primitive** data types.

*   **Primitives (Undefined, Null, Boolean, Number, String, Symbol, BigInt)**: Stored directly in the call stack. When a primitive value is assigned to a variable, the variable directly holds that value. When assigned to another variable, a copy of the value is made.
*   **Non-Primitives (Objects)**: Stored in the heap, and variables hold references (pointers) to these objects in the heap.

```js
let num1 = 10;
let num2 = num1; // num2 gets a copy of 10
num1 = 20;
console.log(num2); // 10

let big1 = 100n;
let big2 = big1; // big2 gets a copy of 100n
big1 = 200n;
console.log(big2); // 100n
```

### Memory Allocation (Stack)

Both `Number` and `BigInt` values, being primitives, are typically stored directly on the **call stack**.

*   For `Number`, it's a fixed 64-bit space.
*   For `BigInt`, while it can represent arbitrary size, the underlying mechanism might involve dynamic allocation on the heap for very large numbers internally managed by the JavaScript engine. However, from a conceptual standpoint for primitives, the variable on the stack directly "contains" or points to the immutable value, distinguishing it from objects where the stack holds a reference to a heap-allocated mutable object. The immutable nature of BigInt values is key here.

---

## Use Cases & Real-time Applications

#### `Number`
1.  **General Arithmetic**: Most day-to-day calculations (counts, measurements, scores, prices).
    ```js
    let total = price * quantity;
    ```
2.  **Coordinates/Dimensions**: UI elements, canvas drawing.
    ```js
    const x = event.clientX;
    const width = element.offsetWidth;
    ```
3.  **Timestamps**: `Date.now()` returns milliseconds, fitting within `Number`'s range.
4.  **Loop Counters**:
    ```js
    for (let i = 0; i < 10; i++) { /* ... */ }
    ```

#### `BigInt`
1.  **Large Database IDs**: When database IDs exceed `Number.MAX_SAFE_INTEGER`.
2.  **Financial Calculations**: Where precision for very large integer sums is critical and floating-point inaccuracies are unacceptable.
3.  **Cryptography**: Operations often involve extremely large integers.
4.  **Scientific Computations**: Any domain requiring integers beyond JavaScript's standard `Number` limits.
    ```js
    const reallyBigNumber = 123456789012345678901234567890n;
    ```

---

## Pitfalls & Common Gotchas (Interview Advanced)

### `Number` Pitfalls

1.  **Floating-Point Inaccuracy (Decimal Issues)**:
    ```js
    console.log(0.1 + 0.2); // 0.30000000000000004
    console.log(0.1 + 0.2 === 0.3); // false
    ```
    **Fix**: Use integer arithmetic (multiply by 10/100, calculate, then divide back) or a dedicated financial library.

2.  **Loss of Integer Precision**:
    ```js
    console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
    console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 (Should be +1 + 2 = +3, but it's not)
    ```
    **Fix**: Use `BigInt` for numbers outside `Number.MAX_SAFE_INTEGER`.

3.  **`NaN` Behavior**: `NaN` is "toxic" - any arithmetic operation with `NaN` results in `NaN`.
    ```js
    console.log(NaN + 1); // NaN
    console.log(NaN === NaN); // false (NaN is the only value not equal to itself)
    ```
    **Check**: Use `Number.isNaN()` or `isNaN()` (global `isNaN()` has different behavior for non-numbers).

4.  **Number Object vs. Primitive**:
    `new Number()` creates a `Number` *object wrapper*, not a primitive number.
    ```js
    const primitiveNum = 10;
    const objectNum = new Number(10);

    console.log(typeof primitiveNum); // "number"
    console.log(typeof objectNum);    // "object"

    console.log(primitiveNum == objectNum);  // true (due to coercion)
    console.log(primitiveNum === objectNum); // false (different types)

    console.log(new Number(0) == false); // true
    if (new Number(0)) {
      console.log("Number object with value 0 is truthy!"); // This runs!
    }
    ```
    **Pitfall**: Avoid `new Number()` in most cases. It behaves like an object, which can lead to unexpected type coercion and comparison results, especially in conditional statements. Always prefer number literals (primitives).

5.  **Type Coercion & Unary `+` Operator (Trick)**:
    JavaScript's automatic type coercion can be tricky. However, the unary plus operator (`+`) is a concise and commonly used idiom (a "trick") to explicitly convert values to numbers.
    ```js
    console.log("10" - 5);   // 5 (string "10" is coerced to number 10)
    console.log("10" + 5);   // "105" (5 is coerced to string "5")

    console.log(Number("123")); // 123 (Explicit conversion)
    console.log(+"123");        // 123 (Unary plus operator - concise trick)
    console.log(+"");           // 0
    console.log(+" ");          // 0
    console.log(+"-5.5");       // -5.5
    console.log(+"abc");        // NaN
    ```
    **Implication**: Be aware of implicit coercion in arithmetic operations. Use `Number()` or the unary `+` operator for explicit and reliable conversion.

### `BigInt` Pitfalls

1.  **Type Mismatch Errors**:
    ```js
    10n + 1; // TypeError
    ```
    **Fix**: Explicitly convert: `10n + BigInt(1)` or `Number(10n) + 1` (with potential precision loss for large `BigInt`s).

2.  **No `Math` Object Support**: `Math` functions (e.g., `Math.floor`, `Math.pow`) do not work with `BigInt`.
    **Fix**: Custom implementations or specific `BigInt` libraries.

3.  **Division Truncation**:
    ```js
    console.log(5n / 2n); // 2n (not 2.5n)
    ```
    **Implication**: Be aware of this integer division behavior; it's not like `Number` division.

4.  **JSON Serialization**: `BigInt` values cannot be directly serialized to JSON.
    ```js
    const data = { id: 123n };
    // JSON.stringify(data); // TypeError: Do not know how to serialize a BigInt

    // Fix: Custom replacer function
    JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ); // '{"id":"123"}'
    ```
    Upon deserialization, you'd need to convert back from string to `BigInt` if desired.

---

## Summary Cheat Sheet

| Feature            | `Number`                                                       | `BigInt`                                                       |
| :----------------- | :------------------------------------------------------------- | :------------------------------------------------------------- |
| **Values**         | IEEE 754 double-precision float (integers & decimals).        | Arbitrary-precision integers (whole numbers only).             |
| **Type**           | Primitive.                                                     | Primitive.                                                     |
| **Falsy?**         | `0`, `-0`, `NaN` are falsy.                                    | `0n` is falsy.                                                 |
| **`typeof`**       | Returns `"number"`.                                            | Returns `"bigint"`.                                            |
| **Memory**         | Fixed 64-bit on stack.                                         | Conceptually on stack (for value), engine manages dynamic heap for large values. |
| **Suffix**         | None.                                                          | `n` suffix (e.g., `123n`).                                     |
| **Max Safe Value** | `Number.MAX_SAFE_INTEGER` (2<sup>53</sup> - 1).              | Unlimited.                                                     |
| **Mixed Ops**      | Allowed (with coercion).                                       | Not allowed with `Number`.                                     |
| **Math Obj**       | Fully supported.                                               | Not supported.                                                 |
| **JSON**           | Fully supported.                                               | Not directly supported (needs custom replacer).                |
| **Use Cases**      | Most everyday numbers, floats, standard arithmetic.            | Large IDs, financial, crypto, scientific integers.             |

---

### Final Decision: When to use?

*   **For most numerical operations (integers and floats)**: ✅ Use `Number`. It's efficient and standard.
*   **When precision for integers beyond `Number.MAX_SAFE_INTEGER` is critical**: ✅ Use `BigInt`.
*   **For calculations involving decimals where precision is paramount (e.g., money)**: ❌ Avoid direct `Number` arithmetic for critical parts. Consider `BigInt` (after scaling) or dedicated libraries.
*   **When dealing with `Math` object functions**: ✅ Use `Number`.
*   **When interacting with APIs that send very large integers as strings**: ✅ Consider parsing to `BigInt` if arithmetic is needed, otherwise keep as string to avoid `Number` precision loss.
*   **When an API expects a number that can be very large**: ✅ Use `BigInt` and convert to string for JSON serialization.
