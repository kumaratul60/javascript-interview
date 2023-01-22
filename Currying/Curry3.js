// implement sum fn dynamically

let curry = (fn) => {
    // rest operator
    let helper = (...args) => {
        // using the rest operator we get the all the arguments in the form of arrays

        // case1: checking that no. of arguments we received is same as the no. of arguments sum fn accepting or not

        if (args.length >= fn.length) {
            // spread operator
            return fn(...args);
        }

        // case2: if we received arguments in terms of batches
        else {
            // rest operator
            let temp = (...args2) => {
                return helper(...args, ...args2);
            }
            return temp
        }

    }
    return helper;
}

function sum(a, b, c, d) {
    return a + b + c + d
}

let curriedSum = curry(sum)

console.log(curriedSum(1, 2, 3, 4, 5))
console.log(curriedSum(1)(2, 3)(4, 5))
console.log(curriedSum(1)(2)(3)(4))
console.log(curriedSum(0)(0)(0)(0))

