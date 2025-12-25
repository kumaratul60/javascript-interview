function checkAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const str1Res = str1.toLowerCase().split("").sort().join("");
  const str2Res = str2.toLowerCase().split("").sort().join("");

  return str1Res === str2Res;
}

const res = checkAnagram("hello", "olleh");
console.log({ res }); // Output: { res: true }

function checkAnagram1(str1, str2) {
  if (str1.length !== str2.length) return false;

  const charCount1 = {};
  const charCount2 = {};

  for (let i = 0; i < str1.length; i++) {
    charCount1[str1[i]] = (charCount1[str1[i]] || 0) + 1;
    charCount2[str2[i]] = (charCount2[str2[i]] || 0) + 1;
  }

  for (const char in charCount1) {
    if (charCount1[char] !== charCount2[char]) return false;
  }

  return true;
}

const res1 = checkAnagram1("hello", "olleh");
console.log({ res1 }); // Output: { res: true }
