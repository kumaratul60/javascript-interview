// shallow copy means that some values are still connected to the original variable.
let person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA'
    }
};


let copiedPerson = Object.assign({}, person);

copiedPerson.firstName = 'Jane'; // disconnected

copiedPerson.address.street = 'Amphitheatre Parkway'; // disconnected
copiedPerson.address.city = 'Mountain View'; // connected

console.log(copiedPerson);
console.log(person);