var value = 10;
const obj = {
  value: 0,
  val: this.value,
  fun: function () {
    return this.value;
  },
  func: () => {
    return this.value;
  },
  iffe: (function () {
    return this.value;
  })(),
};

console.log(obj.val); //10
console.log(obj.fun()); //0
console.log(obj.func()); //10
console.log(obj.iffe); //10
