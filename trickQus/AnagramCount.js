const str = "cat";

const removeDuplicatesAndSort = [...new Set(str.split(", "))].map((word) =>
  word.split("").sort().join()
);
const numberOfAnagrams =
  removeDuplicatesAndSort.length - [...new Set(removeDuplicatesAndSort)].length;
console.log(numberOfAnagrams);
