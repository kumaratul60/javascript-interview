// 1. two key with same name, it this case other key which is added latter is going to consider at print time -> LIFO type

const objKey = {
  a: "one",
  b: "two",
  b: "three",
  a: "four",
};
console.log(objKey);

// 2. create a function multiplyByTwo(obj) that multiply all numeric property values of num by 2

const num = {
  a: 100,
  b: 200,
  title: "my num",
};

multiplyByTwo(num);

function multiplyByTwo(num) {
  for (let objKey in num) {
    if (typeof num[objKey] == "number") {
      num[objKey] *= 2;
    }
  }
}
console.log(num);

// //////////////////////////////////////////////////////////////////

const p = {};
const q = { key: "q" };
const r = { key: "r" };

p[q] = 123;
p[r] = 456;

console.log(p[q]); //456

// because p[q] have not any key it have string -> '[object Object]' , so last assigned key will be overwritten
// p['[object Object]']=123
// q['[object Object]'] = 456

console.log(p); //456
