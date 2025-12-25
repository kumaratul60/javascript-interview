function minAddToMakeValid(s) {
  let balance = 0; // Keep track of balance between '(' and ')'
  let additions = 0; // Count the additions needed

  for (let char of s) {
    if (char === "(") {
      balance++;
    } else {
      balance--;
    }

    // If balance goes negative, we have more ')' than '('
    if (balance < 0) {
      additions++;
      balance = 0; // Reset balance
    }
  }

  // Additions for any remaining unmatched '('
  return additions + balance;
}

const s = "())";
console.log(minAddToMakeValid(s)); // 1
