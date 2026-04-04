// Shallow Freeze: Object.freeze only freezes the first level of an object.

const user = {
  name: 'Dev',
  address: { city: 'BLR' },
};

Object.freeze(user);

user.name = 'New'; //  blocked
user.address.city = 'Delhi'; //  STILL MUTATES

/*
user
// {
//   name: "Dev", Yes
//   address: { city: "Delhi" } Nop
// }

TT
| Operation        | Allowed |
| ---------------- | ------- |
| Modify top-level | No       |
| Add top-level    | No       |
| Delete top-level | No       |
| Modify nested    | Yes No BUG |
| Add nested       | Yes No BUG |


*/

// Deep Freeze: Recursively freezes every nested object.

function deepFreeze(obj) {
  Object.freeze(obj);

  Object.values(obj).forEach((v) => {
    if (typeof v === 'object' && v !== null && !Object.isFrozen(v)) {
      deepFreeze(v);
    }
  });

  return obj;
}

const user = {
  name: 'Dev',
  address: { city: 'BLR' },
};

deepFreeze(user);

user.address.city = 'Delhi'; //  blocked

// Result:  unchanged
/*
| Operation        | Allowed |
| ---------------- | ------- |
| Modify top-level | No       |
| Add property     | No      |
| Delete property  | No      |
| Modify nested    | No      |
| Add nested       | No      |

*/

// Why Do We Need deepFreeze
const state = {
  user: { name: 'A' },
};

Object.freeze(state);

// Somewhere deep in code
state.user.name = 'B'; // silently mutates

deepFreeze(state);
state.user.name = 'B'; // throws (strict mode)

/*
Object.freeze is shallow.
Nested objects are still mutable because references aren't frozen.
deepFreeze recursively freezes every level to guarantee immutability."



Big Misunderstanding: "Object.freeze" makes objects immutable
Yes: It only freezes the first level.

Shallow Freeze:
A (frozen)
└─ B (mutable) No

Deep Freeze:
A (frozen)
└─ B (frozen) Yes
   └─ C (frozen) Yes


Freeze gives structural immutability but is shallow and static.
Proxy enables dynamic enforcement but has runtime cost.
Redux Toolkit uses Proxy internally and freeze only for dev safety.

Redux Toolkit uses Immer proxies to track mutations and generate immutable updates efficiently


| Operation       | Freeze     | Proxy               |
| --------------- | --------   | --------------      |
| Object creation | fast       | slower              |
| Property access | native     | intercepted         |
| Writes          | blocked    | trapped             |
| Deep traversal  | required   | automatic           |
| Feature         | Freeze     | Proxy               |
| --------------- | ---------  | ------------------- |
| Shallow         | ❌         | ❌ (deep by default) |
| Runtime control | ❌         | ✅                   |
| Performance     | ✅ fast    | ❌ slower            |
| Debug safety    | ⚠️ silent  | ✅ throws            |
| Use in prod     | ✅         | ❌                   |


const obj = Object.freeze({ a: 1 });
obj.a = 2; // ❌


const obj = new Proxy({ a: 1 }, {
  set() {
    throw new Error("Mutation not allowed");
  }
});
*/

/**
Shallow vs Deep Copy (visual)

Original obj
const obj = {
  a: 1,
  b: { c: 2 }
};

1. Shallow copy (..., Object.assign)
const copy = { ...obj };

obj ──► { a:1, b: ──► { c:2 } }
copy ─► { a:1, b: ──┘  (same ref ⚠️)

mutate:
copy.b.c = 99;

result:
obj.b.c === 99 ❌ (unexpected)

2. Deep copy
const deep = structuredClone(obj);
// or custom deep clone

obj  ──► { a:1, b: ──► { c:2 } }
deep ──► { a:1, b: ──► { c:2 } }  (new ref ✅)

mutate:
deep.b.c = 99;

result:
obj.b.c === 2 ✅ (safe)


-----

Shallow → fast, but reference shared
Deep → safe, but costly

JSON → quick hack only
structuredClone → modern deep clone
Custom → production control
 */

// NaN comparison:
NaN === NaN; // false ❌
Object.is(NaN, NaN); // true ✅

// -0 vs 0
0 === -0; // true
Object.is(0, -0); // false ⚠️

// Key order trap
JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ b: 2, a: 1 });
// false ❌ sometimes

// Array is object
typeof [] === 'object'; // true
// always:
Array.isArray(value);

// Circular reference crash
const a = {};
a.self = a;

JSON.stringify(a); // 💥 error

// Undefined lost
JSON.stringify({ a: undefined });
// "{}" ❌ lost

// Functions lost
JSON.stringify({ fn: () => {} });
// "{}" ❌

// Prototype pollution risk
const obj = JSON.parse('{"__proto__": {"admin": true}}'); // unsafe merge can break app

// Shallow merge trap
const aS = { b: { c: 1 } };
const bS = { b: { d: 2 } };

const rs = { ...aS, ...bS };
// { b: { d:2 } } ❌ lost c

// Dates break in JSON
const objDate = { d: new Date() };

JSON.parse(JSON.stringify(objDate)).d instanceof Date;
// false ❌ (string now)
