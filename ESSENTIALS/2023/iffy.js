/* Immediately  Invoked Function Expression (IIFE)

 syntax: ()()

  when ever we write two IIFE to gether then make sure after one IIFE  use semicolon to end
  ()(); ()();

 IIFE-> Immediately Invoked Function Expression, and it refers to a JavaScript design pattern where a function is defined and executed immediately after its creation.

Use case: This pattern is useful for creating a local scope, encapsulating code, and controlling variable scope and execution order. 

we use use IIFE -> to avoid  pollution of Global Scope context,
 what do you mean by pollution of Global scope: it mean to remove declared variables or other declarations from global scope, that's why I use IIFE

 */


// Named IIFE
(function hello(a, b) {
  const sum = a + b;
  console.log({ sum });
  return sum;
})(2, 3);

(function (a, b) {
  const sum = a + b;
  console.log({ sum });
  return sum;
})(2, 5);

//   Arrow IIFE
((a, b) => {
  const sum = a + b;
  console.log({ sum });
  return sum;
})(2, 6);

(add = (a, b) => {
  const sum = a + b;
  console.log({ sum });
  return sum;
})(2, 8);

(add = function (a, b) {
  const sum = a + b;
  console.log({ sum });
  return sum;
})(2, 10);
