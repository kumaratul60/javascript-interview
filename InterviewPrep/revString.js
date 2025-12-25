// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Welcome to Programiz!");
function reverseStringByPair(str) {
    let arr = str.split(''); // split into array of characters
    for (let i = 0; i < arr.length; i += 2) { // iterate over array by pairs
        let temp = arr[i]; // swap adjacent characters
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
    return arr.join(''); // join back into string
}

//  without split, reverse join
function reverseString(str) {
    return str === '' ? '' : reverseString(str.slice(1)) + str[0];
}

function reverseWords(str) {
    const allWords = str.split(" ")
    return allWords.map(item => item.split("").reverse().join("")).join(" ")
}

const reverse = str => [...str].reverse().join();
// const reverse = str => [...str].reverse().join``;
console.log(reverse("hello world")); // dlrow olleh
console.log(reverseWords("hello world")); // olleh dlrow
console.log(reverseStringByPair("hello world")); // "ehll oowlrd"

function reverseStringByWords(str) {
    // Split the string into an array of words
    const wordsArr = str.split(" ");

    // Reverse the order of the words in the array
    const reversedArr = wordsArr.reverse();

    // Join the words in the array back into a string
    const reversedStr = reversedArr.join(" ");

    return reversedStr;
}

// Example usage
const str = "Hello world";
const reversedStr = reverseStringByWords(str);
console.log(reversedStr); // "world Hello"

const reverse1 = function (str) {
    var arr = [];

    for (let i = 0, len = str.length; i <= len; i++) {
        arr.push(str.charAt(len - i))
    }

    return arr.join('');
}

console.log(reverse1('I want a 🍺'));


function reversedOf(str) {
    let newStr = '';
    for (let char of str) {
        newStr = char + newStr
        // 1st round: "h" + "" = h, 2nd round: "e" + "h" = "eh" ... etc. 
        // console.log(newStr);
    }
    return newStr;
}
console.log(reversedOf('hello'));


function reverseStr(str) {
    var reversed = "";
    var len = str.length;
    for (var i = 1; i < (len + 1); i++) {
        reversed += str[len - i];
    }

    return reversed;
}

var strReverse = reverseStr("The Car");
console.log(strReverse);
// "raC ehT"

// 
// Using reverse function:
function reverse(str) {
    return str.split('').reverse().join('');
}
//   Looping through characters:

function reverse(str) {
    let reversed = '';

    for (let character of str) {
        reversed = character + reversed;
    }

    return reversed;
}
//   Using reduce function:

function reverse(str) {
    return str.split('').reduce((rev, char) => char + rev, '');
}

//    Traditional for loop(incrementing):

function reverseString(str) {
    let stringRev = "";
    for (let i = 0; i < str.length; i++) {
        stringRev = str[i] + stringRev;
    }
    return stringRev;
}
alert(reverseString("Hello World!"));

// Traditional for loop(decrementing):

function reverseString(str) {
    let revstr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        revstr = revstr + str[i];
    }
    return revstr;
}
alert(reverseString("Hello World!"));

// Using for-of loop

function reverseString(str) {
    let strn = "";
    for (let char of str) {
        strn = char + strn;
    }
    return strn;
}
alert(reverseString("Get well soon"));

// Using the forEach/ high order array method:

function reverseString(str) {

    let revSrring = "";
    str.split("").forEach(function (char) {

        revSrring = char + revSrring;

    });
    return revSrring;
}
alert(reverseString("Learning JavaScript"));

//    ES6 standard:

function reverseString(str) {

    let revSrring = "";
    str.split("").forEach(char => revSrring = char + revSrring);
    return revSrring;
}
alert(reverseString("Learning JavaScript"));
//    The latest way:

function reverseString(str) {

    return str.split("").reduce(function (revString, char) {
        return char + revString;
    }, "");

}

alert(reverseString("Learning JavaScript"));

//  You may also get the result using the following,

function reverseString(str) {

    return str.split("").reduce((revString, char) => char + revString, "");

}
alert(reverseString("Learning JavaScript"));

