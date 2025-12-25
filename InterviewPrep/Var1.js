var c = 1;
var f1 = function () {
  console.log(c);
};
var f2 = function () {
  var c = 2;
  f1();
};
f2();

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 10, d: 5 };
console.log({ ...obj1, d: 4, ...obj2, c: 30 });

const myf1 = () => {
  const a = 2;
  return () => console.log("a is" + a);
};
const a = 1;
const test = myf1();
test();

class x1 {
  get y() {
    return 42;
  }
}
var x21 = new x1();
console.log(x21);
