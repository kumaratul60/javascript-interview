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
fakeDBQuery(1)
  .then((user) => {
    console.log('Found:', user.name);
    return fakeDBQuery(2);
  })
  .then((user) => {
    console.log('Found:', user.name);
    return fakeDBQuery(3);
  })
  .then((user) => {
    console.log('Found:', user.name);
    console.log('All queries complete.');
  });
```
