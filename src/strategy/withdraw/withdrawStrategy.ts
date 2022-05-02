import { ItemCapacity } from "../../models/itemCapacity";
import { WithdrawItems } from "../../models/withdrawn";

export interface WithdrawStrategy {    
    getOptimumCombination(amount: number, totalCapacity: ItemCapacity[]): WithdrawItems;
}