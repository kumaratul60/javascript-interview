var str = "google";
function removeDuplicate(string) {
  return string
    .split("")
    .filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join("");
}
const output = removeDuplicate(str);
console.log(output);
