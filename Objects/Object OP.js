/*
V8 Engine — Developed by Google for Google Chrome and Chromium-based browsers.
Rhino — Managed by Mozilla Foundation.
SpiderMonkey — The first Javascript Engine written by the founder of Javascript, Brendon Eich.
*/

// Guess Output 1

var a = { name: "ak" };
var b = { name: "ak" };
console.log(a === b);
console.log(a == b);

// bcoz When comparing two objects, JavaScript compares internal references which are equal only when both operands refer to the same object in memory, keys, and values are not checked, so the content of the object doesn’t matter

// Guess Output 2

var a = 1;
var b = "1";
console.log(a === b);
console.log(a == b);

// bcoz In “===” it with compare datatype also, of LHS & RHS and whereas “==” only compare values of LHS and RHS


/*
Dot notation is always preferred . If you are using smart IDE then it will show as undefined or it will throw error for invalid properties of objects. Use Bracket notation only when property name starts with number or includes any special characters or property name is unknown till runtime.
*/

const obj1 = {
    123: 'digit',
    firstName: 'John'
    }
//   console.log(obj.123);       // Syntax Error ❌
  console.log(obj1['123']);    // 'digit' ✅


  const obj2 = {
    'Rocket 🚀': 'launch',
    }
//   console.log(obj.Rocket 🚀);        // Syntax Error ❌
  console.log(obj2['Rocket 🚀']);     //'launch' ✅



  const User = {
    firstName: 'Sham',
    lastName: 'Gurav',
    age: 25,
    role: 'Frontend Developer'
    }
    
  var userInput = 'firstName';
  console.log(User.userInput);       // undefined ❌
  console.log(User[userInput]);      // 'Sham' ✅