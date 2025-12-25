function isEven(num) {
  if (num === 0) return false;
  if (num === 1) return true;
  return isEven(num - 2);
}
const res = isEven(2);
console.log({ res });

// find odd even in array

const separateOddEven = (arr) => {
  return arr.reduce(
    (acc, num) => {
      acc[num % 2 === 0 ? "even" : "odd"].push(num);
      return acc;
    },
    { even: [], odd: [] }
  );
};

// anoher way
function separateOddEven1(arr) {
  const oddNumbers = arr.filter((number) => number % 2 !== 0);
  const evenNumbers = arr.filter((number) => number % 2 === 0);

  return {
    odd: oddNumbers,
    even: evenNumbers,
  };
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const { even, odd } = separateOddEven(numbers);
const result = separateOddEven1(numbers);

console.log(result.odd); // Output: [1, 3, 5, 7, 9] (odd numbers)
console.log(result.even); // Output: [2, 4, 6, 8] (even numbers)
