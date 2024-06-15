/***
 chunk([1,2,3,4,5],1) => [[1],[2],[3],[4],[5]]
  chunk([1,2,3,4,5],2 => [[1,2],[3,4],[5]]
 */

const array = [1, 2, 3, 4, 5];
const chunkNum = 4;
function chunckArr(arr, size) {
  // Check if size is less than or equal to 0
  if (size <= 0) {
    return [];
  }

  // Initialize an empty array to store chunks
  const chunkedArray = [];

  // Loop through the input array
  for (let i = 0; i < array.length; i += size) {
    // Slice the array to get a chunk of size 'size'
    const chunk = array.slice(i, i + size);
    // Push the chunk into the chunkedArray
    chunkedArray.push(chunk);
  }
console.log(chunkedArray);
  return chunkedArray;
}
chunckArr(array, chunkNum);
