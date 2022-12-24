import { data } from "../../seed/map";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./MapR.module.css";
import { App } from "../../lib/app";
import { Move } from "../../types/Move";
import { useWindowSize } from "@react-hook/window-size";

const MAP_SIZE = 10_000;

const MapR: FC = () => {
    const [route] = useState(() => new App().run().getRoute());

    const [width, height] = useWindowSize();

    const aspectRatio = width / height;
    console.log("🚀 ~ file: MapR.tsx:16 ~ aspectRatio", aspectRatio)

    const children = data.children.map((child, index) => (
        <rect width={6} height={6} className={styles.child} x={child.x} y={child.y} key={index} />
    ));

    const snowAreas = data.snowAreas.map((area, index) => (
        <circle className={styles.snowArea} cx={area.x} cy={area.y} r={area.r} key={index} />
    ));

    const moves = route.moves
        .reduce((acc, __, index, array) => {
            if (index % 2 === 0) {
                acc.push(array.slice(index, index + 2));
            }
            return acc;
        }, [] as Move[][])
        .map(([from, to], index) => (
            <line className={styles.line} key={index} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
        ));

    return (
        <svg viewBox={`0 0 ${Math.min(MAP_SIZE * aspectRatio, MAP_SIZE)} ${Math.min(MAP_SIZE / aspectRatio, MAP_SIZE)}`} className={styles.map}>
            {children}
            {snowAreas}
            {moves}
        </svg>
    );
};

export default MapR;
