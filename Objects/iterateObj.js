// iterate an object?

const obj = {
  name: "Atul",
  age: 25,
  iSGood: false,
  "is total fine": true,
};

// how to access th values in object
// most useful way to iterate an object for  in interview
for (let key in obj) {
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
