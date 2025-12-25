## 1. Simple Prototype Chain

Demonstrating how JavaScript searches for methods up the chain.

```javascript
// Base object
const animal = {
  eat: function () {
    console.log('This animal is eating...');
  },
};

// Inherit from animal
const dog = Object.create(animal);
dog.bark = function () {
  console.log('Woof! Woof!');
};

dog.eat(); // Output: This animal is eating...

/*
EXPLANATION:
When dog.eat() is called:
1. The engine looks for 'eat' inside the 'dog' object. It's not there.
2. It follows the internal [[Prototype]] link to the 'animal' object.
3. It finds 'eat' in 'animal' and executes it.
*/
```

---

## 2. Custom Constructor Function

Using the `prototype` property to share methods across instances efficiently.

```javascript
function Book(title, author) {
  this.title = title;
  this.author = author;
}

// Adding method to the prototype
Book.prototype.getDetails = function () {
  return `${this.title} by ${this.author}`;
};

const book1 = new Book('Atomic Habits', 'James Clear');
const book2 = new Book('Deep Work', 'Cal Newport');

console.log(book1.getDetails());
console.log(book2.getDetails());

// Proof that they share the same function reference
console.log('Shared method?', book1.getDetails === book2.getDetails); // true
```

---

## 3. Compare Object Creation Patterns

Comparing how inheritance is handled in different styles.

```javascript
// 1. Object Literal
const literalObj = {
  type: 'Literal',
  greet() {
    console.log('Hello from Literal');
  },
};

// 2. Constructor Function
function ConstructorObj() {
  this.type = 'Constructor';
}
ConstructorObj.prototype.greet = function () {
  console.log('Hello from Constructor');
};
const constInst = new ConstructorObj();

// 3. Object.create
const proto = {
  greet() {
    console.log('Hello from Object.create');
  },
};
const createInst = Object.create(proto);
createInst.type = 'Created';

/*
COMPARISON:
- Literal: Simplest, but no shared inheritance between different literals.
- Constructor: Great for multiple instances; methods are shared via .prototype.
- Object.create: Direct control over the prototype chain without needing a constructor.
*/
```

---

## 4. Real-World Inheritance Chain

Simulating a multi-level hierarchy: Person → Student → GraduateStudent.

```javascript
// Level 1: Person
function Person(name) {
  this.name = name;
}
Person.prototype.speak = function () {
  console.log(`${this.name} is speaking.`);
};

// Level 2: Student
function Student(name, grade) {
  Person.call(this, name); // Inherit properties
  this.grade = grade;
}
// Link prototypes
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function () {
  console.log(`${this.name} is studying.`);
};

// Level 3: GraduateStudent
function GraduateStudent(name, grade, thesis) {
  Student.call(this, name, grade);
  this.thesis = thesis;
}
// Link prototypes
GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;
GraduateStudent.prototype.research = function () {
  console.log(`${this.name} is researching: ${this.thesis}`);
};

const grad = new GraduateStudent('Arjun', 'A+', 'AI in Healthcare');

grad.speak(); // Inherited from Person
grad.study(); // Inherited from Student
grad.research(); // Own method
```

---

## 5. Object.create vs Class vs Constructor Function

Implementing a `User` entity in three different ways.

### Implementation

```javascript
// A. Constructor Function
function UserCF(name) {
  this.name = name;
}
UserCF.prototype.login = function () {
  console.log(this.name + ' logged in (CF)');
};

// B. ES6 Class
class UserClass {
  constructor(name) {
    this.name = name;
  }
  login() {
    console.log(this.name + ' logged in (Class)');
  }
}

// C. Object.create
const UserProto = {
  init(name) {
    this.name = name;
    return this;
  },
  login() {
    console.log(this.name + ' logged in (Object.create)');
  },
};
const userOC = Object.create(UserProto).init('Vikram');
```

### Summary Comparison

| Feature         | Constructor Function                      | ES6 Class                                    | Object.create                           |
| :-------------- | :---------------------------------------- | :------------------------------------------- | :-------------------------------------- |
| **Syntax**      | Functional, uses `this` and `.prototype`. | Modern, clean `class` syntax.                | Object-based, uses an init method.      |
| **Readability** | Can get messy with multiple methods.      | Best for developers coming from OOP.         | Very explicit about the prototype link. |
| **Hoisting**    | Functions are hoisted.                    | Classes are NOT hoisted.                     | Variables follow standard scoping.      |
| **Behavior**    | The original way JS handled "classes".    | Primarily "Syntactic Sugar" over Prototypes. | Direct prototype manipulation.          |

**Final Note:** In modern development, **ES6 Classes** are the standard for readability, but understanding **Constructor Functions** is essential because that is how JavaScript actually works under the hood. **Object.create** is best when you want to create an object that inherits directly from another specific object without the overhead of a constructor.
