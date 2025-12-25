// To check if an object is empty or not, we can make use of Object.keys() method.

const obj = {};
console.log(Object.keys(obj).length); // 0
console.log(
  obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
); // true

///////////////////////
// write a function to check object is empty or not
function utilsIsEmptyObject(theVar) {
  return theVar.constructor === Object && Object.keys(theVar).length === 0;
}

let objA = {
  car: "McLaren",
  bike: "Ducati",
};

let objB = {};

let objC = new Date();

let z = {
  // a:5
};
console.log("jj", utilsIsEmptyObject(z));
console.log("jj", utilsIsEmptyObject(z) ? "yes" : "NO");
let statusA = utilsIsEmptyObject(objA) ? "" : "NOT ";
let statusB = utilsIsEmptyObject(objB) ? "" : "NOT ";
let statusC = utilsIsEmptyObject(objC) ? "" : "NOT ";

let msgA = "objA is " + statusA + "empty.";
let msgB = "objB is " + statusB + "empty.";
let msgC = "objC is " + statusC + "empty.";

console.log(msgA + "\n" + msgB + "\n" + msgC);
