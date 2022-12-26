import { Move } from "../../types/phase-1/Move";

export function distance(from: Move, to: Move) {
    return Math.hypot(to.x - from.x, to.y - from.y);
}
