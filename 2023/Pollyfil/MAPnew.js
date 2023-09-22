const fakeMap = function (callback) {
  const newArray = [];

  // 'this' refers to the array
  for (let i = 0; i < this.length; i++) {
    newArray[i] = callback(this[i], i);
  }

  return newArray;
};
Array.prototype.fakeMap = fakeMap;

[1, 2, 3].fakeMap((n) => n + 1); // output [2, 3, 4]

////

const myMap = function (cb) {
  const arrContext = this;
  const newArray = [];
  for (let i = 0; i < arrContext.length; i++) {
    newArray[i] = cb(arrContext[i], i, arrContext);
  }
  return newArray;
};
Array.prototype.myMap = myMap;
const arr = [1, 2, 3, 4, 5];
const op = arr.myMap((r) => r * 2);
console.log({ op }); //{ op: [ 2, 4, 6, 8, 10 ] }

///or

const myMap1 = (arrContext, cb) => {
  const newArray = [];
  for (let i = 0; i < arrContext.length; i++) {
    newArray[i] = cb(arrContext[i], i, arrContext);
  }
  return newArray;
};

Array.prototype.myMap1 = function (cb) {
  return myMap(this, cb);
};

const arr1 = [1, 2, 3, 4, 5];
const op1 = arr1.myMap1((r) => r * 2);
console.log({ op1 });

/// or

const customMap = (arr, callback) => {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(callback(arr[i], i, arr));
  }
  return newArray;
};

const arr2 = [1, 2, 3, 4, 5];

const op2 = customMap(arr2, (item) => item * 2);
console.log({ op2 });
