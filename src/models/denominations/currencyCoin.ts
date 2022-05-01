import { Denomination } from "./iDenomination";

export class CurrencyCoin extends Denomination {  
    private _diameter: number;
    public get Diameter():  number {
        return this._diameter;
    }

    constructor(value: number, diameter: number, name: string) {
        super(value, name);
        this._diameter = diameter;
    }  
}

