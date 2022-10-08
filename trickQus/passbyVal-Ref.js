let x = 10; // passbyVal
const y = {
  name: "abc",
  age: 100, // passbyRef
};

const z = (a, b) => {
  a = 20;
  console.log(a);
  b.age = 50; // passbyRef
};
z(x, y);
console.log(x);
console.log(y);
