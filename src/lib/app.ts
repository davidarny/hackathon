import { data } from "../seed/map";
import { Bag } from "../types/Bag";
import { Child } from "../types/Child";
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

    private get children() {
        const values: Child[] = [...this.cleanChildren, ...this.snowChildren];
        values.sort((a, b) => a.x + a.y - (b.x + b.y));
        return values;
    }

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
        const children = this.children;

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
