class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.callbacks = [];

        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.callbacks.forEach((cb) => cb(value));
            }
        };

        executor(resolve, () => {});
    }

    then(onFulfilled) {
        if (this.state === "fulfilled") {
            onFulfilled(this.value);
        } else {
            this.callbacks.push(onFulfilled);
        }
    }
}


const p1 = new MyPromise((resolve, reject) => {
    resolve("Hello World!");
});

p1.then((result) => {
    console.log("Result:", result);
});


const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("Async Done!"), 1000);
});

p2.then((result) => {
    console.log("Got:", result);
});


const p3 = new MyPromise((resolve) => {
    setTimeout(() => resolve("Chained Result"), 500);
});

p3.then((res) => console.log("First:", res));
p3.then((res) => console.log("Second:", res));
