import { CurrencyCoin } from './currencyCoin';
import { CurrencyNote } from './currencyNote';
import { Denomination } from './denomination';

export const n1000 = new CurrencyNote(1000, 'n1000');
export const n500 = new CurrencyNote(500, 'n500');
export const n200 = new CurrencyNote(200, 'n200');
export const n100 = new CurrencyNote(100, 'n100');
export const n50 = new CurrencyNote(50, 'n50');
export const c20 = new CurrencyCoin(20, 40, 'c20');
export const c10 = new CurrencyCoin(10, 20, 'c10');
export const c5 = new CurrencyCoin(5, 50, 'c5');
export const c2 = new CurrencyCoin(2, 50, 'c2');
export const c1 = new CurrencyCoin(1, 10, 'c1');

const all: {[key: string]: Denomination} = {};
all[n1000.id] = n1000;
all[n500.id] = n500;
all[n200.id] = n200;
all[n100.id] = n100;
all[n50.id] = n50;
all[c20.id] = c20;
all[c10.id] = c10;
all[c5.id] = c5;
all[c2.id] = c2;
all[c1.id] = c1;

export const currentDenominations = all;
