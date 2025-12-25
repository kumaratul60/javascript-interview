// Generating a Random Number

const no = Math.random();
console.log(no);
//0.9045660913804647



const no1 = Math.random() * 100;
console.log(no1);
//95.76815468403498

const no2 = Math.floor(Math.random() * 100);
console.log(no2);

// Generating a Random Integer Number in a Specified Interval
function randomNumber(min, max) {
    const result = Math.random() * (max - min) + min;
    return Math.floor(result);
}
const specificLength = randomNumber(10, 29)
console.log("specificLength", specificLength);

//   Generating a Random String of Specific Length

const random = Math.random();
const randomStr = random
console.log(randomStr.toString(16));
console.log(randomStr.toString(32));




// Here is a function generating a random string anywhere between 1 and 10 characters:

const randomString = (length = 10) => {
    return Math
        .random()
        .toString(32)
        .substr(2, length);
};
//   const rStr =randomString()
const rStr = randomString(19)
console.log("rStr", rStr);

//   Generating Large Random Strings

const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getRandomIndex(max) {
    const number = Math.random() * max;
    return Math.floor(number);
}

function toRandomChar() {
    const index = getRandomIndex(chars.length);
    return chars.charAt(index);
}
function randomStringNew(length = 16) {
    const arr = Array(length).fill('');
    return arr
        .map(toRandomChar)
        .join('')
};
console.log(randomStringNew(16))
//pTNQ8yQ1rLAL5nb8

console.log(randomStringNew(32))
//92mlTMW2WyyBncBHy9qWbMpxL4B6KZW6