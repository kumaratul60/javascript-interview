// if (depth < 1000 && size small) → recursion else → iterative
/**
 * React render tree → recursion ✅
 * File system crawler → iterative ✅
 * JSON utils (library) → iterative + safe ✅
 */

function printKeys(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      console.log(key);

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        printKeys(obj[key]); // recursive
      }
    }
  }
}

const data = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

printKeys(data);
// a b c d e

function printKeysWithPath(obj, parent = '') {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const path = parent ? `${parent}.${key}` : key;
      console.log(path);

      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        printKeysWithPath(value, path);
      }
    }
  }
}

const dataPath = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
  f: [10, { g: 20 }],
};

printKeysWithPath(data);

/*
a
b
b.c
b.d
b.d.e
f
f.0
f.1
f.1.g
*/

function flatten(obj, parent = '', res = {}) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const path = parent ? `${parent}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        flatten(value, path, res);
      } else {
        res[path] = value;
      }
    }
  }
  return res;
}

/**
 { a: 1, 'b.c': 2, 'b.d.e': 3, 'f.0': 10, 'f.1.g': 20 }
 */

function filterKeys(obj, predicate) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (predicate(key)) console.log(key);

      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        filterKeys(value, predicate);
      }
    }
  }
}

// usage
filterKeys(data, (k) => k.startsWith('d'));

// Iterative

function printKeysIterative(obj) {
  const stack = [obj];

  while (stack.length) {
    const current = stack.pop();

    for (const key in current) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        console.log(key);

        const value = current[key];
        if (value && typeof value === 'object') {
          stack.push(value);
        }
      }
    }
  }
}

function printKeysPathIterative(obj) {
  const stack = [{ value: obj, path: '' }];

  while (stack.length) {
    const { value, path } = stack.pop();

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const newPath = path ? path + '.' + key : key;
        console.log(newPath);

        const child = value[key];
        if (child && typeof child === 'object') {
          stack.push({ value: child, path: newPath });
        }
      }
    }
  }
}

/**
Use recursion when:

Depth is small / predictable (≤ ~1–2k levels)
Logic is naturally hierarchical (tree, DOM, JSON)
You want clean, readable code
Not performance-critical

Avoid recursion when:

Depth can be large / unknown → risk of Maximum call stack exceeded
Data is very big (10k–millions nodes)
You need high performance / low overhead
You must handle circular references
Running in constrained env (browser main thread)
 */
