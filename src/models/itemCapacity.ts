import { IDenomination } from "./denominations/denomination";

export class ItemCapacity {
    private _denomination: IDenomination;
    public get Denomination(): IDenomination {
        return this._denomination;
    }

    private _maxCapacity: number;
    public get MaxCapacity(): number {
        return this._maxCapacity;
    }

    private _balanceItemCount: number;
    public get BalanceItemCount(): number {
        return this._balanceItemCount;
    }
    public set BalanceItemCount(value: number) {
        this._balanceItemCount = value;
    }

    constructor(denomination: IDenomination, maxCapacity: number) {
        this._denomination = denomination;
        this._maxCapacity = maxCapacity;
        this._balanceItemCount = 0;
    }
}