// What is Point Free function?
/*
Point free style is basically you write code but don't explicitly provide the arguments in the code. This is usefully especially in callbacks where a function is expected
*/


const sum = (a) => {
    return function b(b) {
        return a + b
    }
}
const increment = sum(1)(2)
console.log(increment)

const pointFreeIncrement = sum(1)
console.log(pointFreeIncrement(5));