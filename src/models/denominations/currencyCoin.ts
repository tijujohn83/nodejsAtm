import { Denomination } from "./denomination";

export class CurrencyCoin extends Denomination {  
    private _diameter: number;
    public get diameter():  number {
        return this._diameter;
    }

    constructor(value: number, diameter: number, id: string) {
        super(value, id);
        this._diameter = diameter;
    }  
}

