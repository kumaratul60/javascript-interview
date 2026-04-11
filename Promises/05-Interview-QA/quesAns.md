## 1. Create Your First Promise

Simple resolution after a delay.

```javascript
const firstPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Hello, Promises!');
  }, 1000);
});

firstPromise.then((message) => console.log(message));
```

---

## 2. Reject a Promise

Immediate rejection and error handling.

```javascript
const rejectedPromise = new Promise((_, reject) => {
  reject('Something went wrong!');
});

rejectedPromise.catch((error) => console.error(error));
```

---

## 3. Simulate Coin Toss

Random outcome with asynchronous delay.

```javascript
const coinToss = new Promise((resolve) => {
  console.log('Tossing coin...');
  setTimeout(() => {
    const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
    resolve(result);
  }, 1000);
});

coinToss.then((res) => console.log('Result:', res));
```

---

## 4. Promise with Condition

Logic-based resolution/rejection.

```javascript
function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve('Access Granted');
    } else {
      reject('Access Denied: You must be 18 or older.');
    }
  });
}

checkAge(20)
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err));
```

---

## 5. Chain Promises Sequentially

Executing steps in order.

```javascript
Promise.resolve()
  .then(() => {
    console.log('Step 1 done');
    return 'next';
  })
  .then(() => {
    console.log('Step 2 done');
    return 'next';
  })
  .then(() => {
    console.log('Step 3 done');
  });
```

---

## 6. Value Transformation in Chain

Passing and modifying data through handlers.

```javascript
Promise.resolve(5)
  .then((val) => val * 2) // 10
  .then((val) => val * val) // 100
  .then((final) => console.log('Final Result:', final));
```

---

## 7. Chain with Random Rejection

Graceful error recovery in a chain.

```javascript
Promise.resolve('Start')
  .then((msg) => {
    console.log(msg);
    if (Math.random() > 0.5) throw new Error('Random Failure!');
    return 'Continue';
  })
  .then((msg) => console.log(msg))
  .catch((err) => console.log('Recovered from:', err.message));
```

---

## 8. Multiple then() calls on same Promise

Demonstrating that promises can have multiple independent observers.

```javascript
const basePromise = Promise.resolve('Data Loaded');

basePromise.then((data) => console.log('Handler 1:', data));
basePromise.then((data) => console.log('Handler 2:', data.toUpperCase()));

/*
EXPLANATION:
Both handlers run independently because the promise state is immutable
once resolved. Adding multiple .then() calls does not create a chain;
it creates multiple branches.
*/
```

---

## 9. Return New Promises in .then()

Standard pattern for sequential async tasks.

```javascript
const delayLog = (msg, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
};

delayLog('First', 1000)
  .then(() => delayLog('Second', 1000))
  .then(() => delayLog('Third', 1000));
```

---

## 10. Implement fakeDBQuery()

Simulating a real-world database fetching scenario.

```javascript
function fakeDBQuery(id) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2000;
    setTimeout(() => {
      resolve({ userId: id, name: 'User_' + id, status: 'Active' });
    }, delay);
  });
}

console.log('Fetching users...');
fakeDBQuery(1).then((user) => {
  console.log('Found:', user.name);
  console.log('All queries complete.');
});
```

---

## 11. Event Loop: The "Mixed Priority" Challenge

**Question:** What is the exact output of the following code and why?

```javascript
console.log('1. Start');

setTimeout(() => console.log('2. Macrotask'), 0);

Promise.resolve()
  .then(() => {
    console.log('3. Microtask 1');
  })
  .then(() => {
    console.log('4. Microtask 2');
  });

console.log('5. End');
```

**Answer:**

1. `1. Start`
2. `5. End`
3. `3. Microtask 1`
4. `4. Microtask 2`
5. `2. Macrotask`

**Explanation:**

- Synchronous code runs first (`1` and `5`).
- The `setTimeout` is sent to the **Macrotask Queue**.
- The `Promise` handlers are sent to the **Microtask Queue**.
- The Event Loop processes **all microtasks** before moving to the next macrotask. Thus, `3` and `4` run before `2`.

---

## 12. The `Promise.resolve` vs `new Promise(resolve)` Nuance

**Question:** Is there a difference between `Promise.resolve(val)` and `new Promise(resolve => resolve(val))`?

**Answer:**
Yes, there is a subtle but critical difference when `val` is itself a Promise.

1. **`Promise.resolve(p)`**: If `p` is a promise, it returns `p` directly (the exact same object).
2. **`new Promise(r => r(p))`**: This creates a **new** promise that "follows" `p`. This results in at least one extra microtask tick because the new promise must wait for `p` to settle before it settles itself.

**Staff Tip:** In performance-sensitive code, `Promise.resolve()` is more efficient because it avoids unnecessary promise wrapping.

---

## 13. Sequential Execution (The Reduce Pattern)

**Question:** How do you execute an array of async functions sequentially _without_ using `async/await`?

**Answer:**
Use `Array.prototype.reduce`.

```javascript
const tasks = [() => delayLog('Task A', 500), () => delayLog('Task B', 100), () => delayLog('Task C', 300)];

tasks.reduce((chain, currentTask) => {
  return chain.then(currentTask);
}, Promise.resolve());
```

**Explanation:**
Each iteration returns a new promise that is attached to the previous one via `.then()`, building a linear chain of execution.

---

## 14. Graceful Cancellation with `AbortController`

**Question:** How would you implement a "Cancellable Promise" pattern?

**Answer:**
The modern standard is using `AbortController`.

```javascript
function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timer = setTimeout(() => controller.abort(), ms);

  return fetch(url, { signal }).finally(() => clearTimeout(timer));
}

fetchWithTimeout('https://api.example.com/data', 5000).catch((err) => {
  if (err.name === 'AbortError') console.log('Request timed out!');
});
```

**Explanation:**
The `AbortSignal` is passed to the fetch, allowing the browser to actually stop the network request. This is better than just "ignoring" the result of a promise.

---

## 15. The `return await` Nuance

**Question:** In an `async` function, is there a difference between `return p` and `return await p`?

**Answer:**
In most cases, they behave the same, but there are two key differences:

1. **Try/Catch Scope:** If you use `return p` inside a `try/catch`, the catch block **will not** catch an error from `p` because the function returns `p` immediately. If you use `return await p`, the error is caught locally.
2. **Stack Traces:** `return await` provides cleaner stack traces in modern JS engines because it keeps the current function on the call stack until `p` settles.

**Staff Tip:** Generally, prefer `return p` for a tiny performance gain _unless_ you need a local `try/catch` or better debugging traces.
