let multiply = function (x) {
  return function (y) {
    console.log(x * y);
  };
};
let multiplyByTwo = multiply(2);
multiplyByTwo(3);

let multiplyByThree = multiply(22);
multiplyByThree(03);

let multiplyByFour = multiply(022);
multiplyByFour(04);

// Can you write code for this function: sum(a)(b)©….( n)(). This should return the sum of all the numbers a+b+c+..+n.;:
const sum = (a) => (b) => (c) => (d) => (e) => () => a + b + c + d + e;
console.log(sum(1)(2)(3)(4)(5)());
