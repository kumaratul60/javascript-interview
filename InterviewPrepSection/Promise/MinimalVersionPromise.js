class MyMiniPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;

        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
            }
        };

        const reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.value = reason;
            }
        };

        executor(resolve, reject);
    }
}


const p1 = new MyMiniPromise((resolve, reject) => {
    resolve("Success!");
});

console.log(p1.state); // "fulfilled"
console.log(p1.value); // "Success!"

const p2 = new MyMiniPromise((resolve, reject) => {
    reject("Something went wrong");
});

console.log(p2.state); // "rejected"
console.log(p2.value); // "Something went wrong"


const p3 = new MyMiniPromise((resolve, reject) => {
    setTimeout(() => resolve("Async Done!"), 1000);
});

setTimeout(() => {
    console.log(p3.state); // after 1 sec -> "fulfilled"
    console.log(p3.value); // "Async Done!"
}, 1500);


const p4 = new MyMiniPromise((resolve, reject) => {
    setTimeout(() => reject("Async Failed"), 1000);
});

setTimeout(() => {
    console.log(p4.state); // after 1 sec -> "rejected"
    console.log(p4.value); // "Async Failed"
}, 1500);


