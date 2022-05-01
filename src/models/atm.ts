import { AtmRequirement } from "../atmRequirements";
import { WithdrawStrategy } from "../strategy/withdrawStrategy";
import { fiftyNote, fiveCoin, fiveHundredNote, oneCoin, oneHundredNote, tenCoin, thousandNote, twentyCoin, twoCoin, twoHundredNote } from "./denominations/currentDenominations";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";
import { WithdrawItem } from "./withdrawn";

export class Atm implements AtmRequirement {
    private _items: { [key: string]: ItemCapacity } = {};
    private _strategy: WithdrawStrategy;

    constructor(strategy: WithdrawStrategy) {
        this._items[thousandNote.friendlyName] = new ItemCapacity(thousandNote, 1000);
        this._items[fiveHundredNote.friendlyName] = new ItemCapacity(fiveHundredNote, 1000);
        this._items[twoHundredNote.friendlyName] = new ItemCapacity(twoHundredNote, 1000);
        this._items[oneHundredNote.friendlyName] = new ItemCapacity(oneHundredNote, 1000);
        this._items[fiftyNote.friendlyName] = new ItemCapacity(fiftyNote, 1000);
        this._items[twentyCoin.friendlyName] = new ItemCapacity(twentyCoin, 1000);
        this._items[tenCoin.friendlyName] = new ItemCapacity(tenCoin, 1000);
        this._items[fiveCoin.friendlyName] = new ItemCapacity(fiveCoin, 1000);
        this._items[twoCoin.friendlyName] = new ItemCapacity(twoCoin, 1000);
        this._items[oneCoin.friendlyName] = new ItemCapacity(oneCoin, 1000);
        this._strategy = strategy;
    }

    public refill(): void {
        Object.keys(this._items).forEach(item => {
            this._items[item].BalanceItemCount = this._items[item].MaxCapacity;
        });
    }

    public getBalances(): WithdrawItem[] {
        return Object.values(this._items)
            .map(i => new WithdrawItem(i.Denomination.friendlyName, i.BalanceItemCount))
            .sort((a, b) => a.count - b.count);
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
                return { status: WithdrawStatus.Success, dispensed: withdraw };
            }
        }
        return { status: WithdrawStatus.Failure };
    }

}