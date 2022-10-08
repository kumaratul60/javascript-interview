//  map  filter  reduce  --> HigherOrder function -> It takes a funtion as parameter and return a new array.center

//  map

let myArr = [1, 2, 3, 4, 5];

let res = myArr.map(function (x) {
  return x + 1;
});
console.log("map -->", res);

// map with arrow
let myArr1 = [1, 2, 3, 4, 5];

let res1 = myArr1.map((x) => {
  return x * x;
});
console.log("map -->" + res1);

// filter
let myArrFilter = [1, 2, 3, 4, 5];

let resFilter = myArrFilter.filter((x) => {
  return x % 2 === 0;
});
console.log("Filter -->", resFilter);

// Reduce => it return a single value itentity
let myArrReduce = [1, 2, 3, 4, 5];

let resReduce = myArrReduce.reduce((accumulator, x) => {
  return accumulator + x;
}, 0); // accumulator initialized by 0
console.log("Reduce -->", resReduce);
