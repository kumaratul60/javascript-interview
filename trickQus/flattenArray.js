function flattenArray(arr) {
  //   return arr.reduce(function (a, b) {
  //     return a.concat(b);
  //   });

  ////////////////////////////////////////////////
  return [].concat.apply([], arr);
}
const arr1 = [[1, 2], [3, 4], [5, 6], [7, 8], [8]];
const output = flattenArray(arr1);
console.log(output);
