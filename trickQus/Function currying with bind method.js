//  function curring using Bind

// Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

//  currying is just transformation of a function that takes multiple arguments into a sequence of nested functions that take a single argument.

// unction f that takes three arguments, you would call it like f(arg1, arg2, arg3). When you use function currying, you would be able to call it like f(arg1)(arg2)(arg3).

function add(a, b) {
  console.log(a + b);
}
// add(2,6)
//  makeing a copy of above fuction w.r.t a constant using bind --> that is fuction currying

// let addwith2 =  add.bind(this,5)
// addwith2(4)

let addwith2 = add.bind(this, 5, 6);
addwith2();

//  function curring using closures

function addClosure(x) {
  return function (y) {
    console.log(x + y);
  };
}
let addClosureWith2 = addClosure(2);
addClosureWith2(5);
