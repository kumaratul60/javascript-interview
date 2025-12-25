// Function Examples

// Call, Apply, Bind from call.js
let person1 = {
  name: "Adam",
  age: 25,
};

let showDetails = function (city, car) {
  console.log(
    `${this.name} is ${this.age} yeals old, lives in ${city} with ${car}`
  );
};

let person2 = {
  name: "Mdam",
  age: 26,
};

showDetails.call(person2, "BRH", "TESLA"); // call with external arguments

showDetails.apply(person2, ["BRH", "TESLA X class"]);

let showDetailsBind = showDetails.bind(person2, "BRH", "TESLA y class");
showDetailsBind();

// Bind Polyfill from Bind Polyfill with function Prototype2.js
let personal1 = {
  name: "Adam",
  age: 25,
};
let showDetailsBindPoly = function (city, state) {
  console.log(this.name, this.age, city, state);
};
let showDetailsBindPolyfill = showDetailsBindPoly.bind(personal1, "BRH");
showDetailsBindPolyfill("UP");

Function.prototype.myBind = function (...args) {
  let object = this;
  params = args.slice(1);
  return function (...args2) {
    object.apply(args[0], [...params, ...args2]);
  };
};

let showDetailsMyBind = showDetailsBindPoly.myBind(personal1, "LKO");
showDetailsMyBind("UP");

// Function Currying from Function currying with bind method.js
function add(a, b) {
  console.log(a + b);
}

let addwith2 = add.bind(this, 5, 6);
addwith2();

function addClosure(x) {
  return function (y) {
    console.log(x + y);
  };
}
let addClosureWith2 = addClosure(2);
addClosureWith2(5);

// Constructor from constructor.js
function car(brand, model, color) {
  this.Brand = brand;
  this.Model = model;
  this.Color = color;

  this.drive = function () {
    console.log("I will drive", this.Brand, this.Model);
  };
}
let car1 = new car("Tesla", "x", "blue");
let car2 = new car("Tesla", "Y", "black");
car1.Brand = "BMW";
car2.Color = "Green";
console.log(car1);
console.log(car2);
car1.drive();

// Loops from loopOverArray.js
var data = [1, 2, 3, 4, 5, 6];

for (let i = 0; i <= data.length; i++) {
  console.log(data[i]);
}

for (let i of data) {
  console.log(i);
}

for (let i in data) {
  console.log(i);
  console.log(data[i]);
}

data.forEach((i) => {
  console.log(i);
});

data.map((i) => {
  console.log(i);
});

const numbers = [11, 21, 31, 41, 15];
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum);

// Max Character from maxCharacter.js
function maxChar(str) {
  const charMap = {};
  str.split("").forEach(function (char) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  });
  return charMap;
}
const outputMax = maxChar("java");
console.log(outputMax);

// Min Max from minMax.js
const marks = [50, 20, 70, 60, 45, 30];
function findMin(arr) {
  return Math.min.apply(null, arr);
}
function findMax(arr) {
  return Math.max.apply(null, arr);
}
console.log(findMin(marks));
console.log(findMax(marks));

// Variables and Scope from fn.js
// (Commented examples for hoisting, var, let, const)

// Simple function from fuctionScope.js
function calculate(a, b) {
  let result = a + b;
  return result;
}
console.log(calculate(1, 5));