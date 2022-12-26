import { isEmpty, sample } from "lodash";
import { categories } from "../../constants/categories";
import { Prize, PrizeType } from "../../types/phase-2/Prize";
import { Child } from "../../types/shared/Child";

export function getBestCategory(child: Child, prizes: Record<PrizeType, Prize[]>) {
    let isEmptyCategory = true;
    let category: PrizeType;

    let index = 0;

    while (isEmptyCategory) {
        category = categories[child.age][child.gender]![index];
        isEmptyCategory = isEmpty(prizes[category]);

        if (isEmptyCategory) {
            index++;
        } else {
            break;
        }
    }

    return category!;
}
