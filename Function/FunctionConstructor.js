/*
The functions which are created with Function constructor do not create closures to their creation contexts but they are always created in the global scope.
i.e, the function can access its own local variables and global scope variables only. Whereas function declarations can access outer function variables(closures) too.
*/
var a = 100;
function createFunction() {
  var a = 200;
  return new Function("return a;");
}
console.log(createFunction()()); // 100

//////
// function constructor

const user = new User(); // No error

function User() {}
