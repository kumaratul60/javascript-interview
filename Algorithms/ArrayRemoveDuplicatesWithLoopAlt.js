var op = "geeksforgeeks";
var len = op.length;

function removeDuplicate(str, n) {
  // Create a set using String characters
  // excluding '\0'
  const s = new Set();

  // HashSet doesn't allow repetition of elements
  for (let i = 0; i < n; i++) s.add(str[i]);

  // Print content of the set
  for (const v of s) {
    console.log(v);
  }
}

// Driver code

removeDuplicate(op, len);
