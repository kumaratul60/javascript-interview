// Implicit binding: if a method is called on an object using the dot notation the context of this is bound or assigned/associated to the object on which we have invoked the method.

const employee = {
  name: "Atul",
  age: 25,
  salary: 100000,
  getEmpDetails: function () {
    // console.log(this.name, this.age, this.salary);
    return this;
  },

  getFullName: function () {
    return `${this.name}`;
  },
};

console.log(employee.getEmpDetails(), ":: this inside the employee object");
console.log(employee.getEmpDetails().getEmpDetails(), ":: this inside the employee object"); // same result
console.log(employee.age);
console.log(employee.getFullName()); // atul

const re = employee.getFullName();
console.log(re); //atul

// in object, when property value is a function, called as method

function outer(a) {
  console.log("outer this fn", this);

  function inner(b) {
    console.log("inner this fn", this);
  }
  inner(10);
}

const outerRes = outer(3);
// outerRes(4);// error
outerRes;

const food = {
  name: "mango",
  color: "yellow",

  //   getDesc: () => `${this.name} is ${this.color}`// undefined, due to this scope pointing to global

  //fix
  //   getDesc: function () {
  //     return `${this.name} is ${this.color}`;
  //     },

  //fix using arrow function
  getDesc: function () {
    return () => `${this.name} is ${this.color}`;
  },
};

const descFuncVal = food.getDesc();

console.log(descFuncVal());

console.log(food.getDesc());

/**
 * global scope: this always referred to the window object for browser environment for node environment to the global object

 * Standalone function: for standalone function in strict mode it always point to undefined and in non strict mode it points to the global/window object

 * implicit binding: whenever you calling the object name dot the method, you have to check what is that particular method is about:
 if the method is a standard javascript function and non arrow function and if that function has the this keyword, the this keyword is bound to the object on which you are calling the function or the method.

 if that function happen to be an arrow function whether it is inside an object or outside an object wherever it is, it all depends where the arrow function is lexically placed or defined in your code, check the parent scope of the place where arrow function is defined because arrow function doesn't have its own this so the this always refer for an arrow function to the parent scope of the scope where arrow function is defined. 
 */
