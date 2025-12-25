// Higher Order Function => A function take another fn as an argument or input itself and return a new function or function from itself.

// A function which is passed into a higher order function is known as the Callback function. 

// this is all possible because function are first class citizen in javascript.

// this is essence of function programming => thinking in terms of smaller functions and passing them into other functions, treating functions as values

const radius = [4, 5, 6];

const area = function (radius1) {
    return Math.PI * radius1 * radius1;
};

const circumference = function (radius2) {
    return 2 * Math.PI * radius2;
};

const diameter = function (radius3) {
    return 2 * radius3;
};

const calculate = function (arr, logic) {
    const output = [];
    for (let i = 0; i < arr.length; i++) {
        output.push(logic(arr[i]));
    }
    return output;
};

// if we put a function we Array.prototype it means it will be available for all  array of methods/functions in your code
Array.prototype.calculateAll = function (arr, logic) {
    const output = [];
    for (let i = 0; i < arr.length; i++) {
        output.push(logic(arr[i]));
    }
    return output;
};

// here now making calculateAll fn like map this exactly behave like map function polyfill
Array.prototype.calculateAllMap = function (logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
};

// map is also a higher order function

console.log(radius.map(area));

// here calculate fn is little behave like map function which is we created
console.log(calculate(radius, area));

// now here we're using calculateAll fn

console.log(radius.calculateAll(radius, area));

// here now making calculateAll fn like map
console.log(radius.calculateAllMap(area));

console.log(calculate(radius, circumference));
console.log(calculate(radius, diameter));

//lengthy way

/*
const calculateDiameter = function (radius) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(2 * radius[i])
    }
    return output
}
console.log(calculateDiameter(radius));
*/
