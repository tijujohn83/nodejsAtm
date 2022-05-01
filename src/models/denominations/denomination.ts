import { DenominationType } from "../enums";

export interface IDenomination {
    get Value(): number;
    get Type(): DenominationType
    get FriendlyName(): string
}

export abstract class Denomination implements IDenomination {

    private _value: number;
    public get Value(): number {
        return this._value;
    }

    private _denominationType: DenominationType;
    public get Type():  DenominationType {
        return this._denominationType;
    }

    private _friendlyName: string;
    public get FriendlyName(): string {
        return this._friendlyName;
    }

    constructor(value: number, name: string) {
        this._denominationType = DenominationType.Note;
        this._value = value;
        this._friendlyName = name;
    }

}