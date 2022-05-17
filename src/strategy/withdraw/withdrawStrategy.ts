import { DenominationCapacity } from '../../models/denominations/denominationCapacity';
import { WithdrawItems } from '../../models/atm/withdrawItems';

export interface WithdrawStrategy {
    getOptimumCombination(amount: number, atmState: { [key: string]: DenominationCapacity }): WithdrawItems;
}
