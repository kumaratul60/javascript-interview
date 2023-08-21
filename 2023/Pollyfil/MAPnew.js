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
