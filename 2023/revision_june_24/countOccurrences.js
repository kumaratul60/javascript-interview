function countFrequencies(array) {
  return array.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

const elements = ["a", "b", "c", "d", "b", "c", "d", "b", "c", "d"];
console.log(countFrequencies(elements));

// lengthy way
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
const occurrencesFr = countFrequencies(myArray);
console.log(occurrences);
