import { WithdrawStrategy } from "../strategy/withdrawStrategy";
import { fiftyNote, fiveCoin, fiveHundredNote, oneCoin, oneHundredNote, tenCoin, thousandNote, twentyCoin, twoCoin, twoHundredNote } from "./denominations/currentDenominations";
import { WithdrawStatus } from "./enums";
import { ItemCapacity } from "./itemCapacity";

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

    public getBalances(): { name: string, balance: number }[] {
        return this._items
            .map(i => <{ name: string, balance: number }>{ name: i.Denomination.FriendlyName, balance: i.Balance })
            .sort((a, b) => a.balance - b.balance);
    }

    public getBalanceValue(): number {
        return this._items
            .map(i => i.Denomination.Value * i.Balance)
            .reduce((prev, curr) => prev + curr, 0);
    }

    public withDraw(amount: number): { status: WithdrawStatus, dispensed?: { name: string, count: number }[] } {
        if (this.getBalanceValue() >= amount) {
            this._strategy.
        }
        else {
            return { status: WithdrawStatus.Failure };
        }
        return null;
    }

}