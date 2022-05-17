import { currentDenominations } from '../../models/denominations/currentDenominations';
import { DenominationCapacity } from '../../models/denominations/denominationCapacity';
import { RefillStrategy } from './refillStrategy';

export class EqualAmountsRefill implements RefillStrategy {
    public Refill(atmState: { [key: string]: DenominationCapacity; }, maxCapacities: { [key: string]: number }): void {

        const amount = Math.min(...Object.keys(maxCapacities).map(c => currentDenominations[c].value * maxCapacities[c]));

        Object.keys(maxCapacities).forEach(c => {
            atmState[c] = new DenominationCapacity(currentDenominations[c], maxCapacities[c], Math.floor(amount / currentDenominations[c].value));
        });

    }
}
