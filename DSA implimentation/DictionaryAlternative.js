function Dictionary() {
    this.items = {};
}

Dictionary.prototype.set = function (key, value) {
    this.items[key] = value;
};

Dictionary.prototype.get = function (key) {
    return this.items[key];
};

Dictionary.prototype.has = function (key) {
    return key in this.items;
};

Dictionary.prototype.delete = function (key) {
    if (this.has(key)) {
        delete this.items[key];
        return true;
    }
    return false;
};

Dictionary.prototype.getKeys = function () {
    return Object.keys(this.items);
};

Dictionary.prototype.getValues = function () {
    return Object.values(this.items);
};

Dictionary.prototype.clear = function () {
    this.items = {};
};

Dictionary.prototype.size = function () {
    return Object.keys(this.items).length;
};

const dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'john@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has('Gandalf')); // true
console.log(dictionary.size()); // 3

console.log(dictionary.get('Tyrion')); // tyrion@email.com

console.log(dictionary.getKeys()); // ['Gandalf', 'John', 'Tyrion']
console.log(dictionary.getValues()); // ['gandalf@email.com', 'john@email.com', 'tyrion@email.com']

dictionary.delete('John');

console.log(dictionary.getKeys()); // ['Gandalf', 'Tyrion']

dictionary.clear();

console.log(dictionary.getKeys()); // []
