/**  

Array.splice modifies the original array and returns the array containing the elements deleted.

Array.slice does not modify the original array. It just returns a new array of elements which is a subset of the original array.

*/
/**

While splice can also insert and update elements of an array, the slice function is used only to remove elements from an array.
We can only delete elements from an array using the slice function

Array.slice signature

arr.slice(startIndex, endIndex);

startIndex — The starting index for the sliced array we need to get with startIndex included.
endIndex (optional) — The ending index up to which the slicing is to be done, with endIndex excluded.

*/

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// To get a slice of an array from values [2, 3, 4, 5], we write:
const slicedArr = arr.slice(2, 6);
console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8]
console.log(slicedArr); // [2, 3, 4, 5]

/**

** final thought
The variable arr remains the same after the execution of the slice statement, whereas the splice statement was updating the actual array.
So, if we want to update the original array, we use the splice function but if we only want a portion of an array, we use slice.
*/

