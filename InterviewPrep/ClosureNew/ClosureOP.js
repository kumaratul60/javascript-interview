// write a function to allow you to do this?

// const createBase = (num) => {
function createBase(num) {
  return function (innerNum) {
    console.log(innerNum + num);
  };
}

var addSix = createBase(6);
addSix(10); //16
addSix(21); //27

// //////////////////////
// time optimization using closure functions
function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  // optimize function
  return function (idx) {
    console.log(a[idx]);
  };
}

const closure = find();
console.time("6");
// find(6);
closure(6);
console.timeEnd("6");
console.time("12");
// find(50)
closure(50);
console.timeEnd("12");

/////////////////////////////////

// function a() {
//   for (var i = 0; i <= 10; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, i * 1000);
//   }
// }
// a()
////////////////

(function () {
  for (var i = 10; i >= 0; --i) {
    function inner(e) {
      setTimeout(function () {
        console.log(e);
      }, e * 1000);
    }
    inner(i);
  }
})();

////////////////////////////////////////////////

(function () {
  for (var i = 10; i >= 0; i--) {
    (function (count) {
      setTimeout(function () {
        console.log(count);
      }, i * 1000);
    })(i);
  }
})();
