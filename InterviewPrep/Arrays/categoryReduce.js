// Array.reduce((accumulator, item, index, array) => {
//    Define the process for each iteration here
// }, initialAccumulatorValue);

const items = [
  { name: "Apple", category: "Fruit" },
  { name: "Onion", category: "Vegetable" },
  { name: "Orange", category: "Fruit" },
  { name: "Lettuce", category: "Vegetable" },
];

const groupedItems = items.reduce((accumulator, item) => {
  const category = item.category;
  if (!accumulator[category]) {
    accumulator[category] = [];
  }
  accumulator[category].push(item.name);
  return accumulator;
}, {});

console.log(groupedItems);
// { Fruit: [ 'Apple', 'Orange' ], Vegetable: [ 'Onion', 'Lettuce' ] }

// remove duplicate

const removeItems = [1, 2, 3, 1, 2, 3, 7, 8, 7];

const noDuplicateItems = removeItems.reduce((accumulator, item) => {
  if (!accumulator.includes(item)) {
    accumulator.push(item);
  }
  return accumulator;
}, []);

console.log(noDuplicateItems);
// [ 1, 2, 3, 7, 8 ]
