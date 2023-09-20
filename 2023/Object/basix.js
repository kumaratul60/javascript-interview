const u1 = {
  email: "atul@gmail.com",
  name: "atul",
};

// const u2 = u1
// u2.name = "google"
// console.log(u1)
// console.log(u2)

// M1 => by using spread operator

// const u2 = {...u1}
// u2.name = "new Name"
// console.log(u1)
// console.log(u2)

// M2 => Shallow copy of u1 into u2 using Object.assign()

// const u2 = Object.assign({},u1)
// u2.name = "shallow"
// console.log(u1)
// console.log(u2)

// M3 => Deep copy of u1 into u2 using JSON.stringify() and JSON.parse()

const u2 = JSON.parse(JSON.stringify(u1));
u2.name = "deep";
u2.email = "depth@gmail.in";
console.log(u1);
console.log(u2);

///

let obj = {
  fn: "xyx",
  ln: "mnk",
  address: {
    fl: "jkl",
    ll: "test2",
  },
};
const obj2 = {
  ...obj,
  ln: "llll",
  address: {
    ...obj.address,
    ll: "test3",
  },
};
// obj2.address.ll="test3"

console.log(obj); //{ fn: 'xyx', ln: 'mnk', address: { fl: 'jkl', ll: 'test2' } }
console.log(obj2); // { fn: 'xyx', ln: 'llll', address: { fl: 'jkl', ll: 'test3' } }
