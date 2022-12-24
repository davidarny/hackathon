import { Brand } from "./Brand";

export type GiftId = Brand<number, "GiftId">;
export type Volume = Brand<number, "Volume">;
export type Weight = Brand<number, "Weight">;

export interface Gift {
    id: GiftId;
    weight: Weight;
    volume: Volume;
}
