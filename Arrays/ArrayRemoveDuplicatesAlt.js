//1st method
let array = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
let uniqueChar = [...new Set(array)];
console.log(uniqueChar);

//2nd way
let chars1 = ['A', 'B', 'A', 'C', 'B'];
let uniqueChars1 = chars1.filter((c, index) => {
    return chars1.indexOf(c) === index;
});
console.log(uniqueChars1);


// 3rd way
let chars2 = ['A', 'B', 'A', 'C', 'B'];
let dupChars2 = chars2.filter((c, index) => {
    return chars2.indexOf(c) !== index;
});
console.log(dupChars2);


//4th way
//Remove duplicates from an array using forEach() and include()
let chars = ['A', 'B', 'A', 'C', 'B'];
let uniqueChars = [];
chars.forEach((c) => {
    if (!uniqueChars.includes(c)) {
        uniqueChars.push(c);
    }
});
console.log(uniqueChars);


//5th way
var removeDuplicatesValue = function (nums) {
    for (let i = 0; i < nums.length;) {
        if (nums[i] == nums[i + 1]) {
            nums.splice(i, 1)
        }
        else {
            i++
        }
    }
    return nums
}
let arrayData = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
removeDuplicatesValue(arrayData)

// ✅ If you need to check for uniqueness based on a single property
const arr = [
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Nick' },
    { id: 2, name: 'Nick' },
];

const uniqueIds = [];

const unique = arr.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
        uniqueIds.push(element.id);

        return true;
    }

    return false;
});

// 👇️ [{id: 1, name: 'Tom'}, {id: 2, name: 'Nick'}]
console.log(unique);

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// ✅ If you need to check for uniqueness based on multiple properties

const arr2 = [
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Nick' },
    { id: 2, name: 'Nick' },
    { id: 2, name: 'Bob' },
];

const unique2 = arr2.filter((obj, index) => {
    return index === arr2.findIndex(o => obj.id === o.id && obj.name === o.name);
});

// [
//   { id: 1, name: 'Tom' },
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Nick' },
//   { id: 2, name: 'Bob' }
// ]
console.log(unique2);