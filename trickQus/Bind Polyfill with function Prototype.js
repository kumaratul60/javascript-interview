// There is no prototype for object

// Bind method working

let personal1 = {
  name: "Adam",
  age: 25,
};
let showDetails = function (city, state) {
  console.log(this.name, this.age, city, state);
  //   console.log(this.name + " " + this.age + " " + city + " " + state);
};
let showDetailsBind = showDetails.bind(personal1, "BRH", "UP");
showDetailsBind();

// Bind return a fuction
// /////////////////////////////////////////////////////////////////

// writing polyfill of bind fuction

Function.prototype.myBind = function (...args) {
  let object = this; // this pointing the object
  params = args.slice(1) // args[0] is removed rest of elements saved
  return function () {
    //  object.call(args[0]);
    //  object.apply(params);
     object.call(args[0],params);

    //todo: Array can not call with 'call()' [please check on iternet]
    object.apply(args[0],params);
  };
};

let showDetailsMyBind = showDetails.myBind(personal1,"LKO","UP");
showDetailsMyBind();
console.log(showDetailsMyBind);
