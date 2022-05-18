import { IDenomination } from './denomination';

export class DenominationCapacity {
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

    constructor(denomination: IDenomination, maxCapacity: number, fill: number) {
        this._denomination = denomination;
        this._maxCapacity = maxCapacity;

        if (fill > maxCapacity) {
            throw Error('cannot refill more than capcity');
        }
        this._balanceItemCount = fill;
    }
}
