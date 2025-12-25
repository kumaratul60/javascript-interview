/*
Unlike the shallow copy, deep copy makes a copy of all the members of the old object, allocates separate memory location for the new object and then assigns the copied members to the new object. In this way, both the objects are independent of each other and in case of any modification to either one the other is not affected. Also, if one of the objects is deleted the other still remains in the memory. Now to create a deep copy of an object in JavaScript we use JSON.parse() and JSON.stringify() methods.
*/

// Deep copy is a true copy for nested objects We can’t change the original object in the deep clone since Lodash copies properties recursively and there is no data loss.

var employee = {
  eid: "E102",
  ename: "Jack",
  eaddress: "New York",
  salary: 50000,
};
console.log("=========Deep Copy========");
var newEmployee = JSON.parse(JSON.stringify(employee));
console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);
console.log("---------After modification---------");
newEmployee.ename = "Beck";
newEmployee.salary = 70000;
console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);

/*
Explanation: Here the new object is created using the JSON.parse() and JSON.stringify() methods of JavaScript. JSON.stringify() takes a JavaScript object as argument and then transforms it into a JSON string. This JSON string is passed to the JSON.parse() method which then transforms it into a JavaScript object. This method is useful when the object is small and has serializable properties. But if the object is very large and contains certain non-serializable properties then there is a risk of data loss. Specially if an object contains methods then JSON.stringify() will fail as methods are non-serializable. There are better ways to deep clone of which one is Lodash which allows cloning methods as well.

*/
