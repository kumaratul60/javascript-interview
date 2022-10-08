const arr = [
  {
    a: 4,
  },
  {
    a: 5,
  },
  {
    a: 6,
    b: 3,
  },
  {
    a: 7,
  },
  {
    a: 8,
  },
  {
    a: 9,
    b: 21,
  },
];

let res = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i].a % 3 === 0 && arr[i].b % 3 === 0) {
    res.push(arr[i]);
  }
}
console.log(res);
