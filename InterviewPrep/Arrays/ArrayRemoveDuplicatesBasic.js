
// Remove duplicate values in an array
const removeDuplicates = (arr) => [...new Set(arr)]

console.log(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6]))
// [1, 2, 3, 4, 5, 6]

//using filter
let array = [1, 2, 3, 2, 4, 3, 5];

let filteredArray = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
});

console.log(filteredArray); // Output: [1, 2, 3, 4, 5]

//
let array1 = [1, 2, 3, 2, 4, 3, 5];

let set = new Set(array1);

let newArray = Array.from(set);

console.log(newArray); // Output: [1, 2, 3, 4, 5]

// forEach loop

let array4 = [1, 2, 3, 2, 4, 3, 5];

let uniqueArray = [];

array4.forEach((value) => {
    if (!uniqueArray.includes(value)) {
        uniqueArray.push(value);
    }
});

console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]


// using sort

let array5 = [1, 2, 3, 2, 4, 3, 5, 5, 6];

array5.sort();

let uniqueArray5 = [];

for (let i = 0; i < array5.length; i++) {
    if (array5[i] !== array5[i + 1]) {
        uniqueArray5.push(array5[i]);
    }
}

console.log(uniqueArray5); // Output: [1, 2, 3, 4, 5,6]

//
function getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}

var names = ["John", "Peter", "Clark", "Harry", "John", "Alice"];
var uniqueNames = getUnique(names);
console.log(uniqueNames); // Prints: ["John", "Peter", "Clark", "Harry", "Alice"]


///
function getUnique1(array1) {
    var uniqueArray = [];

    // Loop through array values
    for (var value of array1) {
        if (uniqueArray.indexOf(value) === -1) {
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}

var names = ["John", "Peter", "Clark", "Harry", "John", "Alice"];
var uniqueNames = getUnique1(names);
console.log(uniqueNames); //