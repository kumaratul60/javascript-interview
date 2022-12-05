const charFreq = (text) => {
  const freq = {};
  for (const letter of text) {
    if (letter in freq) freq[letter] += 1;
    else freq[letter] = 1;
  }
  return freq;
};
const test = "hello bera";
const res = charFreq(test);
console.log(res);
