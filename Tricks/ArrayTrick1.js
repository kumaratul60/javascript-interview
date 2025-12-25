///////////////////////////
// console.log('one');
// setTimeout(function() {
//   console.log('two');
// }, 0);
// Promise.resolve().then(function() {
//   console.log('three');
// })
// console.log('four');

/////////////////////

// var foo = {n: 1};
// var bar = foo;
// foo.x = foo = {n: 2};
// console.log(foo.x);
///////////////////////////////

// var foo = [];
// foo.push(1);
// foo.push(2);
// console.log(foo.length);
//////////////////////

// var foo = "Hello";
// (function() {
//   var bar = " World";
//   alert(foo + bar);
// })();
// alert(foo + bar); // hello world

////////////////

console.log(0.1 + 0.2 == 0.3);
var foo = 10 + "20";
console.log(foo);

function x() {
  console.log(arguments.length);
}
console.log(x);
console.log(x());
console.log(x("a"));
console.log(x("a", "b"));
console.log(x("a", "a"));
console.log(x("a", "b", "c"));
