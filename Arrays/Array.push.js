const arr = [1, 2, 3, 4];
arr.push(5);
arr.push(6);
console.log(arr);

const arr1 = [5, 6, 7, 8];
const [y] = arr1;
console.log(y);

const arr3 = [1, 2, 3, 4];
arr.length = 0;
console.log(arr3);
// bcoz The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned
