const arr = [
  { name: "Tanish", age: 24 },
  { name: "Ajay", age: 44 },
  { name: "Anuj", age: 64 },
  { name: "Kavya", age: 15 },
  { name: "Rani", age: 35 },
];
// const res = Object.keys(arr).filter((el)=> el.age>24)

Array.prototype.myFilter = function (cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const res = arr.myFilter((el) => el.age > 24);
const output = res.sort((a, b) => a.age - b.age); //ascending order
//  const newArr  = [];
// for(var i=0;i<res.length;i++){
//     newArr.push(res[i].name)

// }
console.log(output);

const sum = res.reduce((acc, obj) => {
  return acc + obj.age;
}, 0);
console.log(sum);
