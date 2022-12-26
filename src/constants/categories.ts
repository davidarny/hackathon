import { ChildGender } from "../types/shared/Child";
import { PrizeType } from "../types/phase-2/Prize";

export type Categories = Record<ChildGender | "common", PrizeType[]>;

export const categories: PrizeType[] = [
    "board_games",
    "outdoor_games",
    "playground",
    "sweets",
    "books",
    "pet",
    "constructors",
    "radio_controlled_toys",
    "toy_vehicles",
    "computer_games",
    "dolls",
    "clothes",
    "soft_toys",
];
