function longestWord(sen) {
  // create filtered array
  const wordArr = sen.toLowerCase().match(/[a-z0-9]+/g);

  // Sort by length
  const sorted = wordArr.sort(function (a, b) {
    // return a.length - b.length; // asending
    return b.length - a.length; // decending
  });
  //   console.log(sorted[0]); // if u want to print first longest word in sentence
  //   console.log(sorted);
  return sorted;
}

const output = longestWord("Hello javaScript is here, kiv,hkjhkjhkhkhk");
console.log(output);
