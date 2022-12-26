import { Child } from "../../types/shared/Child";

export function sortChildrenByAge(children: Child[]) {
    children.sort((a, b) => b.age - a.age);
}
