import { AtmRequirement } from "../atmRequirements";
import { ILogger } from "../logger/logger";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";
import { WithdrawItems } from "./withdrawn";
import { n1000, n500, n200, n100, n50, c20, c10, c5, c2, c1, currentDenominations } from "../models/denominations/currentDenominations";
import { RefillStrategy } from "../strategy/refill/refillStrategy";
import { WithdrawStrategy } from "../strategy/withdraw/withdrawStrategy";

export class Atm implements AtmRequirement {
    private _atmState: { [key: string]: ItemCapacity; } = {};
    public get atmState(): { [key: string]: ItemCapacity; } {
        //return copy
        var returnObj: { [key: string]: ItemCapacity; } = {};
        Object.entries(this._atmState)
            .forEach(e => returnObj[e[0]] = new ItemCapacity(e[1].Denomination, e[1].MaxCapacity, e[1].BalanceItemCount));
        return returnObj;
    }


    private _strategy: WithdrawStrategy;
    private _logger: ILogger;
    private _refillStrategy: RefillStrategy;
    private _atmMaxCapacities: { [key: string]: number } = {};


    constructor(strategy: WithdrawStrategy, refillStrategy: RefillStrategy, logger: ILogger) {
        this._logger = logger;
        this._strategy = strategy;
        this._refillStrategy = refillStrategy;

        this._atmMaxCapacities[n1000.id] = 1000;
        this._atmMaxCapacities[n500.id] = 1000;
        this._atmMaxCapacities[n200.id] = 1000;
        this._atmMaxCapacities[n100.id] = 10;
        this._atmMaxCapacities[n50.id] = 10;
        this._atmMaxCapacities[c20.id] = 10;
        this._atmMaxCapacities[c10.id] = 100;
        this._atmMaxCapacities[c5.id] = 100;
        this._atmMaxCapacities[c2.id] = 100;
        this._atmMaxCapacities[c1.id] = 100;
    }


    public refill(): void {
        this._atmState = {};
        this._refillStrategy.Refill(this._atmState, this._atmMaxCapacities);

        var logContent = "refilled to amount:" + this.getBalanceValue() + "; " +
            JSON.stringify(Object.values(this._atmState)
                .sort((a, b) => b.Denomination.value - a.Denomination.value)
                .map(i => i.Denomination.id + "[" + i.BalanceItemCount + "]"));

        this._logger.logLine(logContent);
    }

    public getBalances(): WithdrawItems {
        var returnVal: WithdrawItems = {};
        Object.values(this._atmState).forEach(i => {
            returnVal[i.Denomination.id] = i.BalanceItemCount;
        });
        return returnVal;
    }

    public getBalanceValue(): number {
        return Object.values(this._atmState)
            .map(i => i.Denomination.value * i.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);
    }

    public withDraw(requestedAmount: number): { status: WithdrawStatus, dispensed?: WithdrawItems } {
        if (this.getBalanceValue() >= requestedAmount) {
            var withdrawnItems = this._strategy.getOptimumCombination(requestedAmount, this.atmState);
            if (this.validateAmount(requestedAmount, withdrawnItems)) {
                Object.keys(withdrawnItems).forEach(id => {
                    this._atmState[id].BalanceItemCount -= withdrawnItems[id];
                });
                var successObj = { status: WithdrawStatus.Success, dispensed: withdrawnItems };
                var logContent = "amount:" + requestedAmount + "; balance:" + this.getBalanceValue() + "; " + JSON.stringify(successObj)
                this._logger.logLine(logContent);
                return successObj;
            }
        }
        var logContent = "amount:" + requestedAmount + "; balance:" + this.getBalanceValue() + "; Failed";
        this._logger.logLine(logContent);
        return { status: WithdrawStatus.Failure };
    }

    private validateAmount(requestedAmount: number, withdrawnItems: WithdrawItems): boolean {
        var returnedAmount = Object.keys(withdrawnItems)
            .map(k => currentDenominations[k].value * withdrawnItems[k])
            .reduce((prev, curr) => prev + curr, 0);
        return returnedAmount === requestedAmount;
    }
}


