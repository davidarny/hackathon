import { childrens } from "../seed/childrens";
import { Bag } from "../types/Bag";
import { Move } from "../types/Move";
import { Route } from "../types/Route";
import { StackOfBags } from "../types/StackOfBags";
import { buildRoute } from "./buildRoute";
import { loadBag } from "./loadBag";
import { sortByDistance } from "./sortByDistance";
import { sortByWeight } from "./sortByWeight";

export class App {
    private readonly moves: Move[] = [];
    private readonly stackOfBags: StackOfBags = [[]];

    private readonly usedGifts: number[] = [];

    private currentBag: Bag = [];

    // private readonly snowChildren = data.children.filter((child) => isChildInSnow(child));
    // private readonly cleanChildren = data.children.filter((child) => !isChildInSnow(child));

    private get children(): Move[] {
        const values: Move[] = [...childrens];
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

        console.log({
            currentBag: this.currentBag,
            // snowChildren: this.snowChildren,
            // cleanChildren: this.cleanChildren,
        });
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

    getRoute(): Route {
        return {
            moves: [...this.moves],
            stackOfBags: [...this.stackOfBags],
        };
    }
}
