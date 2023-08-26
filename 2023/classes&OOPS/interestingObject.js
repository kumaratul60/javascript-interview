/**
 the Object.getOwnPropertyDescriptor method is used to retrieve the descriptor of a property on an object. The descriptor contains information about whether the property is writable, enumerable, configurable, and the value of the property itself. This method is often used when you need to access and manipulate the attributes of an object's property.

 syntax => Object.getOwnPropertyDescriptor(module, keyName)




 */

const object = { key: "value" };
const descriptorTest = Object.getOwnPropertyDescriptor(object, "key");

console.log({ descriptorTest });
/**
 * descriptorTest return 4 value:
    value: 'value',
    writable: true,
    enumerable: true,
    configurable: true
 */

const descriptor = Object.getOwnPropertyDescriptor(Math, "PI");

console.log({ descriptor });

/**
  descriptor: {
    value: 3.141592653589793,
    writable: false,
    enumerable: false,
    configurable: false
  }

  we can't change the value of PI because it's writable,enumerable and configurable property by default set as false
 */

// console.log(Math.PI);// 3.14
// Math.PI = 5
// console.log(Math.PI);// 3.14

const chai = {
  name: "ginger chai",
  price: 250,
  isAvailable: true,

  orderChai: function () {
    console.log("chai nhi bni");
  },
};
// console.log(Object.getOwnPropertyDescriptor(chai)); // undefined
console.log(Object.getOwnPropertyDescriptor(chai, "name"));

Object.defineProperty(chai, "name", {
  //writable: false,
  enumerable: true,
});

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

for (let [key, value] of Object.entries(chai)) {
  if (typeof value !== "function") {
    // adding  typeof value !== "function" check to avoid  iterating of functions like orderChai

    console.log(`${key} : ${value}`);
  }
}
