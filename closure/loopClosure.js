// function foo() {
//   for (var i = 0; i < 10; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, 1000);
//   }
// }
//  foo();

for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
