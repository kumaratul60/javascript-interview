# JavaScript `Map`

## The Basics

### What is `Map`?

In JavaScript, a `Map` is a **non-primitive (reference) data type** introduced in ES6 (ECMAScript 2015). It is a collection of key-value pairs where both keys and values can be of _any_ data type, including objects, functions, or primitives. Unlike plain JavaScript objects, `Map` maintains the insertion order of its elements and provides a direct `.size` property.

### Key Characteristics

- **Non-Primitive (Reference Type)**: `Map` instances are objects, and variables holding them store a reference to the `Map` object in the heap.
- **Key Flexibility**: Keys can be any data type (objects, primitives, `NaN`, `null`, `undefined`). Plain objects only allow string or Symbol keys.
- **Insertion Order**: `Map` iterates its elements in the order that they were inserted.
- **`size` Property**: Provides a direct way to get the number of key-value pairs. Plain objects require `Object.keys().length`.
- **Iterable**: `Map` instances are directly iterable, making them easy to use with `for...of` loops.
- **Methods for Operations**: Offers specific methods like `set()`, `get()`, `has()`, `delete()`, `clear()`.
- **`typeof` Operator**: For `Map` objects, `typeof` returns `"object"`.
  ```js
  const myMap = new Map();
  console.log(typeof myMap); // "object"
  ```

### Syntax & Examples

```js
// 1. Creating a Map
const myMap = new Map();

// 2. Setting Key-Value Pairs
myMap.set('name', 'Alice');
myMap.set(1, 'one');
myMap.set(true, 'boolean true');
const objKey = { id: 1 };
myMap.set(objKey, 'object value');
myMap.set(NaN, 'Not a Number'); // NaN is treated as a single key in Map

console.log(myMap);
// Map(5) {
//   'name' => 'Alice',
//   1 => 'one',
//   true => 'boolean true',
//   { id: 1 } => 'object value',
//   NaN => 'Not a Number'
// }

// Initialize with an iterable of [key, value] pairs (e.g., an array of arrays)
const initialData = new Map([
  ['fruit', 'apple'],
  ['color', 'red'],
  [Symbol('id'), 123],
]);
console.log(initialData.size); // 3

// 3. Getting Values
console.log(myMap.get('name')); // 'Alice'
console.log(myMap.get(1)); // 'one'
console.log(myMap.get(objKey)); // 'object value'
console.log(myMap.get(NaN)); // 'Not a Number' (Map correctly identifies NaN as a single key)
console.log(myMap.get('nonexistent')); // undefined

// 4. Checking for Existence
console.log(myMap.has('name')); // true
console.log(myMap.has('age')); // false

// 5. Deleting Elements
myMap.delete(true);
console.log(myMap.size); // 4

// 6. Iterating a Map
for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}
// name: Alice
// 1: one
// { id: 1 }: object value
// NaN: Not a Number

console.log(myMap.keys()); // MapIterator { 'name', 1, { id: 1 }, NaN }
console.log(myMap.values()); // MapIterator { 'Alice', 'one', 'object value', 'Not a Number' }
console.log(myMap.entries()); // MapIterator { [ 'name', 'Alice' ], ... }

// 7. Clearing a Map
myMap.clear();
console.log(myMap.size); // 0
```

---

## Primitive vs. Non-Primitive

`Map` is a **non-primitive (reference) data type**.

- **Primitives**: Value-based, immutable, stack-allocated, compared by value.
- **Non-Primitives (Objects, Arrays, Functions, Map, etc.)**:
  - **Reference-based**: Variables hold a _reference_ (memory address/pointer) to the actual data.
  - **Mutable**: The content of the `Map` (its key-value pairs) can be changed.
  - **Heap Allocation**: Stored in the heap memory.
  - **Comparison**: Compared by reference (`===` checks if two variables point to the exact same `Map` object in memory).

```js
// Reference vs. Value Example
const map1 = new Map([['a', 1]]);
const map2 = map1; // map2 holds a *reference* to the same Map as map1

map1.set('b', 2); // Modifying the map via map1
console.log(map2.get('b')); // 2 (map2 sees the change)

const map3 = new Map([['x', 10]]);
const map4 = new Map([['x', 10]]);
console.log(map3 === map4); // false (different Map objects in memory)
```

### Memory Allocation (Heap vs. Stack)

- **Stack**: When a `Map` variable is declared (e.g., `myMap`), the variable itself is stored on the **call stack**. This variable holds the _memory address_ (reference) of where the actual `Map` object data is located.
- **Heap**: The actual `Map` object data, including its internal hash table (or similar structure) for storing key-value pairs and managing insertion order, is stored in the **heap memory**. The heap allows for dynamic resizing as elements are added or removed. The keys and values themselves, if they are objects, will also be stored in the heap, with the Map holding references to them.

---

## Use Cases & Real-time Applications

`Map` is a powerful and flexible data structure for various scenarios.

1.  **Arbitrary Keys**: When you need to use objects, functions, or `NaN` as keys.

    ```js
    const userSettings = new Map();
    const user1 = { id: 1, name: 'John' };
    const user2 = { id: 2, name: 'Jane' };

    userSettings.set(user1, { theme: 'dark', notifications: true });
    userSettings.set(user2, { theme: 'light', notifications: false });

    console.log(userSettings.get(user1)); // { theme: 'dark', notifications: true }
    ```

    **Use Case**: Storing metadata associated with DOM elements or objects without modifying the objects themselves.

2.  **Maintaining Insertion Order**: When the order of key-value pairs is important for processing or display.

    ```js
    const userActions = new Map([
      ['login', new Date()],
      ['viewProduct', new Date()],
      ['addToCart', new Date()],
    ]);
    for (const [action, time] of userActions) {
      console.log(`User ${action} at ${time.toLocaleTimeString()}`);
    }
    ```

    **Use Case**: Implementing LRU (Least Recently Used) caches or ordered configuration lists.

3.  **Performance for Frequent Add/Delete Operations**: `Map` operations (`set`, `get`, `has`, `delete`) tend to be more performant than similar operations on plain objects, especially for large collections or when keys are dynamic.
    **Use Case**: Caching, managing temporary state where frequent updates are needed.

4.  **Implementing Translation Dictionaries**: Mapping language keys to translated strings.
    ```js
    const translations = new Map([
      ['en', 'Hello'],
      ['es', 'Hola'],
      ['fr', 'Bonjour'],
    ]);
    console.log(translations.get('en')); // Hello
    ```

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Distinguishing from Plain Objects

A key interview topic is when to choose `Map` over `{}` (plain object).
**Use `Map` when:**

- Keys are not exclusively strings or Symbols (e.g., numbers, objects, `NaN`, `null`).
- Insertion order of keys is important.
- You need reliable `size` property and direct iteration.
- You frequently add/remove key-value pairs.
- You want to avoid prototype pollution or unexpected behavior from `Object.prototype`.

**Use Plain Objects (`{}`) when:**

- Keys are all strings or Symbols.
- You often convert to/from JSON.
- You need to define properties at creation using object literal syntax.
- You use objects as records with known properties (e.g., `user.name`, `product.price`).
- Performance for very small sets of string keys might be marginally better, or when integrating with older APIs expecting plain objects.

### 2. Object Keys and Reference Equality

When using objects as keys in a `Map`, the comparison is by reference (`===`).

```js
const key1 = { a: 1 };
const key2 = { a: 1 };
const myMap = new Map();

myMap.set(key1, 'value1');
console.log(myMap.get(key1)); // 'value1'
console.log(myMap.get(key2)); // undefined (key2 is a different object instance)
```

**Pitfall**: If you try to retrieve a value using a _different instance_ of an object that _looks identical_ to the key used for setting, `Map` won't find it.
**Fix**: Ensure you use the _exact same object reference_ for `get`, `has`, `delete` operations as you used for `set`.

### 3. Iteration and Performance

While `for...of` loops are efficient for iterating `Map`, converting a large `Map` to an `Array` (e.g., `Array.from(myMap)`) can incur performance overhead.
**Consider**: Iterating directly using `for...of`, `map.forEach()`, `map.keys()`, `map.values()`, or `map.entries()` is generally more efficient than converting to an array first if you just need to process the elements.

### 4. JSON Serialization

`Map` instances cannot be directly serialized to JSON using `JSON.stringify()`.

```js
const myMap = new Map([['a', 1]]);
// JSON.stringify(myMap); // {} or Error, depending on JS engine / context
```

**Fix**: Convert the `Map` to a JSON-serializable format (e.g., an array of key-value pairs or a plain object) before stringifying.

```js
const serializableMap = Array.from(myMap.entries()); // [['a', 1]]
console.log(JSON.stringify(serializableMap)); // '[["a",1]]'

// Or to a plain object (if keys are strings/numbers)
const mapToObject = Object.fromEntries(myMap); // { a: 1 }
console.log(JSON.stringify(mapToObject)); // '{"a":1}'
```

You would need to reverse this process (`new Map(array)`) upon deserialization.

---

## Summary Cheat Sheet

| Feature             | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| **Concept**         | Collection of key-value pairs with insertion order.                                        |
| **Type**            | Non-Primitive (Reference Type).                                                            |
| **Mutable**         | Yes. Key-value pairs can be added/removed.                                                 |
| **`typeof`**        | Returns `"object"`.                                                                        |
| **Memory**          | Variable on **Stack** holds **Heap** reference to Map object.                              |
| **Key Types**       | Any data type (objects, primitives).                                                       |
| **Insertion Order** | Preserved.                                                                                 |
| **`size` Property** | Direct access to count of entries.                                                         |
| **Iteration**       | `for...of`, `forEach`, `keys()`, `values()`, `entries()`.                                  |
| **Pitfall**         | Key comparison by reference, JSON serialization, choosing between `Map` and plain objects. |

---

### Final Decision: When to use?

- **When keys are non-string or non-Symbol primitives (e.g., numbers, `NaN`, `null`, `true`)**: ✅ YES.
- **When keys are objects and you need to associate data with specific object instances**: ✅ YES (remembering reference equality for keys).
- **When insertion order of elements must be guaranteed during iteration**: ✅ YES.
- **When frequently adding and deleting key-value pairs, especially in large collections**: ✅ YES (often better performance than objects).
- **When you need a `size` property without manual calculation**: ✅ YES.
- **For simple key-value data where keys are always strings/Symbols, and JSON serialization is frequent**: ❌ CONSIDER a plain `{}` object instead.
- **For direct JSON serialization/deserialization without custom logic**: ❌ AVOID `Map` directly.
