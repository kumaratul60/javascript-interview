Array.prototype.myFunction = function () {
  console.log(this);
};
let arr = [1, 3, 5, 6, 0];
arr.myFunction();
