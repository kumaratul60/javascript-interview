// Callback => Functions are first class citizens in javascript, that means you can take a function and pass it into another function and when you do so, this function which you pass into another function in known as a callback function.
//  callback function gives us the power of asynchronism in js 

// setTimeout(function () {
//   console.log("timer");
// }, 3000);

// function x(y) {
//   console.log("x");
//   y();
// }
// x(function y() {
//   console.log("y");
// });

// function attch() {
//   let count = 0;
//   document
//     .getElementById("clickme")
//     .addEventListener("click me", function xy() {
//       console.log("button click", +count);
//     });
// }
// attch(); // function invocation

function outer() {
  var x = 101;
  function inner() {
    console.log(x);
  }
  // inner();
  return inner;
}
// outer();
outer()();
// var close = outer();
// outer();

// hay to go they are main bra
