/*

Divides a string into substrings
Returns them in an array
Takes 2 parameters, both are optional: string.split(separator, limit)
Doesn’t change the original string
Can only be used for strings

*/
var myString = "An,array,in,a,string,separated,by,a,comma";
var myArray = myString.split(",");
console.log(myArray);

let text = "How are you doing today?";
const myArray1 = text.split(" ");
console.log(myArray1);
