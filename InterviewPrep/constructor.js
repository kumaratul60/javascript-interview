// problem

// let car1 = {
//     brand:"TESLA",
//     model:"X",
//     color: "blue",
// }

// let car2 = {
//     brand:"TESLA",
//     model:"Y",
//     color: "Black",
// }

// solution constructor fucntion

function car(brand, model, color) {
  this.Brand = brand;
  this.Model = model;
  this.Color = color;

  this.drive = function () {
    console.log("I will drive", this.Brand, this.Model);
  };
}
let car1 = new car("Tesla", "x", "blue"); // this - {} (empty object with 'new' keyword)
let car2 = new car("Tesla", "Y", "black");
car1.Brand = "BMW";
car2.Color = "Green";
console.log(car1);
console.log(car2);
console.log(car1.Model);
console.log(car2.Color);
car1.drive();
