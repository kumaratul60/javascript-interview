const flateArr = (arr) => {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flateArr(item) : item);
  }, []);
};
flateArr([5, 235, [12, [13], 11], [10], 54, 50]);
