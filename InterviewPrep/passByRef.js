const arr1 = [1, 2, 3, 4];
// const arr2 =arr1
// const arr2 = [...arr1]
const arr2 = [].concat(arr1);
arr2.push(7);
console.log(arr1);
console.log(arr2);
