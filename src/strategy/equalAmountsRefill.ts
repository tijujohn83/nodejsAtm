import { currentDenominations } from "../models/denominations/currentDenominations";
import { ItemCapacity } from "../models/itemCapacity";
import { RefillStrategy } from "./refillStrategy";

export class EqualAmountsRefill implements RefillStrategy {
    Refill(items: { [key: string]: ItemCapacity; }, maxCapacities: { [key: string]: number }): void {

        var amount = Math.min(...Object.keys(maxCapacities).map(c => currentDenominations[c].value * maxCapacities[c]));

        Object.keys(maxCapacities).forEach(c => {
            items[c] = new ItemCapacity(currentDenominations[c], maxCapacities[c], Math.floor(amount / currentDenominations[c].value));
        });

    }
}