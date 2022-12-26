import { MAX_WEIGHT, MAX_VOLUME } from "../../constants/app";
import { map } from "../../seed/phase-1/map";
import { Bag } from "../../types/phase-1/Bag";
import { GiftId } from "../../types/phase-1/Gift";

export function loadBag(bag: Bag, usedGifts: GiftId[]) {
    let currentWeight = 0;
    let currentVolume = 0;

    map.gifts
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
            const filteredGifts = map.gifts.filter(
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
