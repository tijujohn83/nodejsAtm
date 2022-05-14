import { ItemCapacity } from '../../models/itemCapacity';
import { WithdrawItems } from '../../models/withdrawn';
import { WithdrawStrategy } from './withdrawStrategy';

export class OrderByTotalValueDesc implements WithdrawStrategy {

    public getOptimumCombination(amount: number, atmState: { [key: string]: ItemCapacity }): WithdrawItems {
        const withDrawn: WithdrawItems = {};
        let remainingAmount = amount;

        const orderedItemsDesc = Object.values(atmState)
            .filter(c => c.Denomination.value <= amount && c.BalanceItemCount > 0)
            .sort((a, b) => b.Denomination.value * b.BalanceItemCount - a.Denomination.value * a.BalanceItemCount);

        let iterator = 0;
        while (iterator <= orderedItemsDesc.length - 1 && remainingAmount > 0) {
            const current = orderedItemsDesc[iterator];
            const required = Math.floor(remainingAmount / current.Denomination.value);
            if (required > 0) {
                let possible = 0;
                if (current.BalanceItemCount < required) {
                    possible = current.BalanceItemCount;
                } else {
                    possible = required;
                }
                if (possible > 0) {
                    withDrawn[current.Denomination.id] = possible;
                    remainingAmount -= possible * current.Denomination.value;
                }
            }
            iterator++;
        }
        return withDrawn;

    }

}
