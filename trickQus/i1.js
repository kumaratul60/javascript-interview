function ObjectConstructorExample() {
  this.foo = "Object constructor foo";
}
const obj = new ObjectConstructorExample();
const obj1 = Object.create({
  foo: "Object create foo",
});

console.log(obj);
console.log(obj1);
