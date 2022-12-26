import { map } from "../../seed/phase-1/map";
import { Bag } from "../../types/phase-1/Bag";
import { GiftId } from "../../types/phase-1/Gift";
import { Move } from "../../types/phase-1/Move";
import { StackOfBags } from "../../types/phase-1/StackOfBags";
import { loadBag } from "./loadBag";
import { sortByDistance } from "./sortByDistance";

interface RunParams {
    children: Move[];
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
        const prevMove = moves[moves.length - 1];

        if (!currentChild) {
            return;
        }

        if (prevMove) {
            const movesToSort = [...children];
            sortByDistance(movesToSort, currentChild);
            children.length = 0;
            children.push(...movesToSort);
        }

        moves.push(currentChild);

        usedGifts.push(gift);
        lastBag.push(gift);
    });

    moves.push({ x: 0, y: 0 });

    if (usedGifts.length !== map.gifts.length) {
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
