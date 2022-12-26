import { map } from "../../seed/phase-1/map";
import { Move } from "../../types/phase-1/Move";
import { pointInCircle } from "./pointInCircle";

export function isMoveInSnow(move: Move) {
    return map.snowAreas.some((snowArea) => {
        const result = pointInCircle([move.x, move.y], [snowArea.x, snowArea.y], snowArea.r);
        return result === -1 || result === 0;
    });
}
