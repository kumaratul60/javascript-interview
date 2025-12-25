// Array Slice and Splice Examples

// From Slice.js
/*
Copies elements from an array
Returns them as a new array
Doesn't change the original array
Starts slicing from … until given index: array.slice (from, until)
Slice doesn't include "until" index parameter
Can be used both for arrays and strings
Takes exactly 2 arguments

*/
var array = [1, 2, 3, 4, 5];
console.log(array.slice(2));
// shows [3, 4, 5], returned selected element(s).

console.log(array.slice(-2));
// shows [4, 5], returned selected element(s).
console.log(array);
// shows [1, 2, 3, 4, 5], original array remains intact.

var array2 = [6, 7, 8, 9, 0];
console.log(array2.slice(2, 4));
// shows [8, 9]

console.log(array2.slice(-2, 4));
// shows [9]

console.log(array2.slice(-3, -1));
// shows [8, 9]

console.log(array2);
// [ 6, 7, 8, 9, 0 ]

// From Splice.js
/*
Used for adding/removing elements from array
Returns an array of removed elements
Changes the array
For adding elements: array.splice (index, number of elements, element)
For removing elements: array.splice (index, number of elements)
Can only be used for arrays
Takes 'n' number of arguments (a list of new items can be supplied)

*/
var arrayS = [1, 2, 3, 4, 5];
console.log(arrayS.splice(2));
// shows [3, 4, 5], returned removed item(s) as a new array object.

console.log(arrayS);
// shows [1, 2], original array altered.

var array2S = [6, 7, 8, 9, 0];
console.log(array2S.splice(2, 1));
// shows [8]

console.log(array2S.splice(2, 0));
//shows [] , as no item(s) removed.

console.log(array2S);
// shows [6,7,9,0]

var array3S = [11, 12, 13, 14, 15];
console.log(array3S.splice(2, 1, "Hello", "World"));
// shows [13]

console.log(array3S);
// shows [11, 12, "Hello", "World", 14, 15]

//    -5 -4 -3 -2 -1
//     |  |  |  |  |
var array4S = [16, 17, 18, 19, 20];
//  |  |  |  |  |
//  0  1  2  3  4

console.log(array4S.splice(-2, 1, "me"));
// shows  [19]

console.log(array4S);
// shows [16, 17, 18, "me", 20]