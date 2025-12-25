// Count Occurrences
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a), 0);