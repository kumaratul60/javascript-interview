// const objS =  Object.create // constructor way => singleton

// const objL = {} //  object literal

// const jsMe  = new Object() // know as singleton object


const mySym = Symbol("key1");

const jsMe = {
  email: "js@me.com",
  "full name": "rashi dev",
  name: "js",
  age: 25,
  location: "UP",
    // mySym: "js key",
  [mySym]: "js key", // symbol is going to access in this way
  auth: false,
  lastLogDay: ["Mon", "Wed", "Fri"],
};
console.log(jsMe.email);
console.log(jsMe["email"]);
console.log(jsMe["full name"]);
console.log(jsMe[mySym]);
console.log(typeof jsMe[mySym]);
console.log({jsMe});
