import { data } from "../../seed/map";
import { FC, useMemo, useState } from "react";
import styles from "./MapR.module.css";
import { App } from "../../lib/app";
import { Move } from "../../types/Move";
import { useWindowSize } from "@react-hook/window-size";
import { nanoid } from "nanoid";

const MAP_SIZE = 10_000;

const MapR: FC = () => {
    const [route] = useState(() => new App().run().getRoute());

    const [width, height] = useWindowSize();

    const aspectRatio = width / height;

    const children = data.children.map((child) => (
        <circle r={5} className={styles.child} cx={child.x} cy={child.y} key={nanoid()} />
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
