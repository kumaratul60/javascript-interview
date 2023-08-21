const user = {
  email: "atul@gmail.com",
  name: "atul",
  company: "Google",
  married: false,
  age: "26",
  purchasesList: {
    book: 100,
    pen: 50,
    mobile: 1000,
  },
  purchases: ["Mob", "Laptop", "Bike"],

  //   not user Arrow function (()=>{}) here because Arrow functions have not  this keyword context
  sayHola: function () {
    console.log(this);
  },
};
user.sayHola();

//  here user is a this and sayHola is a function
