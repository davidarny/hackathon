import { groupBy, isEmpty, keyBy, sample, shuffle, sortBy, sum, zip } from "lodash";
import { MAX_PRICE } from "../../constants/app";
import { categories } from "../../constants/categories";
import { children } from "../../seed/phase-2/children";
import { prizes } from "../../seed/phase-2/prizes";
import { Order } from "../../types/phase-2/Order";
import { Prize, PrizeType } from "../../types/phase-2/Prize";
import { Child, ChildGender } from "../../types/shared/Child";
import { getBestCategory } from "./getBestCatrgory";

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
    // const unfoldedOrder = order.presentingGifts.map((gift) => {
    //     const child = childrenMap[gift.childID]!;
    //     const prize = prizesMap[gift.giftID]!;

    //     return {
    //         childId: child.id,
    //         childAge: child.age,
    //         childGender: child.gender,
    //         giftId: prize.id,
    //         giftPrice: prize.price,
    //         giftType: prize.type,
    //     };
    // });

    // const orderByGender = groupBy(sortBy(unfoldedOrder, "giftPrice"), "childGender");
    // const malesSortedByAge = sortBy(orderByGender.male, "childAge");
    // const femalesSortedByAge = sortBy(orderByGender.female, "childAge");

    // const reShuffledOrder: Order = {
    //     presentingGifts: [
    //         ...malesSortedByAge.map((child) => ({
    //             childID: child.childId,
    //             giftID: orderByGender[child.childGender]!.shift()!.giftId,
    //         })),
    //         ...femalesSortedByAge.map((child) => ({
    //             childID: child.childId,
    //             giftID: orderByGender[child.childGender]!.shift()!.giftId,
    //         })),
    //     ],
    // };

    // const unfoldedReShuffledOrder = reShuffledOrder.presentingGifts.map((gift) => {
    //     const child = childrenMap[gift.childID]!;
    //     const prize = prizesMap[gift.giftID]!;

    //     return {
    //         childId: child.id,
    //         childAge: child.age,
    //         childGender: child.gender,
    //         giftId: prize.id,
    //         giftPrice: prize.price,
    //         giftType: prize.type,
    //     };
    // });

    // console.table(unfoldedReShuffledOrder);

    // return reShuffledOrder;
}
