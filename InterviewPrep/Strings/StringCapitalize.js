// Capitalize/Uppercase Strings
var string = "app on ward char";
function res() {
  const arr = string.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const f = arr.join(" ");
  console.log(f);
}
res();

function capitalizeLetter(str) {
  const strArr = str.toLowerCase().split(" ");
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] =
      strArr[i].substring(0, 1).toUpperCase() + strArr[i].substring(1);
  }
  return strArr.join(" ");
}
const output = capitalizeLetter("i love javAScript ");
console.log(output);