// define a base class called Animal
class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating.`);
    }

    sleep() {
        console.log(`${this.name} is sleeping.`);
    }
}

// define a subclass called Cat that inherits from Animal
class Cat extends Animal {
    constructor(name) {
        super(name);
    }

    meow() {
        console.log(`${this.name} says meow.`);
    }

    // override the sleep method of Animal
    sleep() {
        console.log(`${this.name} is taking a cat nap.`);
    }
}

// define another subclass called Dog that also inherits from Animal
class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    bark() {
        console.log(`${this.name} says woof.`);
    }

    // override the eat method of Animal
    eat() {
        console.log(`${this.name} is eating from a bowl.`);
    }
}

// create an array of animals
let animals = [
    new Cat("Mumu"),
    new Dog("Laltu"),
    new Cat("Miaow"),
    new Dog("Boltu")
];

// loop through the array and call methods on each animal
for (let animal of animals) {
    animal.eat();
    animal.sleep();

    // check if the animal is a cat and call the meow method if it is
    if (animal instanceof Cat) {
        animal.meow();
    }

    // check if the animal is a dog and call the bark method if it is
    if (animal instanceof Dog) {
        animal.bark();
    }
}