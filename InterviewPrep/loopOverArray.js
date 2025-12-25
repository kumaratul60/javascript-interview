var data = [1, 2, 3, 4, 5, 6];

// traditional for loop
for (let i = 0; i <= data.length; i++) {
  console.log(data[i]); // 1 2 3 4 5 6
}

// using for...of
for (let i of data) {
  console.log(i); // 1 2 3 4 5 6
}

// using for...in
for (let i in data) {
  console.log(i); // Prints indices for array elements
  console.log(data[i]); // 1 2 3 4 5 6
}

// using forEach
data.forEach((i) => {
  console.log(i); // 1 2 3 4 5 6
});
// NOTE ->  forEach method is about 95% slower than the traditional for loop

// using map
data.map((i) => {
  console.log(i); // 1 2 3 4 5 6
});
console.log("new");
// resuse give sum of array
const numbers = [11, 21, 31, 41, 15];
const sum = numbers.reduce((total, n) => total + n, 0);

console.log(sum);
