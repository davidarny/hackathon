import { data } from "../seed/map";
import { Child } from "../types/Child";
import { pointInCircle } from "./pointInCircle";

export function isChildInShow(child: Child) {
    return data.snowAreas.some((snowArea) => {
        const result = pointInCircle([child.x, child.y], [snowArea.x, snowArea.y], snowArea.r);
        return result === -1 || result === 0;
    });
}
