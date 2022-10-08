// flatten a nested array
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// We are going to write a recursive function i.e the function which calls itself to flatten a nested array

// We are going to loop through the array and check if the item is an array
// If it is, we are going to loop through that item by passing that to the function
// If it is not then we will push it to another array(blank initially)

function Flat(myArray, newArray = []) {
  //   for (let i = 0; i < myArray.length; i++) {
  for (let i of myArray.length) {
    if (Array.isArray(myArray[i])) {
      // We are using isArray method of Array Prototype
      Flat(myArray[i], newArray); // call the function again with the current array in myArray[i];
    } else {
      newArray.push(myArray[i]);
      // if myArray[i] isn't a array, push it to new array
    }
  }
  return newArray;
}

//    or

function flat(myArray, newArray = [arr]) {
  myArray.forEach((item) =>
    Array.isArray(item) ? flat(item, newArray) : newArray.push(item)
  );
  return newArray;
}

var Array = ["john doe", "naomi kims", "dan jones", "ravi ks"];

const res = Array.filter(function (item) {
  return item === "john doe";
})[0];
const findRes = Array.find(function (item) {
  return item === "john doe";
});
console.log(findRes);
const everyRes = Array.every(function (item) {
  return item === "john doe";
});

console.log(everyRes);
const everyMap = Array.map(function (item) {
  return item === "john doe";
});

console.log(everyMap);
const everyMapI = Array.map(function (item) {
  return item;
});

console.log(everyMapI);
const everyReduse = Array.reduce(function (item) {
  return item === "john doe";
});

console.log(everyReduse);
