import { DenominationType } from '../enums';

export interface IDenomination {
    get value(): number;
    get type(): DenominationType;
    get id(): string;
}

export abstract class Denomination implements IDenomination {

    private _value: number;
    public get value(): number {
        return this._value;
    }

    private _denominationType: DenominationType;
    public get type():  DenominationType {
        return this._denominationType;
    }

    private _id: string;
    public get id(): string {
        return this._id;
    }

    constructor(value: number, id: string) {
        this._denominationType = DenominationType.Note;
        this._value = value;
        this._id = id;
    }

}
