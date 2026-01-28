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
“Object.freeze is shallow.
Nested objects are still mutable because references aren’t frozen.
deepFreeze recursively freezes every level to guarantee immutability.”



Big Misunderstanding: “Object.freeze makes objects immutable
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


| Operation       | Freeze   | Proxy       |
| --------------- | -------- | ----------- |
| Object creation | fast     | slower      |
| Property access | native   | intercepted |
| Writes          | blocked  | trapped     |
| Deep traversal  | required | automatic   |
| Feature         | Freeze    | Proxy               |
| --------------- | --------- | ------------------- |
| Shallow         | ❌         | ❌ (deep by default) |
| Runtime control | ❌         | ✅                   |
| Performance     | ✅ fast    | ❌ slower            |
| Debug safety    | ⚠️ silent | ✅ throws            |
| Use in prod     | ✅         | ❌                   |


const obj = Object.freeze({ a: 1 });
obj.a = 2; // ❌


const obj = new Proxy({ a: 1 }, {
  set() {
    throw new Error("Mutation not allowed");
  }
});



*/
