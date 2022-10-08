function evenOddSum(arr) {
  let evenSum = 0;
  let oddSum = 0;

  arr.forEach((num) => (num % 2 === 0 ? (evenSum += num) : (oddSum += num)));
  return [evenSum, oddSum];
}
const arrSet = [10, 20, 15, 30, 40, 45, 50];
// console.log(evenOddSum(arrSet));
const output = evenOddSum(arrSet);
console.log(output);
