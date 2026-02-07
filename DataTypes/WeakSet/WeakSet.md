# JavaScript `WeakSet`

## The Basics

### What is `WeakSet`?

In JavaScript, a `WeakSet` is a **non-primitive (reference) data type** introduced in ES6 (ECMAScript 2015). It is a collection of unique *objects* (not values) that are held "weakly." This means that if there are no other references to an object besides the one in the `WeakSet`, that object can be garbage collected.

### Key Characteristics

*   **Non-Primitive (Reference Type)**: `WeakSet` instances are objects, and variables holding them store a reference to the `WeakSet` object in the heap.
*   **Values Must Be Objects**: Primitives (strings, numbers, booleans, symbols, null, undefined) cannot be stored in a `WeakSet`. Attempting to add a primitive will throw a `TypeError`.
*   **Weakly Held Values**: The "weakness" refers to its values. If an object value is no longer referenced anywhere else in the program, it can be garbage collected. This prevents memory leaks.
*   **No Iteration**: `WeakSet`s are not iterable. You cannot get a list of their contents. This is because their contents can change unpredictably due to garbage collection.
*   **No `size` Property**: Due to the unpredictable nature of garbage collection, there's no way to reliably determine the number of entries, so `WeakSet` does not have a `size` property.
*   **Limited Methods**: Only `add()`, `has()`, and `delete()` methods are available.
*   **`typeof` Operator**: For `WeakSet` objects, `typeof` returns `"object"`.
    ```js
    const ws = new WeakSet();
    console.log(typeof ws); // "object"
    ```

### Syntax & Examples

```js
// 1. Creating a WeakSet
const ws = new WeakSet();

// 2. Adding Values (must be objects)
const obj1 = {};
const obj2 = function() {};
const obj3 = new Date();

ws.add(obj1);
ws.add(obj2);
ws.add(obj3);

// Attempting to add primitives will throw an error
// ws.add('string'); // TypeError: Invalid value used in weak set
// ws.add(123);    // TypeError

console.log(ws); // WeakSet { <items unknown> } - contents are not enumerable

// 3. Checking for Existence
console.log(ws.has(obj1)); // true
console.log(ws.has(obj2)); // true
console.log(ws.has({}));   // false (different object reference)

// 4. Deleting Elements
ws.delete(obj3);
console.log(ws.has(obj3)); // false

// What happens with garbage collection?
let externalRef = obj1;
// Now obj1 is referenced by 'externalRef' and 'ws'
// If we remove 'externalRef', 'obj1' is only referenced by 'ws'
externalRef = null;
// At some point in the future, 'obj1' might be garbage collected,
// and its entry in 'ws' will automatically be removed.
// We cannot explicitly check when this happens.
```

---

## Primitive vs. Non-Primitive

`WeakSet` is a **non-primitive (reference) data type**.

*   **Primitives**: Value-based, immutable, stack-allocated, compared by value.
*   **Non-Primitives (Objects, Arrays, Functions, WeakSet, etc.)**:
    *   **Reference-based**: Variables hold a *reference* (memory address/pointer) to the actual data.
    *   **Mutable**: The content of the `WeakSet` (its unique object values) can be changed by adding or removing objects.
    *   **Heap Allocation**: Stored in the heap memory.
    *   **Comparison**: Values are compared by reference (`===`).

### Memory Allocation (Heap vs. Stack)

*   **Stack**: When a `WeakSet` variable is declared (e.g., `ws`), the variable itself is stored on the **call stack**. This variable holds the *memory address* (reference) of where the actual `WeakSet` object data is located.
*   **Heap**: The actual `WeakSet` object data is stored in the **heap memory**. Like `WeakMap`, its unique characteristic lies in how it manages references to its values. Instead of strong references that prevent garbage collection, it uses weak references.

    When `ws.add(obj1)` is called, `ws` holds a weak reference to `obj1`. If all *other* strong references to `obj1` disappear, `obj1` becomes eligible for garbage collection. Once `obj1` is garbage collected, its presence in `ws` is automatically removed, preventing memory leaks that would occur with a regular `Set`.

---

## Use Cases & Real-time Applications

`WeakSet` is primarily designed for scenarios where you need to track a group of objects without preventing those objects from being garbage collected.

1.  **Tracking Instances for a Class**: Keeping track of active instances of a class without preventing them from being garbage collected when no longer used.
    ```js
    const activeInstances = new WeakSet();

    class MyClass {
      constructor() {
        activeInstances.add(this);
        console.log('New instance created and tracked.');
      }
      destroy() {
        activeInstances.delete(this);
        console.log('Instance destroyed and untracked.');
      }
    }

    let instance1 = new MyClass(); // tracked
    let instance2 = new MyClass(); // tracked
    console.log(activeInstances.has(instance1)); // true

    instance1 = null; // instance1 is now eligible for GC, and will be removed from activeInstances
    // activeInstances.has(instance1) would be false eventually
    ```
    **Use Case**: Managing objects that have a finite lifecycle, ensuring that associated tracking data is cleaned up automatically.

2.  **Marking Objects**: Marking objects that have been processed, visited, or have special permissions, without creating memory leaks.
    ```js
    const processedObjects = new WeakSet();

    function processObject(obj) {
      if (processedObjects.has(obj)) {
        console.log('Object already processed.');
        return;
      }
      console.log('Processing new object...');
      processedObjects.add(obj);
      // Perform actual processing
    }

    let item1 = { id: 1 };
    processObject(item1); // Processing new object...
    processObject(item1); // Object already processed.

    item1 = null; // item1 is now eligible for GC, its mark in processedObjects will be removed.
    ```
    **Use Case**: Preventing infinite loops in recursive algorithms that visit object graphs, tracking authorized objects.

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Values Must Be Objects

This is the most fundamental restriction.
```js
const ws = new WeakSet();
ws.add('string');    // TypeError: Invalid value used in weak set
ws.add(123);         // TypeError
ws.add(Symbol('id'));// TypeError (Symbols are primitives)
ws.add(null);        // TypeError
```
**Fix**: Ensure all values added are actual object references.

### 2. No Iteration, No `size`, No `clear()`

You cannot iterate over a `WeakSet`, nor can you check its `size` or `clear` it.
```js
const ws = new WeakSet();
const obj = {};
ws.add(obj);

// console.log(ws.size);   // undefined
// ws.forEach(...)       // TypeError
// for (const val of ws) {} // TypeError
// ws.clear();            // TypeError
```
**Pitfall**: If you need to iterate over your data or know its size, `WeakSet` is not the right choice.
**Implication**: `WeakSet` is designed for scenarios where you only care if a specific object *is present* in the set, without preventing that object from being garbage collected.

### 3. Debugging Challenges

Similar to `WeakMap`, debugging `WeakSet` contents can be challenging due to its non-enumerable and garbage-collection-dependent nature.
**Fix**: Check for individual objects using `has()`.

### 4. No JSON Serialization

`WeakSet` cannot be directly serialized to JSON. This is reinforced by its non-iterable nature.
**Fix**: `WeakSet` is purely for in-memory, transient tracking of objects. If you need to persist a collection of objects, you would need to manage them with a `Set` (or an `Array`) and handle their serialization and deserialization explicitly.

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Collection of unique *objects* that are weakly held.           |
| **Type**           | Non-Primitive (Reference Type).                                |
| **Values**         | **Must be objects**. Primitives will throw `TypeError`.        |
| **Weakly Held Values**| Values don't prevent garbage collection if no other strong references exist. |
| **Garbage Collection**| Automatic removal of entries when values are GC'd.           |
| **No Iteration**   | Cannot be iterated (`for...of`, `forEach`).                    |
| **No `size`**      | Does not have a `.size` property.                              |
| **No `clear()`**   | Does not have a `.clear()` method.                             |
| **`typeof`**       | Returns `"object"`.                                            |
| **Memory**         | Variable on **Stack** holds **Heap** reference to WeakSet object. |
| **Methods**        | `add()`, `has()`, `delete()`.                                  |
| **Pitfall**        | Values must be objects, non-iterable, no `size`/`clear`, debugging difficulty. |

---

### Final Decision: When to use?

*   **To track a collection of objects without preventing those objects from being garbage collected**: ✅ ALWAYS.
*   **For marking objects (e.g., "already processed", "active instance") in a way that is memory-leak safe**: ✅ YES.
*   **When you only need to check for the presence of a specific object**: ✅ YES.
*   **When you need to iterate through elements, get the size, or store primitives**: ❌ AVOID `WeakSet`. Use `Set` instead.
*   **For JSON serialization**: ❌ AVOID `WeakSet` directly.
