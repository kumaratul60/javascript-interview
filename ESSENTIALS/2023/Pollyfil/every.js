const fakeEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i])) {
      return false;
    }
  }

  return true;
};

Array.prototype.fakeEvery = fakeEvery;

[1, 2, 3, 4, 5].fakeEvery((n) => n > 3); // output false
