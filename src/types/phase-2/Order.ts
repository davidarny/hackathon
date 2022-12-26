import { ChildId } from "../shared/Child";
import { PrizeId } from "./Prize";

interface PresentedGift {
    giftID: PrizeId;
    childID: ChildId;
}

export interface Order {
    presentingGifts: PresentedGift[];
}
