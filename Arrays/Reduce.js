const num = [1, 2, 3, 4, 5, 6];
const total = num.reduce((acc, idx) => acc + idx, 0);
console.log(total);

// const arry = [[6, 7, 8, 9, 10, 11][(1, 2, 3, 4, 5)]];
// const flattened = arry.reduce((acc, item) => [...acc, ...item], []);
// console.log(flattened);

const fruits = ["apple", "orange", "apple", "banana", "orange"];
const tally = fruits.reduce((accumutalor, fruit) => {
  if (accumutalor[fruit]) accumutalor[fruit] = accumutalor[fruit] + 1;
  else accumutalor[fruit] = 1;
  return accumutalor;
}, {});
console.log(tally);

// /////////////////////////////////

const user = [
  { firstName: "Atul", lastName: "Kumar", class: "24" },
  { firstName: "Areol", lastName: "Kantr", class: "24" },
  { firstName: "Atal", lastName: "Kandi", class: "25" },
];
const output1 = user.reduce(function (acc, curr) {
  if (acc[curr.class]) {
    acc[curr.class] = ++acc[curr.class];
  } else {
    acc[curr.class] = 1;
  }
  return acc;
}, {});
console.log(output1);
const output2 = user.reduce((acc, curr) => {
  if (acc[curr.class]) acc[curr.class] = ++acc[curr.class];
  else acc[curr.class] = 1;
  return acc;
}, {});
console.log(output2);
