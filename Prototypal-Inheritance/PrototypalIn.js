// inheritance -> An object which trying to access the method and properties of another object

// let arr = ["Atul", "Akash"];
let object = {
  city: "brh",
  occupation: "developer",
  getIntro: function () {
    console.log(this.city, " ", this.occupation);
  },
};
let object2 = {
  name: "Atul",
};
//Never do this because it causes a huge performance issue
// object2._proto_ = object

Function.prototype.myBind = function () {
  console.log("hello roc8");
};
function fun2() { }

// obj or arr.__proto__ = Array.prototype
//  arr.__proto__.__proto__ = Object.prototype
// arr.__proto__.__proto__.__proto__ = null
//  Object.prototype.prototype = undefined

// object.__proto__ = Object.prototype
//  arr.__proto__.__proto__ = null

// fun.__proto__ = Function.prototype
// fun.__proto__.__proto__  = Object.prototype


const obj1 = {
  name: "Atul Kumar"
}
console.log(obj1);

const obj2 = {
  role: 1,
  // _proto: obj1 == _proto_: obj1
  _proto_: obj1
}
console.log(obj2);