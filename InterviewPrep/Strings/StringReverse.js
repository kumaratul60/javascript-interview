// String Reverse Methods
function reverseStr(str) {
  let rev = "";
  str.split("").forEach(
    (char) =>
      (rev = char + str)
  );
  console.log(rev);
}
reverseStr("hello");

// Various reverse methods
function reverseStringByPair(str) {
    let arr = str.split(''); // split into array of characters
    for (let i = 0; i < arr.length; i += 2) { // iterate over array by pairs
        let temp = arr[i]; // swap adjacent characters
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
    return arr.join(''); // join back into string
}

function reverseString(str) {
    return str === '' ? '' : reverseString(str.slice(1)) + str[0];
}

function reverseWords(str) {
    const allWords = str.split(" ")
    return allWords.map(item => item.split("").reverse().join("")).join(" ")
}

const reverse = str => [...str].reverse().join();
console.log(reverse("hello world")); // dlrow olleh
console.log(reverseWords("hello world")); // olleh dlrow
console.log(reverseStringByPair("hello world")); // "ehll oowlrd"

function reverseStringByWords(str) {
    const wordsArr = str.split(" ");
    const reversedArr = wordsArr.reverse();
    const reversedStr = reversedArr.join(" ");
    return reversedStr;
}
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
    }
    return newStr;
}
console.log(reversedOf('hello'));

function reverseStr2(str) {
    var reversed = "";
    var len = str.length;
    for (var i = 1; i < (len + 1); i++) {
        reversed += str[len - i];
    }
    return reversed;
}
var strReverse = reverseStr2("The Car");
console.log(strReverse);