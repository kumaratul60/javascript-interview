// Salary calculation using OOPS concept.

// Create a Class using ES6 in JavaScript named Employee and assign necessary
// data members and methods such as name, id, basic salary, HRA, Allowances; define getSalary method which will return the net salary.
// Create two Instances of Employee with all necessary details.
// Call the getSalary method of each instance and return the net salary based on your computation.

class Employee {
  constructor(name, id, basic, HRA, extra) {
    (this.name = name),
      (this.id = id),
      (this.basic = basic),
      (this.HRA = HRA),
      (this.extra = extra);
    this.getsalary = function () {
      return +this.basic + +this.HRA + +this.extra;
    };
  }
}
const san = new Employee("sankalp", "23", "23000", "3400", "200");
console.log(san.getsalary());
