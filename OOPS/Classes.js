/**
A class is a blueprint for creating objects. It defines the properties and methods that objects of that class will have.
*/

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
const person = new Person('Atul', 25);
person.greet(); // Output: 'Hello, my name is Brendan Eich and I am 60 years old.'