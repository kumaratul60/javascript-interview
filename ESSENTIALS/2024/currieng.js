function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}
const res = add(5)(2)(5)();
console.log(res);
