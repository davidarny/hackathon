export type PrizeType =
    | "constructors"
    | "dolls"
    | "radio_controlled_toys"
    | "toy_vehicles"
    | "board_games"
    | "outdoor_games"
    | "playground"
    | "soft_toys"
    | "computer_games"
    | "sweets"
    | "books"
    | "pet"
    | "clothes";

export interface Prize {
    id: number;
    type: PrizeType;
    price: number;
}
