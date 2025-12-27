const arr = [1, , 2, , 3];

const oriMap = arr.map((i) => i * 2);
console.log(oriMap, 'oriMap');

// `this` === the array the method is called on (left-hand side)
// `this` → left-hand array (arr.map → this === arr)

const fakeMap = function (callback) {
  const newArray = [];

  // 'this' refers to the array
  for (let i = 0; i < this.length; i++) {
    newArray[i] = callback(this[i], i);
  }

  return newArray;
};
Array.prototype.fakeMap = fakeMap;

arr.fakeMap((n) => n + 1); // output [2, 3, 4]

// Best clean version
const myMap3 = function (callback, thisArg) {
  const refArr = [];
  console.log(this, '::this'); // it will return original arr
  for (let i = 0; i < this.length; i++) {
    // refArr.push(callback(thisArg, this[i], i, this)); // [ NaN, NaN, NaN ]
    refArr.push(callback.call(thisArg, this[i], i, this)); // [ 2, 4, 6 ]
  }
  return refArr;
};
Array.prototype.myMap3 = myMap3;
const r = arr.myMap3((i) => i * 2);
console.log(r);

// Best clean version O(N)
Array.prototype.myMap4 = function (callback, thisArg) {
  const len = this.length;
  const res = new Array(len);

  for (let i = 0; i < len; i++) {
    if (i in this) {
      // this check to preserve empty spaces in arr and loop only on arr elements
      res[i] = callback.call(thisArg, this[i], i, this);
    }
  }

  return res;
};
