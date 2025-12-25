// let myName = "Alise     "
// let mychannel = "learn     "

// console.log(myName.trueLength);


let myHeros = ["thor", "spiderman"]


let heroPower = {
    thor: "hammer",
    spiderman: "sling",

    getSpiderPower: function () {
        console.log(`Spidy power is ${this.spiderman}`);
    }
}

Object.prototype.Alise = function () {
    console.log(`Alise is present in all objects`);
}

Array.prototype.heyAlise = function () {
    console.log(`Alise says hello`);
}

heroPower.Alise()
// myHeros.Alise()
// myHeros.heyAlise()
// heroPower.heyAlise()

// inheritance

const User = {
    name: "learn",
    email: "learn@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'JS assignment',
    fullTime: true,
    __proto__: TeachingSupport
}

Teacher.__proto__ = User

// modern syntax
Object.setPrototypeOf(TeachingSupport, Teacher)