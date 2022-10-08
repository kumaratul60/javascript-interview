function anagram1(str1, str2) {
  return formatStr(str1) === formatStr(str2);
}

function formatStr(str) {
  return str.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("");
}
const output = anagram1("cat", "act"); // post = stop
console.log(output);

// ////
function anagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  } else {
    if (
      str1.toLowerCase().split("").sort().join("") ===
      str2.toLowerCase().split("").sort().join("")
    ) {
      return "Anagram";
    } else {
      return "Not Anagram";
    }
  }
}

console.log(anagram("hello", "olleh"));

