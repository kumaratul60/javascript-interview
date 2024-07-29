/*
const input = {
     A: (a,b,c) => a+b+c,
     B: (a,b,c) => a-b-c,
     C: (a,b,c) => a*b*c,
     D: (a,b,c) => a+b*c,
     E: {
          F: (a,b,c) => a+b+c,
        }
 }

 compute(1,1,1)

 Output :
 {
     A: 3,
     B: -1,
     C:  1,
     D:  2,
     E: {
         F: 3,
        }
 }

 */

// sample function

function computeSample(input, ...args) {
  const output = {};

  for (const key in input) {
    if (typeof input[key] === "function") {
      output[key] = input[key](...args);
    } else if (typeof input[key] === "object") {
      output[key] = compute(input[key], ...args);
    }
  }

  return output;
}

///

function compute(obj, ...args) {
  // Helper function to determine if a value is an object
  const isObject = (val) => typeof val === "object" && val !== null;

  // Initialize the result object
  const result = {};

  // Iterate over each key in the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check if the value is a function, an object, or something else
      if (typeof value === "function") {
        result[key] = value(...args); // Compute the result of the function
      } else if (isObject(value)) {
        result[key] = compute(value, ...args); // Recursively compute nested objects
      }
    }
  }

  return result; // Return the computed result object
}

//This function checks if a value is a non-null object.
const isObject = (val) => typeof val === "object" && val !== null;

// Example usage
const input = {
  A: (a, b, c) => a + b + c,
  B: (a, b, c) => a - b - c,
  C: (a, b, c) => a * b * c,
  D: (a, b, c) => a + b * c,
  E: {
    F: (a, b, c) => a + b + c,
  },
};

const output = computeSample(input, 1, 1, 1);
console.log(output);
// Output: { A: 3, B: -1, C: 1, D: 2, E: { F: 3 } }
