const user = [
  { firstName: "Atul", lastName: "Kumar", class: "24", marks: "20" },
  { firstName: "Areol", lastName: "Kantr", class: "24", marks: "22" },
  { firstName: "Atal", lastName: "Kandi", class: "50", marks: "26" },
];
const output1 = user.filter((x) => {
  return x.class < 30;
});
console.log(output1);
const output2 = user.filter((x) => x.class < 30).map((x) => x.firstName);

console.log(output2);

const output3 =
  user.filter((x) => x.class < 30) && user.filter((x) => x.marks > 20);

console.log(output3);
