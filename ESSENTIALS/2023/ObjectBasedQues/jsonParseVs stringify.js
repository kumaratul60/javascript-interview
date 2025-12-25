// json parse vs json stringify

const obj = {
  name: "Atul",
  age: 25,
};
const jsonStr = JSON.stringify(obj);
console.log(jsonStr); // conversion from json to string
const jsonParse = JSON.parse(jsonStr);
console.log(jsonParse); // conversion from string to json

console.log(typeof jsonParse); //  object
console.log(typeof jsonStr); // string
console.log(typeof JSON); // object
console.log(typeof obj["name"]); // string

// where we can use JSON stringify or parse ?
// => to store something like localStorage

localStorage.setItem("test", jsonStr);
const getLocalStorage = localStorage.getItem("test");
const getLocalStorageInParseForm = JSON.parse(localStorage.getItem("test"));
console.log(getLocalStorage);
