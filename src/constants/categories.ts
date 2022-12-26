import { ChildGender } from "../types/Child";
import { PrizeType } from "../types/Prize";

export type Categories = Record<ChildGender | "common", PrizeType[]>;

export const categories: Categories = {
    common: ["board_games", "outdoor_games", "playground", "sweets", "books", "pet"],
    male: ["constructors", "radio_controlled_toys", "toy_vehicles", "computer_games"],
    female: ["dolls", "clothes", "soft_toys"],
};
