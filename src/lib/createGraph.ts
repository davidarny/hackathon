import { data } from "../seed/map";
import { GraphNode, WeightedGraph } from "./graph";
import { isChildInSnow } from "./isChildInSnow";
import { pointInCircle } from "./pointInCircle";

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
        const isInSnow = (node: GraphNode) =>
            data.snowAreas.some((area) => pointInCircle([node.x, node.y], [area.x, area.y], area.r));

        row.forEach((node, ind2, array2) => {
            const from = node;

            const top = array2[ind2 + FACTOR];
            const right = array1[ind1 + FACTOR]?.[ind2 + FACTOR];
            const left = array2[ind2 - FACTOR];
            const bottom = array1[ind1 - FACTOR]?.[ind2 - FACTOR];

            top && graph.addEdge(from, top, isInSnow(node) || isInSnow(top) ? FACTOR : 0);
            right && graph.addEdge(from, right, isInSnow(node) || isInSnow(right) ? FACTOR : 0);
            left && graph.addEdge(left, from, isInSnow(node) || isInSnow(left) ? FACTOR : 0);
            bottom && graph.addEdge(bottom, from, isInSnow(node) || isInSnow(bottom) ? FACTOR : 0);
        });
    });

    let children = [...data.children];

    const snowChildren = children.filter((child) => isChildInSnow(child));
    const cleanChildren = children.filter((child) => !isChildInSnow(child));

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

        const isInSnow = data.snowAreas.some((area) =>
            pointInCircle([child.x, child.y], [area.x, area.y], area.r)
        );

        graph.addVertex(child);

        top && graph.addEdge(top, child, isInSnow ? FACTOR : 0);
        bottom && graph.addEdge(child, bottom, isInSnow ? FACTOR : 0);
        left && graph.addEdge(left, child, isInSnow ? FACTOR : 0);
        right && graph.addEdge(child, right, isInSnow ? FACTOR : 0);
    });

    return graph;
}
