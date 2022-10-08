const user = [
  { firstName: "Atul", lastName: "Kumar", class: "24" ,marks:"2"},
  { firstName: "Areol", lastName: "Kantr", class: "24",marks:"20" },
  { firstName: "Atal", lastName: "Kandi", class: "25" ,marks:"22"},
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

// calculate sum of all class

const sum = user.reduce((acc, curr) =>acc+curr.class,0)
 console.log(sum);