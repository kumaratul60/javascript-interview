const fakeShift = function () {
  let newArray = [];

  for (let i = 1; i < this.length; i++) {
    newArray.push(this[i]);
  }

  this.length = 0;
  this.push.apply(this, newArray);
};

Array.prototype.fakeShift = fakeShift;
const arr = [1, 2, 3, 4, 5];

arr.fakeShift();
console.log(arr); // output [2, 3, 4, 5]
