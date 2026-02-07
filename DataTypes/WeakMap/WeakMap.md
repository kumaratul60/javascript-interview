# JavaScript `WeakMap`

## The Basics

### What is `WeakMap`?

In JavaScript, a `WeakMap` is a **non-primitive (reference) data type** introduced in ES6 (ECMAScript 2015). It is a collection of key-value pairs where the keys *must be objects* and are held "weakly." This means that if there are no other references to a key object besides the one in the `WeakMap`, that object can be garbage collected.

### Key Characteristics

*   **Non-Primitive (Reference Type)**: `WeakMap` instances are objects, and variables holding them store a reference to the `WeakMap` object in the heap.
*   **Keys Must Be Objects**: Primitives (strings, numbers, booleans, symbols, null, undefined) cannot be used as keys. Attempting to use a primitive as a key will throw a `TypeError`.
*   **Weakly Held Keys**: The "weakness" refers to its keys. If a key object is no longer referenced anywhere else in the program, it can be garbage collected, along with its corresponding value in the `WeakMap`. This prevents memory leaks.
*   **No Iteration**: `WeakMap`s are not iterable. You cannot get a list of their keys, values, or entries. This is because their contents can change unpredictably due to garbage collection.
*   **No `size` Property**: Due to the unpredictable nature of garbage collection, there's no way to reliably determine the number of entries, so `WeakMap` does not have a `size` property.
*   **Limited Methods**: Only `set()`, `get()`, `has()`, and `delete()` methods are available.
*   **`typeof` Operator**: For `WeakMap` objects, `typeof` returns `"object"`.
    ```js
    const wm = new WeakMap();
    console.log(typeof wm); // "object"
    ```

### Syntax & Examples

```js
// 1. Creating a WeakMap
const wm = new WeakMap();

// 2. Setting Key-Value Pairs
const obj1 = {};
const obj2 = function() {};
const obj3 = new Date();

wm.set(obj1, 'value for obj1');
wm.set(obj2, { description: 'a function' });
wm.set(obj3, 123);

console.log(wm); // WeakMap { <items unknown> } - contents are not enumerable

// 3. Getting Values
console.log(wm.get(obj1)); // 'value for obj1'
console.log(wm.get(obj2)); // { description: 'a function' }
console.log(wm.get({}));   // undefined (different object reference)

// 4. Checking for Existence
console.log(wm.has(obj1)); // true
console.log(wm.has({}));   // false

// 5. Deleting Elements
wm.delete(obj3);
console.log(wm.has(obj3)); // false

// What happens with garbage collection?
let externalRef = obj1;
// Now obj1 is referenced by 'externalRef' and 'wm'
// If we remove 'externalRef', 'obj1' is only referenced by 'wm'
externalRef = null;
// At some point in the future, 'obj1' might be garbage collected,
// and its entry in 'wm' will automatically be removed.
// We cannot explicitly check when this happens.
```

---

## Primitive vs. Non-Primitive

`WeakMap` is a **non-primitive (reference) data type**.

*   **Primitives**: Value-based, immutable, stack-allocated, compared by value.
*   **Non-Primitives (Objects, Arrays, Functions, Map, WeakMap, etc.)**:
    *   **Reference-based**: Variables hold a *reference* (memory address/pointer) to the actual data.
    *   **Mutable**: The content of the `WeakMap` (its key-value pairs) can be changed.
    *   **Heap Allocation**: Stored in the heap memory.
    *   **Comparison**: Keys are compared by reference (`===`).

### Memory Allocation (Heap vs. Stack)

*   **Stack**: When a `WeakMap` variable is declared (e.g., `wm`), the variable itself is stored on the **call stack**. This variable holds the *memory address* (reference) of where the actual `WeakMap` object data is located.
*   **Heap**: The actual `WeakMap` object data is stored in the **heap memory**. Its unique characteristic lies in how it manages references to its keys. Instead of strong references that prevent garbage collection, it uses weak references.

    When `wm.set(obj1, value)` is called, `wm` holds a weak reference to `obj1`. If all *other* strong references to `obj1` disappear, `obj1` becomes eligible for garbage collection. Once `obj1` is garbage collected, its corresponding entry in `wm` is automatically removed, preventing memory leaks that would occur with a regular `Map`.

---

## Use Cases & Real-time Applications

`WeakMap` is specifically designed for scenarios where you need to associate data with objects without preventing those objects from being garbage collected.

1.  **Storing Private Data for Objects**: Attaching metadata or private state to an object without making that data enumerable or preventing the object from being garbage collected.
    ```js
    const privateData = new WeakMap();

    class User {
      constructor(name) {
        this.name = name;
        privateData.set(this, {
          secretToken: Math.random().toString(36).substring(2),
          lastLogin: new Date()
        });
      }

      getSecretToken() {
        return privateData.get(this).secretToken;
      }
    }

    let user = new User('Alice');
    console.log(user.name); // Alice
    console.log(user.getSecretToken()); // Some random token

    // If 'user' object is no longer referenced anywhere else,
    // it will be garbage collected, and its entry in 'privateData' will also be removed.
    user = null; // Remove the last strong reference to the User object
    // At this point, the User object and its private data are eligible for GC.
    ```
    **Use Case**: Implementing "private" fields for classes before native private class fields were widely available, or associating state with DOM elements without creating circular references.

2.  **Caching Computed Results for Objects**: Caching results of expensive computations based on object inputs. If the input object is garbage collected, its cached result is also removed.
    ```js
    const cache = new WeakMap();

    function computeHeavyOperation(obj) {
      if (cache.has(obj)) {
        console.log('Cache hit!');
        return cache.get(obj);
      }
      console.log('Cache miss! Computing...');
      // Simulate heavy computation
      const result = obj.value * 2 + Math.random();
      cache.set(obj, result);
      return result;
    }

    const data1 = { value: 10 };
    console.log(computeHeavyOperation(data1)); // Cache miss!
    console.log(computeHeavyOperation(data1)); // Cache hit!

    let data2 = { value: 20 };
    console.log(computeHeavyOperation(data2)); // Cache miss!
    data2 = null; // data2 object now eligible for GC, cache entry will be removed too.
    ```
    **Use Case**: Memoization of functions where keys are objects, ensuring memory isn't leaked by holding onto unused cached data.

3.  **Event Listeners Management**: Associating event listeners with DOM elements so that when the element is removed from the DOM and garbage collected, its associated listeners are also cleaned up.
    ```js
    // This is a conceptual example, actual DOM event listeners are handled by the browser
    const elementListeners = new WeakMap();

    function attachListener(element, handler) {
      // Logic to attach handler
      elementListeners.set(element, handler);
    }

    // When 'element' is removed from DOM and GC'd, 'handler' is too.
    ```

---

## Pitfalls & Common Gotchas (Interview Advanced)

### 1. Keys Must Be Objects

This is the most fundamental restriction.
```js
const wm = new WeakMap();
wm.set('string', 'value');    // TypeError: Invalid value used as weak map key
wm.set(123, 'value');         // TypeError
wm.set(Symbol('id'), 'value');// TypeError (Symbols are primitives)
wm.set(null, 'value');        // TypeError
```
**Fix**: Ensure all keys are actual object references.

### 2. No Iteration, No `size`, No `clear()`

You cannot iterate over a `WeakMap`, nor can you check its `size` or `clear` it.
```js
const wm = new WeakMap();
const obj = {};
wm.set(obj, 'value');

// console.log(wm.size);   // undefined
// wm.forEach(...)       // TypeError
// for (const key of wm) {} // TypeError
// wm.clear();            // TypeError
```
**Pitfall**: If you need to iterate over your data or know its size, `WeakMap` is not the right choice.
**Implication**: `WeakMap` is designed for use cases where you know the key object and want to retrieve its associated value, without preventing the key from being garbage collected. It's not a general-purpose iterable collection.

### 3. Debugging Challenges

Due to its non-enumerable and garbage-collection-dependent nature, debugging `WeakMap` contents can be challenging. You can't `console.log` its entire content reliably.
**Fix**: Access individual entries via `get()` with their specific object keys. Debugging usually requires knowing the exact object you are looking for.

### 4. No JSON Serialization

Similar to `Map` and `Set`, `WeakMap` cannot be directly serialized to JSON. This is reinforced by its non-iterable nature.
**Fix**: If you need to persist data, you would need to manage the lifecycle of your key objects and their associated values outside of the `WeakMap` for serialization purposes. `WeakMap` is primarily for in-memory, transient associations.

### 5. Values Are Strongly Held

While keys are weakly held, the *values* in a `WeakMap` are strongly held. If a value is an object, and no other references exist *to that value*, it won't be garbage collected until its corresponding key is garbage collected.
```js
const wm = new WeakMap();
let key = {};
let value = { data: 'important' };
wm.set(key, value);

value = null; // The value object is NOT yet eligible for GC
              // because wm still holds a strong reference to it.

key = null;   // Now the key object is eligible for GC.
              // Once key is GC'd, wm's entry for key is removed,
              // and ONLY THEN does the original 'value' object become
              // eligible for GC (if no other strong references exist).
```
**Implication**: This behavior is usually what's expected for managing associated data, but it's important to understand the strong/weak reference distinction.

---

## Summary Cheat Sheet

| Feature            | Description                                                    |
| :----------------- | :------------------------------------------------------------- |
| **Concept**        | Collection of key-value pairs where keys are weakly held objects. |
| **Type**           | Non-Primitive (Reference Type).                                |
| **Keys**           | **Must be objects**. Primitives will throw `TypeError`.        |
| **Values**         | Can be any data type.                                          |
| **Weakly Held Keys**| Keys don't prevent garbage collection if no other strong references exist. |
| **Garbage Collection**| Automatic removal of entries when keys are GC'd.             |
| **No Iteration**   | Cannot be iterated (`for...of`, `forEach`).                    |
| **No `size`**      | Does not have a `.size` property.                              |
| **No `clear()`**   | Does not have a `.clear()` method.                             |
| **`typeof`**       | Returns `"object"`.                                            |
| **Memory**         | Variable on **Stack** holds **Heap** reference to WeakMap object. |
| **Methods**        | `set()`, `get()`, `has()`, `delete()`.                         |
| **Pitfall**        | Keys must be objects, non-iterable, no `size`/`clear`, debugging difficulty, values are strongly held. |

---

### Final Decision: When to use?

*   **To associate data with an object without preventing that object from being garbage collected**: ✅ ALWAYS.
*   **For storing "private" data or metadata directly on an object that should disappear when the object does**: ✅ YES.
*   **For caching computed results based on object inputs, where the cache entry should expire with the input object**: ✅ YES.
*   **For associating event handlers with DOM elements without risking memory leaks**: ✅ YES.
*   **When you need to iterate through keys or values, or get the size of the collection**: ❌ AVOID `WeakMap`. Use `Map` instead.
*   **When keys are primitives (strings, numbers, etc.)**: ❌ AVOID `WeakMap`. Use `Map` or plain objects.
*   **For JSON serialization**: ❌ AVOID `WeakMap` directly.
