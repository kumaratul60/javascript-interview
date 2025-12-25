//   closures => A function with its lexical environment bind together form a closures.
//  leaxical environment ->  function/varable surrouding state  or function/variable scope or local memory along with reference to the lexical environment of parent.

//  lexical parent => where axctually that function sits inside the code.

// function x() {
//   var a = 7;
//   //   const y = () => {
//   return function y() {
//     console.log(a);
//   };
//   //   y();
//   //   return y;
// }
// var z = x();
// console.log(z); // return function y() itself
// z(); // 7

function x() {
  var a = 7;

  function y() {
    console.log(a); // a is reference not a value
  }
  a = 100;
  return y;
}
var z = x();
console.log(z); // return function y() itself
z(); // 100

//  now when executing z, it will try to findout the reference of a and reeference of a is pointing to 100 that means 100 is still in memory preserved because of closure and when x is gone it was not garbage collected because it has use latter so it giving 100