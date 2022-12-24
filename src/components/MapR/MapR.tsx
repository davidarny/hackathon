import { data } from "../../seed/map";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MapR.module.css";
import { App } from "../../lib/app";
import { Move } from "../../types/Move";
import { useWindowSize } from "@react-hook/window-size";
import { nanoid } from "nanoid";
import { GraphNode, WeightedGraph } from "../../lib/graph";
import { pointInCircle } from "../../lib/pointInCircle";
import { isChildInShow } from "../../lib/isChildInShow";

const MAP_SIZE = 10_000;
const FACTOR = 10;

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

const snowChildren = children.filter((child) => isChildInShow(child));
const cleanChildren = children.filter((child) => !isChildInShow(child));

children = [...cleanChildren, ...snowChildren];

children.sort((a, b) => a.x + a.x - (b.x + b.y));
console.log({ children });

children.forEach((child) => {
    const topX = Math.round((child.x - FACTOR) / FACTOR) * FACTOR;
    const topY = Math.round((child.y - FACTOR) / FACTOR) * FACTOR;

    const bottomX = Math.round((child.x + FACTOR) / FACTOR);
    const bottomY = Math.round((child.y + FACTOR) / FACTOR) * FACTOR;

    const top = nodes[topX]?.[topY];
    const bottom = nodes[bottomX]?.[bottomY];

    const isChildInSnow = data.snowAreas.some((area) => pointInCircle([child.x, child.y], [area.x, area.y], area.r));

    graph.addVertex(child);
    top && graph.addEdge(top, child, isChildInSnow ? FACTOR : 0);
    bottom && graph.addEdge(child, bottom, isChildInSnow ? FACTOR : 0);
});

const graphMoves: Move[] = graph.run(children[0], children[1]);
console.log({ graphMoves });

const MapR: FC = () => {
    // const [route] = useState(() => new App().run().getRoute());
    const [route] = useState(() => ({ moves: graphMoves }));

    const [width, height] = useWindowSize();

    const aspectRatio = width / height;

    const children = data.children.map((child) => (
        <rect width={6} height={6} className={styles.child} x={child.x} y={child.y} key={nanoid()} />
    ));

    const snowAreas = data.snowAreas.map((area) => (
        <circle className={styles.snowArea} cx={area.x} cy={area.y} r={area.r} key={nanoid()} />
    ));

    const moves = useMemo(() => {
        const first = route.moves[0];
        const moves: Move[] = [first];

        for (let i = 1; i < route.moves.length - 1; i++) {
            moves.push(route.moves[i]);
        }

        return moves.reduce<JSX.Element[]>((acc, curr, index, array) => {
            const prev = array[index - 1];
            if (!prev) {
                return acc;
            }
            const line = (
                <line
                    className={styles.line}
                    key={nanoid()}
                    x1={prev?.x ?? 0}
                    y1={prev?.y ?? 0}
                    x2={curr?.x ?? 0}
                    y2={curr?.y ?? 0}
                />
            );
            acc.push(line);
            return acc;
        }, []);
    }, []);

    return (
        <svg
            viewBox={`0 0 ${Math.min(MAP_SIZE * aspectRatio, MAP_SIZE)} ${Math.min(MAP_SIZE / aspectRatio, MAP_SIZE)}`}
            className={styles.map}
        >
            {children}
            {snowAreas}
            {moves}
        </svg>
    );
};

export default MapR;
