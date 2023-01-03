// Node class
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// BinaryTree class
class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Method to insert a new node in the tree
    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value === current.value) {
                return undefined;
            }
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Method to find a node with a specific value
    find(value) {
        if (!this.root) {
            return undefined;
        }
        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        if (!found) {
            return undefined;
        }
        return current;
    }
}

// Creating a binary tree and inserting some nodes
const tree = new BinaryTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

// Finding a node in the tree
const node = tree.find(15);
console.log(node);  // Output: Node { value: 15, left: null, right: null }