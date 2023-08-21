// Polyfill is a short of browser fallback.
//  Polyfill is a peace of code used to provide modern functionality on older browser.

// Traditional bind()
let name = {
  firstName: "Atul",
};

let printName = function () {
  console.log(this.firstName);
};
let printMyName = printName.bind(name);
printMyName();

//////////////
// Polyfill bind():

// if we write function name like this "Function.prototype.functionName()"  it means each and every method in javascript has access to that method

Function.prototype.myBind = function (...args) {
  let obj = this;
  return function () {
    obj.call(args[0]);
    // args[0] is the reference to thename
    // printName can be access bt this keyword
  };
};
let printMyName2 = printName.myBind(name);
printMyName2();
