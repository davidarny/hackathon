import { Move } from "../types/Move";

export function distance(from: Move, to: Move) {
    const x = to.x - from.x;
    const y = to.y - from.y;
    return Math.sqrt(x * x + y * y);
}
