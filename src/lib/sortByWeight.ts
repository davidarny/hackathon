import { Move } from "../types/Move";
import { MoveWithWeight } from "../types/MoveWithWeight";
import { isMoveInSnow } from "./isMoveInSnow";

export function sortByWeight(moves: Move[]): MoveWithWeight[] {
    return moves
        .map((move) => {
            const weight = isMoveInSnow(move) ? 1 : 0;
            return {
                ...move,
                weight,
            };
        })
        .sort((a, b) => a.weight - b.weight);
    // .map((move) => ({ x: move.x, y: move.y } as Move));
}
