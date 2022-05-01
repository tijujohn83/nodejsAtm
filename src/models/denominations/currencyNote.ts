import { Denomination } from "./iDenomination";


export class CurrencyNote extends Denomination {
     
    constructor(value: number, name: string) {
       super(value, name);
    }
}