import { data } from "../seed/map";
import { Bag } from "../types/Bag";
import { GiftId } from "../types/Gift";
import { Move } from "../types/Move";
import { Route } from "../types/Route";
import { StackOfBags } from "../types/StackOfBags";
import { buildRoute } from "./buildRoute";
import { isChildInShow } from "./isChildInShow";
import { loadBag } from "./loadBag";

export class App {
    private readonly moves: Move[] = [];
    private readonly stackOfBags: StackOfBags = [[]];

    private readonly usedGifts: GiftId[] = [];

    private currentBag: Bag = [];

    private readonly snowChildren = data.children.filter((child) => isChildInShow(child));
    private readonly cleanChildren = data.children.filter((child) => !isChildInShow(child));

    constructor() {
        loadBag(this.currentBag, this.usedGifts);

        console.log({
            currentBag: this.currentBag,
            snowChildren: this.snowChildren,
            cleanChildren: this.cleanChildren,
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
        const children = [...this.cleanChildren, ...this.snowChildren];

        buildRoute({
            children,
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
