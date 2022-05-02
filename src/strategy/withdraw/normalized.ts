import { ItemCapacity } from "../../models/itemCapacity";
import { WithdrawItems } from "../../models/withdrawn";
import { WithdrawStrategy } from "./withdrawStrategy";

export class Normalized implements WithdrawStrategy {

    getOptimumCombination(amount: number, atmState: { [key: string]: ItemCapacity }): WithdrawItems {
        var withDrawn: WithdrawItems = {};
        var remainingAmount = amount;
        var orderedItemsDesc = Object.values(atmState);

        while (this.getAtmBalance(atmState) > 0 && remainingAmount > 0 && orderedItemsDesc.length > 0) {

            orderedItemsDesc = orderedItemsDesc
                .filter(c => c.Denomination.value <= remainingAmount && c.BalanceItemCount > 0)
                .sort((a, b) => b.Denomination.value * b.BalanceItemCount - a.Denomination.value * a.BalanceItemCount);

            var largest = orderedItemsDesc[0];
            var secondLargest = orderedItemsDesc[orderedItemsDesc.length - 1];
            var amountDiff = (largest.Denomination.value * largest.BalanceItemCount) - (secondLargest.Denomination.value * secondLargest.BalanceItemCount);
            amountDiff = amountDiff == 0 ? 1 : amountDiff;

            var suggested = Math.ceil(amountDiff / largest.Denomination.value);
            var available = largest.BalanceItemCount < suggested ? largest.BalanceItemCount : suggested;
            var required = Math.floor(remainingAmount / largest.Denomination.value);

            if (required > 0) {
                var actual = 0;
                if (available < required) {
                    actual = available;
                }
                else {
                    actual = required;
                }
                if (actual > 0) {
                    withDrawn[largest.Denomination.id] = (withDrawn[largest.Denomination.id] === undefined) ? 0 : withDrawn[largest.Denomination.id]
                    withDrawn[largest.Denomination.id] += actual;
                    largest.BalanceItemCount -= actual;
                    remainingAmount -= actual * largest.Denomination.value;
                }
            }
        }
        return withDrawn;
    }

    public getAtmBalance(atmState: { [key: string]: ItemCapacity }): number {
        return Object.values(atmState)
            .map(i => i.Denomination.value * i.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);
    }

}