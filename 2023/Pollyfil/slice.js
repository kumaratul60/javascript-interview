const fakeSlice = function (start, end) {
  let newArray = [];
  if (!end) {
    for (let i = 0; i < this.length; i++) {
      if (i >= start) {
        newArray.push(this[i]);
      }
    }

    return newArray;
  }

  for (let i = 0; i < this.length; i++) {
    if (i >= start && i <= end) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

Array.prototype.fakeSlice = fakeSlice;

[1, 2, 3, 4, 5].fakeSlice(2, 3); // output [3, 4]
