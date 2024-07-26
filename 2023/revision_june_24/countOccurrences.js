function countOccurrences(array) {
  const countMap = {};

  // Count occurrences of each number
  for (const number of array) {
    if (countMap[number]) {
      countMap[number]++;
    } else {
      countMap[number] = 1;
    }
  }
  const result = Object.entries(countMap)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return result;
}

const myArray = [1, 2, 3, 2, 4, 2, 5];
const occurrences = countOccurrences(myArray);
console.log(occurrences);
