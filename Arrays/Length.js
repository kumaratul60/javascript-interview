// writing Length fn

const myLength = (text) => {
  let result = 0;
  for (const anyText in text) result = Number(anyText) + 1;
  // return result

  return { resultFinal: result };
};
const phase = "Hay man, good to see you";
// const prompText = prompt("write text to check length")
const res = myLength(phase);
console.log(res);
