/* Three popular ways to clone an object also these ways are known as deep clone an object or deep copy of an object.

1. Object.assign({}, user)
2. JSON.parse(JSON.stringify(user))
3. {...user}

Shallow copy: when we copy an object from another object but that particular object still got the reference of the original object.

One object hold the reference to the original object or other object this is called Shallow copy.

Deep copy: When we completely clone an object from another object this is called Deep copy.

*/

const user = {
  name: "Atul",
  age: 25,
};

// clone an object by using object.assign() is not change the previous object
// Object.assign() take two parament 1 is target and 2nd is object
const objAssign = Object.assign({}, user);
objAssign.name = "crossFit";
console.log(user, objAssign);

/////////////
// by using json.parse(json.stringify(obj))
const objClone2 = JSON.parse(JSON.stringify(user));
objClone2.age = 24;
console.log(user, objClone2);

// by using spread operator
const objClone3 = { ...user };
objClone3.name = "Awasthi";
console.log(user, objClone3);
