class Graph {
    constructor() {
        this.routes = new Map();
    }

    addNode(node) {
        if (!this.routes.get(node)){
            this.routes.set(node, new Set());
        }
    }

    addRoute(node1, node2, weight) {
        var neighbors1 = this.routes.get(node1);
        var neighbors2 = this.routes.get(node2);
        if (neighbors1 && neighbors2) {
            this.routes.get(node1).add({ node: node2, weight: weight });
            /*Uncomment for bidirectional graph*/
            this.routes.get(node2).add({ node: node1, weight: weight });
        }
    }

    removeNode(node) {
        var routes = this.routes.get(node);
        if (routes) {
            this.removeRoutes(node);
            this.routes.delete(node);
        }
    }

    removeRoutes(fromNode, toNode) {
        var fromNodeRoutes = this.routes.get(fromNode);
        
        if (fromNodeRoutes) {
            if (toNode === undefined) {
                let neighbors = this.routes.get(fromNode);
                for (let neighbor of neighbors) {
                    this.removeRoutes(neighbor.node, fromNode);
                }
            } else {
                let neighbors = this.routes.get(fromNode);
                for (let neighbor of neighbors) {
                    if (neighbor.node == toNode) {
                        neighbors.delete(neighbor);
                    }
                }
            }
        } 
    }

    shortestPathBF(fromNode, toNode) {
        var visited = new Map();
        var willVisit = [];
        var predecessor;
        var currentNode;

        if (!this.routes.has(fromNode) || !this.routes.has(toNode)) {
            console.log("Node does not exist");
            return;
        }

        if (fromNode == toNode) {
            return fromNode.value;
        }

        willVisit.push({ node: fromNode, predecessor: null });

        while (willVisit.length > 0) {
            currentNode = willVisit.shift();
            predecessor = currentNode.predecessor;

            if (!visited.has(currentNode.node)) {
                visited.set(currentNode.node, predecessor);
                let neighbors = this.routes.get(currentNode.node);

                for (let neighbor of neighbors) {
                    willVisit.push({ node: neighbor.node, predecessor: currentNode.node });

                    if (neighbor.node == toNode) {
                        let pathNode = currentNode.node;
                        let path = [];
                        path.push(neighbor.node.value);

                        while (pathNode){
                            path.push(pathNode.value);
                            pathNode = visited.get(pathNode);
                        }

                        return path.reverse().join(" => ");
                    }
                }                
            }   
        }
        console.log("Unreachable");
    }

    shortestPathWeighted(fromNode, toNode) {
        var visited = new Map();
        var willVisit = new Heap();
        var currentNode;

        if (!this.routes.has(fromNode) || !this.routes.has(toNode)) {
            console.log("Node does not exist");
            return;
        }

        if (fromNode == toNode) {
            return fromNode.value;
        }

        willVisit.push({ node: fromNode, predecessor: null, priority: 0 });

        while (willVisit.length > 0) {
            currentNode = willVisit.remove();
            if (!visited.has(currentNode.node)) {
                visited.set(currentNode.node, currentNode.predecessor);

                if (currentNode.node == toNode) {
                    let pathNode = currentNode.node;
                    let path = [];

                    while (pathNode) {
                        path.push(pathNode.value);
                        pathNode = visited.get(pathNode);
                    }

                    return path.reverse().join(" => ");
                }

                let neighbors = this.routes.get(currentNode.node);
                for (let neighbor of neighbors) {
                    willVisit.add({ node: neighbor.node, predecessor: currentNode.node, priority: currentNode.priority+neighbor.weight });
                }
            }
        }
        console.log("Unreachable");
    }

    topoSort() {
        var nodes = [...this.routes.keys()];
        var sortedNodes = [];
        var sortedValues = [];
        var visited = new Map();
        var that = this;
        var hops = 0;

        for (let node of nodes) {
            tagThem(node);
        }
        
        function tagThem(node) {
            var neighbors = that.routes.get(node);
            if (visited.has(node)){
                return;
            }
            visited.set(node, hops++);

            for (let neighbor of neighbors) {
                tagThem(neighbor.node);
            }

            visited.set(node, hops++);
        }

        sortedNodes = Array.from(visited);

        sortedNodes.sort(function (x, y) {
            return  y[1] - x[1];
        });
        
        for (let arr of sortedNodes) {
            sortedValues.push(arr[0].value);
        }

        return sortedValues.join(" => ");
    }

    printNeighbors() {
        console.log("Neighbors");
        var string = "";
        for (let node of this.routes.keys()) {
            string += node.value + " => ";
            let neighbors = this.routes.get(node);
            for (let neighbor of neighbors) {
                string += neighbor.node.value + " ";
            }
            string += "\n";
        }
        return string;
    }

    printWeights() {
        console.log("Weights");
        var string = "";
        for (let node of this.routes.keys()) {
            let neighbors = this.routes.get(node);
            for (let neighbor of neighbors) {
                string += node.value + " => ";
                string += neighbor.weight + " => ";
                string += neighbor.node.value + "\n";
            } 
        }
        return string;
    }
}

class Node {
    constructor(value) {
        this.value = value;
    }
}

/* TEST CASE */
var A = new Node("A");
var B = new Node("B");
var C = new Node("C");
var D = new Node("D");
var E = new Node("E");
var F = new Node("F");
var G = new Node("G");
var H = new Node("H");
var I = new Node("I");

var graph = new Graph();

graph.addNode(A);
graph.addNode(B);
graph.addNode(C);
graph.addNode(D);
graph.addNode(E);
graph.addNode(F);
graph.addNode(G);
graph.addNode(H);
graph.addNode(I);

graph.addRoute(A, B, 2);
graph.addRoute(A, D, 3);
graph.addRoute(B, C, 5);
graph.addRoute(B, E, 2);
graph.addRoute(B, H, 5);
graph.addRoute(C, D, 1);
graph.addRoute(C, G, 6);
graph.addRoute(D, G, 7);
graph.addRoute(D, F, 2);
graph.addRoute(E, H, 3);
graph.addRoute(E, I, 8);
graph.addRoute(F, G, 1);
graph.addRoute(G, H, 3);
graph.addRoute(H, I, 4);

//graph.addNode(A);
//graph.removeNode(A);

//console.log(graph.printNeighbors());
//console.log(graph.printWeights());
//console.log(graph.shortestPathBF(E, B));
//console.log(graph.topoSort());
console.log(graph.shortestPathWeighted(A, I));