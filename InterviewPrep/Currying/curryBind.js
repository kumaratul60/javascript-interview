let multiply = function (x, y) {
  console.log(x * y);
};
//  we make a copy of  multiply method using bind() and we create more method out of it


let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5);

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5);

let multiplyByFour = multiply.bind(this, 4, 6);
multiplyByFour(5); // ignored

let multiplyByFive = multiply.bind(this);
multiplyByFive(5, 5);
