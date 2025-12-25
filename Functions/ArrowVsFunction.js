const Car1 = (color) => {
  this.color = color;
};

// const redCar1 = new Car1("red"); // TypeError: Car is not a constructor
// console.log(redCar1);

function Car(color) {
  this.color = color;
}

const redCar = new Car("red");
redCar instanceof Car; // => true
console.log(redCar);
