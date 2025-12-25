const user = [
  { firstName: "Atul", lastName: "Kumar", class: "24" },
  { firstName: "Areol", lastName: "Kantr", class: "24" },
  { firstName: "Atal", lastName: "Kandi", class: "25" },
];
const output1 = user.map((x) => {
  return x.firstName + "" + x.lastName;
});
console.log(output1);

const output2 = user.map((x) => {
  x.firstName + "" + x.lastName;
});
console.log(output2);

const output3 = user.map((x) => x.firstName + "" + x.lastName);

console.log(output3);

const output4 = user.map((x) => x.firstName);

console.log(output4);
