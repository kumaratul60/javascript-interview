const arr = [3, 1, 5, 2, 4];

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

const fakeRes = arr.fakeSort((a, b) => a - b);
console.log({ fakeRes }); // output [1, 2, 3, 4, 5]

/** another way */
Array.prototype.customSort = function (compareFunction) {
  if (!compareFunction) {
    compareFunction = function (a, b) {
      return String(a).localeCompare(String(b));
    };
  }

  for (let i = 0; i < this.length - 1; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (compareFunction(this[i], this[j]) > 0) {
        [this[i], this[j]] = [this[j], this[i]];
      }
    }
  }

  return this;
};

arr.customSort();
console.log({ arr });
