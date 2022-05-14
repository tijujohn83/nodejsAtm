import { currentDenominations } from '../../models/denominations/currentDenominations';
import { ItemCapacity } from '../../models/itemCapacity';
import { getRandomIntInclusive } from '../../services/utils';
import { RefillStrategy } from './refillStrategy';

export class RandomRefill implements RefillStrategy {
    public Refill(atmState: { [key: string]: ItemCapacity; }, maxCapacities: { [key: string]: number }): void {
        Object.keys(maxCapacities).forEach(c => {
            atmState[c] = new ItemCapacity(currentDenominations[c], maxCapacities[c], getRandomIntInclusive(0, maxCapacities[c]));
        });
    }
}
