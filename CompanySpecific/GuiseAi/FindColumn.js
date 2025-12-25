// Given a column title A as appears in an Excel sheet, return its corresponding column number.
// 1 <= |A| <= 100

// Input 1:

//  "A"
// Input 2:

//  "AB"

// Output 1:

//  1
// Output 2:

//  28

function findColumnNumber(column) {
  let res = 0;
  for (let i = 0; i < column.length; i++) {
    const charCode = column.charCodeAt(i);

    if (charCode < 65) return -1;

    res = res * 26 + (charCode - 64);
  }

  return res;
}
const checkAns = findColumnNumber("AAC");
console.log(checkAns);
