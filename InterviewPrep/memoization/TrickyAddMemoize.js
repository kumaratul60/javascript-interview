const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let cacheKey = args.map((n) => n.toString() + "+").join("");
    if (cacheKey in cache) {
      console.log("Fetching from cache");
      return cache[cacheKey];
    } else {
      console.log("Calculating result");
      let result = args.reduce((acc, curr) => fn(acc, curr), 0);
      cache[cacheKey] = result;
      return result;
    }
  };
};

const add = (a, b) => a + b;

const memoizeAdd = memoize(add);
console.log(memoizeAdd(321, 500)); // calculated
console.log(memoizeAdd(321, 500)); // cached
