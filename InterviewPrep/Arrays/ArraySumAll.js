const getSum = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    sum += element;
  }
  return sum;
};
const marks = [10, 120, 45, 12];
const res = getSum(marks);
console.log(res);
