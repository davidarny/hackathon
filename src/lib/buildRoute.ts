import { data } from "../seed/map";
import { Bag } from "../types/Bag";
import { Child } from "../types/Child";
import { GiftId } from "../types/Gift";
import { Move } from "../types/Move";
import { StackOfBags } from "../types/StackOfBags";
import { createGraph } from "./createGraph";
import { loadBag } from "./loadBag";

interface RunParams {
    children: Child[];
    stackOfBags: StackOfBags;
    currentBag: Bag;
    moves: Move[];
    usedGifts: GiftId[];
}

export function buildRoute({ children, stackOfBags, currentBag, moves, usedGifts }: RunParams) {
    const lastBag = stackOfBags[stackOfBags.length - 1];

    if (children.length === 0) {
        return;
    }

    currentBag.forEach((gift) => {
        const currentChild = children.shift();

        if (!currentChild) {
            return;
        }

        moves.push(currentChild);

        usedGifts.push(gift);
        lastBag.push(gift);
    });

    moves.push({ x: 0, y: 0 });

    if (usedGifts.length !== data.gifts.length) {
        currentBag = [];
        stackOfBags.push([]);
        loadBag(currentBag, usedGifts);
        buildRoute({
            children,
            stackOfBags,
            currentBag,
            moves,
            usedGifts,
        });
    }
}
