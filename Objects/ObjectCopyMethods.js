// Object Copy Methods

// Shallow Copy using Spread Syntax
const person = {
  firstName: "John",
  lastName: "Doe",
};
let p1 = { ...person };
console.log(p1);

// Shallow Copy using Object.assign
let p2 = Object.assign({}, person);
console.log(p2);

// Deep Copy using JSON
let p3 = JSON.parse(JSON.stringify(person));
console.log(p3);

// Shallow Copy using Assignment
/*When a reference variable is copied into a new reference variable using the assignment operator, a shallow copy of the referenced object is created. In simple words, a reference variable mainly stores the address of the object it refers to. When a new reference variable is assigned the value of the old reference variable, the address stored in the old reference variable is copied into the new one. This means both the old and new reference variable point to the same object in memory. As a result if the state of the object changes through any of the reference variables it is reflected for both. */

var employee = {
  eid: "E102",
  ename: "Jack",
  eaddress: "New York",
  salary: 50000,
};

console.log("Employee=> ", employee);
var newEmployee = employee; // Shallow copy
console.log("New Employee=> ", newEmployee);

console.log("---------After modification----------");
newEmployee.ename = "Beck";
console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);

/*From the above example, it is seen that when the name of newEmployee is modified, it is also reflected for the old employee object. This can cause data inconsistency. This is known as shallow copy. The newly created object has the same memory address as the old one. Hence, any change made to either of them changes the attributes for both. To overcome this problem, deep copy is used. If one of them is removed from memory, the other one ceases to exist. In a way the two objects are interdependent. */

// Shallow Copy using Object.assign (detailed)
let personAssign = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA'
    }
};

let copiedPerson = Object.assign({}, personAssign);

copiedPerson.firstName = 'Jane'; // disconnected

copiedPerson.address.street = 'Amphitheatre Parkway'; // connected
copiedPerson.address.city = 'Mountain View'; // connected

console.log(copiedPerson);
console.log(personAssign);

// Deep Copy using JSON.parse and JSON.stringify (detailed)
/*
Unlike the shallow copy, deep copy makes a copy of all the members of the old object, allocates separate memory location for the new object and then assigns the copied members to the new object. In this way, both the objects are independent of each other and in case of any modification to either one the other is not affected. Also, if one of the objects is deleted the other still remains in the memory.
*/

var employeeDeep = {
  eid: "E102",
  ename: "Jack",
  eaddress: "New York",
  salary: 50000,
};
console.log("=========Deep Copy========");
var newEmployeeDeep = JSON.parse(JSON.stringify(employeeDeep));
console.log("Employee=> ", employeeDeep);
console.log("New Employee=> ", newEmployeeDeep);
console.log("---------After modification---------");
newEmployeeDeep.ename = "Beck";
newEmployeeDeep.salary = 70000;
console.log("Employee=> ", employeeDeep);
console.log("New Employee=> ", newEmployeeDeep);

/*
Explanation: Here the new object is created using the JSON.parse() and JSON.stringify() methods of JavaScript. JSON.stringify() takes a JavaScript object as argument and then transforms it into a JSON string. This JSON string is passed to the JSON.parse() method which then transforms it into a JavaScript object. This method is useful when the object is small and has serializable properties. But if the object is very large and contains certain non-serializable properties then there is a risk of data loss. Specially if an object contains methods then JSON.stringify() will fail as methods are non-serializable. There are better ways to deep clone of which one is Lodash which allows cloning methods as well.
*/

// Deep Copy using Lodash
const cloneDeep = require("lodash.clonedeep");
const original = {
  var1: new Date(),
  var2: NaN,
  var3: undefined,
  var4: function () {},
  var5: false,
  var6: {
    name: "Noah",
  },
};
const DeepCopiedObject = cloneDeep(original);
DeepCopiedObject.var6.name = "Mike";
console.log(original.var6.name); //Output 'Noah'
