// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Welcome to Programiz!");

const testObj = {
  foo: console.log,
  bar: function () {
    return this;
  },
  baz: () => this === window,
  self: this
};


// Predict the output
testObj.foo("foo  → ", this);
console.log("bar  → ", testObj.bar());
console.log("baz  → ", testObj.baz());
console.log("self → ", testObj.self);


function add (a) {
  return function (b) {
    return a + b;
  }
}



let users = [
  {
    id:1,
    items:[{id:"1",name:"Item 1"},{id:"2",name:"Item 2"}]
  },
  {
    id:2,
    items:[{id:"2",name:"Item 2"},{id:"3",name:"Item 3"}]
  },
  {
    id:3,
    items:[{id:"4",name:"Item 4"},{id:"5",name:"Item 5"},{id:"3",name:"Item 3"}]
  }
]


//Output - Merge all items in the single list. List should be a unique by id

// let output = [
//   {id:"1",name:"Item 1"},
//   {id:"2",name:"Item 2"},
//   {id:"3",name:"Item 3"},
//   {id:"4",name:"Item 4"},
//   {id:"5",name:"Item 5"}
// ]



function fail() {
  try {
    console.log("try 1");
    throw new Error("Throw");
    console.log("try 2");
  } catch (e) {
    console.log("catch", e);
	  return;
  } finally {
    console.log("finally");
    return "finally"; 
  }
  console.log("hurray");
}

fail();


// What will be the output?

for (var i = 1; i <= 5; i++) {
  setTimeout((function () {
    console.log(i);
  }), 0);
}



const users = [
  {
    id: 1,
    items: [{ id: "1", name: "Item 1" }]
  },
  {
    id: 2,
    items: []
  },
  {
    id: 3,
    items: [
      { id: "4", name: "Item 4" },
      { id: "5", name: "Item 5" }
    ]
  },
  {
    id: 4,
    items: []
  },
  {
    id: 5
  }
]

//Output - Remove those users who has empty items

//Sample output
// let output = [
//   {
//     id: 1,
//     items: [{ id: "1", name: "Item 1" }]
//   },

//   {
//     id: 3,
//     items: [
//       { id: "4", name: "Item 4" },
//       { id: "5", name: "Item 5" }
//     ]
//   }
// ];


let a = {}
let b = {}

a == b


let a = {name:"Ok"}
let c = "Ok"; 
let b = {name:"Ok"}

a === c
a === b 

null == undefined

let a = {name:"ok", obj1: {d:true, b:'hi', c:{}, d:[]}}
let b = {...a} 

a == b
a.name == b.name
a.obj1 == b.obj1
a.obj1.d === b.obj1.d

let a = {person:{name:"Ok"}} 
let b = {person:{name:"Ok"}}
let c = a;  
a.person.name = 'Karan';

console.log(b.person.name);
console.log(c.person.name);
a.person == b.person
a.person === b.person


let a = {person:{name:"Ok"},name:'abc'}
let b = JSON.parse(JSON.stringfy(a))

a == b
a.person == b.person
a.person === b.person
a.person.name == b.person.name