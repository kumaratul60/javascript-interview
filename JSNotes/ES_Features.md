# ECMAScript Features Year-wise

## ES2020 (ES11) - Working Features

### 1. Nullish Coalescing (`??`)
Returns the right-hand value only if the left-hand value is `null` or `undefined`.
```js
let x = null ?? "default";
console.log(x);
```

### 2. Optional Chaining (`?.`)
Avoids errors when accessing nested properties.
```js
let obj = { name: "JS" };
console.log(obj?.address?.city);
```

### 3. BigInt
Supports large integers beyond `Number.MAX_SAFE_INTEGER`.
```js
let big = 9007199254740991n + 1n;
console.log(big);
```

### 4. `Promise.allSettled()`
Returns results of all promises, whether they resolve or reject.
```js
Promise.allSettled([Promise.resolve("Success"), Promise.reject("Error")]).then(console.log);
```

## ES2021 (ES12) - Working Features

### 1. Logical Assignment Operators (`&&=`, `||=`, `??=`)
```js
let a = 5;
a &&= 10;
console.log(a);
```

### 2. `String.prototype.replaceAll()`
```js
console.log("foo foo".replaceAll("foo", "bar"));
```

### 3. `Promise.any()`
Returns the first resolved promise.
```js
Promise.any([Promise.reject("Error"), Promise.resolve("First Success")]).then(console.log);
```

### 4. Numeric Separators
```js
const billion = 1_000_000_000;
console.log(billion);
```

## ES2022 (ES13) - Working Features

### 1. Private Class Fields
```js
class MyClass {
  #privateVariable = "Hello private world";
  helloWorld() {
    console.info(this.#privateVariable);
  }
}
```

### 2. `Object.hasOwn()`
A safer replacement for `hasOwnProperty`.
```js
let obj = { a: 1 };
console.log(Object.hasOwn(obj, "a"));
```

### 3. `Error.cause`
Provides additional context for errors.
```js
try {
  throw new Error("Something went wrong", { cause: "DB error" });
} catch (err) {
  console.log(err.cause);
}
```

## ES2023 (ES14) - Working Features

### 1. `Array.prototype.findLast()` and `findLastIndex()`
```js
let arr = [1, 2, 3, 4, 5];
console.log(arr.findLast(x => x % 2 === 1));
console.log(arr.findLastIndex(x => x % 2 === 1));
```

### 2. `Array.prototype.toSorted()`
Creates a sorted copy instead of modifying the array.
```js
let nums = [3, 1, 4];
let sorted = nums.toSorted();
console.log(sorted, nums);
```

### 3. `Array.prototype.toSpliced()`
```js
let arr = [1, 2, 3];
console.log(arr.toSpliced(1, 1, 99));
```

### 4. Hashbang Grammar
Allows specifying an interpreter in standalone scripts.
```sh
#!/usr/bin/env node
console.log("Running via Node.js");
```

## ES2024 (ES15) - Working Features

### 1. `Set.prototype.toSorted()`, `toSpliced()`, `toReversed()`
```js
let set = new Set([3, 1, 2]);
console.log([...set].toSorted());
```

### 2. `Map.groupBy()` and `Array.groupBy()`
```js
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];
const grouped = Map.groupBy(inventory, ({ quantity }) => (quantity < 6 ? "restock" : "sufficient"));
console.log(grouped);
```

### 3. Symbols as WeakMap Keys
```js
const sym = Symbol();
const weakMap = new WeakMap();
weakMap.set(sym, "value");
console.log(weakMap.get(sym));
```

### 4. `Array.fromAsync()`
Creates an array from an async iterable.
```js
const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield "a"; yield "b";
    }
};
const arr = await Array.fromAsync(asyncIterable); // ["a", "b"]
```

## ES2025 (ES16) - Experimental Features (Not Yet Rolled Out)

### 1. Pipe Operator (`|>`) Proposal
```js
const square = (x) => x * x;
const increment = (x) => x + 1;
const double = (x) => x * 2;

// Without pipe operator
console.log(double(increment(square(5)))); // 52

// With pipe operator
console.log(5 |> square |> increment |> double); // 52
```

---

This document covers ES features from ES2020 to ES2025, with experimental features flagged separately. More features will be added as they get released!

