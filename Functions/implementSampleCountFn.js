// implement sample function that will take a count  and a function as a input message and on every ith count execute the input function

function message() {
    console.log('hello');
}
function messageTest(mess) {
    console.log(mess);
}
const sampler = (callback, count = 1) => {
    let track = 0;
    return function (...args) {
        track++;
        if (track === count) {
            callback(...args);
            track = 0;
        }
    }

}

const sample = sampler(message, 3);
const sampleTest = sampler(messageTest, 4)

sample()
sample()
sample() // hello
sampleTest()
sampleTest()
sampleTest()
sampleTest("abc") //abc
sampleTest()
sampleTest()
sampleTest()
sampleTest("pqr") //pqr
sample()
sample()
sample()
