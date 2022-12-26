import { Move } from "../../types/phase-1/Move";
import { SnowArea } from "../../types/phase-1/SnowArea";

const sqr = (x: number) => x * x;

export const calculateIntersectionsCount = (from: Move, to: Move, area: SnowArea) => {
    const v1 = to.x - from.x;
    const v2 = to.y - from.y;
    const s = from.x * to.y - to.x * from.y;
    const k1 = -2 * area.x;
    const k2 = -2 * area.y;
    const f = sqr(area.x) + sqr(area.y) - sqr(area.r);

    const a = sqr(v1) + sqr(v2);
    const b = sqr(v1) * k1 + 2 * s * v2 + v1 * k2 * v2;
    const c = f * sqr(v1) + sqr(s) + v1 * k2 * s;

    const D = sqr(b) - 4 * a * c;

    if (D < 0) {
        return 0;
    } else if (D < 0.001) {
        return 1;
    }

    return 2;
};
