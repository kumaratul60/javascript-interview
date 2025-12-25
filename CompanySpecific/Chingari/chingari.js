/*

Given a Javascript array or object, mask all the strings by replacing them with length of that string and mask all the numbers by replacing them with -1.

Input:


{
  name: "coder",
  age: 30,
  address: {
    addresslineOne: "something",
    zip: 560001,
  },
  someArray: ["jan", 2, { month: "march"}, [4]]
}
Output:


{
  name: 5,
  age: -1,
  address: {
    addresslineOne: 9,
    zip: -1,
  },
  someArray: [3, -1, { month: 5}, [-1]]
}
*/

const input = {
  name: "coder",
  age: 30,
  address: {
    addresslineOne: "something",
    zip: 560001,
  },
  someArray: ["jan", 2, { month: "march" }, [4]],
};
function maskObject(obj) {
  const maskedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      maskedObj[key] = obj[key].length;
    } else if (typeof obj[key] === "number") {
      maskedObj[key] = -1;
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      maskedObj[key] = maskObject(obj[key]);
    } else {
      maskedObj[key] = obj[key];
    }
  }

  return maskedObj;
}

const output = maskObject(input);
console.log(output);
