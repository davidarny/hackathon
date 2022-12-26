import { groupBy } from "lodash";
import { Child, ChildGender } from "../../types/shared/Child";

export function groupChildrenByGender(children: Child[]) {
    return groupBy(children, "gender") as Record<ChildGender, Child[]>;
}
