var obj = {
    helloWorld: function () {
        return 'hello world' + this.name;
    },
    name:"hello"
};

var obj1 = {
    helloWorld: obj.helloWorld,
    name:"bye"
};
const res = obj1.helloWorld();
console.log(res) // hello world bye

// what if want to print // hello world hello

// m1
const res1 = obj1.helloWorld.bind(obj);
console.log(res1()); // hello world hello

// m2
const res2 = obj1.helloWorld.call(obj);
console.log(res2); // hello world hello

