const myMap = new Map();
myMap.set("key1", "value1");
myMap.set("key2", "value2");

// Avoid using for...in with Map,  using for in method you will neither get any error nor you will get any output
// for (const key in myMap) {
//     console.log("in m: " + key, myMap[key]);
//   }

/**
important to note that the for...in loop is designed to iterate over the properties of an object, and it's not the recommended way to iterate over the entries of a Map. The for...in loop might not behave as expected with a Map because it can inadvertently include properties from the prototype chain and may not maintain the insertion order of the Map

*/

// M1
for (const [key, value] of myMap.entries()) {
  console.log("m1", key, value);
}

// M2

myMap.forEach((value, key) => {
  console.log("m2", key, value);
});

// M3
for (const key of myMap.keys()) {
  console.log("m3", key, myMap.get(key));
}

// only keys
for (const key of myMap.keys()) {
  console.log("keys:", key);
}

// only values
for (const value of myMap.values()) {
  console.log("values:", value);
}


// Map example
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
console.log(map.get('name')); // Output: John

// Set example
const set = new Set([1, 1, 2, 3, 3, 4, 5]);
console.log(set); // Output: Set {1, 2, 3, 4, 5}