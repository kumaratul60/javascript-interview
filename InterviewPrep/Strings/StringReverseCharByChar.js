function flip(str) {
  let temp = "";
  for (let i = 0; i < str.length; i += 2)
    temp += (i + 1 < str.length ? str[i + 1] : "") + str[i];
  return temp;
}
const res = flip("world");
console.log(res); // owlrd

console.log(this); //{}
