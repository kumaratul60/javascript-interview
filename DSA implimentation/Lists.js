// List constructor
function List() {
    this.items = [];

    // Methods to add, remove, and find elements
    this.add = function (item) {
        this.items.push(item);
    };
    this.remove = function (item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    };
    this.find = function (item) {
        return this.items.indexOf(item);
    };
}

// Creating a list and adding some elements
const fruits = new List();
fruits.add('apple');
fruits.add('banana');
fruits.add('cherry');

// Removing an element
fruits.remove('banana');

// Finding an element
const index = fruits.find('cherry');
console.log(index);  // Output: 1