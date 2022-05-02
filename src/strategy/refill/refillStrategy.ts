import { ItemCapacity } from "../../models/itemCapacity";

export interface RefillStrategy {
    Refill(atmState: { [key: string]: ItemCapacity }, maxCapacities: { [key: string]: number }): void;
}