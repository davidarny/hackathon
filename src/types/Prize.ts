export type PrizeType =
    | "educational_games"
    | "music_games"
    | "bath_toys"
    | "bike"
    | "paints"
    | "casket"
    | "soccer_ball"
    | "toy_kitchen";

export interface Prize {
    id: number;
    weight: number;
    volume: number;
    type: PrizeType;
    price: number;
}
