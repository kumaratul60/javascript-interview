// String Split Methods
const strSplit = 'app,sam;vid ';
const res = strSplit.split(',');
const finalRes = strSplit.split(/[,;]/);
console.log({ res, finalRes });

var myString = "An,array,in,a,string,separated,by,a,comma";
var myArray = myString.split(",");
console.log(myArray);

let text = "How are you doing today?";
const myArray1 = text.split(" ");
console.log(myArray1);