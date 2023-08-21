const fakeFilter = function (callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      newArray.push(this[i]);
    }
  }

  return newArray;
};

Array.prototype.fakeFilter = fakeFilter;

[1, 2, 3, 4, 5].fakeFilter((n) => n > 2); // output [3, 4, 5]
