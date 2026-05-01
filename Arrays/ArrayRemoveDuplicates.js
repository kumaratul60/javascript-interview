/**
 * COMPREHENSIVE GUIDE TO REMOVING DUPLICATES FROM ARRAYS AND STRINGS
 *
 * This file consolidates various methods to remove duplicates, ranging from
 * modern ES6 techniques to legacy loop-based approaches.
 */

// ==========================================
// 1. SET METHOD (Modern & Most Efficient ES6+)
// ==========================================

// Method 1.1: Using Spread Operator
const removeDuplicatesWithSetSpread = (inputArray) => [...new Set(inputArray)];
console.log('Set (Spread):', removeDuplicatesWithSetSpread([1, 2, 3, 3, 4, 4, 5, 5, 6]));
// [ 1, 2, 3, 4, 5, 6 ]

// Method 1.2: Using Array.from()
let mixedNumbers = [1, 2, 3, 2, 4, 3, 5];
let uniqueNumbersFromSet = Array.from(new Set(mixedNumbers));
console.log('Set (Array.from):', uniqueNumbersFromSet);
// [1, 2, 3, 4, 5]

// ==========================================
// 2. FILTER METHOD
// ==========================================

// Method 2.1: Filter + IndexOf (Common approach)
let duplicateIntegers = [1, 2, 3, 2, 4, 3, 5];
let filteredUniqueArray = duplicateIntegers.filter((value, index, self) => {
  return self.indexOf(value) === index;
});
console.log('Filter + IndexOf:', filteredUniqueArray);
// [1, 2, 3, 4, 5]

// Method 2.2: Filter to get ONLY the duplicates (Complementary)
let letterList = ['A', 'B', 'A', 'C', 'B'];
let extractedDuplicates = letterList.filter((char, index) => {
  return letterList.indexOf(char) !== index;
});
console.log('Only Duplicates:', extractedDuplicates);
// ['A', 'B']

// ==========================================
// 3. FOREACH & INCLUDES / INDEXOF
// ==========================================

let inputNumbersForCheck = [1, 2, 3, 2, 4, 3, 5];
let uniqueArrayViaForEach = [];

inputNumbersForCheck.forEach((number) => {
  if (!uniqueArrayViaForEach.includes(number)) {
    uniqueArrayViaForEach.push(number);
  }
});
console.log('forEach + includes:', uniqueArrayViaForEach);
// [1, 2, 3, 4, 5]

// ==========================================
// 4. BASIC LOOP APPROACHES
// ==========================================

// Method 4.1: Standard For Loop + indexOf
function removeDuplicatesBasicLoop(collection) {
  let uniqueResult = [];
  for (let i = 0; i < collection.length; i++) {
    if (uniqueResult.indexOf(collection[i]) === -1) {
      uniqueResult.push(collection[i]);
    }
  }
  return uniqueResult;
}
let participantNames = ['John', 'Peter', 'Clark', 'Harry', 'John', 'Alice'];
console.log('For Loop + IndexOf:', removeDuplicatesBasicLoop(participantNames));

// Method 4.2: For...of Loop
function removeDuplicatesWithForOfLoop(collection) {
  let uniqueResult = [];
  for (let element of collection) {
    if (uniqueResult.indexOf(element) === -1) {
      uniqueResult.push(element);
    }
  }
  return uniqueResult;
}
console.log('For...of Loop:', removeDuplicatesWithForOfLoop(participantNames));

// ==========================================
// 5. SORTING METHOD
// ==========================================

let unsortedIntegers = [1, 2, 3, 2, 4, 3, 5, 5, 6];
unsortedIntegers.sort(); // Sorting brings duplicates together

let uniqueArrayViaSort = [];
for (let i = 0; i < unsortedIntegers.length; i++) {
  if (unsortedIntegers[i] !== unsortedIntegers[i + 1]) {
    uniqueArrayViaSort.push(unsortedIntegers[i]);
  }
}
console.log('Sort + Comparison:', uniqueArrayViaSort);

// ==========================================
// 6. IN-PLACE REMOVAL (Modifying Original Array)
// ==========================================

/**
 * Removes duplicates from a sorted array in-place.
 * @param {Array} sortedList
 * @returns {Array} The modified original array
 */
const removeDuplicatesInPlace = function (sortedList) {
  for (let i = 0; i < sortedList.length; ) {
    if (sortedList[i] === sortedList[i + 1]) {
      sortedList.splice(i, 1); // Remove the element at index i
    } else {
      i++;
    }
  }
  return sortedList;
};
let sortedRedundantNumbers = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log('In-place (Splice):', removeDuplicatesInPlace(sortedRedundantNumbers));

// ==========================================
// 7. REMOVING DUPLICATES FROM OBJECTS
// ==========================================

// Method 7.1: Based on a single property (e.g., 'id')
const employeeList = [
  { id: 1, name: 'Tom' },
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Nick' },
  { id: 2, name: 'Nick' },
];

const processedIds = [];
const uniqueEmployeesById = employeeList.filter((employee) => {
  const isAlreadyPresent = processedIds.includes(employee.id);
  if (!isAlreadyPresent) {
    processedIds.push(employee.id);
    return true;
  }
  return false;
});
console.log('Objects (Single Prop):', uniqueEmployeesById);

// Method 7.2: Based on multiple properties (e.g., 'id' AND 'name')
const contactList = [
  { id: 1, name: 'Tom' },
  { id: 1, name: 'Tom' },
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Nick' },
  { id: 2, name: 'Nick' },
  { id: 2, name: 'Bob' },
];

const uniqueContactsByMultipleProps = contactList.filter((contact, currentIndex) => {
  return currentIndex === contactList.findIndex((entry) => contact.id === entry.id && contact.name === entry.name);
});
console.log('Objects (Multi Prop):', uniqueContactsByMultipleProps);

// ==========================================
// 8. REMOVING DUPLICATES FROM STRINGS
// ==========================================

// Method 8.1: Using Set for String
function removeDuplicatesFromStringUsingSet(text) {
  const uniqueCharsSet = new Set();
  for (let i = 0; i < text.length; i++) {
    uniqueCharsSet.add(text[i]);
  }

  let resultString = '';
  for (const char of uniqueCharsSet) {
    resultString += char;
  }
  return resultString;
}
console.log('String (Set):', removeDuplicatesFromStringUsingSet('geeksforgeeks'));

// Method 8.2: Using Filter for String
function removeDuplicatesFromStringUsingFilter(text) {
  return text
    .split('')
    .filter((char, index, self) => {
      return self.indexOf(char) === index;
    })
    .join('');
}
console.log('String (Filter):', removeDuplicatesFromStringUsingFilter('google'));
