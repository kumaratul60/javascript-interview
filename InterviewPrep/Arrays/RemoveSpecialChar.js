let res = "$Gee*k;s..fo, r'Ge^eks?";

function removeSpecialCharacter(str) {
  let s = str.split("");
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    // Store only valid characters
    if ((s[i] >= "A" && s[i] <= "Z") || (s[i] >= "a" && s[i] <= "z")) {
      s[j] = s[i];
      j++;
    }
  }
  return s.join("").substring(0, j);
}

const output = removeSpecialCharacter(res);
console.log(output);
