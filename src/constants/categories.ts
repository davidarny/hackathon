import { ChildAge, ChildGender } from "../types/shared/Child";
import { PrizeType } from "../types/phase-2/Prize";

export type Categories = Record<ChildGender | "common", PrizeType[]>;

export const categories: Record<ChildAge, Categories> = {
    0: {
        female: ["pet", "soft_toys"],
        male: ["pet", "toy_vehicles"],
        common: ["sweets"],
    },
    1: {
        female: ["pet", "soft_toys"],
        male: ["pet", "toy_vehicles"],
        common: ["sweets"],
    },
    2: {
        female: ["pet", "soft_toys"],
        male: ["pet", "toy_vehicles"],
        common: ["sweets", "playground"],
    },
    3: {
        female: ["pet", "soft_toys"],
        male: ["pet", "toy_vehicles", "constructors"],
        common: ["sweets", "outdoor_games", "playground"],
    },
    4: {
        female: ["pet", "soft_toys"],
        male: ["pet", "toy_vehicles", "constructors"],
        common: ["sweets", "outdoor_games", "playground"],
    },
    5: {
        female: ["pet", "soft_toys", "dolls", "playground"],
        male: ["pet", "radio_controlled_toys", "toy_vehicles", "constructors"],
        common: ["sweets", "outdoor_games"],
    },
    6: {
        female: ["pet", "clothes", "dolls"],
        male: ["computer_games", "radio_controlled_toys", "constructors"],
        common: ["outdoor_games", "sweets", "board_games", "books"],
    },
    7: {
        female: ["pet", "clothes", "dolls"],
        male: ["computer_games", "radio_controlled_toys", "constructors"],
        common: ["outdoor_games", "sweets", "board_games", "books"],
    },
    8: {
        female: ["clothes", "pet", "dolls"],
        male: ["computer_games", "radio_controlled_toys", "constructors"],
        common: ["outdoor_games", "sweets", "board_games", "books"],
    },
    9: {
        female: ["clothes", "pet", "dolls"],
        male: ["computer_games", "radio_controlled_toys", "constructors"],
        common: ["outdoor_games", "sweets", "board_games", "books"],
    },
    10: {
        female: ["clothes", "pet", "dolls"],
        male: ["computer_games", "radio_controlled_toys", "constructors"],
        common: ["outdoor_games", "sweets", "board_games", "books"],
    },
};
