function add(a) {
  return function (b) {
    // return function () {
    //   return a + b;
    // };

    // implementing infinite
    // checking another param
    if (b) return add(a + b);
    return a;
  };
}
console.log(add(5)(2)(5)());
    