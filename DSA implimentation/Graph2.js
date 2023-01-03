// Node class
class Node {
    constructor(value) {
        this.value = value;
    }
}

// Edge class
class Edge {
    constructor(node1, node2, weight) {
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
    }
}

// Graph class
class Graph {
    constructor() {
        this.nodes = {};
        this.edges = [];
    }

    // Method to add a new node to the graph
    addNode(value) {
        this.nodes[value] = new Node(value);
    }

    // Method to add a new edge to the graph
    addEdge(node1, node2, weight) {
        const edge = new Edge(node1, node2, weight);
        this.edges.push(edge);
    }
}