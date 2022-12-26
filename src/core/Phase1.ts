import { buildRoute } from "../lib/phase-1/buildRoute";
import { loadBag } from "../lib/phase-1/loadBag";
import { sortByDistance } from "../lib/phase-1/sortByDistance";
import { sortByWeight } from "../lib/phase-1/sortByWeight";
import { map } from "../seed/phase-1/map";
import { Bag } from "../types/phase-1/Bag";
import { GiftId } from "../types/phase-1/Gift";
import { Move } from "../types/phase-1/Move";
import { Route } from "../types/phase-1/Route";
import { StackOfBags } from "../types/phase-1/StackOfBags";
import { App } from "../types/shared/App";

export class Phase1 implements App<Route> {
    private readonly moves: Move[] = [];
    private readonly stackOfBags: StackOfBags = [[]];

    private readonly usedGifts: GiftId[] = [];

    private currentBag: Bag = [];

    private get children(): Move[] {
        const values: Move[] = [...map.children];
        const startPoint = { x: 0, y: 0 };
        sortByDistance(values, startPoint);
        const orderedValues = sortByWeight(values);
        const zeroWeightValues = orderedValues.filter((value) => value.weight === 0);
        const oneWeightValues = orderedValues.filter((value) => value.weight === 1);
        sortByDistance(zeroWeightValues, startPoint);
        sortByDistance(oneWeightValues, startPoint);
        return [...zeroWeightValues, ...oneWeightValues].map((value) => ({ x: value.x, y: value.y } as Move));
    }

    constructor() {
        loadBag(this.currentBag, this.usedGifts);
        console.log({ currentBag: this.currentBag });
    }

    cleanup() {
        this.moves.length = 0;

        this.stackOfBags.length = 0;
        this.stackOfBags.push([]);

        this.usedGifts.length = 0;

        this.currentBag = [];

        return this;
    }

    run() {
        buildRoute({
            children: this.children,
            currentBag: this.currentBag,
            moves: this.moves,
            stackOfBags: this.stackOfBags,
            usedGifts: this.usedGifts,
        });

        this.stackOfBags.reverse();

        console.log({
            moves: this.moves,
            stackOfBags: this.stackOfBags,
        });

        return this;
    }

    build() {
        return {
            moves: [...this.moves],
            stackOfBags: [...this.stackOfBags],
        };
    }
}
