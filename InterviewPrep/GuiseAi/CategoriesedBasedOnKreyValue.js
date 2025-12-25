//=== Write a GROUP BY FUNCTION which will take an object and key value which will categorised the object base on that key value and return an Object
const stocks = [
  {
    name: "GM",
    category: "cars",
  },
  {
    name: "TSM",
    category: "chips",
  },
  {
    name: "Tesla",
    category: "cars",
  },
];

// const Result = {
//   cars: [   {name: "GM", category: "cars" }, { name: "Tesla", category: "cars"},],
//   chips: [{name: "TSM", category: "Chips" }]
// }

const stocksIteation = (key, val) => {
  const res = {};
  for (const kIteration of Object.keys(key)) {
    const value = key[kIteration];

    const currObj = val(value);

    if (!res[currObj]) {
      res[currObj] = [];
    }
    res[currObj].push(value);
  }

  return res;
  // console.log(res)
};
const checkRes = stocksIteation(stocks, (cat) => cat.category);
console.log(checkRes);
