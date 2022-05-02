import { AtmRequirement } from "../atmRequirements";
import { ILogger } from "../logger/ilogger";
import { WithdrawStrategy } from "../strategy/withdrawStrategy";
import { n50, c5, n500, c1, n100, c10, n1000, c20, c2, n200 } from "./denominations/currentDenominations";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";
import { WithdrawItems } from "./withdrawn";


export class Atm implements AtmRequirement {
    private _items: { [key: string]: ItemCapacity } = {};
    private _strategy: WithdrawStrategy;   
    private _logger: ILogger; 

    constructor(strategy: WithdrawStrategy, logger: ILogger) {
        this._items[n1000.id] = new ItemCapacity(n1000, 10);
        this._items[n500.id] = new ItemCapacity(n500, 9999999);
        this._items[n200.id] = new ItemCapacity(n200, 10000);
        this._items[n100.id] = new ItemCapacity(n100, 1000);
        this._items[n50.id] = new ItemCapacity(n50, 1000);
        this._items[c20.id] = new ItemCapacity(c20, 1000);
        this._items[c10.id] = new ItemCapacity(c10, 1000);
        this._items[c5.id] = new ItemCapacity(c5, 1000);
        this._items[c2.id] = new ItemCapacity(c2, 1000);
        this._items[c1.id] = new ItemCapacity(c1, 1000);

        this._logger = logger;
        this._strategy = strategy;            
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