import { data } from "../seed/map";
import { Bag } from "../types/Bag";
import { GiftId } from "../types/Gift";
import { Move } from "../types/Move";
import { Route } from "../types/Route";
import { StackOfBags } from "../types/StackOfBags";
import { buildRoute } from "./buildRoute";
import { loadBag } from "./loadBag";
import { sortByDistance } from "./sortByDistance";

export class App {
    private readonly moves: Move[] = [];
    private readonly stackOfBags: StackOfBags = [[]];

    private readonly usedGifts: GiftId[] = [];

    private currentBag: Bag = [];

    // private readonly snowChildren = data.children.filter((child) => isChildInSnow(child));
    // private readonly cleanChildren = data.children.filter((child) => !isChildInSnow(child));

    private get children(): Move[] {
        const values: Move[] = [...data.children];
        sortByDistance(values, { x: 0, y: 0 });
        return values;
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
