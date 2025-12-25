// if something can be describe as thing with characteristics and behavior  it turn into an object.
// characteristics also known as properties or attributes or states.
// behavior is knows as methods or actions

// Abstraction: Abstraction is the process of hiding the internal complexities of how  something  works and only  exposing  what's necessary for the user to interact with.

// Encapsulation: Encapsulation is the  building  of data and methods that operate on that data into a single unit, usually a class and restricting direct access to some of object's component.

// Polymorphism: it means many-forms. It allows objects to different classes to be treated as if they are of the some type, but behave differently based on their class-specification implementation.

// Composition: It is a design principle where one class contains or is composed of one or more objects of other classes to reuse their  functionality, instead of  inheriting from them.
// has-a relation

/*
Abstraction    → Hide complexity, expose interface
Encapsulation  → Bundle + protect state
Inheritance    → Share logic (is-a)
Polymorphism   → Same method, different behavior
Composition    → Reuse via has-a relationship
Class          → Blueprint
Object         → Instance


"Abstraction hides implementation details.”

“Encapsulation protects state.”

“Polymorphism enables flexible behavior.”

“Composition is preferred over inheritance.”


Modal → abstraction (open / close)

Form field → encapsulated validation

Button variants → polymorphism

Layout with slots → composition

*/

// Object (Basic Building Block)
const person = {
  name: 'Brendan Eich',
  age: 60,
  address: {
    street: '123 JavaScript Street',
    city: 'Web',
    state: 'Programming',
    zip: '12345',
  },
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};
console.log(person.name); // Output: 'Brendan Eich'
console.log(person['age']); // Output: 60
console.log(person.address.city); // Output: 'Web'
person.greet(); // 'Hello, I'm Brendan Eich'

// Class (Blueprint)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const p1 = new Person('Brendan Eich', 60);

// Abstraction
class CoffeeMachine {
  makeCoffee() {
    this.#heatWater();
    this.#brew();
    return '☕ Coffee ready';
  }

  #heatWater() {
    // complex logic hidden
  }

  #brew() {
    // complex logic hidden
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee(); // user sees only this

// Encapsulation
class BankAccount {
  #balance = 0; // private state

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
acc.getBalance(); // 100
// acc.#balance not accessible

// Inheritance
class Animal {
  speak() {
    return 'Animal makes sound';
  }
}

class Dog extends Animal {
  speak() {
    return 'Dog barks';
  }
}

const dog = new Dog();
dog.speak(); // 'Dog barks'

// Polymorphism
const animals = [new Animal(), new Dog()];

animals.forEach((a) => {
  console.log(a.speak());
});

// Composition (Preferred in modern JS)
class Engine {
  start() {
    return 'Engine started';
  }
}

class Car {
  constructor() {
    this.engine = new Engine(); // has-a
  }

  drive() {
    return this.engine.start() + ' → Car moving';
  }
}

const car = new Car();
car.drive();
