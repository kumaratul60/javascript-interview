
// difference between function declaration, function statement and function expression 

// Function Statement and function Declaration  are same

// function statement are hoisted but expression are not hoisted

function a() {
    console.log("this is a function declaration as well function statement");
}
a()

// Function expression: when we declared a  anonymous function and assign to value is known as function expression
// if we use let & const instead of var so they treat as same // no hoisting (temporal dead-zone )

var b = function () {
    console.log("function expression");
}
b()

// Named function expression: when we declared a function with name and assign to value is known as Named function expression

var c = function xyz() {
    console.log("function  named expression");
}
c()



// Anonymous function => declare a function without any name
/*
function () {

}

*/

// First Class Function === First Class Citizens

// first class function ->  passing function to another function as argument
// or A function passed as an argument to another function and can used like values 

// or the proper definition : 
//  The availability of functions to be use as values and can be passed as an argument to another function and can be return from the functions,this ability is known as first class function.


var d = function (param1) {
    console.log(param1);
}
d(function () {

})

// or

var e = function (param2) {
    console.log(param2);
}
function xyd() {

}
e(xyd)

// or we can return

var f = function (param) {
    return function xyr() {

    }
}
console.log(f());
