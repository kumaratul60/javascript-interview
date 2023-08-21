// Wildcard search

const arr = ["aron", "gtahs", "atul", "pranav", "rohit", "hira"];

// const search = (elem: string, arr: string[]): string[] => {

//     return arr.filter((x) => {
//       return x.includes(elem)? x : null;
//     });

//   }

//   console.log(search("s", arr));

var search = function (elem, arr) {
  return arr.filter(function (x) {
    return x.includes(elem) ? x : null;
  });
};
console.log(search("i", arr));

// timeComplexity: n*n

//////////////////////////
const search1 = (elem, arr) => {
  return arr.filter(function (x) {
    return x.includes(elem) ? x : null;
  });
};
console.log(search1("z", arr));
