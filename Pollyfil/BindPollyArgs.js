let name = {
  fname: "AkumarA",
};
let printName = function (homeTown, state, country) {
  console.log(this.fname, homeTown, state, country);
};
const printMyName = printName.bind(name, "up", "india");
printMyName("brh");

// myBind

Function.prototype.myBind = function () {
  // this -> printName
  let obj = this;
  return function () {
    // printName();
    obj.call(name);
  };
};
const printMyName2 = printName.myBind(name);
// printMyName2();

Function.prototype.myBind1 = function (...args) {
  let obj = this,
    // extracting the params from args by using slice() => it will remove the firt element from list and will return all the rest of element
    params = args.slice(1);
  return function (...args2) {
    // obj.call(...args)
    //  receving params in form of arry again so we can't pass an array as the second argument to the call method so instead of call method we use apply method to pass params as second argument.

    // obj.call(...args[0],params) // wrong way

    obj.apply(args[0], [...params, ...args2]);
  };
};
let printMyName3 = printName.myBind1(name, "up", "india");
printMyName3("brh");
