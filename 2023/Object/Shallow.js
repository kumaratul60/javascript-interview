/***
Shallow copy=> a shallow copy only copies the references to nested objects, not the objects themselves.

 - Shallow copy only duplicates the references to nested objects, while deep copy duplicates the actual nested objects as well.
 - Shallow copy is simpler and faster, but it might lead to unintended side effects if the nested objects are modified.
 - Deep copy creates a truly independent copy of the object and its nested objects, ensuring that changes to one copy do not affect the other.
 - Deep copying can be more resource-intensive and might not handle all cases, such as objects with functions or circular references.

*/

const original = {
  prop1: "value1",
  prop2: {
    nestedProp: "nestedValue",
  },
};

const shallowCopy = { ...original };
shallowCopy.prop2.nestedProp = "changedValueS";

// we can use object.assign also :
// const shallowCopyObjectAssign = Object.assign({}, original);
// shallowCopyObjectAssign.prop2.nestedProp = "changedValueAssign";

console.log(original.prop2.nestedProp); // Outputs: "changedValue"

/***
M2
*/

// Shallow Copy without Spread Operator
function shallowCopyWithoutSpread(obj) {
  const copiedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObj[key] = obj[key];
    }
  }
  return copiedObj;
}

const original1 = {
  prop1: "valueNew",
  prop2: {
    nestedProp: "nestedValueNew",
  },
};

const shallowCopy1 = shallowCopyWithoutSpread(original1);

// Modifying nestedProp in shallowCopy affects the original object
shallowCopy1.prop2.nestedProp = "changedValueFn1";

console.log(original1.prop2.nestedProp); // Outputs: "changedValue"
