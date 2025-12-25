// spread operator in arrays
// basically array store in heap memory,  address store location change using spread operator
const a = [1, 2, 3];
const b = a;
b.push(5);

const c = [...a];
c.push(6);
console.log(a);
console.log(b);
console.log(...a); // without brackets

// spread operator in objects

let obj = {
  name: "atul",
  //   add = address
  add: {
    country: "IND",
    state: {
      code: "UP",
      pin: "45645",
    },
  },
};
// update in both
// let obj2 = obj;
// obj2.name = "xyz";

// update in only obj2
// let obj2 = { ...obj }; // shallow copy
// obj2.name = "xyz";

// let obj2 = { ...obj,add:{...obj.add} }; // deep copy
// obj2.add.country = "US" // fir same proble it update same country in both array so spread obj with add

// let obj2 = { ...obj, add: { ...obj.add, state: { ...obj.add.state } } };  // deep copy
// obj2.add.state.code = 11;

// either we provide reference for each onject or  use JSON shortkut

let obj2 = JSON.parse(JSON.stringify(obj));
obj2.add.state.code = 12;

console.log(obj);
console.log(obj2);

// JSON.stringify(parameter) => it make a massive string, of given parameter and store it in new variable object Because string makes on stack memory  so we can not provide reference of string.that's why we parse  it and sore it in object variable
