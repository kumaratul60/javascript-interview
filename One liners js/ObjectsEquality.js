// How to Check if Arrays/Objects are Equal

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const r  = isEqual([1, '2'], [1, 2]); // false
const p = isEqual([1, 2], [1, 2]); // true
console.log(r,p);

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // Sort both arrays using the same comparison function
    a.sort();
    b.sort();
  
    // Compare each object in the arrays
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
  
    return true;
  }
  
  // Example usage
  const array1 = [1, 2, 3];
  const array2 = [3, 2, 1];
  const array3 = [1, 2, 4];
  
  console.log(arraysEqual(array1, array2)); // true
  console.log(arraysEqual(array1, array3)); // false



//   

function objectsEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
  
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
  
    if (aKeys.length !== bKeys.length) return false;
  
    // Compare each property in the objects
    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i];
  
      if (a[key] !== b[key]) return false;
    }
  
    return true;
  }
  
  // Example usage
  const obj1 = { a: 1, b: 2, c: 3 };
  const obj2 = { c: 3, b: 2, a: 1 };
  const obj3 = { a: 1, b: 2, c: 4 };
  
  console.log(objectsEqual(obj1, obj2)); // true
  console.log(objectsEqual(obj1, obj3)); // false