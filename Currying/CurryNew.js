/*
 Currying is a technique, It's like breaking down a big project(a final dish recipe) into smaller tasks(recipe steps).
Instead of trying to accomplish everything at once, you focus on one specific task/step at a time. This way, you can work on the smaller tasks/steps and then put them together to complete the final project(dish).
*/

//  Currying is a process to convert multiple function argument into sequence of single function argument.

function test(a, b) {
    return a / b
}

const testArrow = (a, b) => a / b

function curryTest(a) {
    return function (b) {
        return a / b
    }
}

const curryTestArrow = (a) => (b) => a / b


function curryTest1(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }

    }
}

const curryTestArrow1 = (a) => (b) => (c) => a + b + c


const sum1 = (a) => {
    return (b) => {
        return b ? sum1(a + b) : a;
    };
};


console.log(sum1(1)(2)(4)(5)(6)());

console.log(test(2, 4));
console.log(testArrow(2, 4));
console.log(curryTest(2)(4));
console.log(curryTestArrow(2)(4));
console.log(curryTest1(2)(4)(3));
console.log(curryTestArrow1(2)(4)(3));
