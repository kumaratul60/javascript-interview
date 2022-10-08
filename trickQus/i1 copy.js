let mynum = 253;
let mynumStr = "253";

console.log(`${mynum} is a number?`, Number.isInteger(mynum));
console.log(`${mynumStr} is a number?`, Number.isInteger(mynumStr));

// Convert Hexadecimal to integer
console.log(0xB) // 11
console.log(0xD) // 13
console.log(0xff) // 255


// Swapping variables
let name = 'Mike';
let fruit = 'Apple';

[fruit, name] = [name, fruit];
console.log(name, fruit);


//  Object destructuring
const user = {
    name: 'Mike',
    age: 25,
    gender: 'M',
    member: false
}

const name = user.name
const gender = user.age

// Object destructuring short
const { name, age, gender, member } = user;

console.log(name)   // Mike
console.log(age)    // 25
console.log(gender) // M
console.log(member) // false



// Avoiding if statements using AND
let isPrime = true;
const startProgramming = () => {
    console.log('Started Programming!');
}
// or
if (isPrime) {
    startProgramming();
}
// or
isPrime && startProgramming();

// Filtering Unique Values
// Note: If your array contains objects, functions, or additional arrays, this method won't work!
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];

console.log(uniqueArray); // Output: [1, 2, 3, 5]


//  .from()
let students = [
    { name: "Rahim", age: 7 },
    { name: "Mac", age: 9 },
    { name: "Bruno", age: 7 },
    { name: "Jucas", age: 9 },
    { name:"Sana", age: 8 },
    { name:"Sara", age: 7 },
],

const studentsNames = Array.from(students, ({name}) => name);
console.log(studentsNames); // returns [“Rahim”, “Mac”, “Bruno”, “Jucas”, “Sana’”,“Sara”]


// Convert to Boolean


console.log(!!""); // Output: false
console.log(!!" "); // Output: true
console.log(!!0); // Output: false
console.log(!!1); // Output: true

// Convert Boolean to number

console.log(+true);  // Return: 1
console.log(+false); // Return: 0

//  Convert to number

let num = "6"
let stringNumber = Number(num);
// or
let int = "16";
int = +int;

console.log(int); // Output: 16
console.log(typeof int); Output: "number"

// Convert to string
let num = 5
let newNum = num.toString();
// or
const val = 3 + "";

console.log(val); // Output: "3"

console.log(typeof val); // Output: "string"


// Shortening "For Loop"

const fruits = ["Apple", "Mango", "Peach"];

for (let i = 0; i < fruits.length; i++) {
  const fruit = fruits[i];
  console.log(fruit);
}

// or
const fruits = ["Apple", "Mango", "Peach"];

for (let fruit of fruits) console.log(fruit);


// Get an Array of all the links in the document
var allLinks = document.links;

// Comma operator

let x = 1;

x = (x++, x);

console.log(x); // expected output: 2

x = (2, 3);

console.log(x); // expected output: 3


// Usage of “e”
console.log( 1e5 ); // 100000
console.log( 3e1); // 30


// How to clone an Object

// for deep cloning an object
var newObj = JSON.parse(JSON.stringify(obj));

// for shallow cloning an object
var newObj = Object.assign({}, obj);


// Division + round down


console.log( 28 >> 1 ); // 14
console.log( 29 >> 1 ); // 14
console.log( 4 >> 1); // 2
console.log( 5 >> 1); // 2


// Use a switch/case statement instead of a series of if/else

function getGroup(age) {  
    var group = "";  
    switch (true) {  
        case isNaN(age):  
            group = "not an age";  
            break;  
        case (age >= 40):  
            group = "Old";  
            break;  
        case (age <= 18):  
            group = "Adult";  
            break;  
        default:  
            group = "Young";  
            break;  
    };  
    return group;  
}  
getGroup(16);  // will return "Adult"



// Getting a random number in a specific range


var x = Math.floor(Math.random() * (max - min + 1)) + min;