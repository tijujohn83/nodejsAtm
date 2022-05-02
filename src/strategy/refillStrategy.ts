import { ItemCapacity } from "../models/itemCapacity";

export interface RefillStrategy {
    Refill(items: { [key: string]: ItemCapacity }, maxCapacities: { [key: string]: number }): void;
}