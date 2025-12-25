// Convert Number to String and Vice Versa
const toNum = (str) => +str;
const toStr = (num) => num + "";
const numOp = toNum("21");
const strOp = toStr(56);
console.log(typeof numOp);
console.log(typeof strOp);

let pi = 3.14159265359;
console.log(pi);
console.log(typeof pi);
pi = pi.toFixed(2);
console.log(pi);
console.log(typeof pi);