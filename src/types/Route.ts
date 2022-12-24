import { Move } from "./Move";
import { StackOfBags } from "./StackOfBags";

export interface Route {
    moves: Move[];
    stackOfBags: StackOfBags;
}
