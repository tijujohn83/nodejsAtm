import { currentDenominations } from '../../models/denominations/currentDenominations';
import { ItemCapacity } from '../../models/itemCapacity';
import { RefillStrategy } from './refillStrategy';

export class EqualAmountsRefill implements RefillStrategy {
    public Refill(atmState: { [key: string]: ItemCapacity; }, maxCapacities: { [key: string]: number }): void {

        const amount = Math.min(...Object.keys(maxCapacities).map(c => currentDenominations[c].value * maxCapacities[c]));

        Object.keys(maxCapacities).forEach(c => {
            atmState[c] = new ItemCapacity(currentDenominations[c], maxCapacities[c], Math.floor(amount / currentDenominations[c].value));
        });

    }
}
