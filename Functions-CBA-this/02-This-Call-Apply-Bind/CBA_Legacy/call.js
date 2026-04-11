let name = {
  firstName: "Atul",
  lastName: "kumar A",
};

let printFullName = function (homeTown, state) {
  console.log(
    this.firstName + " " + this.lastName,
    "from",
    homeTown,

    state
  );
  // console.log(this.firstName,this.lastName)
};
printFullName.call(name, "UP", "BRH");

let name2 = {
  firstName: "Ashu",
  lastName: "shiva",
};
//  to print name2 simply we can copy printFullName() and do it, nut this is not a good way do it, so that's where the "call method" come to picture .
// Using "call method" we can do fuction borrowing to do it efficintly

// function borrowing:=> we can borrow function from other object and use it with the data of some other objects and each and every method is javascript has access to the special function which is call.

//  In call method first parameter will be the reference , (what "this" keyword pointing to )   and letter parameter can be the parameter of funtion

printFullName.call(name2, "Pradhanpur", "LKO");

//  in call() => passing second argument as comma seperatly
// Apply() => instead of passing that argument coma seperately, we can pass that in form of array

printFullName.apply(name2, ["Pradhanpur", "LKO"]);

// bind()=> It ia similar to call method only difference is it create a copy of "printFullName()" and bind that to "name2" object and will return a function .
//  so catch is bind method doesn't directly call like call method  rather than should return a some method which can be invoke latter
let printMyName = printFullName.bind(name2, "Pradhanpur", "LKO");
console.log(printMyName);
printMyName();

// call method => It is used to invoke a function derectly by passing the reference which points to the "this" variable inside the variable.

//  Apply method => It is exactly same as call method the only difference is it takes the second arguments as a array list of the parameter which need to pass at function invocation time.

//  Bind method => It doesn't directly invoke the method but gives you copy of exactly same method which can be invoke latter
