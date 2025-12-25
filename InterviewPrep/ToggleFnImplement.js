//  implement a toggle function which return argument

const toggle = (...args) => {
    let index = 0;
    return function () {
        if (args.length) {
            console.log(args[index++]);

            if (index >= args.length) {
                index = 0
            }
        }

    }
}



const strHello = toggle("hello")
strHello(); // hello


const num = toggle("1", "2", "3")
num()//1
num()//2
num()//3
num()//1