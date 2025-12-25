function maxChar(str) {
  const charMap = {};
  str.split("").forEach(function (char) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  });
  return charMap;
}

const output = maxChar("java");
console.log(output);
