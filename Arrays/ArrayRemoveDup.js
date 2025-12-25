let number = [1, 2, 5, 2, 4, 5, 2, 4, 9, 8, 8, 7];

let unique = [];
for (let i = 0; i < number.length; i++) {
  let element = number[i];
  let index = unique.indexOf(element);
  if (index == -1) {
    unique.push(element);
  }
}
console.log(number.length);
console.log(unique.length);
console.log(unique);

// M2

const removeDuplicates = (arr) => [...new Set(arr)];
console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 5, 5, 6]));
// Result: [ 1, 2, 3, 4, 5, 6 ]
