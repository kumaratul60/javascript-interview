const wordFreq = (text) => {
  const freq = {};
  const splitText = text.split(" ");
  for (const word of splitText) {
    if (word in freq) freq[word] += 1;
    else freq[word] = 1;
  }
  return freq;
};
const test = "hay ram, what hay";
const res = wordFreq(test);
console.log(res);

// const check = test.split(" ").reverse().join(" ").split("").reverse().join("");
// console.log(check);
