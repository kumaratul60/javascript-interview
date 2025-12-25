// Input = [ 0,0,1,4,0,8,0,4,0 ]
//  Output = [ 1,4,8,4,0,0,0,0,0 ]

function putAllZeros(arr, n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] != 0) arr[count++] = arr[i];
  }
  while (count < n) arr[count++] = 0;
}
let arrOp = [0, 0, 1, 4, 0, 8, 0, 4, 0];
let len = arrOp.length;
putAllZeros(arrOp, len);
for (let i = 0; i < len; i++) console.log(arrOp[i]);
