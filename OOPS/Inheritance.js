/**
Inheritance is the process of creating a new class based on an existing class. The new class, known as the subclass, inherits the properties and methods of the existing class, known as the superclass.

*/

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is a ${this.grade} in JavaScript.`);
  }
}
const student = new Student("Sumit", 38, "beginner");
student.greet(); // Output: 'Hello, my name is Sumit and I am 38 years old.'
student.study(); // Output: 'Sumit is a beginner in JavaScript.'
