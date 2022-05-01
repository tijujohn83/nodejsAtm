import { ItemCapacity } from "../models/itemCapacity";
import { WithdrawItem } from "../models/withdrawn";
import { WithdrawStrategy } from "./withdrawStrategy";

export class SimpleWithdrawStrategy implements WithdrawStrategy {

    getOptimumCombination(amount: number, totalCapacity: ItemCapacity[]): WithdrawItem[] {
        var withDrawn: WithdrawItem[] = [];
        var remainingAmount = amount;

        var orderedItemsDesc = totalCapacity
            .filter(i => i.BalanceItemCount > 0)
            .sort((a, b) => b.Denomination.value - a.Denomination.value);

        var iterator = 0;
        while (iterator <= orderedItemsDesc.length - 1 && remainingAmount > 0) {
            var current = orderedItemsDesc[iterator];
            var required = Math.floor(remainingAmount / current.Denomination.value);
            if (required > 0) {
                var possible = 0;
                if (current.BalanceItemCount < required) {
                    possible = current.BalanceItemCount;
                }
                else {
                    possible = required;
                }
                if (possible > 0) {
                    withDrawn.push(new WithdrawItem(current.Denomination.friendlyName, possible));
                    remainingAmount -= possible * current.Denomination.value;
                }
            }
            iterator++;
        }
        if (remainingAmount === 0) {
            return withDrawn;
        }
        else {
            return [];
        }
    }

}