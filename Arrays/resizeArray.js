var array = [1, 2, 3, 4, 5];
console.log(array.length); // 5

array.length = 2;
console.log(array.length); // 2
console.log(array); // [1,2]

var array1 = [1, 2, 3, 4, 5];
array1.length = 0;
console.log(array1.length); // 0
console.log(array1); // []