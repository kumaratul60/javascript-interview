// call,bind & apply way

function greet(message) {
  console.log(message + " " + this.name);
}

const person = {
  name: "John",
};

//call
greet.call(person, "Hello"); // Output: Hello John

//apply
const args = ["Hello"];
greet.apply(person, args); // Output: Hello John

//bind

const greetPerson = greet.bind(person);
greetPerson("Hello"); // Output: Hello John
