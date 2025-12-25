// Object.assign(), and spread operator both does shallow copy.
// also for deep copy use json.stringyfy

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

// Ex:2
const deepUser = {
  name: "mike",
  age: 30,
  location: {
    city: "IN",
    state: "Bh",
  },
};
// const userObj = { ...deepUser };  // shallow copy
// userObj.location.city = "UP";

// console.log(deepUser); //{ name: 'mike', age: 30, location: { city: 'UP', state: 'Bh' } }
// console.log(userObj); //{ name: 'mike', age: 30, location: { city: 'UP', state: 'Bh' } }

// ES6 way
const deepUserObj = {
  ...deepUser,
  location: {
    ...deepUser.location,
  },
}; // deepcopy
deepUserObj.location.city = "UP";
console.log(deepUser); //{ name: 'mike', age: 30, location: { city: 'IN', state: 'Bh' } }
console.log(deepUserObj); //{ name: 'mike', age: 30, location: { city: 'UP', state: 'Bh' } }

// before ES6 we use Object.assign()
// Object.assign({target},{source}),
const user3 = { name: "Hayz", age: 50 };
// const copyUser3 = Object.assign(user3, { age: 30 });
// console.log(user3); //{ name: 'Hayz', age: 30 }
// console.log(copyUser3); //{ name: 'Hayz', age: 30 }

// {} -> the empty curly braces craete a new refrence of the object in the memory
// const copyRefUser3 = Object.assign({}, user3, { name: "newHYk" }, { age: 30,salary:500000 },{ui:54});
const copyRefUser3 = Object.assign({}, user3, {
  name: "newHYk",
  age: 30,
  salary: 500000,
  ui: 54,
});

const copyRefUser3WithSpread = {
  ...user3,
  name: "newHYk",
  age: 30,
  age: 60, // override the age 30
  salary: 500000,
  ui: 54,
};
console.log(user3);
console.log(copyRefUser3);
console.log(copyRefUser3WithSpread);

/// to do deep copy we use in built method name is structuredClone, but it supported only 89% of browser check on https://caniuse.com

// const structured = structuredClone(deepUser);
// structured.location.city = "London";
// console.log(deepUser);
// console.log(structured);

const deepUser2 = {
  name: "mike",
  age: 30,
  location: {
    city: "IN",
    state: "Bh",
    name: {
      name: "John",
    },
  },
};

const deepRefUser2 = {
  ...deepUser2,
  location: {
    ...deepUser2.location,
    name: {
      ...deepUser2.location.name,
    },
  },
};
