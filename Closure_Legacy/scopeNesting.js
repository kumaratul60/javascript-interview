/*
Scopes can be nested
The variables of the outer scope are accessible inside the inner scope
*/

function outerFunc() {
  // the outer scope
  let outerVar = "I am outside!";
  function innerFunc() {
    // the inner scope
    console.log(outerVar); // => logs "I am outside!"
  }
  innerFunc();
}
outerFunc();
