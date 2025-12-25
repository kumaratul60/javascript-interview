//  Sort() function autometically do type convertion

const months = ["march", "jan", "Jun", "Feb", "Dec"];
months.sort();
console.log(months);
// output array is Assending order : [ 'Dec', 'Feb', 'Jun', 'jan', 'march' ]

const arr1 = [1, 1000, 4, 25, 56, 2, 85, 100000];
arr1.sort();
console.log(arr1);
// output arr is [1, 1000, 100000, 2, 25, 4, 56, 85]
/*
The reason behind this is the sort() function which is we using above, will convert values into strings, it will autometically convert array value into string formate then apply the sort the array thats why we are getting ambiguity output 

*/
//  so inorder to use that sort() function we use below approch

var num = [1, 1000, 4, 25, 56, 2, 85, 100000];
// num.sort((a, b) => a - b); // or
num.sort((a, b) => {
  return a - b;
});
console.log(num);
/*
In above sort(a,b) function pick 2 value in each iteration and if return is greater than 0, sort b before a.
If comapareFunction(a,b) returns less than 0, leave a and b unchanged.
If comapareFunction(a,b) returns 0, leave a and b unchanged with respect to each other,

*/

console.log([1, 2] + [3, 4]);
/*
1+2 = 3
"a"+"b" = "ab"
1+"b" = "1b"
"a"+2 = "a2"
[1, 2] + [3, 4] = "1,2"+"3,4" = 1,23,4
1+2+"hay"+[1,2,3] = 3+"hay"+[1,2,3] = "3hay"+[1,2,3] ="3hay"+"1,2,3" =  "3hay1,2,3"


*/

// An array with no keys is falsy value
// falsy values list
// 0,null,undefined,false,NaN,""

var emptyArray = []; // empty array
if (emptyArray) console.log("hay crossFit");
console.log(emptyArray == false); // evaluates true
console.log(emptyArray === false); // evaluates false
