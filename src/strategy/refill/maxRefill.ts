import { currentDenominations } from "../../models/denominations/currentDenominations";
import { ItemCapacity } from "../../models/itemCapacity";
import { RefillStrategy } from "./refillStrategy";

export class MaxRefill implements RefillStrategy {
    Refill(atmState: { [key: string]: ItemCapacity; }, maxCapacities: { [key: string]: number }): void {

        Object.keys(maxCapacities).forEach(c => {
            atmState[c] = new ItemCapacity(currentDenominations[c], maxCapacities[c], maxCapacities[c]);
        });
    }
}