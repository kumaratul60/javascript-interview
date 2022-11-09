function doSomeMagic(param1, param2) {
  console.log(`${this.name},${this.age},${param1},${param2}`);
}

let obj1 = {
  name: "Atul",
  age: 25,
  //   doSomeMagic: function () {
  //     console.log(`${this.name},${this.age}`);
  //   },
};
let obj2 = {
  name: "Kumar",
  age: 24,
  //   doSomeMagic: function () {
  //     console.log(`${this.name},${this.age}`);
  //   },
};
let obj3 = {
  name: "Awasthi",
  age: 23,
};
let obj4 = {
  name: "Aashu",
  age: 18,
};

// case:1 -> every object has a call method
// obj1.doSomeMagic();
// obj2.doSomeMagic();

// case:2 -> only one object has a call method and rest object are calling from that object

// call
// obj1.doSomeMagic.call(obj2)
// obj1.doSomeMagic.call(obj3)

// case:3=> call method separate from every object, object used that method as function borrowing

doSomeMagic.call(obj1);
doSomeMagic.call(obj2);
doSomeMagic.call(obj3);

// what happen if we add second param.
doSomeMagic.call(obj1, "add", "sub");
doSomeMagic.call(obj2, "mul", "div");
doSomeMagic.call(obj3, "ar", "");

// apply
doSomeMagic.apply(obj2, ["mul", "div"]);

// Bind

let binded = doSomeMagic.bind(obj4, "hay", "men");
binded();
console.log(binded);
