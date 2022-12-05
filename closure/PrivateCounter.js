// function counter() {
//   var _counter = 0;

//   function add(increment) {
//     _counter += increment;
//   }

//   function retrieve() {
//     return "counter = " + _counter;
//   }

//   return {
//     add,
//     retrieve,
//   };
// }

// const c = counter();
// console.log(c.add(5));
// c.add(10);

var private = (function () {
  var counter = 0;
  return {
    add: function (increment) {
      counter += increment;
    },
    retrieve: function () {
      console.log("the counter is currently set to " + counter);
    },
  };
})();

private.add(5);
private.retrieve(); // the counter is currently set to 5
private.add(5);
private.retrieve(); // the counter is currently set to 10
