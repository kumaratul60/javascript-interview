# JavaScript Evaluation Order & Operator Associativity

---

## 1. Core Rule (Memorize This)
*   **Evaluation Order:** Usually **Left → Right** (The order in which expressions/operands are executed).
*   **Associativity:** Sometimes **Right → Left** (How operators of the same precedence are grouped).
*   **Short-circuiting:** Evaluation may stop early if the result is already determined.

> [!TIP]
> **Evaluation ≠ Associativity.** Even if an operator is right-associative, JavaScript still evaluates its operands from left to right before performing the operation.

---

## 2. Left → Right Evaluation (The Standard)

In almost all scenarios, JavaScript processes expressions from left to right.

| Category | Example | Behavior |
| :--- | :--- | :--- |
| **Function Arguments** | `fn(a(), b(), c())` | `a` runs, then `b`, then `c`. |
| **Array Literals** | `[a(), b(), c()]` | Elements are evaluated in order. |
| **Object Literals** | `{x: a(), y: b()}` | Property values are evaluated in order. |
| **Logical Operators** | `a && b \|\| c` | Evaluates left to right with **short-circuiting**. |
| **Comma Operator** | `(a(), b())` | Evaluates both, but returns the **last** value. |

---

## 3. Right → Left Associativity (The Exceptions)

These operators "group" from the right side, meaning the operation on the right happens first.

### 3.1 Assignment (`=`)
```js
let a, b, c;
a = b = c = 10;
// Parsed as: a = (b = (c = 10))
// Result: All are 10
```

### 3.2 Exponentiation (`**`)
```js
2 ** 3 ** 2;
// Parsed as: 2 ** (3 ** 2) -> 2 ** 9
// Result: 512
```

### 3.3 Unary Operators
Includes `typeof`, `!`, `++x`, and `--x`.
```js
typeof !value;
// Evaluates !value first, then typeof the result.
```

---

## 4. Special & Conditional Logic

### 4.1 Ternary Operator (`? :`)
The condition is evaluated first. **Only one** of the following branches will execute.
```js
condition ? runIfTrue() : runIfFalse();
```

### 4.2 Increment: Pre vs. Post
*   **`x++` (Post):** Returns the **current** value, then increments.
*   **`++x` (Pre):** Increments **first**, then returns the new value.

---

## 5. Interview "Gotcha" Questions

| Question | Code | Answer | Reason |
| :--- | :--- | :--- | :--- |
| **Q1: Assignment** | `a = b = c = 5;` | `a,b,c` are `5` | Assignment associates **Right → Left**. |
| **Q2: Exponents** | `2 ** 3 ** 2` | `512` | It is $2^{(3^2)}$, not $(2^3)^2$. |
| **Q3: Short-circuit** | `false && foo()` | `false` | `foo()` never runs (short-circuit). |
| **Q4: Comma** | `let x = (1, 2, 3);` | `3` | Comma operator returns the **last** item. |
| **Q5: Increment** | `let x=1; let y=x++;` | `x=2, y=1` | `y` gets the value **before** the increment. |
| **Q6: Arguments** | `fn(a(), b())` | `a → b` | Arguments always evaluate **Left → Right**. |

---

## 6. Summary Table (TL;DR)

| Operator Group | Direction | Logic |
| :--- | :--- | :--- |
| **Standard Operands** | **Left → Right** | Arguments, Arrays, Objects, Math. |
| **Logical (`&&`, `\|\|`)** | **Left → Right** | Stops early (Short-circuit). |
| **Assignment (`=`)** | **Right → Left** | Chains from the end to the start. |
| **Exponent (`**`)** | **Right → Left** | Calculated from the top power down. |
| **Unary (`!`, `typeof`)** | **Right → Left** | Applied to the immediate right operand. |

---

## 💡 Final Interview One-Liner
> "JavaScript evaluates operands from **left to right**, but specific operators like **assignment** and **exponentiation** group (associate) from **right to left**."
