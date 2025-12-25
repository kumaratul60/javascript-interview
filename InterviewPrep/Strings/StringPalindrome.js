// Palindrome Check
const palindrome = (str) => {
  const rev = str.split(" ").reverse().join("");
  console.log(rev);
  const res = rev === str ? "Yes" : "No";
  console.log(res);
};
palindrome("racecar");