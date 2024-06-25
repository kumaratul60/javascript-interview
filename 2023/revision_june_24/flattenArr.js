const a = [1, 2, 3, [4, [5, 6]], [{ t: "l" }], [7], 8, [9, 10]];
const arr = [[1, [2]], [3, [4, 5]], [6, 7], 8];

// best way
function flattenBest(arr, flattenArr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattenBest(arr[i], flattenArr);
    } else {
      flattenArr.push(arr[i]);
    }
  }
  return flattenArr;
}

// const output = flattenBest(a,[])
// console.log(output);

// optimise way o(1) space
function flattenInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    while (Array.isArray(arr[i])) {
      // Replace the current array element with its elements
      arr.splice(i, 1, ...arr[i]);
    }
  }
  return arr;
}

const flatTest = flattenInPlace(a, 2);

console.log({ flatTest });

//Using while loop with a recursive helper function
function flattenArr(nested) {
  const flat = [];

  function handleFlat(array) {
    let counter = 0;
    while (counter < array.length) {
      const val = array[counter];
      if (Array.isArray(val)) {
        handleFlat(val);
      } else {
        flat.push(val);
      }
      counter++;
    }
  }

  handleFlat(nested);
  return flat;
}

// to enable deep level flatten use recursion with reduce and concat
function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
    : arr.slice();
}

// using Stack
// non recursive flatten deep using a stack
// note that depth control is hard/inefficient as we will need to tag EACH value with its own depth
// also possible w/o reversing on shift/unshift, but array OPs on the end tends to be faster
function stackFlatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

// const output = flattenArr(a);
// const output = a.flat(Infinity);
// const output = flatDeep(a, Infinity);
// const output = stackFlatten(a);
