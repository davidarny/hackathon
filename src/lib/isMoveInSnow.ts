import { data } from "../seed/map";
import { Move } from "../types/Move";
import { pointInCircle } from "./pointInCircle";

export function isMoveInSnow(move: Move) {
    return data.snowAreas.some((snowArea) => {
        const result = pointInCircle([move.x, move.y], [snowArea.x, snowArea.y], snowArea.r);
        return result === -1 || result === 0;
    });
}
