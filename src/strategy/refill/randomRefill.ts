import { currentDenominations } from "../../models/denominations/currentDenominations";
import { ItemCapacity } from "../../models/itemCapacity";
import { RefillStrategy } from "./refillStrategy";

export class RandomRefill implements RefillStrategy {
    Refill(items: { [key: string]: ItemCapacity; }, maxCapacities: { [key: string]: number }): void {
        Object.keys(maxCapacities).forEach(c => {
            items[c] = new ItemCapacity(currentDenominations[c], maxCapacities[c], this.getRandomIntInclusive(0, maxCapacities[c]));
        });
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}