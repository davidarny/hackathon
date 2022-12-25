import { Move } from "../types/Move";
import { distance } from "./distance";

export function sortByDistance(coordinates: Move[], point: Move) {
    const sorter = (a: Move, b: Move) => distance(a, point) - distance(b, point);
    coordinates.sort(sorter);
}
