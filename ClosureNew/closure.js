// let x = 100;
// function y() {
//   console.log(x);
// }
// y();

function test() {
  var z = 10;
  function clo() {
    console.log(z);
  }
  clo();
}
test();

//
function Outer() {
  function Inner() {
    console.log("hello1");
  }
  return Inner;
}
let getValue = Outer;
getValue()();
