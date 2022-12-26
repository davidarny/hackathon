import { isEmpty, keyBy, sum, zip } from "lodash";
import { MAX_PRICE } from "../../constants/app";
import { children } from "../../seed/phase-2/children";
import { prizes } from "../../seed/phase-2/prizes";
import { Order } from "../../types/phase-2/Order";
import { Prize, PrizeType } from "../../types/phase-2/Prize";
import { Child, ChildGender } from "../../types/shared/Child";
import { getBestCategory } from "./getBestCategory";

interface BuildOrderOption {
    children: Record<ChildGender, Child[]>;
    prizes: Record<PrizeType, Prize[]>;
}

const childrenMap = keyBy(children, "id");
const prizesMap = keyBy(prizes, "id");

export function buildOrder({ children, prizes }: BuildOrderOption) {
    const order: Order = {
        presentingGifts: [],
    };

    let currentPrice = 0;

    const buildGenderRoute = (child: Child) => {
        let category = getBestCategory(child)!;
        if (isEmpty(prizes[category])) {
            category = getBestCategory()!;
        }

        const prize = prizes[category].shift();

        if (!prize) {
            return;
        }

        currentPrice += prize.price;

        order.presentingGifts.push({
            childID: child.id,
            giftID: prize.id,
        });
    };

    zip(children.male, children.female).forEach(([male, female]) => {
        male && buildGenderRoute(male);
        female && buildGenderRoute(female);
    });

    while (currentPrice > MAX_PRICE) {
        const lastGift = order.presentingGifts.shift()!;
        const child = childrenMap[lastGift.childID]!;
        const prize = prizesMap[lastGift.giftID]!;

        currentPrice -= prize.price;

        buildGenderRoute(child);
    }

    console.log({
        totalPrice: sum(order.presentingGifts.map((gift) => prizesMap[gift.giftID]!.price)),
    });

    return order;
}
