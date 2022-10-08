const arr = [4];
const finde = (arr = []) => {
  let count = 1;
  if (!arr.length) {
    return count;
  }
  while (arr.indexOf(count) !== -1) {
    count++;
  }
  return count;
};
console.log(finde(arr));
