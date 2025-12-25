const revStr = (str) => {
  let rev = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    // console.log(char);
    rev = char + rev;
  }
  return rev;
};
const res = revStr("hello van");
console.log(res);

let numbers = [1, 2, 5, 3, 4];
numbers.sort((a, b) => b - a);
numbers.reverse();
console.log(numbers); // [1, 2, 3, 4 ,5]
