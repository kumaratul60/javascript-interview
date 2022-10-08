// Prototype
// Array.prototype.myFuction = function () {
//   console.log(this);
// };

// let arr = [1, 3, 4, 7];
// arr.myFuction();

// Map prototype
// Array.prototype.myMap = function (cb) {
//   let newArray = [];

//   for (let i = 0; i < this.length; i++) {
//     newArray.push(cb(this[i]));
//   }
//   return newArray;
// };

// function square(x) {
//   return x * x;
// }
// let arr = [1, 2, 3, 4];

// let mappedArray = arr.myMap(square);
// console.log(mappedArray);

// Filter prototype

Array.prototype.myFilter = function (cb) {
  let newArray = [];

  for (let i = 0; i < this.length; i++) {
    if (isEven(cb(this[i]))) newArray.push(this[i]);
  }
  return newArray;
};

function isEven(x) {                                                                  
  return x % 2 === 0;
}
let arr = [1, 2, 3, 4, 16, 9, 8];

let filteredArray = arr.myFilter(isEven);
console.log(filteredArray);
