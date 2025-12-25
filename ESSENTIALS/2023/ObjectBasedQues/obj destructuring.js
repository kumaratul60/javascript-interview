// array destructuring
const arr = ["Atul", 1, 2, 3];
const [a, b, ...c] = arr;
console.log(a); //Atul
console.log(b); //1
console.log(c); // [2,3]

// obj destructuring

const obj = {
  name: "Atul",
  age: 25,
};

const { name } = obj;
console.log(name);

// how rename destructured value

const obj1 = {
  name1: "Atul",
  age: 25,
};
const name1 = "Kumar";
const { name1: rename } = obj1;
console.log(name1);

////////////////////////////////////////////////////////////////////////

const nestedObj = {
  name: "Hay",
  age: 25,
  fullName: {
    first: "crossFit",
    lastName: "kumar",
  },
};

const {
  fullName: { first },
} = nestedObj;
console.log(first);

/////////////////////////////////

function getItem(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit];
}

const res = getItem(["Apple", " ", "banana"], "Guava", "grapes");
console.log(res);
