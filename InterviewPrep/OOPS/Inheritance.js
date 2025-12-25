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
const student = new Student('Sumit', 38, 'beginner');
student.greet(); // Output: 'Hello, my name is Sumit and I am 38 years old.'
student.study(); // Output: 'Sumit is a beginner in JavaScript.'

class Test {
  talk() {
    return 'Hello';
  }
}
const me = new Test();
const you = new Test();
console.log({ me: me.talk(), you: you.talk() });

const me2 = {};
Object.setPrototypeOf(me2, Test);
me2.talk();

const me3 = {};
Object.setPrototypeOf(me3, Test);
me3.talk = me.talk.bind(me3);
me3.talk();

class test {
  talk() {
    return 'mast';
  }
}

const rf = new test();
console.log(rf.talk());
const tf = Object.create(test);
tf.age = 78;
console.log(tf);

const ben = Object.create(rf);
ben.name = 'll';
console.log(ben.name, ben.talk);

const Test = {
  talk: 'mast',
};

const tf = Object.create(Test);
tf.age = 78;
console.log(tf);
const ben = Object.create(tf);
ben.name = 'll';
console.log(ben.name, ben.talk);

const newObj = {};
const sortNew = new Object();

const arr = []
const newArr = new Array()
