const fakeSort = function (callback) {
  const newArray = [...this];

  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray.length - 1; j++) {
      if (callback(newArray[j], newArray[j + 1]) > 0) {
        const temp = newArray[j + 1];
        newArray[j + 1] = newArray[j];
        newArray[j] = temp;
      }
    }
  }

  // array is sorted
  return newArray;
};

Array.prototype.fakeSort = fakeSort;

[3, 5, 1, 4, 2].fakeSort((a, b) => a - b); // output [1, 2, 3, 4, 5]
