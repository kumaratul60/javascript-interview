Array.prototype.myReduce = function (callback, initvalue) {
  var finalvalue = 0;
  if (initvalue) {
    finalvalue = finalvalue + initvalue;
  }
  for (let i = 0; i < this.length; i++) {
    finalvalue = finalvalue + callback(this[i], i, this);
  }
  return finalvalue;
};

var arr = [1, 2, 3, 4, 5, 6];

console.log(
  arr.myReduce((item) => {
    return item;
  }, 5)
);
