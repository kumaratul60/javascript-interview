// spread operator

console.log([..."atul"]);
/////////////////////////////////
const user = { name: "Lydia", age: 20 };
const admin = { admin: true, ...user };
console.log(admin);
///////////////////////////////////////////////

const settings = {
  userName: "ATul",
  level: 1,
  health: "1 num",
};

// it only stringify the level and health keys
const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);

//////////////////////////////////
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
    // regular fn() this points to the immediate parent object which is shape
  },
  perimeter: () => 2 * Math.PI * this.radius,
  // arrow fn() this points to the window object
};
console.log(shape.diameter()); //20
console.log(shape.perimeter()); // NaN
