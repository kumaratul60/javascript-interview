## 1. Create a Book Class

Demonstrates basic class structure and methods.

```javascript
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  describe() {
    console.log(`Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}`);
  }
}

const book1 = new Book('The Alchemist', 'Paulo Coelho', 208);
const book2 = new Book('1984', 'George Orwell', 328);

book1.describe();
book2.describe();
```

---

## 2. Getters and Setters (Temperature Class)

Using computed properties to convert Celsius to Fahrenheit.

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius; // Conventional "private" field
  }

  // Setter for Celsius
  set celsius(value) {
    this._celsius = value;
  }

  // Getter for Fahrenheit
  get fahrenheit() {
    return this._celsius * 1.8 + 32;
  }
}

const temp = new Temperature(25);
console.log(`Initial Fahrenheit: ${temp.fahrenheit}°F`);

temp.celsius = 30; // Using the setter
console.log(`Updated Fahrenheit: ${temp.fahrenheit}°F`);
```

---

## 3. Public & Private Fields (User Class)

Demonstrating true data privacy using the `#` prefix.

```javascript
class User {
  #password; // Modern Private Field

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  checkPassword(pw) {
    return this.#password === pw;
  }
}

const user1 = new User('Arjun', 'Secret123');

console.log('Password Correct?', user1.checkPassword('Secret123')); // true
console.log('Password Correct?', user1.checkPassword('wrong_pw')); // false

// Testing direct access (Uncommenting the line below will throw a Syntax Error)
// console.log(user1.#password);
console.log('Can I access private field?', user1.password); // undefined
```

---

## 4. Inheritance (Vehicle and Car)

Extending classes and overriding parent methods.

```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    console.log('Vehicle starting...');
  }
}

class Car extends Vehicle {
  constructor(make, model, fuelType) {
    super(make, model); // Call parent constructor
    this.fuelType = fuelType;
  }

  // Overriding start()
  start() {
    console.log(`Starting ${this.fuelType} car: ${this.make} ${this.model}`);
  }
}

const myCar = new Car('Tesla', 'Model 3', 'Electric');
myCar.start();
```

---

## 5. Static Methods (MathUtils)

Calling methods directly on the class without instantiation.

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// No 'new MathUtils()' needed
console.log('Add:', MathUtils.add(10, 5));
console.log('Subtract:', MathUtils.subtract(20, 8));
console.log('Random:', MathUtils.randomInt(1, 100));
```

---

## 6. Smart Light Bulb (Access Control)

Combining public, private, and static members.

```javascript
class SmartLightBulb {
  #connectToWiFi() {
    console.log('Connecting to WiFi secure layer...');
  }

  turnOn() {
    this.#connectToWiFi();
    console.log('Light is ON');
  }

  turnOff() {
    console.log('Light is OFF');
  }

  static info() {
    console.log('SmartLightBulb v1.0 supports remote control and scheduling.');
  }
}

const bulb = new SmartLightBulb();
bulb.turnOn();
SmartLightBulb.info();

// Error Test: bulb.#connectToWiFi();
// Throws: Property '#connectToWiFi' is not accessible outside class 'SmartLightBulb'
```

---

## 7. Animal Hierarchy

Using `super()` and shared methods across multiple subclasses.

```javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  makeSound() {
    console.log(`The ${this.constructor.name} ${this.name} says ${this.sound}`);
  }

  sleep() {
    console.log(`${this.name} is sleeping... Zzz`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, 'Barks!');
  }
  // Specific override
  makeSound() {
    console.log(`The Dog ${this.name} barks!`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, 'Meows!');
  }
  // Specific override
  makeSound() {
    console.log(`The Cat ${this.name} meows!`);
  }
}

const myDog = new Dog('Buddy');
const myCat = new Cat('Whiskers');

myDog.makeSound();
myCat.makeSound();

myDog.sleep(); // Shared method from parent
myCat.sleep(); // Shared method from parent
```
