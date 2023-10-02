// Prototype inheritance allows an object to inherit properties and methods from another object. Each object in JavaScript has an associated prototype object, and properties and methods can be shared and inherited through this prototype chain.

// Ex:1

// Parent object constructor
function Animal(name) {
  this.name = name;
}

// Adding a method to the parent object's prototype
Animal.prototype.speak = function () {
  console.log(this.name + " makes a sound.");
};

// Child object constructor inheriting from Animal
function Dog(name) {
  Animal.call(this, name); // Call the parent constructor
}

// Set up the prototype chain for inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix the constructor property

// Adding a method specific to Dog
Dog.prototype.bark = function () {
  console.log(this.name + " barks.");
};

// Create instances of Animal and Dog
const animal = new Animal("Generic Animal");
const dog = new Dog("Fido");

// Test inherited methods
animal.speak(); // Output: Generic Animal makes a sound.
dog.speak(); // Output: Fido makes a sound.
dog.bark(); // Output: Fido barks.

////////////////////////////////////////////////////////////////

// Ex:2

// Parent object constructor
function Person(name) {
  this.name = name;
}

// Adding a method to the prototype of Person
Person.prototype.greet = function () {
  console.log("Hello, my name is " + this.name);
};

// Creating a new object using the Person constructor
const john = new Person("John");

// Accessing the greet method inherited from the prototype
john.greet(); // Output: Hello, my name is John

/// in ES5 way

// Parent object constructor
class Person5 {
  constructor(name) {
    this.name = name;
  }
  // Adding a method to the prototype of Person
  greet5() {
    console.log("Hello, my name is " + this.name);
  }
}
// Creating a new object using the Person constructor
const john5 = new Person5("John5");

// Accessing the greet method inherited from the prototype
john5.greet5(); // Output: Hello, my name is John5
