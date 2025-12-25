function z() {
  var b = 500;
  function x() {
    var a = 7;
    function y() {
      console.log(a, b);
    }
    y();
  }
  x();
}
z();

// closure ->  A function with its lexical environment(local memory alog with reference of its parent(lexical parent -> where actually function sits inside the code) bind together or bundle together forms a closure)

//  use case of closure

/*
 * Module designe pattern
 * Currying
 * Functions like once
 * Memoize
 * Maintaining state is async world
 * setTimeouts
 * Iterators
 * and many more...
 */
