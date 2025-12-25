Array.prototype.myFilter = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (check(this[i])) newArr.push(this[i]);
  }
  return newArr;
};
function check(x) {
  return x % 2 === 0;
}
let arr = [1, 2, 5, 6, 8, 9, 7, 4];
let filteredArr = arr.myFilter(check);
console.log(filteredArr);
