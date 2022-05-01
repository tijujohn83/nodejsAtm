import { Denomination } from "./denomination";


export class CurrencyNote extends Denomination {
     
    constructor(value: number, name: string) {
       super(value, name);
    }
}