import { NullLogger } from '../logger/nullLogger';
import { Atm } from '../models/atm/atm';
import { WithdrawStatus } from '../models/enums';
import { getRandomIntInclusive } from '../services/utils';
import { EqualAmountsRefill } from '../strategy/refill/equalAmountsRefill';
import { MaxRefill } from '../strategy/refill/maxRefill';
import { RandomRefill } from '../strategy/refill/randomRefill';
import { Normalized } from '../strategy/withdraw/normalized';
import { OrderByDenominationValueDesc } from '../strategy/withdraw/orderByDenominationValueDesc';
import { OrderByTotalValueDesc } from '../strategy/withdraw/orderByTotalValueDesc';

describe('atmTest', () => {
    it('balance test', () => {
        const withdrawStratety = new Normalized();
        const refillStrategy = new RandomRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();

        const amount = Object.values(atm.atmState)
            .map(c => c.Denomination.value * c.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);

        expect(atm.getBalanceValue()).toBe(amount);

    });

    it('basic withdraw test', () => {
        const withdrawStratety = new Normalized();
        const refillStrategy = new RandomRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();

        const atmBalance = atm.getBalanceValue();
        const amount = 1000;
        const withdraw = atm.withDraw(amount);

        if (withdraw.status === WithdrawStatus.Success) {
            expect(atm.getBalanceValue()).toBe(atmBalance - amount);

            expect(Object.entries(withdraw.dispensed)
            .map(e => parseInt(e[0].substring(1), 10) * e[1]).reduce((prev, curr) => prev + curr, 0))
            .toBe(amount);
        }
    });

    it('recursive withdraw test Normalized-RandomRefill', () => {
        const withdrawStratety = new Normalized();
        const refillStrategy = new RandomRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        const maxWithdraw = 100000;
        let recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test Normalized-MaxRefill', () => {
        const withdrawStratety = new Normalized();
        const refillStrategy = new MaxRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        const maxWithdraw = 100000;
        let recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test Normalized-EqualAmountsRefill', () => {
        const withdrawStratety = new Normalized();
        const refillStrategy = new EqualAmountsRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        const maxWithdraw = 100000;
        let recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test OrderByDenominationValueDesc-RandomRefill', () => {
        const withdrawStratety = new OrderByDenominationValueDesc();
        const refillStrategy = new RandomRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        const maxWithdraw = 100000;
        let recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test OrderByTotalValueDesc-RandomRefill', () => {
        const withdrawStratety = new OrderByTotalValueDesc();
        const refillStrategy = new RandomRefill();
        const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        const maxWithdraw = 100000;
        let recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

});
