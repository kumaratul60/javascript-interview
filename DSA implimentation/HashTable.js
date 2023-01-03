// HashTable constructor
function HashTable() {
    this.table = [];

    // Hash function to calculate the index for a given key
    this.hash = function (key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }
        return total % this.table.length;
    };

    // Method to add a new key-value pair to the hash table
    this.add = function (key, value) {
        const index = this.hash(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }
        this.table[index].push([key, value]);
    };

    // Method to retrieve the value for a given key
    this.get = function (key) {
        const index = this.hash(key);
        if (!this.table[index]) {
            return null;
        }
        for (let i = 0; i < this.table[index].length; i++) {
            if (this.table[index][i][0] === key) {
                return this.table[index][i][1];
            }
        }
        return null;
    };
}

// Creating a hash table and adding some key-value pairs
const table = new HashTable();
table.add('abc', 123);
table.add('def', 456);
table.add('ghi', 789);

// Retrieving a value from the table
console.log(table.get('def'));  // Output: 456