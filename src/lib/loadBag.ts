import { MAX_VOLUME, MAX_WEIGHT } from "../constants/app";
import { data } from "../seed/map";
import { Bag } from "../types/Bag";
import { GiftId } from "../types/Gift";
import { sortGifts } from "./sortGifts";

export function loadBag(bag: Bag, usedGifts: GiftId[]) {
    let currentWeight = 0;
    let currentVolume = 0;

    data.gifts
        .filter((gift) => !usedGifts.some((usedGift) => usedGift === gift.id))
        .forEach((gift) => {
            if (currentWeight + gift.weight <= MAX_WEIGHT && currentVolume + gift.volume <= MAX_VOLUME) {
                bag.push(gift.id);
                currentWeight += gift.weight;
                currentVolume += gift.volume;
            }
        });

    console.warn({
        unusedWeight: MAX_WEIGHT - currentWeight,
        unusedVolume: MAX_VOLUME - currentVolume,
    });
}
