const strOP = "who all are coming to the party and merry around in florida";

function myFunction(string) {
  return string.split("").reverse().join("").split(" ").reverse().join(" ");
}
const op = myFunction(strOP);

console.log(op);

// m2

function revM2(str) {
  const reverseWordArr = str
    .split(" ")
    .map((word) => word.split("").reverse().join(""));
  return reverseWordArr.join(" ");
}
const op2 = revM2(strOP);

console.log(op2);

// M3 -> confusion

res3 = "";
res3arr = [];

for (i = 0; i < strOP.length; i++) {
  if (strOP[i] == " ") {
    res3 += res3arr.reverse().join("") + " ";
    res3arr = [];
  } else {
    res3arr.push(strOP[i]);
  }
}
console.log(res3);
