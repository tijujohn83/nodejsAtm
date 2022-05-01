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

    private _balance: number;
    public get Balance(): number {
        return this._balance;
    }
    public set Balance(value: number) {
        this._balance = value;
    }

    constructor(denomination: IDenomination, maxCapacity: number) {
        this._denomination = denomination;
        this._maxCapacity = maxCapacity;
        this._balance = 0;
    }
}