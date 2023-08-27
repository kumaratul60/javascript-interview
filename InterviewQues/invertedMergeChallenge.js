function invertMerge(obj1, obj2) {
  let inverted = {};
  let objects = [obj1, obj2];
  for (let obj of objects) {
    for (let key in obj) {
      if (inverted.hasOwnProperty(obj[key])) {
        if (!inverted[obj[key]].includes(key)) {
          inverted[obj[key]].push(key);
        }
      } else {
        inverted[obj[key]] = [key];
      }
    }
  }
  return inverted;
}

let input1 = { A: 1, B: 2, C: 3, D: 1, G: 4 };
let input2 = { A: 1, D: 3, E: 1, F: 2, G: 4 };
const output = invertMerge(input1, input2);
console.log(output);
