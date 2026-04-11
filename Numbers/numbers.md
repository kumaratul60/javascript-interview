# The Ultimate Number Theory & JavaScript Guide (0-100)

A comprehensive reference for every major category of numbers, from foundational programming types to advanced cryptographic sequences.

## Number:

`JS`: Number is the primitive type used to represent numeric values (both integers and floating-point).
`General`: A number is an abstract mathematical concept used for counting, measuring.

---

## Table of Contents

- [The Ultimate Number Theory \& JavaScript Guide (0-100)](#the-ultimate-number-theory--javascript-guide-0-100)
  - [Number:](#number)
  - [Table of Contents](#table-of-contents)
  - [Category 1: Foundational \& Programming Concepts](#category-1-foundational--programming-concepts)
    - [1.1 Integers and Floats](#11-integers-and-floats)
    - [1.2 Number Bases (Hex, Octal, Binary)](#12-number-bases-hex-octal-binary)
    - [1.3 Special Values \& BigInt](#13-special-values--bigint)
    - [1.4 Classic Sets (ℕ, ℤ, ℚ)](#14-classic-sets-ℕ-ℤ-ℚ)
  - [Category 2: Core Number Theory \& Primes](#category-2-core-number-theory--primes)
    - [2.1 Prime \& Composite Numbers](#21-prime--composite-numbers)
    - [2.2 GCD and LCM](#22-gcd-and-lcm)
  - [Category 3: Digit-Based Properties](#category-3-digit-based-properties)
  - [Category 4: Divisor-Based Properties](#category-4-divisor-based-properties)
  - [Category 5: Sequence \& Recurrence Numbers](#category-5-sequence--recurrence-numbers)
  - [Category 6: Figurate \& Geometric Numbers](#category-6-figurate--geometric-numbers)
  - [Category 7: Advanced \& Cryptographic Concepts](#category-7-advanced--cryptographic-concepts)
    - [7.1 Combinatorics](#71-combinatorics)
    - [7.2 Security \& Primality](#72-security--primality)
  - [Tip for Interviews](#tip-for-interviews)

---

## Category 1: Foundational & Programming Concepts

### 1.1 Integers and Floats

- **Definition:** JS uses IEEE-754 double-precision. Integers are whole numbers; Floats have decimal parts.
- **Real-World Use Case:** Counting items (integers) vs. scientific measurements (floats).
- **⚠️ Pitfall:** `0.1 + 0.2 === 0.3` is **false** due to binary rounding. Use `Number.EPSILON` for comparisons.

### 1.2 Number Bases (Hex, Octal, Binary)

- **Binary (`0b`):** Fundamental logic and networking.
- **Octal (`0o`):** Unix file permissions.
- **Hex (`0x`):** Memory addresses and CSS colors.
  ```js
  console.log(0xff, 0b1010, 0o755); // 255, 10, 493
  ```

### 1.3 Special Values & BigInt

- **Infinity / NaN:** Represents overflows and invalid math.
- **BigInt:** For integers exceeding $2^{53}-1$. Essential for cryptography and 64-bit database IDs.
- **⚠️ Pitfall:** BigInts cannot be mixed with standard Numbers in math operations.

### 1.4 Classic Sets (ℕ, ℤ, ℚ)

- **Natural (ℕ):** $\{1, 2, 3...\}$.
- **Whole:** $\{0, 1, 2...\}$.
- **Integers (ℤ):** All positive/negative whole numbers.
- **Rational (ℚ):** Can be written as a fraction $p/q$.
- **Irrational:** Cannot be fractions (e.g., $\pi, \sqrt{2}, e$).

---

## Category 2: Core Number Theory & Primes

### 2.1 Prime & Composite Numbers

- **Prime:** Divisible only by 1 and itself ($2, 3, 5, 7...$).
- **Composite:** Natural numbers $>1$ that are not prime ($4, 6, 8...$).
- **Real-World Use Case:** RSA encryption security relies on the difficulty of prime factorization.
  ```js
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
  }
  ```

### 2.2 GCD and LCM

- **GCD:** Greatest Common Divisor (Simplifying fractions).
- **LCM:** Least Common Multiple (Scheduling recurring events).
  ```js
  function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
  }
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
  ```

---

## Category 3: Digit-Based Properties

_High-frequency coding interview challenges._

- **Palindromic:** Reads same forward/backward (`121`).
- **Armstrong (Narcissistic):** Sum of digits raised to the power of digit count equals number ($153 = 1^3+5^3+3^3$).
- **Harshad (Niven):** Divisible by the sum of its digits ($18 / (1+8)$).
- **Happy Numbers:** Sum of squares of digits eventually reaches 1.
- **Emirp:** A prime that becomes a _different_ prime when reversed ($13 \leftrightarrow 31$).
- **Krishnamurthy (Strong/Peterson):** Sum of factorials of digits equals number ($145 = 1!+4!+5!$).
- **Disarium:** Sum of digits powered by their position ($89 = 8^1 + 9^2$).
- **Kaprekar:** Square split into two parts sums to original ($45^2 = 2025 \rightarrow 20+25=45$).
- **Mystery Number:** $n = k + \text{reverse}(k)$.
- **Automorphic / Neon / Lucky:** Numbers defined by squaring or sieving properties.

---

## Category 4: Divisor-Based Properties

- **Perfect:** Sum of proper divisors equals number ($6 = 1+2+3$).
- **Abundant:** Sum of proper divisors $>$ number ($12 < 1+2+3+4+6$).
- **Deficient:** Sum of proper divisors $<$ number.
- **Amicable:** A pair $(a, b)$ where divisor sum of $a = b$ and vice versa (e.g., 220, 284).
- **Ugly Numbers:** Only prime factors are 2, 3, or 5.
- **Smith Numbers:** Digit sum equals the sum of digits of its prime factors.

---

## Category 5: Sequence & Recurrence Numbers

- **Fibonacci:** $F(n) = F(n-1) + F(n-2)$. Found in nature and data structures.
- **Lucas:** Similar to Fibonacci but starts with 2 and 1 ($2, 1, 3, 4, 7...$).
- **Pell:** $P(n) = 2 \cdot P(n-1) + P(n-2)$.
- **Tribonacci:** Sum of the three preceding numbers ($0, 1, 1, 2, 4, 7...$).

---

## Category 6: Figurate & Geometric Numbers

- **Triangular:** $n(n+1)/2$. (The "Handshake Problem").
- **Square:** $n^2$. Fundamental for area and spatial grids.
- **Pronic (Oblong):** $n(n+1)$. Product of two consecutive integers ($0, 2, 6, 12...$).
- **Polygonal Series:** Pentagonal, Hexagonal, Heptagonal... up to Decadecagonal.
- **Tetrahedral:** 3D version of triangular numbers.

---

## Category 7: Advanced & Cryptographic Concepts

### 7.1 Combinatorics

- **Factorial ($n!$):** Number of ways to arrange items (Permutations).
- **Pascal's Triangle:** Binomial coefficients; used for coin-flip probabilities.
- **Catalan Numbers:** Counts binary search trees and valid parenthesis sets.
- **Bell Numbers:** Counts ways to partition a set into non-empty subsets.

### 7.2 Security & Primality

- **Euler’s Totient ($\phi$):** Counts numbers relatively prime to $n$. Core of **RSA**.
- **Mersenne Numbers:** $2^p - 1$. Used for testing massive primes (GIMPS).
- **Carmichael Numbers:** Composite numbers that trick Fermat's primality test.
- **Sophie Germain / Twin Primes:** Crucial for Diffie-Hellman and safe prime generation.
- **Rabin-Miller / Lucas-Lehmer:** Probabilistic and deterministic tests for computer-based primality verification.
- **Korselt's Criterion:** Mathematical rule to identify Carmichael numbers.

---

## Tip for Interviews

When solving number problems:

1. **Integer vs Float:** Use `Math.floor()` or `| 0` for integer math.
2. **Efficiency:** For divisor/prime tasks, only loop up to `Math.sqrt(n)`.
3. **BigInt:** Use for any problem involving factorials or large exponents to avoid precision loss.
