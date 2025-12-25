// closure -> A function along with a reference to its outer environment bundle together forms closure.

function outer() {
  var a = 10;
  function inner() {
    console.log(a);
  }
  return inner;
}
outer()();
