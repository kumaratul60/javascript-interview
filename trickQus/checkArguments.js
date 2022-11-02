function isTwoPassed() {
  var args = Array.prototype.slice.call(arguments);
  return args.indexOf(2) != -1;
}

isTwoPassed(1, 4); //false
isTwoPassed(5, 3, 1, 2); //true
console.log(typeof arguments)