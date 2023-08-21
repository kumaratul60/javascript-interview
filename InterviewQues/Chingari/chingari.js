/*

Given a Javascript array or object, mask all the strings by replacing them with length of that string and mask all the numbers by replacing them with -1.

Input:


{ 
  name: "coder", 
  age: 30, 
  address: { 
    addresslineOne: "something", 
    zip: 560001, 
  }, 
  someArray: ["jan", 2, { month: "march"}, [4]] 
}
Output:


{ 
  name: 5, 
  age: -1, 
  address: { 
    addresslineOne: 9, 
    zip: -1, 
  }, 
  someArray: [3, -1, { month: 5}, [-1]] 
}
*/
(function () {
  for (var i = 10; i >= 0; i--) {
    (function (count) {
      setTimeout(function () {
        console.log(count);
      }, 1000);
    })(i);
  }
})();
