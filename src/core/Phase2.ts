import { mapValues } from "lodash";
import { buildOrder } from "../lib/phase-2/buildOrder";
import { groupChildrenByGender } from "../lib/phase-2/groupChildrenByGender";
import { groupPrizesByType } from "../lib/phase-2/groupPrizesByType";
import { sortChildrenByAge } from "../lib/phase-2/sortChildrenByAge";
import { sortPrizesByPrice } from "../lib/phase-2/sortPrizesByPrice";
import { children } from "../seed/phase-2/children";
import { prizes } from "../seed/phase-2/prizes";
import { Order } from "../types/phase-2/Order";
import { App } from "../types/shared/App";

export class Phase2 implements App<Order> {
    private readonly groupedPrizes = groupPrizesByType(prizes);
    private readonly groupedChildren = groupChildrenByGender(children);

    private order: Order = { presentingGifts: [] };

    constructor() {
        mapValues(this.groupedPrizes, (prizes) => sortPrizesByPrice(prizes));
        mapValues(this.groupedChildren, (children) => sortChildrenByAge(children));

        console.log({
            groupedPrizes: this.groupedPrizes,
            groupedChildren: this.groupedChildren,
        });
    }

    run(): void {
        this.order = buildOrder({
            prizes: this.groupedPrizes,
            children: this.groupedChildren,
        });
    }

    cleanup(): void {
        this.order = { presentingGifts: [] };
    }

    build(): Order {
        return { ...this.order };
    }
}
