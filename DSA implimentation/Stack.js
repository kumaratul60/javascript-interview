// Stack constructor
function Stack() {
    this.items = [];

    // Methods to push and pop elements
    this.push = function (item) {
        this.items.push(item);
    };
    this.pop = function () {
        if (this.items.length) {
            return this.items.pop();
        }
        return null;
    };
}

// Creating a stack and pushing some elements
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

// Popping an element
const popped = stack.pop();
console.log(popped);  // Output: 3
console.log(stack.items);  // Output: [1, 2]