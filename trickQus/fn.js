// console.log("hello", varName);
// var varName;
// console.log("hello", varName);
// varName = "Namstey";
// console.log("hello", varName);

// fn();
// function fn() {
//   console.log("hello12", varName);
// }
// fn();
// fnContainer();
// var fnContainer = function () {
//   console.log("hello123", varName);
// };
// fnContainer();

// 2

// fn();
// var name = 10;
// fn();
// function fn() {
//   var name = 20;
//   console.log(name);
// }
// fn();

// 3

// console.log("1", varName);
// var varName = 10;

// function b() {
//   console.log("2", varName);
// }
// console.log("3", varName);

// function c() {
//   console.log("4", varName);
//   varName = 21;
//   b();
//   console.log("5", varName);
// }
// c();

//--- 4 -
// ---------var--------------------------------------------------------

// 2015 es6
//  var = fuction scope

// hoisting
// console.log("3", varName);

// // declare
// var varName;
// // assign
// varName = 10;
// console.log("4", varName);
// // reassign
// varName = 30;
// console.log("5", varName);
// var varName;
// console.log("6", varName);

// var checking

// var a = 10;
// console.log("71", a);
// function fvar() {
//   console.log("73", a);
//   var a = 20;
//   a++;
//   console.log("76", a);
//   if (a) {
//     var a = 30;
//     a++;
//     console.log("80", a);
//   }
//   console.log("82", a);
// }
// fvar();
// console.log("71", a);

// Let

// console.log("let");
// // let a = 10;
// // console.log("71", a);
// function flet() {
// //   console.log("73", a);
//   let a = 20;
//   a++;
//   console.log("76", a);
//   if (a) {
//     let a = 30;
//     a++;
//     console.log("80", a);
//   }
//   console.log("82", a);
// }
// flet();
// console.log("71", a);

// const

// console.log("const");
// const a = 10;
// console.log("71", a);
// function fconst() {
//   console.log("73", a);
//   const a = 20;
//   a++;
//   console.log("76", a);
//   if (a) {
//     const a = 30;
//     a++;
//     console.log("80", a);
//   }
//   console.log("82", a);
// }
// fconst();
// console.log("71", a);
