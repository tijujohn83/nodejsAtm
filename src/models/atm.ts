import { WithdrawStrategy } from "../strategy/withdrawStrategy";
import { fiftyNote, fiveCoin, fiveHundredNote, oneCoin, oneHundredNote, tenCoin, thousandNote, twentyCoin, twoCoin, twoHundredNote } from "./denominations/currentDenominations";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";
import { WithdrawItem } from "./withdrawn";

export class Atm {
    private _items: ItemCapacity[];
    private _strategy: WithdrawStrategy;

    constructor(strategy: WithdrawStrategy) {
        this._items = [
            new ItemCapacity(thousandNote, 1000),
            new ItemCapacity(fiveHundredNote, 1000),
            new ItemCapacity(twoHundredNote, 1000),
            new ItemCapacity(oneHundredNote, 1000),
            new ItemCapacity(fiftyNote, 1000),

            new ItemCapacity(twentyCoin, 1000),
            new ItemCapacity(tenCoin, 1000),
            new ItemCapacity(fiveCoin, 1000),
            new ItemCapacity(twoCoin, 1000),
            new ItemCapacity(oneCoin, 1000)
        ];
        this._strategy = strategy;
    }

    public refill(): void {
        this._items.forEach(item => {
            item.Balance = item.MaxCapacity;
        });
    }

    public getBalances(): WithdrawItem[] {
        return this._items
            .map(i => new WithdrawItem(i.Denomination.friendlyName, i.Balance))
            .sort((a, b) => a.count - b.count);
    }

    public getBalanceValue(): number {
        return this._items
            .map(i => i.Denomination.value * i.Balance)
            .reduce((prev, curr) => prev + curr, 0);
    }

    public withDraw(amount: number): { status: WithdrawStatus, dispensed?: WithdrawItem[] } {
        if (this.getBalanceValue() >= amount) {
            var withDrawn = this._strategy.getOptimumCombination(this._items);
            if (withDrawn.length > 0) {
                return { status: WithdrawStatus.Success, dispensed: withDrawn };
            }
        }
        return { status: WithdrawStatus.Failure };
    }

}