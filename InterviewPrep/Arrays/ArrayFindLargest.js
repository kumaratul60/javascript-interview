let num = [1, 5, 58, 10, 56, 25];
let max = [0];
for (let i = 0; i < num.length; i++) {
  let element = num[i];
  if (element > max) max = element;
}
console.log(max);
