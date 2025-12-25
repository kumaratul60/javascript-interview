## 1. Student Registry (Map)

```javascript
const students = new Map();

// Add 5 students
students.set(101, 'Arjun');
students.set(102, 'Sneha');
students.set(103, 'Vikram');
students.set(104, 'Priya');
students.set(105, 'Rahul');

// Retrieve name
console.log('Student 103:', students.get(103));

// Delete entry
students.delete(104);
console.log('Updated Student Map:', students);
```

## 2. Unique Languages (Set)

```javascript
const languages = new Set();

languages.add('JavaScript');
languages.add('Python');
languages.add('JavaScript'); // Duplicate
languages.add('Go');
languages.add('C++');
languages.add('Python'); // Duplicate

console.log('Unique Languages:');
languages.forEach((lang) => console.log(lang));
```

## 3. Object vs Map Comparison

```javascript
const obj = {};
const map = new Map();

const keyObj = { id: 1 };

// Insertion and Key Types
obj[keyObj] = 'Object Value';
map.set(keyObj, 'Map Value');

console.log('Object Keys:', Object.keys(obj)); // [" [object Object] "] (Coerced to string)
console.log('Map Key exists:', map.has(keyObj)); // true (Reference maintained)

// Order Check
// Maps strictly preserve insertion order.
// Objects do not guarantee order for non-integer keys.
```

## 4. Contact List (Map)

```javascript
const contacts = new Map();

// Add/Update
contacts.set('9876543210', 'John Doe');
contacts.set('8877665544', 'Jane Smith');
contacts.set('9876543210', 'John Updated'); // Update

// Search
console.log('Search 8877665544:', contacts.get('8877665544'));

// Delete
contacts.delete('8877665544');
console.log('Contacts after deletion:', contacts);
```

## 5. Remove Duplicates from Array

```javascript
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
const uniqueFruits = [...new Set(fruits)];

console.log('Unique Fruits Array:', uniqueFruits);
```

## 6. User Login Tracker (Set)

```javascript
const activeUsers = new Set();

function login(id) {
  activeUsers.add(id);
}
function logout(id) {
  activeUsers.delete(id);
}
function isLoggedIn(id) {
  return activeUsers.has(id);
}

login('user_01');
login('user_02');
logout('user_01');

console.log('Is user_01 logged in?', isLoggedIn('user_01')); // false
console.log('Is user_02 logged in?', isLoggedIn('user_02')); // true
```

## 7. Book Library (Map)

```javascript
const books = new Map([
  ['The Hobbit', 'J.R.R. Tolkien'],
  ['1984', 'George Orwell'],
  ['The Great Gatsby', 'F. Scott Fitzgerald'],
  ['Brave New World', 'Aldous Huxley'],
  ['Ulysses', 'James Joyce'],
]);

books.set('1984', 'Eric Arthur Blair (Orwell)'); // Update author
console.log('Total Books:', books.size);
```

## 8. DOM Metadata (WeakMap)

```javascript
const elementMeta = new WeakMap();

let fakeElement = { type: 'button', id: 'submit-btn' };

elementMeta.set(fakeElement, { clicked: 0, lastAccessed: Date.now() });

console.log('Metadata:', elementMeta.get(fakeElement));

// GC Benefit:
fakeElement = null;
// Once fakeElement is null, the metadata entry is eligible for garbage collection,
// preventing memory leaks that would happen with a regular Map.
```

## 9. Class Instance Tracking (WeakSet)

```javascript
const activeSessions = new WeakSet();

class Session {
  constructor(user) {
    this.user = user;
    activeSessions.add(this);
  }
}

let session1 = new Session('Admin');
console.log('Session 1 valid?', activeSessions.has(session1));

// Memory Leak Avoidance:
// When session1 is set to null, the WeakSet reference doesn't block GC.
```

## 10. Shopping Cart (Map)

```javascript
const cart = new Map(); // Key: ProductID, Value: Quantity

function addToCart(id, qty) {
  const currentQty = cart.get(id) || 0;
  cart.set(id, currentQty + qty);
}

addToCart('p_101', 2);
addToCart('p_101', 3); // Update to 5
addToCart('p_202', 1);

let totalItems = 0;
for (let qty of cart.values()) {
  totalItems += qty;
}

console.log('Total items in cart:', totalItems);
```

## 11. Anagram Checker (Set)

_Note: A Set alone only checks unique character presence. A true anagram check usually needs frequency. This follows the requirement using Set logic._

```javascript
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  if (set1.size !== set2.size) return false;
  return [...set1].every((char) => set2.has(char));
}

console.log("Is 'listen' an anagram of 'silent'?", areAnagrams('listen', 'silent'));
```

## 12. First Non-Repeating Character (Map)

```javascript
function firstUniqueChar(str) {
  const charCount = new Map();

  for (let char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (let char of str) {
    if (charCount.get(char) === 1) return char;
  }
  return null;
}

console.log("First non-repeating in 'swiss':", firstUniqueChar('swiss')); // 'i'
```

## 13. Performance: Object vs Map

```javascript
const limit = 100000;

console.time('Object Insertion');
const objBench = {};
for (let i = 0; i < limit; i++) {
  objBench['key' + i] = i;
}
console.timeEnd('Object Insertion');

console.time('Map Insertion');
const mapBench = new Map();
for (let i = 0; i < limit; i++) {
  mapBench.set('key' + i, i);
}
console.timeEnd('Map Insertion');
```

## 14. Voting App (Set)

```javascript
const hasVoted = new Set();

function castVote(userId) {
  if (hasVoted.has(userId)) {
    console.log(`User ${userId} has already voted!`);
    return;
  }
  hasVoted.add(userId);
  console.log(`Vote registered for ${userId}`);
}

castVote('U101');
castVote('U101'); // Blocked
```

## 15. Employee Registry (Object as Key)

```javascript
const employeeData = new Map();

const emp1 = { name: 'Alice', id: 1 };
const emp2 = { name: 'Bob', id: 2 };

employeeData.set(emp1, { role: 'Developer', dept: 'IT' });
employeeData.set(emp2, { role: 'Designer', dept: 'UX' });

console.log('Emp1 Role:', employeeData.get(emp1).role);

// Object Fallback check
const plainObj = {};
plainObj[emp1] = 'Data 1';
plainObj[emp2] = 'Data 2';

console.log('Plain Object Keys:', Object.keys(plainObj));
// Returns [" [object Object] "] because emp2 overwrote emp1 string key.
```
