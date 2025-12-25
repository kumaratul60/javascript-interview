// Array Miscellaneous Examples

// From removeFalsyVal.js
function filteroutFalsyvalues() {
  const arr = [1, 2, "", 3, 4, false, 5, 6, undefined, 7, 8, NaN, 0];
  const output = arr.filter(Boolean);
  console.log(output);
}
filteroutFalsyvalues();

// From resizeArr.js
let array = [11, 12, 13, 14, 15];
console.log(array.length); //5

array.length = 3;
console.log(array.length); //3
console.log(array); //[11,12,13]

array.length = 0;
console.log(array.length); //0
console.log(array); //[]

// From Merge2Arr.js
const a = [1, 2, 3];
const b = [4, 5, 6];

const mArr = [...a, ...b];
console.log(mArr);
const concatArr = a.concat(b);
console.log(concatArr);

// From restvsSpread.js
function add(a, b, ...restExample) {
  console.log(restExample); //5, 6, 7, 8, 9
}
//  list of item converted into array
// rest parameter must be a last form of parameter
add(3, 4, 5, 6, 7, 8, 9);

let spreadExample = [9, 6, 9, 10, 11, 12, 13, 14];
console.log(Math.min(spreadExample)); //NaN

// converting an array into list of items
console.log(Math.min(...spreadExample)); //6

//  Rest parameter must be a last form of parameter , it is a called function
//  Spred parameter must be a first form of parameter, it is a calling function