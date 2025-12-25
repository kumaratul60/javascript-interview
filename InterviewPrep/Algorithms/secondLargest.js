const arr = ["20", "120", "111", "215", "54", "78"];
const res = arr.sort(function (a, b) {
  return b - a;
})[1];
console.log(res);
