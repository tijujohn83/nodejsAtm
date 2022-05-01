import { DenominationType } from "../enums";

export interface IDenomination {
    get value(): number;
    get type(): DenominationType
    get friendlyName(): string
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

    private _friendlyName: string;
    public get friendlyName(): string {
        return this._friendlyName;
    }

    constructor(value: number, name: string) {
        this._denominationType = DenominationType.Note;
        this._value = value;
        this._friendlyName = name;
    }

}