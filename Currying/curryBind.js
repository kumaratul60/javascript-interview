let multyply = function (x, y) {
  console.log(x * y);
};
//  we make a coppy of  multiply method using bind() and we create more method out of it


let multyplyByTwo = multyply.bind(this, 2);
multyplyByTwo(5);

let multyplyByThree = multyply.bind(this, 3);
multyplyByThree(5);

let multyplyByFour = multyply.bind(this, 4, 6);
multyplyByFour(5); // ignored

let multyplyByFive = multyply.bind(this);
multyplyByFive(5, 5);
