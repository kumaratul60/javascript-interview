# The Ultimate Number Theory Cheat Sheet (JavaScript Edition)

A comprehensive, beginner-to-advanced guide to various types of numbers, their definitions, and their implementations in JavaScript. This cheat sheet is perfect for students, competitive programmers, and math enthusiasts working with JavaScript.

## 1. Core JavaScript Numbers

*Covers the built-in ways JavaScript handles numbers.*

### 1.1 Integers and Floats
**Definition:** JavaScript's standard numeric type is IEEE-754 double-precision floating-point. Integers are whole numbers; floats have fractional parts.
**Examples:** `42`, `-7`, `3.14159`, `-0.001`
```js
console.log(42);       // integer
console.log(3.14159);  // float
```

### 1.2 Exponential Notation
**Definition:** Compact scientific notation for very large or small numbers.
**Examples:** `1e3` (1 * 10^3 = 1000), `5e-4` (5 * 10^-4 = 0.0005)
```js
console.log(1e3);   // 1000
console.log(5e-4);  // 0.0005
```

### 1.3 Hexadecimal, Octal, Binary
**Definition:** Alternative integer literals for base-16, base-8, and base-2.
**Examples:** `0xff` (255), `0o10` (8), `0b1010` (10)
```js
console.log(0xff);   // 255 (hex)
console.log(0o10);   // 8   (octal)
console.log(0b1010); // 10  (binary)
```

### 1.4 Special Values
**Definition:** Special numeric values defined by the IEEE-754 standard.
**Examples:** `Infinity`, `-Infinity`, `NaN` (Not-a-Number)
```js
console.log(1 / 0);      // Infinity
console.log(-1 / 0);     // -Infinity
console.log("a" * 2);    // NaN
```

### 1.5 BigInt
**Definition:** A numeric type for representing integers of arbitrary precision, useful for numbers larger than `Number.MAX_SAFE_INTEGER`.
**Examples:** `123456789012345678901234567890n`
```js
const hugeNumber = 9007199254740991n;
console.log(hugeNumber * 2n); // 18014398509481982n
```

### 1.6 Useful Constants
**Definition:** Built-in numeric constants for bounds and precision checks.
**Examples:** `Number.MAX_SAFE_INTEGER`, `Number.EPSILON`
```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(0.1 + 0.2);               // 0.30000000000000004 (classic precision issue)
console.log(0.1 + 0.2 === 0.3);       // false
```

---

## 2. Classical Number Sets & Properties

*Fundamental categories of numbers from classical mathematics.*

### 2.1 Natural Numbers (ℕ)
**Definition:** Positive integers starting from 1. (Note: some definitions include 0).
**Examples:** `1`, `2`, `3`, …
```js
function isNatural(n) { return Number.isInteger(n) && n > 0; }
```

### 2.2 Whole Numbers
**Definition:** Natural numbers including 0.
**Examples:** `0`, `1`, `2`, `3`, …
```js
function isWhole(n) { return Number.isInteger(n) && n >= 0; }
```

### 2.3 Integers (ℤ)
**Definition:** All whole numbers and their negative counterparts.
**Examples:** …, `-2`, `-1`, `0`, `1`, `2`, …
```js
function isInteger(n) { return Number.isInteger(n); }
```

### 2.4 Rational Numbers (ℚ)
**Definition:** Numbers expressible as a fraction p/q where p and q are integers and q ≠ 0.
**Examples:** `1/2`, `-3/4`, `5`
**Notes:** In JS, all finite numbers are technically rational due to their binary floating-point representation, but not all decimal rationals can be represented perfectly.

### 2.5 Irrational Numbers
**Definition:** Real numbers that cannot be expressed as a simple fraction (e.g., non-repeating, non-terminating decimals).
**Examples:** `π`, `√2`, `e`
```js
console.log(Math.PI);   // Example irrational constant
console.log(Math.SQRT2);
```

### 2.6 Even and Odd
**Definition:** Even numbers are divisible by 2; odd numbers are not.
**Examples:** Even: `-4`, `0`, `10`; Odd: `-3`, `1`, `7`
```js
function isEven(n) { return Number.isInteger(n) && n % 2 === 0; }
function isOdd(n)  { return Number.isInteger(n) && Math.abs(n % 2) === 1; }
```

### 2.7 Prime Numbers
**Definition:** Natural numbers greater than 1 with no positive divisors other than 1 and itself.
**Examples:** `2`, `3`, `5`, `7`, `11`, `13`
```js
function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
```
**Notes:** For very large numbers, use probabilistic tests like Miller-Rabin.

### 2.8 Composite Numbers
**Definition:** Natural numbers greater than 1 that are not prime.
**Examples:** `4`, `6`, `8`, `9`, `10`
```js
function isComposite(n) { return Number.isInteger(n) && n > 1 && !isPrime(n); }
```

### 2.9 GCD and LCM
**Definition:** Greatest Common Divisor and Least Common Multiple.
**Examples:** `gcd(12, 18)` is `6`; `lcm(12, 18)` is `36`.
```js
function gcd(a, b) { // Euclidean algorithm
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}
```

---

## 3. Special Digit-Related Numbers

*Numbers defined by properties of their own digits.*

### 3.1 Palindromic Numbers
**Definition:** Reads the same forwards and backwards.
**Examples:** `121`, `3553`, `9`
```js
function isPalindrome(n) {
  const s = String(n);
  return s === s.split('').reverse().join('');
}
```

### 3.2 Armstrong (Narcissistic) Numbers
**Definition:** An n-digit number that is the sum of its digits raised to the power of n.
**Examples:** `153` = 1³ + 5³ + 3³
```js
function isArmstrong(n) {
  const s = String(n);
  const power = s.length;
  return n === s.split('').reduce((sum, digit) => sum + Math.pow(Number(digit), power), 0);
}
```

### 3.3 Harshad (Niven) Numbers
**Definition:** Divisible by the sum of its digits.
**Examples:** `18` (sum=9, 18%9=0), `21` (sum=3, 21%3=0)
```js
function isHarshad(n) {
  if (n <= 0) return false;
  const digitSum = String(n).split('').reduce((sum, d) => sum + Number(d), 0);
  return n % digitSum === 0;
}
```

### 3.4 Happy Numbers
**Definition:** A number that eventually reaches 1 when replaced by the sum of the square of each digit.
**Examples:** `7` -> 49 -> 97 -> 130 -> 10 -> 1. So `7` is a happy number.
```js
function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = String(n).split('').reduce((sum, d) => sum + d * d, 0);
  }
  return n === 1;
}
```
**Notes:** Unhappy numbers enter the cycle `4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4`.

### 3.5 Smith Numbers
**Definition:** A composite number where the sum of its digits equals the sum of the digits of its prime factors.
**Examples:** `22` -> 2+2=4. Prime factors are 2, 11 -> 2 + (1+1) = 4.
```js
// Helper functions (isPrime defined earlier)
const digitSum = (x) => String(x).split('').reduce((s, d) => s + Number(d), 0);

function primeFactorDigitSum(n) {
  let totalSum = 0;
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    while (m % p === 0) {
      totalSum += digitSum(p);
      m /= p;
    }
  }
  if (m > 1) totalSum += digitSum(m);
  return totalSum;
}

function isSmith(n) {
  if (isPrime(n)) return false;
  return digitSum(n) === primeFactorDigitSum(n);
}
```

### 3.6 Kaprekar Numbers
**Definition:** When its square is split into two parts (where the right part has as many digits as the original number), the sum of these parts is the original number.
**Examples:** `45`² = 2025 -> 20 + 25 = 45.
```js
function isKaprekar(n) {
  if (n === 1) return true;
  const sq = String(n * n);
  const d = String(n).length;
  const right = Number(sq.slice(-d));
  const left = Number(sq.slice(0, -d)) || 0;
  return right > 0 && left + right === n;
}
```

### 3.7 Emirp Numbers
**Definition:** A prime number that results in a different prime number when its digits are reversed.
**Examples:** `13` (prime) -> `31` (prime), `17` (prime) -> `71` (prime).
```js
function isEmirp(n) {
  const reversedN = Number(String(n).split('').reverse().join(''));
  return n !== reversedN && isPrime(n) && isPrime(reversedN);
}
```

### 3.8 Automorphic Numbers
**Definition:** Numbers whose square ends with the same digits as the number itself.
**Examples:** `5`² = 25, `76`² = 5776
```js
function isAutomorphic(n) {
    return String(n * n).endsWith(String(n));
}
````

### 3.9 Disarium Numbers
**Definition:** Numbers equal to the sum of their digits raised to their respective positions. Examples: 89 = 8¹ + 9², 135 = 1¹ + 3² + 5³

```js
function isDisarium(n) {
  const digits = String(n).split('');
  return n === digits.reduce((sum, d, i) => sum + Math.pow(Number(d), i + 1), 0);
}
```

### 3.10 Neon Numbers
**Definition:** Numbers where the sum of digits of n² equals n. Examples: 9 (9² = 81, 8+1 = 9)
```js
function isNeon(n) {
  const square = n * n;
  const digitSum = String(square).split('').reduce((sum, d) => sum + Number(d), 0);
  return digitSum === n;
}
```

### 3.11 Armstrong Numbers
**Definition:** Numbers where the sum of digits raised to the power of the number of digits is equal to the number itself. Examples: 153 (1^3 + 5^3 + 3^3 = 153)
```js
function isArmstrong(n) {
  const digits = String(n).split('');
  return n === digits.reduce((sum, d) => sum + Math.pow(Number(d), digits.length), 0);
}
```

### 3.12 Happy Numbers
**Definition:** Numbers for which the sum of the squares of their digits eventually reaches 1. Examples: 19 (1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1)
```js
function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = String(n).split('').reduce((sum, d) => sum + Math.pow(Number(d), 2), 0);
  }
  return n === 1;
}
```

### 3.13 Lucky Numbers
**Definition:** Numbers whose digits sum to 7. Examples: 7, 77, 777
```js
function isLucky(n) {
  return String(n).split('').reduce((sum, d) => sum + Number(d), 0) === 7;
}
```

### 3.14 Happy Lucky Numbers
**Definition:** Numbers that are both happy and lucky. Examples: 19, 121
```js
function isHappyLucky(n) {
  return isHappy(n) && isLucky(n);
}
```

### 3.15 Krishnamurthy/Peterson (Strong) Numbers
**Definition:** Numbers equal to the sum of factorials of their digits. Examples: 145 = 1! + 4! + 5!

```js    
function isKrishnamurthy(n) {
  const digits = String(n).split('');
  return n === digits.reduce((sum, d) => sum + factorial(Number(d)), 0);
}
```  
### 3.16 Ugly Numbers
**Definition:** Numbers whose prime factors are only 2, 3, and 5. Examples: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12

```js
function isUgly(n) {
  if (n <= 0) return false;
  while (n % 2 === 0) n /= 2;
  while (n % 3 === 0) n /= 3;
  while (n % 5 === 0) n /= 5;
  return n === 1;
}
``` 

```js

function isUgly(n) {
  if (n <= 0) return false;
  for (const factor of [2, 3, 5]) {
    while (n % factor === 0) n /= factor;
  }
  return n === 1;
}
```

### 3.17 Mystery Numbers

**Definition:** Number = sum of a number and its reverse.
Example: 121 = 29 + 92.

```js
function isMystery(n){
  for(let i=1;i<=n/2;i++){
    let rev=Number([...String(i)].reverse().join(""));
    if(i+rev===n) return true;
  }
  return false;
}

```

### 3.17 Harshad Numbers
**Definition:** Numbers whose sum of digits is divisible by their digit count. Examples: 18 (1+8=9, 9%2=0), 36 (3+6=9, 9%3=0)

```js
function isHarshad(n) {
  const digits = String(n).split('');
  return n % digits.length === 0;
}
``` 


---

## 4. Advanced & Combinatorial Sequences

*Numbers related to divisors, combinations, and famous mathematical sequences.*

### 4.1 Divisor-Related Numbers

#### 4.1.1 Perfect, Abundant, and Deficient Numbers
**Definition:** Based on the sum of a number's *proper divisors* (divisors excluding the number itself).
- **Perfect:** Sum of proper divisors = `n`. (e.g., `6` -> 1+2+3=6)
- **Abundant:** Sum of proper divisors > `n`. (e.g., `12` -> 1+2+3+4+6=16)
- **Deficient:** Sum of proper divisors < `n`. (e.g., `10` -> 1+2+5=8)

```js
function sumProperDivisors(n) {
  if (n <= 1) return 0;
  let sum = 1;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i * i !== n) sum += n / i;
    }
  }
  return sum;
}
function isPerfect(n) { return n > 1 && sumProperDivisors(n) === n; }
function isAbundant(n) { return sumProperDivisors(n) > n; }
function isDeficient(n) { return sumProperDivisors(n) < n; }
```

```js
function isPerfect(n) {
  let sum=0; for(let i=1;i<n;i++) if(n%i===0) sum+=i;
  return sum===n;
}

```
**Notes:** Even perfect numbers are related to Mersenne primes by the formula `2^(p−1) * (2^p − 1)`.

#### 4.1.2 Amicable Numbers
**Definition:** A pair of numbers (a, b) where the sum of proper divisors of `a` is `b`, and the sum of proper divisors of `b` is `a`.
**Examples:** `(220, 284)`
```js
function findAmicablePair(n) {
  const sumA = sumProperDivisors(n);
  if (sumA !== n) {
    const sumB = sumProperDivisors(sumA);
    if (sumB === n) return [n, sumA];
  }
  return null;
}
```

```js

function isAmicable(a,b){
  const sumDiv = n => [...Array(n).keys()].slice(1).reduce((s,i)=>n%i===0?s+i:s,0);
  return sumDiv(a)===b && sumDiv(b)===a;
}

```

### 4.2 Famous Recurrence Sequences

#### 4.2.1 Fibonacci Numbers
**Definition:** Sequence where each number is the sum of the two preceding ones. Starts with `0` and `1`. `F(n) = F(n-1) + F(n-2)`.
**Examples:** `0, 1, 1, 2, 3, 5, 8, 13, ...`
```js
function fibonacci(n) { // Efficient iterative version
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}
```

#### 4.2.2 Lucas Numbers
**Definition:** Similar to Fibonacci, but starts with `2` and `1`. `L(n) = L(n-1) + L(n-2)`.
**Examples:** `2, 1, 3, 4, 7, 11, 18, ...`
```js
function lucas(n) {
  if (n === 0) return 2;
  if (n === 1) return 1;
  let a = 2, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

**Definition:** Sequence of integers `L(n) = L(n-1) + L(n-2)` where `L(0) = 2` and `L(1) = 1`.
**Examples:** `2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, ...`
```js
function lucas(n) {
    if (n === 0) return 2;
    if (n === 1) return 1;
    return lucas(n - 1) + lucas(n - 2);
}
```




#### 4.2.3 Pell Numbers
**Definition:** Sequence defined by `P(n) = 2*P(n-1) + P(n-2)`. Starts with `0` and `1`.
**Examples:** `0, 1, 2, 5, 12, 29, ...`
```js
function pell(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, 2 * b + a];
  return a;
}
```

#### 4.2.4 Tribonacci Numbers
**Definition:** Sequence where each number is the sum of the *three* preceding ones. Starts with `0, 1, 1`.
**Examples:** `0, 1, 1, 2, 4, 7, 13, ...`
```js
function tribonacci(n) {
    if (n < 2) return n;
    let a = 0, b = 1, c = 1;
    for (let i = 2; i < n; i++) [a, b, c] = [b, c, a + b + c];
    return c;
}
```

#### 4.2.5 Lucas–Lehmer Sequence
```js
function lucasLehmer(n) {
  let a = 2, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a - b;
}
```

### 4.3 Figurate Numbers (Polygonal Numbers)

#### 4.3.1 Triangular Numbers
**Definition:** Sum of the first `n` natural numbers. `T(n) = n(n+1)/2`.
**Examples:** `1, 3, 6, 10, 15, ...`
```js
const triangular = n => n * (n + 1) / 2;
```

#### 4.3.2 Square Numbers
**Definition:** `S(n) = n²`.
**Examples:** `1, 4, 9, 16, 25, ...`
```js
const square = n => n * n;
```

#### 4.3.3 Pentagonal Numbers
**Definition:** `P(n) = n(3n-1)/2`.
**Examples:** `1, 5, 12, 22, 35, ...`
```js
const pentagonal = n => n * (3 * n - 1) / 2;
```

#### 4.3.4 Hexagonal Numbers
**Definition:** `H(n) = n(2n-1)`.
**Examples:** `1, 6, 15, 28, 45, ...`
```js
const hexagonal = n => n * (2 * n - 1);
```

### 4.3.5 Pronic Numbers
**Definition:** Numbers of the form n(n+1), also called oblong numbers. Examples: 0, 2, 6, 12, 20, 30, 42, ...

```js
function isPronic(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (i + 1) === n) return true;
  }
  return false;
}
```

### 4.3.6 Rhombic Numbers   
**Definition:** Numbers of the form n(2n-1), also called rhombic numbers. Examples: 0, 3, 8, 15, 24, 35, 48, ...

```js
function isRhombic(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (2 * i - 1) === n) return true;
  }
  return false;
}
```

### 4.3.7 Heptagonal Numbers
**Definition:** Numbers of the form n(5n-3)/2, also called heptagonal numbers. Examples: 0, 5, 15, 28, 45, 65, 90, ...

```js
function isHeptagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (5 * i - 3) / 2 === n) return true;
  }
  return false;
}
```

### 4.3.8 Octagonal Numbers
**Definition:** Numbers of the form n(3n-2), also called octagonal numbers. Examples: 0, 3, 8, 15, 24, 35, 48, ...

```js
function isOctagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (3 * i - 2) === n) return true;
  }
  return false;
}
```

### 4.3.9 Nonagonal Numbers
**Definition:** Numbers of the form n(4n-3), also called nonagonal numbers. Examples: 0, 4, 12, 20, 32, 48, 68, ...

```js
function isNonagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (4 * i - 3) === n) return true;
  }
  return false;
}
```

### 4.3.10 Decagonal Numbers
**Definition:** Numbers of the form n(5n-4), also called decagonal numbers. Examples: 0, 5, 15, 28, 45, 65, 90, ...

```js
function isDecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (5 * i - 4) === n) return true;
  }
  return false;
}
```

### 4.3.11 Hexadecagonal Numbers
**Definition:** Numbers of the form n(6n-5), also called hexadecagonal numbers. Examples: 0, 6, 21, 36, 61, 91, 126, ...

```js
function isHexadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (6 * i - 5) === n) return true;
  }
  return false;
}
```

### 4.3.12 Heptadecagonal Numbers
**Definition:** Numbers of the form n(7n-6), also called heptadecagonal numbers. Examples: 0, 7, 28, 49, 77, 112, 154, ...

```js
function isHeptadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (7 * i - 6) === n) return true;
  }
  return false;
}
```

### 4.3.13 Octadecagonal Numbers
**Definition:** Numbers of the form n(8n-7), also called octadecagonal numbers. Examples: 0, 8, 36, 64, 112, 168, 252, ...

```js
function isOctadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (8 * i - 7) === n) return true;
  }
  return false;
}
```

### 4.3.14 Nonadecagonal Numbers
**Definition:** Numbers of the form n(9n-8), also called nonadecagonal numbers. Examples: 0, 9, 45, 81, 144, 216, 324, ...

```js
function isNonadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (9 * i - 8) === n) return true;
  }
  return false;
}
```

### 4.3.15 Decadecagonal Numbers
**Definition:** Numbers of the form n(10n-9), also called decadecagonal numbers. Examples: 0, 10, 55, 110, 220, 385, 630, ...

```js
function isDecadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (10 * i - 9) === n) return true;
  }
  return false;
}
```

### 4.3.16 Hexadecadecagonal Numbers
**Definition:** Numbers of the form n(11n-10), also called hexadecadecagonal numbers. Examples: 0, 11, 66, 132, 264, 462, 792, ...

```js
function isHexadecadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (11 * i - 10) === n) return true;
  }
  return false;
}
```

### 4.3.17 Heptadecadecagonal Numbers
**Definition:** Numbers of the form n(12n-11), also called heptadecadecagonal numbers. Examples: 0, 12, 78, 156, 312, 588, 1080, ...

```js
function isHeptadecadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (12 * i - 11) === n) return true;
  }
  return false;
}
```

### 4.3.18 Octadecadecagonal Numbers
**Definition:** Numbers of the form n(13n-12), also called octadecadecagonal numbers. Examples: 0, 13, 91, 182, 364, 696, 1332, ...

```js
function isOctadecadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (13 * i - 12) === n) return true;
  }
  return false;
}
```

### 4.3.19 Nonadecadecagonal Numbers
**Definition:** Numbers of the form n(14n-13), also called nonadecadecagonal numbers. Examples: 0, 14, 105, 210, 420, 792, 1512, ...

```js
function isNonadecadecagonal(n) {
  for (let i = 0; i <= n; i++) {
    if (i * (14 * i - 13) === n) return true;
  }
  return false;
}
```


### 4.4.9 Fermat Numbers
**Definition:** Numbers of the form F_n = 2^(2^n) + 1. Examples: F₀=3, F₁=5, F₂=17, F₃=257

```js
function fermat(n) {
  return 2 ** (2 ** n) + 1;
}
``` 

### 4.4.10 Sophie Germain Primes
**Definition:** Prime p where 2p+1 is also prime. Examples: 2, 3, 5, 11, 23, 29, 41, 53

```js
function isSophieGermain(n) {
  return isPrime(n) && isPrime(2 * n + 1);
}
```

### 4.4.11 Twin Primes
**Definition:** Pairs of primes that differ by 2. Examples: (3,5), (5,7), (11,13), (17,19), (29,31)

```js
function isTwinPrime(n) {
  return isPrime(n) && isPrime(n + 2);
}
```

### 4.4 Combinatorics and Advanced Theory

#### 4.4.1 Factorial
**Definition:** The product of all positive integers up to `n`. `n! = n * (n-1) * ... * 1`.
**Examples:** `5!` = 120, `0!` = 1
```js
function factorial(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
```
**Notes:** Grows extremely fast. Use `BigInt` for `n > 20`.

#### 4.4.2 Pascal's Triangle
**Definition:** A triangular array of binomial coefficients where each number is the sum of the two directly above it.
**Examples:** Row 0: `[1]`, Row 1: `[1, 1]`, Row 2: `[1, 2, 1]`
```js
function generatePascalsTriangle(rowCount) {
  if (rowCount === 0) return [];
  const triangle = [[1]];
  for (let i = 1; i < rowCount; i++) {
    const prevRow = triangle[i - 1];
    const newRow = [1];
    for (let j = 1; j < i; j++) {
      newRow.push(prevRow[j - 1] + prevRow[j]);
    }
    newRow.push(1);
    triangle.push(newRow);
  }
  return triangle;
}
```

#### 4.4.3 Catalan Numbers
**Definition:** Counts many combinatorial objects (e.g., valid parenthesis sequences, binary trees). `C(n) = (2n)! / ((n+1)! * n!)`.
**Examples:** `1, 1, 2, 5, 14, 42, ...`
```js
function catalan(n) { // Iterative formula, avoids large factorials
  let c = 1;
  for (let i = 0; i < n; i++) {
    c = c * 2 * (2 * i + 1) / (i + 2);
  }
  return c;
}
```

#### 4.4.4 Bell Numbers
**Definition:** The number of ways to partition a set of `n` elements.
**Examples:** `B(3)=5` because the set {1,2,3} has 5 partitions: `{{1,2,3}}`, `{{1,2},{3}}`, `{{1,3},{2}}`, `{{2,3},{1}}`, `{{1},{2},{3}}`.
```js
function bell(n) { // Using Bell's Triangle
  let bellRow = [1];
  for (let i = 0; i < n; i++) {
    let nextRow = [bellRow[i]];
    for (let j = 0; j < i + 1; j++) {
      nextRow.push(nextRow[j] + bellRow[j]);
    }
    bellRow = nextRow;
  }
  return bellRow[0];
}
```

#### 4.4.5 Euler’s Totient Function (phi, φ)
**Definition:** Counts the positive integers up to a given integer `n` that are relatively prime to `n`.
**Examples:** `φ(9) = 6` (1, 2, 4, 5, 7, 8 are relatively prime to 9).
```js
function eulerTotient(n) {
  let result = n;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      while (n % i === 0) n /= i;
      result -= result / i;
    }
  }
  if (n > 1) result -= result / n;
  return result;
}
```

#### 4.4.6 Carmichael Numbers
**Definition:** Composite numbers `n` which satisfy the congruence relation `b^(n-1) ≡ 1 (mod n)` for all integers `b` which are relatively prime to `n`. They are "Fermat pseudoprimes".
**Examples:** `561`, `1105`, `1729`
**Notes:** These numbers fool the Fermat primality test, which is why more robust tests like Miller-Rabin are needed. Implementation is complex and relies on Korselt's criterion.


### 4.4.7 Mersenne Numbers
**Definition:** Powers of 2 minus 1. `2^p - 1` where `p` is a prime.    
**Examples:** `2^3 - 1 = 7`, `2^5 - 1 = 31`, `2^13 - 1 = 8191`
**Notes:** Prime numbers are related to Mersenne primes by the formula `2^(p−1) * (2^p − 1)`.

```js
function isMersenne(n) {
  const p = Math.log2(n + 1);
  return p % 1 === 0 && isPrime(p);
}
```



  



