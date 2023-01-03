/*
A graph is a non-linear data structure that consists of vertices (also called nodes) and edges connecting them. There are two main types of graphs: directed graphs, in which edges have a direction, and undirected graphs, in which edges have no direction.
*/

// Graph constructor
function Graph() {
    this.nodes = {};

    // Method to add a new node to the graph
    this.addNode = function (node) {
        this.nodes[node] = this.nodes[node] || [];
    };

    // Method to add a new edge to the graph
    this.addEdge = function (node1, node2, weight) {
        this.nodes[node1].push({ node: node2, weight });
        this.nodes[node2].push({ node: node1, weight });
    };
}

// Creating a graph and adding some nodes and edges
const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 3);

console.log(graph.nodes);
  // Output:
  // {
  //   A: [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
  //   B: [{ node: 'A', weight: 4 }, { node: 'C', weight: 3 }],
  //   C: [{ node: 'A', weight: 2 }, { node: 'B', weight: 3 }]
  // }

