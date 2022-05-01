import { AtmRequirement } from "../atmRequirements";
import { WithdrawStrategy } from "../strategy/withdrawStrategy";
import { n50, c5, n500, c1, n100, c10, n1000, c20, c2, n200 } from "./denominations/currentDenominations";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";
import { WithdrawItem } from "./withdrawn";
import * as fs from 'fs';

export class Atm implements AtmRequirement {
    private _items: { [key: string]: ItemCapacity } = {};
    private _strategy: WithdrawStrategy;
    private _logFile = "atmLog.log"

    constructor(strategy: WithdrawStrategy) {
        this._items[n1000.friendlyName] = new ItemCapacity(n1000, 1000);
        this._items[n500.friendlyName] = new ItemCapacity(n500, 1000);
        this._items[n200.friendlyName] = new ItemCapacity(n200, 1000);
        this._items[n100.friendlyName] = new ItemCapacity(n100, 1000);
        this._items[n50.friendlyName] = new ItemCapacity(n50, 1000);
        this._items[c20.friendlyName] = new ItemCapacity(c20, 1000);
        this._items[c10.friendlyName] = new ItemCapacity(c10, 1000);
        this._items[c5.friendlyName] = new ItemCapacity(c5, 1000);
        this._items[c2.friendlyName] = new ItemCapacity(c2, 1000);
        this._items[c1.friendlyName] = new ItemCapacity(c1, 1000);
        this._strategy = strategy;
        fs.openSync(this._logFile, 'w');
    }

    public refill(): void {
        Object.keys(this._items).forEach(item => {
            this._items[item].BalanceItemCount = this._items[item].MaxCapacity;
        });

        var logContent = "refilled with amount:" + this.getBalanceValue() + "; " + 
        JSON.stringify(Object.values(this._items)
        .sort((a, b) => b.Denomination.value - a.Denomination.value)
        .map(i => i.Denomination.friendlyName + "[" + i.BalanceItemCount + "]")) + "\n";

        fs.appendFileSync(this._logFile, logContent);
    }

    public getBalances(): WithdrawItem[] {
        return Object.values(this._items)
            .sort((a, b) => b.Denomination.value - a.Denomination.value)
            .map(i => new WithdrawItem(i.Denomination.friendlyName, i.BalanceItemCount));
    }

    public getBalanceValue(): number {
        return Object.values(this._items)
            .map(i => i.Denomination.value * i.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);
    }

    public withDraw(amount: number): { status: WithdrawStatus, dispensed?: WithdrawItem[] } {
        if (this.getBalanceValue() >= amount) {
            var withdraw = this._strategy.getOptimumCombination(amount, Object.values(this._items));
            if (withdraw.length > 0) {
                withdraw.forEach(item => {
                    this._items[item.friendlyName].BalanceItemCount -= item.count;
                });
                var successObj = { status: WithdrawStatus.Success, dispensed: withdraw };
                var logContent = "amount:" + amount + "; balance:" + this.getBalanceValue() + "; " + JSON.stringify(successObj) + "\n"
                fs.appendFileSync(this._logFile, logContent);
                return successObj;
            }
        }
        var logContent = "amount:" + amount + "; balance:" + this.getBalanceValue() + "; Failed\n";
        fs.appendFileSync(this._logFile, logContent);
        return { status: WithdrawStatus.Failure };
    }

}