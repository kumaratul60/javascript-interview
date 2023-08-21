Array.prototype.myMap = function (callback) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback(this[i]));
  }
  return newArr;
};

function square(x) {
  return x * x;
}

let arr = [1, 2, 5, 6, 8, 0];

// let mappedArray = arr.myMap(square);
// console.log(mappedArray);
let mymap = arr.myMap((x) => x * 2);
console.log(mymap);
