function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Base case: return primitive types or null
  }

  if (Array.isArray(obj)) {
    // If it's an array, clone each element
    return obj.map((item) => deepClone(item));
  }

  // If it's an object, clone each property (including nested objects and arrays)
  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

// Example usage:
const originalObject = {
  name: "John",
  age: 25,
  hobbies: ["reading", "coding"],
  address: {
    city: "Example City",
    zip: "12345",
    ["ag address"]: {
      city: "Example City",
      zip: "12345",
    },
  },
};

const clonedObject = deepClone(originalObject);

console.log({ clonedObject });
