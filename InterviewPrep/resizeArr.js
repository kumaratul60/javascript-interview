let array = [11, 12, 13, 14, 15];
console.log(array.length); //5

array.length = 3;
console.log(array.length); //3
console.log(array); //[11,12,13]

array.length = 0;
console.log(array.length); //0
console.log(array); //[]
