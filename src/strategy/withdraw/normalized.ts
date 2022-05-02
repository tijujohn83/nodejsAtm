import { ItemCapacity } from "../../models/itemCapacity";
import { WithdrawItems } from "../../models/withdrawn";
import { WithdrawStrategy } from "./withdrawStrategy";

export class Normalized implements WithdrawStrategy {

    getOptimumCombination(amount: number, atmState: { [key: string]: ItemCapacity }): WithdrawItems {
        var withDrawn: WithdrawItems = {};
        var remainingAmount = amount;

        var orderedItemsDesc = Object.values(atmState)
            .sort((a, b) => b.Denomination.value * b.BalanceItemCount - a.Denomination.value * a.BalanceItemCount);

        var lastItem = orderedItemsDesc[orderedItemsDesc.length - 1];
        var floorAmount = lastItem.Denomination.value * lastItem.BalanceItemCount;

        var iterator = 0;
        while (iterator <= orderedItemsDesc.length - 2 && remainingAmount > 0) {
            var current = orderedItemsDesc[iterator];
            var required = Math.floor(remainingAmount / current.Denomination.value);
            var floorCount = Math.ceil(floorAmount / current.Denomination.value);
            if (required > 0) {
                var possible = 0;
                if (current.BalanceItemCount - floorCount < required) {
                    possible = current.BalanceItemCount - floorCount;
                }
                else {
                    possible = required;
                }
                if (possible > 0) {
                    withDrawn[current.Denomination.id] = possible;
                    current.BalanceItemCount -= possible;
                    remainingAmount -= possible * current.Denomination.value;
                }
            }
            iterator++;
        }

        if (remainingAmount > 0) {

            orderedItemsDesc = Object.values(atmState)
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
                        withDrawn[current.Denomination.id] = possible;
                        current.BalanceItemCount -= possible;
                        remainingAmount -= possible * current.Denomination.value;
                    }
                }
                iterator++;
            }
        }


        return withDrawn;

    }

}