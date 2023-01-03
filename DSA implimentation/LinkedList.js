// Node class
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Methods to add, remove, and find elements
    add(value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return this;
    }
    remove(value) {
        if (!this.head) {
            return null;
        }

        let current = this.head;
        let previous = null;

        while (current) {
            if (current.value === value) {
                if (previous) {
                    previous.next = current.next;
                    if (current.next === null) {
                        this.tail = previous;
                    }
                } else {
                    this.head = current.next;
                    if (this.head === null) {
                        this.tail = null;
                    }
                }
                this.length--;
                return current;
            }
            previous = current;
            current = current.next;
        }
        return null;
    }
    find(value) {
        if (!this.head) {
            return null;
        }

        let current = this.head;

        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}

// Creating a linked list and adding some elements
const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);

// Removing an element
list.remove(2);

// Finding an element
const node = list.find(3);
console.log(node);  // Output: Node { value: 3, next: null }