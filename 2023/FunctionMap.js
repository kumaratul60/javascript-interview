/**
Functional programming favors:

* Pure functions instead of shared state & side effects
* Immutability over mutable data
* Function composition over imperative flow control
* Lots of generic, reusable utilities that use higher order functions to act on many data types instead of methods that only operate on their colocated data
* Declarative rather than imperative code (what to do, rather than how to do it)
* Expressions over statements
* Containers & higher order functions over ad-hoc polymorphism


*/

const double = (n) => n * 2;
const doubleMap = (numbers) => numbers.map(double);
console.log(doubleMap([2, 3, 4])); // [ 4, 6, 8 ]

const double2 = (n) => n.points * 2;

const doubleMap2 = (numbers) => numbers.map(double2);

console.log(
  doubleMap2([
    { name: "ball", points: 2 },
    { name: "coin", points: 3 },
    { name: "candy", points: 4 },
  ])
); // [ 4, 6, 8 ]

/**
Declarative vs Imperative
Functional programming is a declarative paradigm, meaning that the program logic is expressed without explicitly describing the flow control.

Imperative programs spend lines of code describing the specific steps used to achieve the desired results — the flow control: How to do things.

Declarative programs abstract the flow control process, and instead spend lines of code describing the data flow: What to do. The how gets abstracted away.

Imperative code frequently utilizes statements. A statement is a piece of code which performs some action. Examples of commonly used statements include for, if, switch, throw, etc…

Declarative code relies more on expressions. An expression is a piece of code which evaluates to some value. Expressions are usually some combination of function calls, values, and operators which are evaluated to produce the resulting value.

*/

// For example, this imperative mapping takes an array of numbers and returns a new array with each number multiplied by 2:

const doubleMap3 = (numbers) => {
  const doubled = [];
  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }
  return doubled;
};

console.log(doubleMap3([2, 3, 4])); // [4, 6, 8]

//This declarative mapping does the same thing, but abstracts the flow control away using the functional Array.prototype.map() utility, which allows you to more clearly express the flow of data:

const doubleMap4 = (numbers) => numbers.map((n) => n * 2);

console.log(doubleMap4([2, 3, 4])); // [4, 6, 8]
