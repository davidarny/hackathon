import { Prize } from "../../types/phase-2/Prize";

export function sortPrizesByPrice(prizes: Prize[]) {
    prizes.sort((a, b) => b.price - a.price);
}
