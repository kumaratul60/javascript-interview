const obj = {
  name: "Atul",
  age: 25,
  iSGood: false,
  "is total fine": true,
};

// M1
for (const key in obj) {
  console.log(`${key} : ${obj[key]} `); // name:Atul...
}

// M2
const resKeys = Object.keys(obj);
const resValues = Object.values(obj);
console.log({ resKeys, resValues });
//   resKeys: [ 'name', 'age', 'iSGood', 'is total fine' ],

// M3
for (const [key, value] of Object.entries(obj)) {
  console.log({ key, value }); //{ key: 'name', value: 'Atul' }
}

// M4 => M3 === M4 as output
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log({ key, val: obj[key] });
  }
}

// M5
const keys = Object.keys(obj);
for (let i = 0; i < keys.length; i++) {
  console.log({ k: keys[i], v: obj[keys[i]] });
}

// M6
function getObjKeys(obj) {
  const keys1 = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) keys1.push(key);
    //   console.log({keys1});
  }
  console.log({ keys1 });
  // { keys1: [ 'name', 'age', 'iSGood', 'is total fine' ] }
}
getObjKeys(obj);

const getObjKeys2 = (obj) => {
  const keys2 = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) keys2.push(key);
    //   console.log({keys2});
  }
  console.log({ keys2 });
  // { keys2: [ 'name', 'age', 'iSGood', 'is total fine' ] }
};
getObjKeys2(obj);

function getObjKeys3(obj) {
  const keys3 = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) keys3.push(key);
  }
  return keys3;
}
const res3 = getObjKeys3(obj);
console.log({ res3 });
// { res3: [ 'name', 'age', 'iSGood', 'is total fine' ] }
