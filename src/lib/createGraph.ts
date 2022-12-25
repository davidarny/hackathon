import { data } from "../seed/map";
import { GraphNode, WeightedGraph } from "./graph";
import { isMoveInSnow } from "./isMoveInSnow";

const MAP_SIZE = 10_000;
const FACTOR = 25;

export function createGraph() {
    const graph = new WeightedGraph();

    const nodes: Array<GraphNode[]> = [];

    for (let i = 0; i < MAP_SIZE + FACTOR; i += FACTOR) {
        nodes[i] = [];

        for (let j = 0; j < MAP_SIZE + FACTOR; j += FACTOR) {
            nodes[i][j] = { x: i, y: j };
            graph.addVertex(nodes[i][j]);
        }
    }

    nodes.forEach((row, ind1, array1) => {
        row.forEach((node, ind2, array2) => {
            const from = node;

            const top = array2[ind2 + FACTOR];
            const right = array1[ind1 + FACTOR]?.[ind2 + FACTOR];
            const left = array2[ind2 - FACTOR];
            const bottom = array1[ind1 - FACTOR]?.[ind2 - FACTOR];

            top && graph.addEdge(from, top, isMoveInSnow(node) || isMoveInSnow(top) ? FACTOR : 0);
            right && graph.addEdge(from, right, isMoveInSnow(node) || isMoveInSnow(right) ? FACTOR : 0);
            left && graph.addEdge(left, from, isMoveInSnow(node) || isMoveInSnow(left) ? FACTOR : 0);
            bottom && graph.addEdge(bottom, from, isMoveInSnow(node) || isMoveInSnow(bottom) ? FACTOR : 0);
        });
    });

    let children = [...data.children];

    const snowChildren = children.filter((child) => isMoveInSnow(child));
    const cleanChildren = children.filter((child) => !isMoveInSnow(child));

    children = [...cleanChildren, ...snowChildren];

    children.sort((a, b) => a.x + a.x - (b.x + b.y));

    children.forEach((child) => {
        const topX = Math.round((child.x - FACTOR) / FACTOR) * FACTOR;
        const topY = Math.round((child.y - FACTOR) / FACTOR) * FACTOR;

        const bottomX = Math.round((child.x + FACTOR) / FACTOR);
        const bottomY = Math.round((child.y + FACTOR) / FACTOR) * FACTOR;

        const top = nodes[topX]?.[topY];
        const bottom = nodes[bottomX]?.[bottomY];
        const left = nodes[topX]?.[child.y];
        const right = nodes[bottomX]?.[child.y];

        graph.addVertex(child);

        top && graph.addEdge(top, child, isMoveInSnow(child) ? FACTOR : 0);
        bottom && graph.addEdge(child, bottom, isMoveInSnow(child) ? FACTOR : 0);
        left && graph.addEdge(left, child, isMoveInSnow(child) ? FACTOR : 0);
        right && graph.addEdge(child, right, isMoveInSnow(child) ? FACTOR : 0);
    });

    return graph;
}
