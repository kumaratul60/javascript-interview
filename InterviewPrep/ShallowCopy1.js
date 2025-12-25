/*When a reference variable is copied into a new reference variable using the assignment operator, a shallow copy of the referenced object is created. In simple words, a reference variable mainly stores the address of the object it refers to. When a new reference variable is assigned the value of the old reference variable, the address stored in the old reference variable is copied into the new one. This means both the old and new reference variable point to the same object in memory. As a result if the state of the object changes through any of the reference variables it is reflected for both.  */

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
