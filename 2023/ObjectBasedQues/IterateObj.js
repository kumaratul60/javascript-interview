// iterate an object?

const obj = {
  name: "Atul",
  age: 25,
  iSGood: false,
  "is total fine": true,
};

// how to access th values in object
// most useful way to iterate an object for  in interview
for (let [key] in obj) {
  console.log(obj[key]); // Values
  console.log(key); // keys
}

///////////////////////////////////////////////
// let resKeys = Object.keys(obj);
// console.log(resKeys);

/////////////////////////////////////////////////////////////
// for (let [key, value] of Object.entries(obj)) {
//   console.log(key, value);
// }

////////////////////////////////////////////////////////////
// for (let key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     console.log(key, obj[key]);
//   }
// }

///////////////////////////////////////////////////////////
// let keys = Object.keys(obj);
// console.log(keys)

//////////////////////////////////////////////////////////////
// let keys1 = [];
// for (let key in obj) {
//   if (obj.hasOwnProperty(key)) keys1.push(key);
//   console.log(keys1);
// }

////////////////////////////////////
// let keys = Object.keys(obj);
// for (let i = 0; i < keys.length; i++) {
//   console.log(keys[i], obj[keys[i]]);
// }

// nested object loop through

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
    console.log("key: " + key + ", value: " + obj[key]);

    if (typeof obj[key] === "object") {
      iterate(obj[key]);
    }
  });
};

iterate(obj2);
