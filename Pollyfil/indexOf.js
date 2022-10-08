const fakeIndexOf = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (item === this[i]) {
      return i;
    }
  }
  return -1;
};

Array.prototype.fakeIndexOf = fakeIndexOf;

[1, 2, 3, 4, 5].fakeIndexOf(4); // output 3
