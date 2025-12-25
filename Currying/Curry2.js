// implement curry function with 3 ways for sum(10)(20)(30)(40)()

const sum = (...args) => {
    let storage = [...args];

    //base case
    if (args.length === 0) return 0

    const temp = function (...args2) {
        storage.push(...args2);


        if (args2.length === 0) {
            return storage.reduce((a, b) => a + b, 0)
        } else {
            return temp;
        }
    }
    return temp

}

let total = sum(10)(20)(30)(40)();
console.log(total)


////////////////////////////////////////////////////////////////

const sum1 = (a) => {
    return (b) => {
        return b ? sum1(a + b) : a;
    };
};
console.log(sum1(1)(2)(4)(5)(6)());

// curried version

const curry = (a) => {
    return (b) => {
        return a + b;
    };
};
console.log(curry(1)(2));
// console.log(curry(1)(2))(); // not work