// Implementing Caching/Memoize Function

//  todo: search that ques ans

const square = (a, b) => {
  for (let i = 1; i <= 1000000; i++) {}
  return a * b;
};

console.time("first call");
console.log(square(9467, 7649));
console.timeEnd("first call");

console.time("second call");
console.log(square(9467, 7649));
console.timeEnd("second call");
