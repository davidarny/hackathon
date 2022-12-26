import { groupBy } from "lodash";
import { Prize, PrizeType } from "../../types/phase-2/Prize";

export function groupPrizesByType(prizes: Prize[]) {
    return groupBy(prizes, "type") as Record<PrizeType, Prize[]>;
}
