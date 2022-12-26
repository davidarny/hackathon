import { Gift } from "../../types/phase-1/Gift";
import { Move } from "../../types/phase-1/Move";
import { distance } from "./distance";

export function sortGifts(gifts: Gift[]) {
    const zero: Move = {
        x: 0,
        y: 0,
    };

    const sorter = (a: Gift, b: Gift) =>
        distance(
            {
                x: a.weight,
                y: a.volume,
            },
            zero
        ) -
        distance(
            {
                x: b.weight,
                y: b.volume,
            },
            zero
        );

    gifts.sort(sorter);
}
