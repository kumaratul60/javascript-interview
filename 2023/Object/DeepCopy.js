function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = {
  prop1: "value1",
  prop2: {
    nestedProp: "nestedValue",
  },
};

const deepCopyObj = deepCopy(original);

// Changes to the nestedProp property of deepCopyObj do not affect original
deepCopyObj.prop2.nestedProp = "changedValue";

console.log(original.prop2.nestedProp); // Outputs: "nestedValue"
