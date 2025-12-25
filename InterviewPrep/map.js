let nums = [11, 12, 13, 14];
let newArray = nums.map((v, i) => {
  return {
    value: v,
    index: i,
  };
});
console.log(newArray);
