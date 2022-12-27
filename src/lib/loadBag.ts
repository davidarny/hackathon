import { MAX_VOLUME, MAX_WEIGHT } from "../constants/app";
import { prizes } from "../seed/prizes";
import { Bag } from "../types/Bag";
import { sortGifts } from "./sortGifts";

export function loadBag(bag: Bag, usedGifts: number[]) {
    let currentWeight = 0;
    let currentVolume = 0;

    prizes
        .filter((gift) => !usedGifts.some((usedGift) => usedGift === gift.id))
        .forEach((gift) => {
            if (currentWeight + gift.weight <= MAX_WEIGHT && currentVolume + gift.volume <= MAX_VOLUME) {
                bag.push(gift.id);
                currentWeight += gift.weight;
                currentVolume += gift.volume;
            }
        });

    const fill = () => {
        const unusedWeight = MAX_WEIGHT - currentWeight;
        const unusedVolume = MAX_VOLUME - currentVolume;

        if (unusedWeight > 0 && unusedVolume > 0) {
            const filteredGifts = prizes.filter(
                (gift) => !usedGifts.concat(bag).some((usedGift) => usedGift === gift.id)
            );
            const suitableGift = filteredGifts.find(
                (gift) => gift.weight <= unusedWeight && gift.volume <= unusedVolume
            );
            if (suitableGift) {
                bag.push(suitableGift.id);
                currentWeight += suitableGift.weight;
                currentVolume += suitableGift.volume;
                fill();
            }
        }
    };

    fill();
}
