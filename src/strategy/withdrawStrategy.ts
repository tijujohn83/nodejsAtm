import { ItemCapacity } from "../models/itemCapacity";
import { WithdrawItem } from "../models/withdrawn";

export interface WithdrawStrategy {    
    getOptimumCombination(amount: number, totalCapacity: ItemCapacity[]): WithdrawItem[];
}