# JavaScript Proxy

## TL;DR: What is Proxy?

Proxy is a JavaScript object that creates custom behavior for basic operations.
It intercepts property read/write, existence checks, function calls, and construction.
Think of it as middleware for objects/functions, allowing runtime behavior injection without changing the original.

## Mental Model

> Proxy = runtime behavior injection. Powerful and flexible, but expensive — use deliberately for cross-cutting logic.

## When to Use vs. When Not to Use

### When to Use

- Cross-cutting concerns: Logging, validation, analytics.
- Non-invasive control: Change behavior without modifying consumers.
- Derived state: Virtual properties (e.g., computed fields).
- Fallbacks: Safe defaults for missing properties.

### When NOT to Use

- Hot paths/High-frequency loops: ~10-20x slower than direct access.
- Simple cases: Use getters/setters or Object.freeze instead.
- Security: Client-side; backend must enforce.
- Identity checks: `proxy !== target` breaks equality-based logic.

### Dos and Don'ts

- **Do:** Always use Reflect for correct this binding and return values.
- **Do:** Cache proxies outside loops; keep traps lean.
- **Don't:** Perform heavy computations or I/O in traps.
- **Don't:** Use proxies for true security or in deeply nested objects without recursion (perf hit).

### Clear Differences: Reflect vs. target[prop]

- `Reflect.get(target, prop, receiver)`: Preserves correct `this` context, handles edge cases, always returns the value.
- `target[prop]`: May break `this` if the property is a getter, doesn't handle internal semantics properly. Use Reflect to avoid pitfalls.

**Examples:**

- **Correct with Reflect:**

  ```javascript
  const obj = {
    get value() {
      return this.multiplier * 2;
    },
    multiplier: 5,
  };
  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver); // Correctly uses proxy as 'this'
    },
  });
  console.log(proxy.value); // 10
  ```

- **Pitfall with target[prop]:**

  ```javascript
  const proxyBad = new Proxy(obj, {
    get(target, prop, receiver) {
      return target[prop]; // Breaks 'this'; uses obj, not proxy
    },
  });
  console.log(proxyBad.value); // 10 (works here, but may fail with inheritance)
  ```

- **Set trap example:**

  ```javascript
  // With Reflect.set (correct)
  const proxySet = new Proxy(
    {},
    {
      set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver); // Returns boolean
      },
    }
  );

  // With target[prop] = value (pitfall)
  const proxySetBad = new Proxy(
    {},
    {
      set(target, prop, value, receiver) {
        target[prop] = value; // Doesn't return; may cause TypeError in strict mode
      },
    }
  );
  ```

## Patterns with Examples and Pitfalls

### 1. Tracing & Debugging

**Use Case:** Track property access for debugging/analytics.

```javascript
const tracedUser = new Proxy(
  { name: 'testName', age: 13 },
  {
    get(target, prop, receiver) {
      console.log(`GET ${String(prop)}`);
      return Reflect.get(target, prop, receiver); // Correct: preserves this
    },
  }
);
```

**Pitfall:** `console.trace` is expensive; avoid in production.

### 2. Protecting Sensitive Properties (Read Guard)

**Use Case:** Prevent accidental exposure.

```javascript
const secureUser = new Proxy(
  { name: 'protect', password: '**' },
  {
    get(target, prop, receiver) {
      if (prop === 'password') throw new Error('Access denied');
      return Reflect.get(target, prop, receiver);
    },
  }
);
```

**Pitfall:** Not for backend security.

### 3. Sanitizing & Validating Writes

**Use Case:** Enforce integrity.

```javascript
// Prevent overwriting
const locationSafe = new Proxy(
  { location: 'IN' },
  {
    set(target, prop, value, receiver) {
      if (prop === 'location') throw new Error('Immutable');
      return Reflect.set(target, prop, value, receiver);
    },
  }
);

// Validate values
const ageSafe = new Proxy(
  {},
  {
    set(target, prop, value, receiver) {
      if (prop === 'age' && value < 0) throw new Error('Invalid age');
      return Reflect.set(target, prop, value, receiver);
    },
  }
);
```

**Pitfall:** Must return boolean in set; strict mode throws if false.

### 4. Auto Fallback for Missing Properties

**Use Case:** Safe reads.

```javascript
const withFallback = new Proxy(
  { name: 'trt' },
  {
    get(target, prop, receiver) {
      return prop in target ? Reflect.get(target, prop, receiver) : 'Not found';
    },
  }
);
```

**Pitfall:** Hides undefined errors; use sparingly.

### 5. Conditional Read-Only

**Use Case:** Lock specific fields.

```javascript
const user = new Proxy(
  { name: 'trt' },
  {
    set(target, prop, value, receiver) {
      if (prop === 'password') throw new Error('Read-only');
      return Reflect.set(target, prop, value, receiver);
    },
  }
);
```

**Pitfall:** Partial lock; nested objects unaffected.

### 6. Virtual/Derived Properties

**Use Case:** Computed fields.

```javascript
const product = new Proxy(
  { price: 100, discount: 0.2 },
  {
    get(target, prop, receiver) {
      if (prop === 'finalPrice') return target.price * (1 - target.discount);
      return Reflect.get(target, prop, receiver);
    },
  }
);
```

**Pitfall:** Avoid heavy logic; nested proxies degrade perf.

### 7. Reflect API

**Use Case:** Correct behavior.

```javascript
const proxy = new Proxy(target, {
  get: Reflect.get,
  set: Reflect.set,
});
```

**Difference:** Ensures proper returns and this; target[prop] may fail.

### 8. Validating Function Calls (apply Trap)

**Use Case:** Enforce contracts.

```javascript
const safeGreet = new Proxy((name) => `Hello, ${name}`, {
  apply(target, thisArg, args) {
    if (typeof args[0] !== 'string') throw new TypeError('Expected string');
    return Reflect.apply(target, thisArg, args);
  },
});
```

**Pitfall:** Only for functions; no effect on objects.

## Performance Tips

- Cache proxies; avoid creation in loops.
- Keep traps simple; no I/O or heavy ops.
- Benchmark critical paths.
- Document and test proxy behavior.
