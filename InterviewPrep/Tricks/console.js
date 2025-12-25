console.log(typeof typeof 1);
console.log(0.1 + 0.2 == 0.3);
console.log(String.raw`HelloTwitter\nworld`);
let array = [1, 2, 3];
array[6] = 9;
console.log(array[5]);
console.log(1 + "2" + "2");
console.log(3 > 2 > 1);
console.log("This is a string." instanceof String);
console.log(("b" + "a" + +"a" + "a").toLowerCase());
const numbers = [33, 2, 8];
numbers.sort();
console.log(numbers[1]);
console.log(false == "0");
console.log(0.18 - 0.15);
const isTrue = true == [];
const isFalse = true == ![];
console.log(isTrue + isFalse);
//
const arr = [1, 2, 3, 4];
for (let i in arr) console.log(i); // index
for (let j of arr) console.log(j); // element itself
//
console.log('"hello\nAtul!"');
console.log('"hello Atul!"');

console.log(this); // window object

// SSR + SPAs = Universal Apps
console.log("hello" || "world");
console.log("foo" && "bar");
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log(1 + -"1" + "2");
console.log(+"1" + "1" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);
console.log(false == "0");
console.log(false === "0");
console.log("0 || 1 = " + (0 || 1));
console.log("1 || 2 = " + (1 || 2));
console.log("0 && 1 = " + (0 && 1));
console.log("1 && 2 = " + (1 && 2));
var a = {},
  b = { key: "b" },
  c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(a[b]);
/*The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] and a[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b]. */

console.log(
  (function f(n) {
    return n > 1 ? n * f(n - 1) : n;
  })(10)
); //10!=3628800

(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

(function () {
  try {
    throw new Error();
  } catch (x) {
    var x = 1,
      y = 2;
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
var x = 21;
var girl = function () {
  console.log(x);
  var x = 20;
};
girl(); // undefined

console.log(1 < 2 < 3); //t
console.log(3 > 2 > 1); //f
console.log(typeof undefined == typeof NULL);
console.log(typeof NaN === "number"); // logs "true"
console.log(NaN === NaN); // logs "false"

// Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:
// setTimeout inside for loop with IIFE Wrapper

for (var i = 0; i < 5; i++) {
  (function (x) {
    setTimeout(function () {
      console.log(x);
    }, x * 1000);
  })(i); // i is an argument
} // 0-4
//
for (var i = 10; i < 15; i++) {
  function timeout(val) {
    setTimeout(function () {
      console.log(val);
    }, 1000);
  }
  timeout(i);
} // 10-15
//
for (let i = 1; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
} // 5 5 5 5
//
for (var i = 20; i < 25; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
} // 25 25 25 25 25

//---> Output  5,5,5,5,5
function inner() {
  var b; // b is undefined
  b++; // b is NaN
  b = 3; // b is 3
  console.log(b); // output "3"
}
// object clone

var obj1 = { a: 1, b: 2 };
var objclone1 = Object.assign({}, obj1);
console.log(objclone1);
let obj = {
  a: 1,
  b: 2,
  c: {
    age: 30,
  },
};

var objclone = Object.assign({}, obj);
console.log("objclone: ", objclone);

obj.c.age = 45;
console.log("After Change - obj: ", obj); // 45 - This also changes
console.log("After Change - objclone: ", objclone); // 45

//
var j = 0;

with ({
  get a() {
    return ++j;
  },
}) {
  if (a == 1 && a == 2 && a == 3) console.log("wohoo");
}

//
var i = 0;

with ({
  get a() {
    return ++i;
  },
}) {
  if (a !== a) console.log("yep, this is printed.");
}
//
b = [1, 2, 3];
b.join = b.shift;
console.log(b == 1 && b == 2 && b == 3); // true

let k = 0;
let kk = { [Symbol.toPrimitive]: () => ++k };

console.log(kk == 1 && kk == 2 && kk == 3); //true

const tp = {
  num: 0,
  valueOf: function () {
    return (this.num += 1);
  },
};
const equality = tp == 1 && tp == 2 && tp == 3;
console.log(equality); // true

//
(function (n) {
  delete n;
  return n;
})(2);
