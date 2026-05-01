/**
 * COMPREHENSIVE GUIDE TO REMOVING DUPLICATES FROM ARRAYS AND STRINGS
 * 
 * This file consolidates various methods to remove duplicates, ranging from 
 * modern ES6 techniques to legacy loop-based approaches.
 * 
 * PERFORMANCE SUMMARY:
 * - Set/Map/Object Tracking: O(n) Time | O(n) Space (Recommended)
 * - Filter/IndexOf/Includes: O(n^2) Time | O(n) Space (Slow for large arrays)
 * - Sort + Loop: O(n log n) Time | O(1) or O(n) Space
 */

// ==========================================
// 1. SET METHOD (Most Efficient & Readable)
// ==========================================
// Time Complexity: O(n) | Space Complexity: O(n)

// Method 1.1: Using Spread Operator
const removeDuplicatesWithSetSpread = (inputArray) => [...new Set(inputArray)];
console.log("Set (Spread):", removeDuplicatesWithSetSpread([1, 2, 3, 3, 4, 4, 5, 5, 6])); 
// [ 1, 2, 3, 4, 5, 6 ]

// Method 1.2: Using Array.from()
let mixedNumbers = [1, 2, 3, 2, 4, 3, 5];
let uniqueNumbersFromSet = Array.from(new Set(mixedNumbers));
console.log("Set (Array.from):", uniqueNumbersFromSet); 
// [1, 2, 3, 4, 5]


// ==========================================
// 2. REDUCE METHOD (Common Interview Question)
// ==========================================
// Time Complexity: O(n^2) due to includes() | Space Complexity: O(n)

const removeDuplicatesWithReduce = (arr) => {
    return arr.reduce((accumulator, current) => {
        // Only push if it's not already in the accumulator
        return accumulator.includes(current) ? accumulator : [...accumulator, current];
    }, []);
};
console.log("Reduce + Includes:", removeDuplicatesWithReduce([1, 1, 2, 3, 3]));


// ==========================================
// 3. MAP / OBJECT TRACKER (High Performance)
// ==========================================
// Time Complexity: O(n) | Space Complexity: O(n)
// Best for large datasets where Set might not be supported or custom logic is needed.

function removeDuplicatesWithTracker(arr) {
    const tracker = {};
    return arr.filter(item => {
        if (tracker.hasOwnProperty(item)) {
            return false; // Duplicate found, filter it out
        }
        tracker[item] = true; // Mark as seen
        return true;
    });
}
console.log("Object Tracker:", removeDuplicatesWithTracker(['apple', 'orange', 'apple']));


// ==========================================
// 4. FILTER METHOD
// ==========================================
// Time Complexity: O(n^2) due to indexOf() | Space Complexity: O(n)

// Method 4.1: Filter + IndexOf (Common approach)
let duplicateIntegers = [1, 2, 3, 2, 4, 3, 5];
let filteredUniqueArray = duplicateIntegers.filter((value, index, self) => {
    // Keep only the first occurrence (where index matches first found index)
    return self.indexOf(value) === index;
});
console.log("Filter + IndexOf:", filteredUniqueArray); 

// Method 4.2: Filter to get ONLY the duplicates
let letterList = ['A', 'B', 'A', 'C', 'B'];
let extractedDuplicates = letterList.filter((char, index) => {
    return letterList.indexOf(char) !== index;
});
console.log("Only Duplicates:", extractedDuplicates); 


// ==========================================
// 5. FOREACH & INCLUDES
// ==========================================
// Time Complexity: O(n^2) | Space Complexity: O(n)

let inputNumbersForCheck = [1, 2, 3, 2, 4, 3, 5];
let uniqueArrayViaForEach = [];

inputNumbersForCheck.forEach((number) => {
    if (!uniqueArrayViaForEach.includes(number)) {
        uniqueArrayViaForEach.push(number);
    }
});
console.log("forEach + includes:", uniqueArrayViaForEach); 


// ==========================================
// 6. SORTING METHOD
// ==========================================
// Time Complexity: O(n log n) | Space Complexity: O(1) (if in-place) or O(n)

let unsortedIntegers = [1, 2, 3, 2, 4, 3, 5, 5, 6];
unsortedIntegers.sort(); // Sorting brings duplicates together

let uniqueArrayViaSort = [];
for (let i = 0; i < unsortedIntegers.length; i++) {
    // Check if the current element is different from the next
    if (unsortedIntegers[i] !== unsortedIntegers[i + 1]) {
        uniqueArrayViaSort.push(unsortedIntegers[i]);
    }
}
console.log("Sort + Comparison:", uniqueArrayViaSort);


// ==========================================
// 7. IN-PLACE REMOVAL (Modifying Original Array)
// ==========================================
// Time Complexity: O(n^2) due to splice() shifting elements | Space Complexity: O(1)

/**
 * Removes duplicates from a sorted array in-place.
 */
const removeDuplicatesInPlace = function (sortedList) {
    for (let i = 0; i < sortedList.length;) {
        if (sortedList[i] === sortedList[i + 1]) {
            sortedList.splice(i, 1); // Remove the element and stay at same index
        } else {
            i++; // Move to next index
        }
    }
    return sortedList;
};
let sortedRedundantNumbers = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log("In-place (Splice):", removeDuplicatesInPlace(sortedRedundantNumbers));


// ==========================================
// 8. REMOVING DUPLICATES FROM OBJECTS
// ==========================================

// Method 8.1: Based on a single property (e.g., 'id') - O(n) using Set
const employeeList = [
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Nick' },
    { id: 2, name: 'Nick' },
];

const processedIds = new Set();
const uniqueEmployeesById = employeeList.filter(employee => {
    if (processedIds.has(employee.id)) return false;
    processedIds.add(employee.id);
    return true;
});
console.log("Objects (Single Prop):", uniqueEmployeesById);

// Method 8.2: Based on multiple properties (e.g., 'id' AND 'name') - O(n^2)
const contactList = [
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Alice' },
];

const uniqueContacts = contactList.filter((contact, index) => {
    return index === contactList.findIndex(entry => 
        contact.id === entry.id && contact.name === entry.name
    );
});
console.log("Objects (Multi Prop):", uniqueContacts);


// ==========================================
// 9. STRINGS & CASE-INSENSITIVE DEDUPLICATION
// ==========================================

// Method 9.1: Standard String Deduplication
const removeStrDup = (str) => [...new Set(str)].join('');
console.log("String Unique:", removeStrDup("google"));

// Method 9.2: Case-Insensitive Deduplication
function uniqueCaseInsensitive(arr) {
    const seen = new Set();
    return arr.filter(item => {
        const lower = item.toLowerCase();
        if (seen.has(lower)) return false;
        seen.add(lower);
        return true;
    });
}
console.log("Case-Insensitive:", uniqueCaseInsensitive(['Apple', 'apple', 'BANANA', 'banana']));


// ==========================================
// 10. GENERATOR FUNCTION VARIANT (Lazy Evaluation)
// ==========================================
// Great for very large arrays where you might stop early.

function* uniqueGenerator(arr) {
    const seen = new Set();
    for (const item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            yield item;
        }
    }
}
const gen = uniqueGenerator([1, 2, 2, 3, 4, 4, 5]);
console.log("Generator Variant:", [...gen]);
