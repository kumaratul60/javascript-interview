//  return only names of user who scored more then  20

const user = [
  { firstName: "Atul", lastName: "Kumar", class: "24", marks: "80" },
  { firstName: "Areol", lastName: "Kantr", class: "24", marks: "69" },
  { firstName: "Atal", lastName: "Kandi", class: "25", marks: "35" },
  { firstName: "Atil", lastName: "Kandi", class: "25", marks: "55" },
];

const op = user.filter((mark) => mark.marks > 60).map((name) => name.firstName);
//   .reduce((acc, curr) => acc + curr.marks, 0);

// console.log(op);

// return  total marks for student with marks greater than 60 after  5 marks have been added to those who scored less than 20

const total = user
  .map((all) => {
    if (all.marks < 60) {
      all.marks += 5;
    }
    return all;
  })
  .filter((all) => all.marks > 70).reduce((acc, curr) => acc + curr.marks,0)
console.log(total);
 