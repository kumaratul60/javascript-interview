function foo1() {
  let a = (b = c = 0);
  a++;
  return a;
}
foo1();
console.log(typeof a);
console.log(typeof b);
console.log(typeof c);

// OR

function foo() {
  let a;
 this.b = 0;
  a =this.b;
  a++;
  return a;
}
foo();
console.log(typeof a);
console.log(typeof this.b);
console.log(typeof c);
