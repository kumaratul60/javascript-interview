const palindrome = (str) => {
  const rev = str.split(" ").reverse().join("");
  console.log(rev);
  const res = rev === str ? "Yes" : "No";
  console.log(res);
};
palindrome("racecar");

// function palindromeInt(int) {
//   const rev = int.toString().split("").reverse().join("");
//   console.log(parseInt(rev));
// }
// palindromeInt(12605);

// function palindromeIntSign(int) {
//   const res = int.toString().split("").reverse().join();

//   console.log(parseInt(res) * Math.sign(int));
// }
// palindromeIntSign(-3256);
