/**  

Array.splice modifies the original array and returns the array containing the elements deleted.

Array.slice does not modify the original array. It just returns a new array of elements which is a subset of the original array.

*/

/**

Splice is used to modify the content of an array which includes removing elements, replacing existing elements, or even adding new elements to an array.

Using the splice function updates the original array.

*/

// Array.splice signature: arr.splice(fromIndex, itemsToDelete, item1ToAdd, item2ToAdd,...);

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// Removing the elements
const deletedItems = arr.splice(3, 2);
console.log(deletedItems); // [3, 4]
console.log(arr); // [0, 1, 2, 5, 6, 7, 8]

//  Adding new elements

const arrAdd = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const arr2 = arrAdd.splice(2, 0, 100, 101);
console.log(arr2); // [] , since we didn't deleted an element from an array
console.log(arrAdd); // [0, 1, 100, 101, 2, 3, 4, 5, 6, 7, 8]

// Modifying an existing element

const arrMod = [10, 20, 30, 40];
// To replace 30with 100, we write:
const arrMod2 = arrMod.splice(3, 1, 100);
// which means - at index 3, delete 1 element and insert 100
console.log(arrMod2); // [3] as we deleted the element 3 from the array
console.log(arrMod); // 3 gets replaced with 100 in array arr
