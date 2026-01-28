// 1
const input1 = [
  { name: 'T', location: 'bangalore' },
  { name: 'whatfix', location: 'delhi' },
];

const output1 = input.filter((item) => item.location === 'bangalore');

console.log(output);
// [{ name: "T", location: "bangalore" }]

const output11 = input.reduce((acc, cur) => (cur.location === 'bangalore' ? [...acc, cur] : acc), []);

// 2
/* in:[{ name: "T", location: "bangalore" }, { name: "whatfix", location: "delhi" }]
 op:
 {
  bangalore: ["T"],
  delhi: ["whatfix"]
}
  */

const output2 = input.reduce((acc, { name, location }) => {
  (acc[location] ??= []).push(name);
  return acc;
}, {});

const output21 = {};
for (const { name, location } of input) {
  output[location] ??= [];
  output[location].push(name);
}
const output22 = Object.fromEntries(
  input.reduce((m, { name, location }) => {
    m.set(location, [...(m.get(location) ?? []), name]);
    return m;
  }, new Map()),
);

// 3:
/*
in: [{ name: 'T', location: 'bangalore' }];
op:
{
  T: { location: "bangalore" }
}

*/

const arrayToMap = (arr) =>
  arr.reduce((acc, { name, ...rest }) => {
    acc[name] = rest;
    return acc;
  }, {});

// 4
/*
  [
    { name: 'T', location: 'bangalore' },
    { name: 'whatfix', location: 'delhi' },
  ];

  {
  bangalore: 1,
  delhi: 1
}

  */

const countByCity = (arr) =>
  arr.reduce((acc, { location }) => {
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

// 5:
/*
in:
state = [{id:1,a:1},{id:2,a:2}]
updates = [{id:2,a:3},{id:3,a:4}]

op:
[{id:1,a:1},{id:2,a:3},{id:3,a:4}]
  */

// Brute Force: Nested loops : O^2
// optimal: O(n+m)
function mergeById(a, b) {
  const map = new Map(a.map((x) => [x.id, x]));
  b.forEach((x) => map.set(x.id, { ...map.get(x.id), ...x }));
  return [...map.values()];
}

// 6:
/* Detect Circular References
 Problem: Return true if object has cycles.
in: a.self = a
op: true

Core idea

Objects form a graph, not a tree.
If you revisit the same object → cycle exists.

Use WeakSet to remember visited nodes.

| Input        | Output |
| ------------ | ------ |
| `{}`         | false  |
| `{ a: 1 }`   | false  |
| `{ a: {} }`  | false  |
| `a.self = a` | true   |
| `a.b.c = a`  | true   |
| `null`       | false  |
| `42`         | false  |


Notes:
Uses graph traversal
WeakSet avoids memory leaks
Cannot be solved with JSON methods

 */

function hasCycle(obj, seen = new WeakSet()) {
  if (typeof obj !== 'object' || !obj) return false;
  if (seen.has(obj)) return true;
  seen.add(obj);
  return Object.values(obj).some((v) => hasCycle(v, seen));
}

// 7:
/*
Build LRU Cache:
Store most recently used items.
Evict least recently used when full.

in:
cache.set(1,1)
cache.get(1)

op:
1

| Action            | Result          |
| ----------------- | --------------- |
| get(missing)      | -1              |
| get(existing)     | value           |
| capacity exceeded | oldest removed  |
| repeated get      | moves to recent |


*/

class LRU {
  constructor(n) {
    this.n = n;
    this.m = new Map();
  }
  get(k) {
    if (!this.m.has(k)) return -1;
    const v = this.m.get(k);
    this.m.delete(k);
    this.m.set(k, v);
    return v;
  }
  set(k, v) {
    if (this.m.has(k)) this.m.delete(k);
    this.m.set(k, v);
    if (this.m.size > this.n) this.m.delete(this.m.keys().next().value);
  }
}

// 8
// Deep Freeze (Immutability): Make object fully immutable.
function deepFreeze(o) {
  Object.freeze(o);
  Object.values(o).forEach((v) => {
    if (typeof v === 'object' && v) deepFreeze(v);
  });
  return o;
}

// 9:
/*
Flatten Object: Convert nested objects into dot-path keys.
in: { a: { b: { c: 1 } } }
op: { "a.b.c": 1 }

in: ({ a:{ b:{ c:1 }}}, 1)
op: { "a.b": { c:1 } }

*/

function flatten(obj, path = '', out = {}) {
  for (const k in obj) {
    const newPath = path ? `${path}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      flatten(obj[k], newPath, out);
    } else {
      out[newPath] = obj[k];
    }
  }
  return out;
}

function flattenDepthV1(obj, depth, path = '', out = {}) {
  if (depth === 0 || typeof obj !== 'object') {
    out[path] = obj;
    return out;
  }
  for (const k in obj) {
    flattenDepth(obj[k], depth - 1, path ? `${path}.${k}` : k, out);
  }
  return out;
}

// 10:
/*
Deep Freeze: Make object fully immutable, including nested objects.

Behavior Table:
| Operation       | Result   |
| --------------- | -------- |
| Add property    | No        |
| Modify property | No        |
| Delete property | No        |
| Nested modify   | No        |
| Shallow freeze  | No unsafe |

Truth table:
| Statement                 | True |
| ------------------------- | ---- |
| Object.freeze is deep     | No    |
| deepFreeze is recursive   | yes    |
| Used in Redux             | yes    |
| Proxy can enforce runtime | yes    |


*/

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach((v) => {
    if (typeof v === 'object' && v !== null && !Object.isFrozen(v)) {
      deepFreeze(v);
    }
  });
  return obj;
}

