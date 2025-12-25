const fakeIncludes = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return true;
    }
  }

  return false;
};

Array.prototype.fakeIncludes = fakeIncludes;

[1, 2, 3, 4, 5].fakeIncludes(5); // output true
