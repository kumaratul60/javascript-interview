// BoomCounter

// for (let i = 10; i >= 0; i--) {
//   setTimeout(function () {
//     console.log(i);
//   }, (10 - i) * 800);
// }

let counter = 0;

function count() {
  return ++counter;
}

count.reset = function () {
  counter = 0;
};

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3

count.reset();

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3
