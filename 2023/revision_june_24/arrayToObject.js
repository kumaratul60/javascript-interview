/**
 const arr = [{id:1,name:"Alice"},{id:2,name:"Bob"}]
 output: {
 "1":{id:1,name:"Alice"},
 "2":{id:2,name:"Bob"}
 }
 */

function arrayToObject(arr, key) {
  return arr.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
}

function toObject(arr) {
  let rv = {};
  for (let i = 0; i < arr.length; ++i) rv[i] = arr[i];
  return rv;
}

const testArr = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const output = arrayToObject(testArr, "name");
console.log(output); //{ Alice: { id: 1, name: 'Alice' }, Bob: { id: 2, name: 'Bob' } }

const outputKey = arrayToObject(testArr, "id");
console.log(outputKey); // { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }

console.log(toObject(testArr)); // { '0': { id: 1, name: 'Alice' }, '1': { id: 2, name: 'Bob' } }
