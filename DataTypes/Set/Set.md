# JavaScript `Set`

## The Basics

### What is `Set`?

In JavaScript, a `Set` is a **non-primitive (reference) data type** introduced in ES6 (ECMAScript 2015). It is a collection of unique values. Unlike `Array`, `Set` does not allow duplicate values, and unlike `Map`, it stores only values, not key-value pairs.

### Key Characteristics

*   **Non-Primitive (Reference Type)**: `Set` instances are objects, and variables holding them store a reference to the `Set` object in the heap.
*   **Unique Values Only**: A `Set` automatically ensures that each value stored within it is unique. If you try to add a duplicate value, it will be ignored.
*   **Value Flexibility**: Values can be of *any* data type, including objects, functions, `NaN`, `null`, `undefined`.
*   **Insertion Order**: `Set` maintains the insertion order of its elements.
*   **`size` Property**: Provides a direct way to get the number of unique elements.
*   **Iterable**: `Set` instances are directly iterable, making them easy to use with `for...of` loops.
*   **Methods for Operations**: Offers specific methods like `add()`, `has()`, `delete()`, `clear()`.
*   **`typeof` Operator**: For `Set` objects, `typeof` returns `"object"`.
    ```js
    const mySet = new Set();
    console.log(typeof mySet); // "object"
    ```

### Syntax & Examples

```js
// 1. Creating a Set
const mySet = new Set();

// 2. Adding Values
mySet.add(1);
mySet.add('hello');
mySet.add(true);
const objValue = { id: 1 };
mySet.add(objValue);
mySet.add(1); // Duplicate value, will be ignored
mySet.add(NaN);
mySet.add(NaN); // NaN is treated as a single value in Set

console.log(mySet);
// Set(5) { 1, 'hello', true, { id: 1 }, NaN }

// Initialize with an iterable (e.g., an array)
const initialValues = new Set([1, 2, 3, 2, 1, 'a', 'b', 'a']);
console.log(initialValues); // Set(5) { 1, 2, 3, 'a', 'b' }
console.log(initialValues.size); // 5

// 3. Checking for Existence
console.log(mySet.has(1));    // true
console.log(mySet.has('world')); // false
console.log(mySet.has(objValue)); // true
const anotherObj = { id: 1 };
console.log(mySet.has(anotherObj)); // false (different object instance)

// 4. Deleting Elements
mySet.delete('hello');
console.log(mySet.size); // 4

// 5. Iterating a Set
for (const value of mySet) {
  console.log(value);
}
// 1
// true
// { id: 1 }
// NaN

console.log(mySet.keys());   // SetIterator { 1, true, { id: 1 }, NaN } (keys() is an alias for values())
console.log(mySet.values()); // SetIterator { 1, true, { id: 1 }, NaN }
console.log(mySet.entries());// SetIterator { [1, 1], [true, true], [{ id: 1 }, { id: 1 }], [NaN, NaN] } (for Map-like interface)

// 6. Clearing a Set
mySet.clear();
console.log(mySet.size); // 0
```

---

## Primitive vs. Non-Primitive

`Set` is a **non-primitive (reference) data type**.

*   **Primitives**: Value-based, immutable, stack-allocated, compared by value.
*   **Non-Primitives (Objects, Arrays, Functions, Set, etc.)**:
    *   **Reference-based**: Variables hold a *reference* (memory address/pointer) to the actual data.
    *   **Mutable**: The content of the `Set` (its unique values) can be changed.
    *   **Heap Allocation**: Stored in the heap memory.
    *   **Comparison**: Compared by reference (`===` checks if two variables point to the exact same `Set` object in memory).

```js
// Reference vs. Value Example
const set1 = new Set([1, 2]);
const set2 = set1; // set2 holds a *reference* to the same Set as set1

set1.add(3); // Modifying the set via set1
console.log(set2.has(3)); // true (set2 sees the change)

const set3 = new Set([1, 2]);
const set4 = new Set([1, 2]);
console.log(set3 === set4); // false (different Set objects in memory)
```

### Memory Allocation (Heap vs. Stack)

*   **Stack**: When a `Set` variable is declared (e.g., `mySet`), the variable itself is stored on the **call stack**. This variable holds the *memory address* (reference) of where the actual `Set` object data is located.
*   **Heap**: The actual `Set` object data, including its internal hash table (or similar structure) for storing unique values, is stored in the **heap memory**. The heap allows for dynamic resizing as elements are added or removed. The values themselves, if they are objects, will also be stored in the heap, with the Set holding references to them.

---

## Use Cases & Real-time Applications

`Set` is useful when you need to manage collections of unique items.

1.  **Removing Duplicate Elements from an Array**: This is a very common use case.
    ```js
    const numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
    const uniqueNumbers = [...new Set(numbersWithDuplicates)];
    console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

    const uniqueObjects = [...new Set(arrayOfObjects)]; // Only works if objects are strictly identical references
    ```
    **Use Case**: Data cleaning, ensuring distinct selections.

2.  **Tracking Visited Items/IDs**: Efficiently check if an item has already been processed.
    ```js
    const visitedPages = new Set();

    function visitPage(url) {
      if (!visitedPages.has(url)) {
        console.log(`Visiting new page: ${url}`);
        visitedPages.add(url);
      } else {
        console.log(`Page already visited: ${url}`);
      }
    }
    visitPage('/home');
    visitPage('/about');
    visitPage('/home');
    ```
    **Use Case**: Caching, preventing redundant operations, simple analytics.

3.  **Basic Set Operations (Intersection, Union, Difference)**:
    ```js
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([3, 4, 5, 6]);

    // Union: all elements in A or B
    const union = new Set([...setA, ...setB]); // Set(6) {1, 2, 3, 4, 5, 6}

    // Intersection: elements in both A and B
    const intersection = new Set([...setA].filter(x => setB.has(x))); // Set(2) {3, 4}

    // Difference (A - B): elements in A but not in B
    const difference = new Set([...setA].filter(x => !setB.has(x))); // Set(2) {1, 2}
    ```
    **Use Case**: Data comparison, managing distinct groups.

4.  **Tagging/Categorization**:
    ```js
    const productTags = new Set(['electronics', 'smartphone', '5G']);
    if (productTags.has('smartphone')) { /* ... */ }
    ```

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Object Equality

When adding objects to a `Set`, `Set` uses strict equality (`===`) to determine uniqueness. This means different object *instances* are considered unique, even if they have identical properties.
```js
const mySet = new Set();
const obj1 = { id: 1 };
const obj2 = { id: 1 }; // Different instance

mySet.add(obj1);
mySet.add(obj2); // obj2 is added because it's a new object reference

console.log(mySet.size); // 2
console.log(mySet.has({ id: 1 })); // false (another new instance)
```
**Pitfall**: If you expect objects with the same content to be treated as duplicates, `Set` will not do this automatically.
**Fix**: If you need "deep equality" for objects, you must convert objects to a unique string representation (e.g., `JSON.stringify()`) before adding them, or store a unique identifier for each object.

### 2. Immutability of Values

While the `Set` itself is mutable (you can add/remove elements), the *values* stored within it are not necessarily immutable. If you store an object in a `Set`, you can still modify that object.
```js
const mySet = new Set();
const user = { name: 'Alice' };
mySet.add(user);

user.name = 'Bob'; // The object within the Set is modified
console.log(mySet.values().next().value); // { name: 'Bob' }
```
**Implication**: Modifying a stored object can lead to unexpected side effects if other parts of your code also hold a reference to that object.

### 3. JSON Serialization

`Set` instances cannot be directly serialized to JSON using `JSON.stringify()`.
```js
const mySet = new Set([1, 'hello', true]);
// JSON.stringify(mySet); // {} or Error, depending on JS engine / context
```
**Fix**: Convert the `Set` to an array before stringifying.
```js
const serializableSet = Array.from(mySet); // [1, 'hello', true]
console.log(JSON.stringify(serializableSet)); // '[1,"hello",true]'
```
You would need to reverse this process (`new Set(array)`) upon deserialization.

### 4. Absence of Direct Index Access

Unlike arrays, `Set` does not provide direct index-based access to its elements (`mySet[0]` is undefined). To get a specific element by its position, you would need to convert the `Set` to an `Array` first.
**Fix**: Use `for...of` loops, `forEach`, or convert to an `Array` (`Array.from(mySet)` or `[...mySet]`) if you need index-based access.

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Collection of unique values with insertion order.              |
| **Type**           | Non-Primitive (Reference Type).                                |
| **Mutable**        | Yes. Elements can be added/removed.                            |
| **`typeof`**       | Returns `"object"`.                                            |
| **Memory**         | Variable on **Stack** holds **Heap** reference to Set object.  |
| **Value Types**    | Any data type (objects, primitives).                           |
| **Uniqueness**     | Enforced using strict equality (`===`).                        |
| **Insertion Order**| Preserved.                                                     |
| **`size` Property**| Direct access to count of entries.                             |
| **Iteration**      | `for...of`, `forEach`, `keys()`, `values()`, `entries()`.      |
| **Pitfall**        | Object equality (`===`), JSON serialization, no index access.  |

---

### Final Decision: When to use?

*   **When you need to store a collection of unique items**: ✅ ALWAYS.
*   **For efficiently checking if an item exists in a collection**: ✅ ALWAYS (`.has()` is O(1) on average).
*   **To easily remove duplicates from an array or other iterable**: ✅ ALWAYS.
*   **For performing set operations (union, intersection, difference)**: ✅ YES.
*   **For storing items where order of insertion is relevant, but duplicates are not allowed**: ✅ YES.
*   **When objects are used as values and you need to treat objects with identical properties as duplicates**: ❌ AVOID `Set` directly; requires custom serialization or unique IDs.
*   **For direct JSON serialization/deserialization without custom logic**: ❌ AVOID `Set` directly.
