let person1 = {
  name: "Adam",
  age: 25,
};

// showDetails() define globally

let showDetails = function (city, car) {
  //   console.log(this.name);
  console.log(
    `${this.name} is ${this.age} yeals old, lives in ${city} with ${car}`
  );
};

let person2 = {
  name: "Mdam",
  age: 26,

  //   showDetails: function () {
  //     console.log(this.name);
  //   },
};

// person1.showDetails();
// person2.showDetails();

// Function borrowing
// person1.showDetails.call(person2);
//  showDetails.call(person2)   // call with simple
showDetails.call(person2, "BRH", "TESLA"); // call with external arguments

// Apply
showDetails.apply(person2, ["BRH", "TESLA X class"]);

// Bind -> it make copy of a function and store it.
let showDetailsBind = showDetails.bind(person2, "BRH", "TESLA y class");
console.log(showDetailsBind);
showDetailsBind();

/**
 
.bind(someobj) -> does not invoke the function, it just allows you to 
bind whatever object you want, you have to call the function yourself.

.call(someobj) and .apply(someobj)-> both invoke the function 
immediately,and modify the context. 
The only difference is how you pass your
own arguments.

 */
