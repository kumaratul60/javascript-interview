let obj = {
  name: "Saket Vatsa",
  age: "27",
  genderAss: "true",
  favColors: ["red", "green", "blue"],
  numArr: ["1", "2", "3"],
  friends: [
    { name: "saket", age: "31" },
    { name: "aman", age: "25" },
  ],
  favNum: "null",
  birth: {
    city: "patna",
    year: "1989",
  },
};

// const ans = {
//     name: 'Saket Vatsa',
//     age: 27,
//     genderAss: true,
//     favColors: [ 'red', 'green', 'blue' ],
//     numArr: [ 1, 2, 3 ],
//     friends: [ { name: 'saket', age: 31 }, { name: 'aman', age: 25 } ],
//     favNum: null,
//     birth: { city: 'patna', year: 1989 }
//   }

Object.entries(obj).forEach(([key, values]) => {
  console.log(key, values);
});
