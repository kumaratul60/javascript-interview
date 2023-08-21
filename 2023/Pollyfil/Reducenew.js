const fakeReduce = function (callback, accumulator) {
  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i]);
  }
  return accumulator;
};
Array.prototype.fakeReduce = fakeReduce;

const reducer = (previousValue, currentValue) => previousValue + currentValue;

[1, 2, 3].fakeReduce(reducer, 0); // output 6
