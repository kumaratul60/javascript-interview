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

const obj1 = {
  name: "coder",
  age: 30,
  address: {
    addresslineOne: "something",
    zip: 560001,
  },
  someArray: ["jan", 2, { month: "march" }, [4]],
};

const obj2 = {
  name: 5,
  age: -1,
  address: {
    addresslineOne: 9,
    zip: -1,
  },
  someArray: [3, -1, { month: 5 }, [-1]],
};

const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    //   console.log('key: '+ key + ', value: '+obj[key]);
    if (typeof obj[key] === "string") {
      console.log(key, " : ", obj[key].length);
    } else if (typeof obj[key] === "number") {
      obj[key] = -1;
      console.log(key, " : ", obj[key]);
    }

    if (typeof obj[key] === "object") {
      iterate(obj[key]);
    }
  });
};

iterate(obj2);
