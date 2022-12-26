import { ChildGender } from "../types/Child";
import { PrizeType } from "../types/Prize";

export type AgeCategory = Record<ChildGender, PrizeType[]>;

// export const categories: Categories = {
//     male: [
//         "constructors",
//         "radio_controlled_toys",
//         "toy_vehicles",
//         "computer_games",
//         "board_games",
//         "outdoor_games",
//         "playground",
//         "sweets",
//         "books",
//         "pet",
//     ],
//     female: ["dolls", "clothes", "soft_toys", "board_games", "outdoor_games", "playground", "sweets", "books", "pet"],
// };

export const categories: AgeCategory[] = [
    {
        male: ["pet", "soft_toys"],
        female: ["pet", "soft_toys", "dolls"],
    },
    {
        male: ["toy_vehicles", "pet", "soft_toys"],
        female: ["pet", "soft_toys", "dolls"],
    },
    {
        male: ["toy_vehicles", "pet", "soft_toys", "constructors", "playground"],
        female: ["pet", "soft_toys", "dolls", "playground"],
    },
    {
        male: ["toy_vehicles", "constructors", "playground", "sweets", "outdoor_games"],
        female: ["pet", "soft_toys", "dolls", "playground", "outdoor_games", "clothes", "sweets"],
    },
    {
        male: ["toy_vehicles", "radio_controlled_toys", "constructors", "playground", "sweets", "outdoor_games"],
        female: ["soft_toys", "dolls", "playground", "outdoor_games", "clothes", "sweets"],
    },
    {
        male: [
            "toy_vehicles",
            "radio_controlled_toys",
            "constructors",
            "playground",
            "board_games",
            "sweets",
            "outdoor_games",
            "books",
        ],
        female: ["dolls", "playground", "outdoor_games", "clothes", "sweets", "books", "board_games"],
    },
    {
        male: [
            "radio_controlled_toys",
            "constructors",
            "playground",
            "board_games",
            "sweets",
            "outdoor_games",
            "books",
            "computer_games",
        ],
        female: [
            "dolls",
            "playground",
            "outdoor_games",
            "clothes",
            "sweets",
            "books",
            "board_games",
            "computer_games",
            "pet",
        ],
    },
    {
        male: [
            "radio_controlled_toys",
            "constructors",
            "playground",
            "board_games",
            "sweets",
            "outdoor_games",
            "books",
            "computer_games",
            "pet",
        ],
        female: ["dolls", "clothes", "sweets", "books", "board_games", "computer_games", "pet"],
    },
    {
        male: [
            "radio_controlled_toys",
            "constructors",
            "playground",
            "board_games",
            "sweets",
            "outdoor_games",
            "books",
            "computer_games",
            "pet",
        ],
        female: ["dolls", "clothes", "sweets", "books", "board_games", "computer_games", "pet"],
    },
    {
        male: [
            "radio_controlled_toys",
            "constructors",
            "playground",
            "board_games",
            "sweets",
            "outdoor_games",
            "books",
            "computer_games",
            "pet",
        ],
        female: ["dolls", "clothes", "sweets", "books", "board_games", "computer_games", "pet"],
    },
    {
        male: [
            "radio_controlled_toys",
            "constructors",
            "playground",
            "board_games",
            "sweets",
            "outdoor_games",
            "books",
            "computer_games",
            "pet",
        ],
        female: ["dolls", "clothes", "sweets", "books", "board_games", "computer_games", "pet"],
    },
];
