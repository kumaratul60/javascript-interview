/*
A dictionary is a data structure that maps keys to values. In JavaScript, you can implement a dictionary using an object and some additional methods to manipulate the key-value pairs
*/

class Dictionary {
    constructor() {
        this.items = {};
    }

    set(key, value) {
        this.items[key] = value;
    }

    delete(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }

    has(key) {
        return key in this.items;
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    keys() {
        return Object.keys(this.items);
    }

    values() {
        return Object.values(this.items);
    }

    getItems() {
        return this.items;
    }
}

const dict = new Dictionary();

dict.set('name', 'John');
dict.set('age', 30);

console.log(dict.getItems()); // { name: 'John', age: 30 }
console.log(dict.size()); // 2
console.log(dict.keys()); // [ 'name', 'age' ]
console.log(dict.values()); // [ 'John', 30 ]

dict.delete('name');
console.log(dict.getItems()); // { age: 30 }

dict.clear();
console.log(dict.getItems()); // {}

