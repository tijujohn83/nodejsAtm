import { currentDenominations } from '../../models/denominations/currentDenominations';
import { DenominationCapacity } from '../../models/denominations/denominationCapacity';
import { getRandomIntInclusive } from '../../services/utils';
import { RefillStrategy } from './refillStrategy';

export class RandomRefill implements RefillStrategy {
    public Refill(atmState: { [key: string]: DenominationCapacity; }, maxCapacities: { [key: string]: number }): void {
        Object.keys(maxCapacities).forEach(c => {
            atmState[c] = new DenominationCapacity(currentDenominations[c], maxCapacities[c], getRandomIntInclusive(0, maxCapacities[c]));
        });
    }
}
