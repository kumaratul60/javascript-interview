// Memoization is a technique where it will return the value if the same input come, so instead of running the function again it will  from the Cache.

const add = (a, b) => {
  return a + b;
};
add(1, 2); //3

// generate unique Key
const propNameFromArg = (fnToAdd, args) => {
  let propKey = [];
  propKey = propKey.concat(fnToAdd.name, args); // ["add",1,2]
  return propKey.join("|");
  // ("add|1|2")
};

// this function decide to call the function or return cache

const memoize = (fnToAdd) => {
  // HOFunction ,
  const memoCache = {}; // {Key:value} {"add|1|2":3}, |-> delimiter

  return function (...args) {
    // in out case args is 1,2
    const propName = propNameFromArg(fnToAdd, args);
    if (!memoCache[propName]) {
      // call the function and do computation
      memoCache[propName] = fnToAdd(...args);
    } else {
      //  if present the just return that value
      console.log("from cache");
    }
    return memoCache[propName];
  };
};

const cacheOutput = memoize(add);

// if we call the above function again then function will not run again, so output will come from the Cache

console.log(add(1, 2)); // 3 from the Cache
console.log(cacheOutput(1, 2));
console.log(cacheOutput(4, 2));
console.log(cacheOutput(5, 2));
console.log(cacheOutput(1, 2));
