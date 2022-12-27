import { isEmpty, sample } from "lodash";
import { categories } from "../../constants/categories";
import { Prize, PrizeType } from "../../types/phase-2/Prize";
import { Child } from "../../types/shared/Child";

export function getBestCategory(child?: Child) {
    if (!child) {
        return sample(categories.common);
    }
    return sample(categories[child.gender])!;
}
