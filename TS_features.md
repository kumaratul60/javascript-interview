# TypeScript Features Version-wise

## TypeScript 4.0 - Working Features

### 1. Variadic Tuple Types
Expands tuple types for better function inference.
```ts
function logCoordinates(...coords: [number, number, number?]) {
  console.log(coords);
}
logCoordinates(10, 20);
logCoordinates(10, 20, 30);
```

### 2. Labeled Tuple Elements
Adds labels to tuple elements for better readability.
```ts
type Point = [x: number, y: number];
let point: Point = [10, 20];
```

### 3. Class Property Inference from Constructors
Automatically infers properties declared in constructors.
```ts
class User {
  constructor(public name: string, private age: number) {}
}
```

---

## TypeScript 4.1 - Working Features

### 1. Template Literal Types
Allows creating types using template literals.
```ts
type Greeting = `Hello, ${string}!`;
let greet: Greeting = "Hello, World!";
```

### 2. Key Remapping in Mapped Types
```ts
type Point = { x: number; y: number };
type RemoveX<T> = { [K in keyof T as Exclude<K, 'x'>]: T[K] };
type NewPoint = RemoveX<Point>; // { y: number }
```

---

## TypeScript 4.2 - Working Features

### 1. Smarter Type Alias Preservation
Improves type aliasing in error messages and IDE hints.

### 2. `abstract` Constructors in `abstract` Classes
```ts
abstract class Shape {
  abstract getArea(): number;
}
abstract class Circle extends Shape {
  abstract radius: number;
}
```

---

## TypeScript 4.3 - Working Features

### 1. `override` Keyword
Ensures methods correctly override parent class methods.
```ts
class Base {
  greet() { console.log("Hello"); }
}
class Derived extends Base {
  override greet() { console.log("Hi"); }
}
```

---

## TypeScript 4.4 - Working Features

### 1. Control Flow Analysis of Aliased Conditions
```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function log(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

---

## TypeScript 4.5 - Working Features

### 1. `Awaited<T>` Utility Type
```ts
type Result = Awaited<Promise<string>>; // string
```

---

## TypeScript 4.6 - Working Features

### 1. More Precise `any` Type Inference

---

## TypeScript 4.7 - Working Features

### 1. ECMAScript Module Support in Node.js
```ts
import { readFile } from 'fs/promises';
```

---

## TypeScript 4.8 - Working Features

### 1. Improved Type Narrowing for `unknown`
```ts
function check(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

---

## TypeScript 4.9 - Working Features

### 1. `satisfies` Operator
```ts
const obj = { name: "Alice", age: 25 } satisfies { name: string; age: number };
```

---

## TypeScript 5.0+ - Latest Features

### 1. Decorators (Stable in TS 5.0)
```ts
function Log(target: any, key: string) {
  console.log(`${key} was accessed`);
}
class Example {
  @Log
  method() {}
}
```

### 2. `const` Type Parameters (TS 5.1)
```ts
function createTuple<const T extends unknown[]>(...args: T): T {
  return args;
}
const tuple = createTuple(1, 2, 3);
```

---

## TypeScript 5.2+ - Experimental Features (Not Yet Rolled Out)

### 1. Explicit Resource Management (`using`)
```ts
using resource = getResource();
```

### 2. Pipeline Operator (Proposal)
```ts
const result = 5 |> (x => x * x) |> (x => x + 1);
```

---

This document covers TypeScript features from version 4.0 onwards, including stable and experimental features. More features will be added as they get released!


https://docs.google.com/presentation/d/17kw77NlWn5Ah5moPYXRSv1KVPwRA0mQaIUGqwh__PkQ/edit?slide=id.g34994bb3763_3_12&pli=1#slide=id.g34994bb3763_3_12

