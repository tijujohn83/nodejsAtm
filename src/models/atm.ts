import { AtmRequirement } from "../atmRequirements";
import { ILogger } from "../logger/logger";
import { RefillStrategy } from "../strategy/refillStrategy";
import { WithdrawStrategy } from "../strategy/withdrawStrategy";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";
import { WithdrawItems } from "./withdrawn";
import { n1000, n500, n200, n100, n50, c20, c10, c5, c2, c1 } from "../models/denominations/currentDenominations";

export class Atm implements AtmRequirement {
    private _items: { [key: string]: ItemCapacity } = {};
    private _strategy: WithdrawStrategy;   
    private _logger: ILogger; 
    private _refillStrategy: RefillStrategy;
    private _atmMaxCapacities:{ [key: string]: number } = {};
     

    constructor(strategy: WithdrawStrategy, refillStrategy: RefillStrategy, logger: ILogger) {
        this._logger = logger;
        this._strategy = strategy; 
        this._refillStrategy = refillStrategy; 

        this._atmMaxCapacities[n1000.id] = 10000;
        this._atmMaxCapacities[n500.id] = 10000;
        this._atmMaxCapacities[n200.id] = 10000;
        this._atmMaxCapacities[n100.id] = 10000;
        this._atmMaxCapacities[n50.id] = 10000;
        this._atmMaxCapacities[c20.id] = 10000;
        this._atmMaxCapacities[c10.id] = 10000;
        this._atmMaxCapacities[c5.id] = 10000;
        this._atmMaxCapacities[c2.id] = 10000;
        this._atmMaxCapacities[c1.id] = 10000;

        this._refillStrategy.Refill(this._items, this._atmMaxCapacities);          
    }

    public refill(): void {
        Object.values(this._items).forEach(val => {
            val.BalanceItemCount = val.MaxCapacity;
        });

        var logContent = "refilled with amount:" + this.getBalanceValue() + "; " +
            JSON.stringify(Object.values(this._items)
                .sort((a, b) => b.Denomination.value - a.Denomination.value)
                .map(i => i.Denomination.id + "[" + i.BalanceItemCount + "]"));

        this._logger.logLine(logContent);
    }

    public getBalances(): WithdrawItems {
        var returnVal: WithdrawItems = {};
        Object.values(this._items).forEach(i => {
            returnVal[i.Denomination.id] = i.BalanceItemCount;
        });
        return returnVal;
    }

    public getBalanceValue(): number {
        return Object.values(this._items)
            .map(i => i.Denomination.value * i.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);
    }

    public withDraw(amount: number): { status: WithdrawStatus, dispensed?: WithdrawItems } {
        if (this.getBalanceValue() >= amount) {
            var withdraw = this._strategy.getOptimumCombination(amount, Object.values(this._items));
            if (Object.keys(withdraw).length > 0) {
                Object.keys(withdraw).forEach(id => {
                    this._items[id].BalanceItemCount -= withdraw[id];
                });
                var successObj = { status: WithdrawStatus.Success, dispensed: withdraw };
                var logContent = "amount:" + amount + "; balance:" + this.getBalanceValue() + "; " + JSON.stringify(successObj)
                this._logger.logLine(logContent);
                return successObj;
            }
        }
        var logContent = "amount:" + amount + "; balance:" + this.getBalanceValue() + "; Failed";
        this._logger.logLine(logContent);
        return { status: WithdrawStatus.Failure };
    }

}