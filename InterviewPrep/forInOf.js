// for ([initialization]; [condition]; [final - expression]) {
//   statement;
// }
for (let i = 0; ; i++) {
  console.log(i);
  if (i > 5) break;
}
// Expected Output:
// 0
// 1
// 2
// 3
// 4
// 5
// 6

// Explanation: The loop breaks when i is larger than 5.

for (let i = 0; i < 10; i++) {
  if (i === 7) continue;
  else console.log(i);
}
// Expected Output:
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 8
// 9
// Explanation: if i is equal to 7, we will skip that i and move on to the next index.

const arr3 = [1, 2, 3, 4, 5];
function printArr3(arr3) {
  for (let i = 0; i < arr3.length; i++) {
    console.log(arr3[i]);
  }
}
console.log(printArr3(arr3));

const obj2 = { a: 1, b: 2, c: 3 };
function printObj2(obj2) {
  for (let prop in obj2) {
    console.log(`prop: ${prop}`);
    console.log(`obj2[prop]: ${obj2[prop]}`);
  }
}
console.log(printObj2(obj2));

const arrOf = [1, 2, 3, 4, 5];
function printArrOf4(arr4) {
  for (let ele of arr4) {
    console.log(ele);
  }
}
console.log(printArrOf4(arrOf));

const name = "Megan";
for (const alphabet of name) {
  console.log(alphabet);
}
// Expected Output:
// M
// e
// g
// a
// n

const arrOf1 = [1, 2, 3, 4, 5];
function printArrOf1(arr1) {
  for (let ele of arr1) {
    console.log(ele);
  }
}
// Expected Output:
// 1
// 2
// 3
// 4
// 5

const obj = {
  name: "Megan",
  age: "do the Math",
  role: "front-end developer",
};
Object.entries(obj);
Object.values(obj);
Object.keys(obj);
// [
// [ ‘name’, ‘Megan’ ],
// [ ‘age’, ‘do the Math’ ],
// [ ‘role’, ‘front-end developer’ ]
// ]
