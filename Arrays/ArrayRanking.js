const array = ["a", "t", "u", "l"];

const ranking = (arr, compFn) =>
  arr.map((a) => arr.filter((b) => compFn(a, b)).length + 1);
const op = ranking(array, (a, b) => a.localeCompare(b) > 0);
console.log(op);
