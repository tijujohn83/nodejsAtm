import { WithdrawItems } from '../../models/atm/withdrawItems';
import { DenominationCapacity } from '../../models/denominations/denominationCapacity';

export interface WithdrawStrategy {
    getOptimumCombination(amount: number, atmState: { [key: string]: DenominationCapacity }): WithdrawItems;
}
