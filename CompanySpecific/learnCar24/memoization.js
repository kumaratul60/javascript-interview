// Implementing Caching/Memoize Function

//  todo: search that ques ans

const square = (a, b) => {
  for (let i = 1; i <= 100000000; i++) {}
  return a * b;
};

const memo = (fn) => {
  let cache = {};
  return function (a, b) {
    const args = `${a},${b}`;
    if (cache[args]) {
      console.log("from cache");
      return cache[args];
    } else {
      console.log("from calculation");
      const result = fn(a, b);
      cache[args] = result;
      return result;
    }
  };
};

const res1 = memo(square);

console.time("first call");
console.log(square(9467, 7649));
console.timeEnd("first call");

console.time("second call");
console.log(square(9467, 7649));
console.timeEnd("second call");

console.log(res1(9467, 7649));
console.log(res1(9467, 7649));
