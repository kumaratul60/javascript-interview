// Get the average value of arguments
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4, 5); // 3

// Shuffle an array:
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

// Copy text to clipboard:
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

// Scroll To Top
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" });

// Scroll To Bottom
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });

// Get unique elements of an array:
const getUnique = (arr) => [...new Set(arr)];

// Remove falsy values from array
const removeFalsy = (arr) => arr.filter(Boolean);
removeFalsy([
  0,
  "a string",
  "",
  NaN,
  true,
  5,
  undefined,
  "another string",
  false,
]);
// ['a string', true, 5, 'another string']

// Capitalize text:
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const uppercaseWords = (str) =>
  str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

console.log(uppercaseWords("hello world")); // 'Hello World'

// Get the smallest element of an array:
const getSmallest = (arr) => Math.min(...arr);

// Get the largest element of an array:
const getLargest = (arr) => Math.max(...arr);

// Group an array by an object property:
const groupBy = (arr, property) =>
  arr.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] = acc[key] || [];
    acc[key].push(obj);
    return acc;
  }, {});

// Swap two variables

let a = "foo";
let b = "bar";
console.log(a, b);
[a, b] = [b, a];
console.log(a, b);

// How to Check if Arrays/Objects are Equal
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// How to Sort Elements By Certain Property
const sortBy = (arr, key) =>
  arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
const lessons = [
  { position: 1, name: "Intro" },
  { position: 0, name: "Basics" },
];
sortBy(lessons, "position");

// How to Remove Duplicate Elements
const removeDuplicates = (arr) => [...new Set(arr)];

//  How to Calculate Percent
const calculatePercent = (value, total) => Math.round((value / total) * 100);
const res = calculatePercent;
console.log(res(11, 6));
const resOp = calculatePercent(6, 11);
console.log(resOp);

// Convert a string to camelCase
const toCamelCase = (str) =>
  str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
toCamelCase("background-color"); // backgroundColor
toCamelCase("-webkit-scrollbar-thumb"); // WebkitScrollbarThumb
toCamelCase("_hello_world"); // HelloWorld
toCamelCase("hello_world"); // helloWorld

//  Check if a number is even or odd?
const isEven = (num) => num % 2 === 0;
isEven(2); // true
isEven(1); // false

// Convert RGB color to hex
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
rgbToHex(255, 255, 255); // '#ffffff'

// Clear all cookies

const clearCookies = () =>
  document.cookie
    .split(";")
    .forEach(
      (c) =>
      (document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`))
    );

// Get value of cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Detect dark mode
const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Escape HTML special characters
const escape = (str) =>
  str.replace(
    /[&<>"']/g,
    (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
      m
    ])
  );
escape('<div class="medium">Hi Medium.</div>');
// &lt;div class=&quot;medium&quot;&gt;Hi Medium.&lt;/div&gt

// Generate Hex color
const generateRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
console.log(generateRandomHexColor());

//  pause for a while

const pause = (millis) => new Promise((resolve) => setTimeout(resolve, millis));
const fn = async () => {
  await pause(1000);
  console.log("fatfish"); // 1s later
};
fn();

// Get a random integer between two numbers
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

console.log(random(1, 50)); // 25
random(1, 50); // 34

// How to Get a Random Element ==>  random char of a string
const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];
console.log(getRandomItem("Stray"));

//  Generate a random string?
const randomString = () => Math.random().toString(36).slice(2);
// Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

randomString(); // gi1qtdego0b

//  Truncate a number to a fixed decimal point
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d);
round(1.005, 2); //1.01
round(1.555, 2); //1.56

//  How to Count Number of Occurrences

const countOccurrences = (arr, value) =>
  arr.reduce((a, v) => (v === value ? a + 1 : a), 0);
const pollResponses = ["Yes", "Yes", "No"];
const response = "Yes";

countOccurrences(pollResponses, response); // 2

// How to Wait for a Certain Amount of Time
const newWait = async (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
newWait(2000).then(() => goToSignupPage());

// How to Use the Pluck Property from Array of Objects
const pluck = (objs, key) => objs.map((obj) => obj[key]);
const users = [
  { name: "Abe", age: 45 },
  { name: "Jennifer", age: 27 },
];
pluck(users, "name"); // ['Abe', 'Jennifer']

// How to Insert an Element at a Certain Position
const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];
const items = [1, 2, 4, 5];
// insert the number 3 at index 2:
insert(items, 2, 3); // [1, 2, 3, 4, 5]

// Reverse String
const rev = (str) => str.split("").reverse().join("");

// ////////

// Generate a random number between two values:
const randomNumber = Math.random() * (max - min) + min;

// Check if a number is an integer:
const isInteger = (num) => num % 1 === 0;

// Check if a value is null or undefined:
const isNil = (value) => value === null || value === undefined;

// Check if a value is a truthy value:
const isTruthy = (value) => !!value;

// Check if a value is a falsy value:
const isFalsy = (value) => !value;

// Check if a value is a valid credit card number:
const isCreditCard = (cc) => {
  const regex =
    /(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/;
  return regex.test(cc);
};

// Check if a value is an object:
const isObject = (obj) => obj === Object(obj);

// Check if a value is a function:
const isFunction = (fn) => typeof fn === "function";

// Remove Duplicated from Array
const removeDuplicates1 = (arr) => [...new Set(arr)];

// Check if a value is a promise:
const isPromise = (promise) => promise instanceof Promise;

// Check if a value is a valid email address:

const isEmail = (email) => {
  const regex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return regex.test(email);
};

// Check if a string ends with a given suffix:
const endsWith = (str, suffix) => str.endsWith(suffix);

// Check if a string starts with a given prefix:
const startsWith = (str, prefix) => str.startsWith(prefix);

// Check if a value is a valid URL:

const isURL = (url) => {
  const regex =
    /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
  return regex.test(url);
};

// Check if a value is a valid hexadecimal color code:

const isHexColor = (hex) => {
  const regex = /#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/;
  return regex.test(hex);
};

// Check if a value is a valid postal code:

const isPostalCode = (postalCode, countryCode) => {
  if (countryCode === "US") {
    const regex = /[0-9]{5}(?:-[0-9]{4})?/;
    return regex.test(postalCode);
  } else if (countryCode === "CA") {
    const regex =
      /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] [0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/;
    return regex.test(postalCode.toUpperCase());
  } else {
    // Add regex for other country codes as needed
    return false;
  }
};

// Check if a value is a DOM element:

const isDOMElement = (value) =>
  typeof value === "object" &&
  value.nodeType === 1 &&
  typeof value.style === "object" &&
  typeof value.ownerDocument === "object";

// Check if a value is a valid CSS length (e.g. 10px, 1em, 50%):
const isCSSLength = (value) =>
  /([-+]?[\d.]+)(%|[a-z]{1,2})/.test(String(value));

// Check if a value is a valid date string (e.g. 2022-09-01, September 1, 2022, 9/1/2022):

const isDateString = (value) => !isNaN(Date.parse(value));

// Check if a value is a number representing a safe integer (those integers that can be accurately represented in JavaScript):
const isSafeInteger = (num) => Number.isSafeInteger(num);

// Check if a value is a valid Crypto address:

//Ethereum
const isEthereumAddress = (address) => {
  const regex = /0x[a-fA-F0-9]{40}/;
  return regex.test(address);
};

//bitcoin
const isBitcoinAddress = (address) => {
  const regex = /[13][a-km-zA-HJ-NP-Z0-9]{25,34}/;
  return regex.test(address);
};

// ripple
const isRippleAddress = (address) => {
  const regex = /r[0-9a-zA-Z]{33}/;
  return regex.test(address);
};

// Check if a value is a valid RGB color code

const isRGBColor = (rgb) => {
  const regex =
    /rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\)/;
  return regex.test(rgb);
};

// Quickly create an array of characters from a string:

const string = "abcdefg";
const array12 = [...string];

// Quickly create an object with all the properties and values of another object, but with a different key for each property

const original = { a: 1, b: 2, c: 3 };
const mapped = {
  ...original,
  ...Object.keys(original).reduce(
    (obj, key) => ({ ...obj, [key.toUpperCase()]: original[key] }),
    {}
  ),
};

// Quickly create an array of numbers from 1 to 10

const array = [...Array(10).keys()].map((i) => i + 1);

// Quickly shuffle an array

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Convert an array-like object (such as a NodeList) to an array

const toArray = (arrayLike) => Array.prototype.slice.call(arrayLike);

// Sort Arrays

//Ascending
const sortAscending = (array) => array.sort((a, b) => a - b);

//Descending
const sortDescending = (array) => array.sort((a, b) => b - a);

// Debounce a function

const debounce = (fn, time) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), time);
  };
};

// Open a new tab with a given URL

const openTab = (url) => {
  window.open(url, "_blank");
};

// Get the difference between two dates

const dateDiff = (date1, date2) => Math.abs(new Date(date1) - new Date(date2));

// Generate a random string of a given length

const randomString12 = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// "str" => str
const a2 = "str";
const b2 = a2.split("|^|")[0];
console.log(b2); // str

// ["str"]=> str

const a1 = ["str"];
const b1 = a1.map((res) => res.split("|^|")[0])[0];
console.log(b1); // str
