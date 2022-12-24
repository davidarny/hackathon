export interface GraphNode {
    x: number;
    y: number;
}

class QueueNode {
    constructor(readonly val: GraphNode, readonly priority: number) {}
}

class PriorityQueue {
    constructor(readonly values: QueueNode[] = []) {}

    enqueue(val: GraphNode, priority: number) {
        let newNode = new QueueNode(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end as QueueNode;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < (leftChild as QueueNode).priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

interface Adjacency {
    node: GraphNode;
    weight: number;
}

export class WeightedGraph {
    constructor(private adjacencyList = new Map<GraphNode, Adjacency[]>()) {}

    addVertex(vertex: GraphNode) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: GraphNode, vertex2: GraphNode, weight: number) {
        const newLocal = this.adjacencyList.get(vertex1);
        newLocal?.push({ node: vertex2, weight });
        this.adjacencyList.get(vertex2)?.push({ node: vertex1, weight });
    }

    run(start: GraphNode, finish: GraphNode) {
        const nodes = new PriorityQueue();
        const distances = new Map<GraphNode, number>();
        const previous = new Map<GraphNode, GraphNode | null>();
        let path: GraphNode[] = []; //to return at end
        let smallest: GraphNode;
        //build up initial state
        [...this.adjacencyList.entries()].forEach(([vertex]) => {
            if (vertex.x === start.x && vertex.y === start.y) {
                distances.set(vertex, 0);
                nodes.enqueue(vertex, 0);
            } else {
                distances.set(vertex, Infinity);
                nodes.enqueue(vertex, Infinity);
            }
            previous.set(vertex, null);
        });
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous.get(smallest)) {
                    path.push(smallest);
                    smallest = previous.get(smallest) as GraphNode;
                }
                break;
            }
            if (smallest || distances.get(smallest) !== Infinity) {
                for (let neighbor of this.adjacencyList.get(smallest) ?? []) {
                    //find neighboring node
                    let nextNode = this.adjacencyList
                        .get(smallest)
                        ?.find(({ node }) => node.x === neighbor.node.x && node.y === neighbor.node.y);
                    //calculate new distance to neighboring node
                    let candidate = distances.get(smallest)! + nextNode!.weight;
                    let nextNeighbor = nextNode!.node;
                    if (candidate < distances.get(nextNeighbor)!) {
                        //updating new smallest distance to neighbor
                        distances.set(nextNeighbor, candidate);
                        //updating previous - How we got to neighbor
                        previous.set(nextNeighbor, smallest);
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest!).reverse();
    }
}
