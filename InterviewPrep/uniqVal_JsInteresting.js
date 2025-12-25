const my_array = [1, 2, 2, 3, 3, 4, 5, 5];
const unique_array = [...new Set(my_array)];
console.log(unique_array); //[1,2,3,4,5]

// //////////////////////////////////////////////////////////////////////////
// array.sort()
const order = ["MEAT", "VEGETABLES", "FRUIT", "SNACKS"];
const items = [
  { name: "peppers", type: "VEGETABLES", price: 2.39 },
  { name: "apples", type: "FRUIT", price: 3.99 },
  { name: "chocolate", type: "SNACKS", price: 3.45 },
  { name: "pork", type: "MEAT", price: 6 },
  { name: "ham", type: "MEAT", price: 4 },
];
items.sort((a, b) => {
  return order.indexOf(a.type) > order.indexOf(b.type);
});
console.table(items, ["type", "name"]);

// //////////////////////////////////////////////////////////////////////////////////
// Filter, every and some on arrays
const order1 = ["MEAT", "VEGETABLES", "FRUIT", "SNACKS"];
let items1 = [
  { name: "peppers", type: "VEGETABLES", price: 2.39 },
  { name: "apples", type: "FRUIT", price: 3.99 },
  { name: "chocolate", type: "SNACKS", price: 3.45 },
  { name: "pork", type: "MEAT", price: 6 },
  { name: "ham", type: "MEAT", price: 7 },
];
items1 = items1.filter((item) => {
  return item.price > 4;
});
console.table(items1);

// ////
// Want to know how many times you’ve console logged something? console.count()
console.count("Hello");
// Hello: 1
console.count("Hello");
// Hello: 2
console.count("Hello");
// Hello: 3

///////////////////////////////////////
// Only print if something is false? console.assert()
const age = 19;
console.assert(age > 17, "User is unable to drive");
// No logs
console.assert(age > 21, "User is below 21");
// Assertion failed: User is below 21

//////////////////////////
// When you want that timer function? Wondering how much time a piece of code takes? How much time does it take? console.time() & console.timeEnd()
console.time("timer1");
console.time("timer2");
setTimeout(() => {
  console.timeEnd("timer1");
}, 1000);

setTimeout(() => {
  console.timeEnd("timer2");
}, 2000);

// /////////////////////////

// Want to display your array or object in a table? — use console.table()
const users = [
  {
    first_name: "Harcourt",
    last_name: "Huckerbe",
    gender: "Male",
    city: "Linchen",
    birth_country: "China",
  },
  {
    first_name: "Allyn",
    last_name: "McEttigen",
    gender: "Male",
    city: "Ambelókipoi",
    birth_country: "Greece",
  },
  {
    first_name: "Sandor",
    last_name: "Degg",
    gender: "Male",
    city: "Mthatha",
    birth_country: "South Africa",
  },
];
console.table(users, ["first_name", "last_name", "city"]);

///////////////////

//  Optional Chaining
const object = {
  family: {
    father: {
      age: 54,
    },
    sister: {
      age: 16,
    },
  },
};
const ageOfFather = object.family.father.age;
console.log(`Age of Father ${ageOfFather}`);
//Age of Father 54
const ageOfBrother = object?.family?.brother?.age;
console.log(`Age of Brother ${ageOfBrother}`);
//Age of Brother undefined

///////////////
// Simplify numbers using underscore
// ES2020
const oneMillion2020 = 1000000;

// ES2021
const oneMillion2021 = 1_000_000;

////////////////////
// String.prototype.replaceAll
const result = "Hello World".replace(/\s/g, "-");
const resultSimple = "Hello World".replaceAll(" ", "-");
console.log(result);
console.log(resultSimple);
