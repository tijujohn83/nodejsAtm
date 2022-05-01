import { CurrencyCoin } from "./currencyCoin";
import { CurrencyNote } from "./currencyNote";


export const thousandNote = new CurrencyNote(1000, 'thousandNote');
export const fiveHundredNote = new CurrencyNote(500, 'fiveHundredNote');
export const twoHundredNote = new CurrencyNote(200, 'twoHundredNote');
export const oneHundredNote = new CurrencyNote(100, 'oneHundredNote');
export const fiftyNote = new CurrencyNote(50, 'fiftyNote');
export const twentyCoin = new CurrencyCoin(20, 40, 'twentyCoin');
export const tenCoin = new CurrencyCoin(10, 20, 'tenCoin');
export const fiveCoin = new CurrencyCoin(5, 50, 'fiveCoin');
export const twoCoin = new CurrencyCoin(2, 50, 'twoCoin');
export const oneCoin = new CurrencyCoin(1, 10, 'oneCoin');

