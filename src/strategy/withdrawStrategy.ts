import { ItemCapacity } from "../models/itemCapacity";

export interface WithdrawStrategy {    
    getOptimumCombination(totalCapacity: ItemCapacity[]): ;
}