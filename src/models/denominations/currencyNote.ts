import { Denomination } from './denomination';

export class CurrencyNote extends Denomination {

    constructor(value: number, id: string) {
       super(value, id);
    }
}
