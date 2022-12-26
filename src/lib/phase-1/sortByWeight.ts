import { Move } from "../../types/phase-1/Move";
import { MoveWithWeight } from "../../types/phase-1/MoveWithWeight";
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
}
