let numbers = [5, 458, 120, -215, 228, 400, 122205, -85411];
numbers = numbers.sort(function () {
  return Math.random() - 0.5;
});
console.log(numbers);
