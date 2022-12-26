import { sample } from "lodash";
import { categories } from "../../constants/categories";
import { Child } from "../../types/shared/Child";

export function getBestCategory(child?: Child) {
    if (!child) {
        return sample(categories.common);
    }

    return sample(categories[child.gender])!;
}
