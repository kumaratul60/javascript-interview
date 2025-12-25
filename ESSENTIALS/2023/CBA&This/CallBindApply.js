const obj1 = {
    a: 1,
    print1: function () {
        function inner() {
            console.log(this.a);
        }
        inner();
        // console.log("12");
    }

};

const obj2 = {
    a: 10,

    print2: function () {
        const inner = () => {
            console.log(this.a);
        };
        inner();
        // console.log("121");

    }
};

const obj3 = {
    a: 110,
    name: "Atul",
    print3: function (a, b) {
        console.log(a, b, this);
    }
};

const obj4 = {
    a: 1110,
    name: "Rahul",
    print4: function (a, b) {
        console.log(a, b.this);
    }
};
// obj1.print1();
// obj2.print2();
// obj3.print3.call(obj4, 1, 2);
// obj3.print3.apply(obj4, [1, 2]);

const binF = obj3.print3.bind(obj4);
binF();
