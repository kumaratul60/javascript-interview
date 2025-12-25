if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    const flattenedArray = [];

    function flatten(arr, currentDepth) {
      for (let item of arr) {
        if (Array.isArray(item) && currentDepth < depth) {
          flatten(item, currentDepth + 1);
        } else {
          flattenedArray.push(item);
        }
      }
    }

    flatten(this, 1);
    return flattenedArray;
  };
}

// m2

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    if (depth === undefined) {
      depth = 1;
    }

    if (depth === 0) {
      return this.slice();
    }

    const flattenedArray = [];
    for (let item of this) {
      if (Array.isArray(item)) {
        flattenedArray.push(...item.flat(depth - 1));
      } else {
        flattenedArray.push(item);
      }
    }

    return flattenedArray;
  };
}

//
const nestedArray = [1, 2, [3, 4, [5, 6]], 7];
const flattenedArray = nestedArray.flat(2);

console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6, 7]
