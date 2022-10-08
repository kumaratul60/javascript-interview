var stringIn = "[name@gmail.com]";
var rev = stringIn.replace(/[a-z]+/gi, function (s) {
  return s.split("").reverse().join("");
});
console.log(rev); // [eman@liamg.moc]
