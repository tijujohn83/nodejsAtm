import { NullLogger } from '../logger/nullLogger';
import { Atm } from '../models/atm';
import { WithdrawStatus } from '../models/enums';
import { getRandomIntInclusive } from '../services/utils';
import { MaxRefill } from '../strategy/refill/maxRefill';
import { Normalized } from '../strategy/withdraw/normalized';
import { OrderByDenominationValueDesc } from '../strategy/withdraw/orderByDenominationValueDesc';
import { OrderByTotalValueDesc } from '../strategy/withdraw/orderByTotalValueDesc';

describe('performanceTest', () => {

    it('avg iterations test Normalized-MaxRefill', () => {
        expect(() => {
            const withdrawStratety = new Normalized();
            const refillStrategy = new MaxRefill();
            const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
            atm.refill();
            const maxWithdraw = 100000;
            let withdrawCount = 0;
            const repeat = 10000;
            let i = repeat;

            while (i > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    const amount = getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
                    const withdraw = atm.withDraw(amount);
                    if (withdraw.status === WithdrawStatus.Success) {
                        withdrawCount++;
                    }
                }
                i--;
                atm.refill();
            }
            console.log('avg withdrawls for Normalized-MaxRefill=' + Math.floor(withdrawCount / repeat));
        }).not.toThrow();
    });

    it('avg iterations test OrderByDenominationValueDesc-MaxRefill', () => {
        expect(() => {
            const withdrawStratety = new OrderByDenominationValueDesc();
            const refillStrategy = new MaxRefill();
            const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
            atm.refill();
            const maxWithdraw = 100000;
            let withdrawCount = 0;
            const repeat = 10000;
            let i = repeat;

            while (i > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    const amount = getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
                    const withdraw = atm.withDraw(amount);
                    if (withdraw.status === WithdrawStatus.Success) {
                        withdrawCount++;
                    }
                }
                i--;
                atm.refill();
            }
            console.log('avg withdrawls for OrderByDenominationValueDesc-MaxRefill=' + Math.floor(withdrawCount / repeat));
        }).not.toThrow();
    });

    it('avg iterations test OrderByTotalValueDesc-MaxRefill', () => {
        expect(() => {
            const withdrawStratety = new OrderByTotalValueDesc();
            const refillStrategy = new MaxRefill();
            const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
            atm.refill();
            const maxWithdraw = 100000;
            let withdrawCount = 0;
            const repeat = 10000;
            let i = repeat;

            while (i > 0) {
                while (true) {
                    const atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    const amount = getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
                    const withdraw = atm.withDraw(amount);
                    if (withdraw.status === WithdrawStatus.Success) {
                        withdrawCount++;
                    }
                }
                i--;
                atm.refill();
            }
            console.log('avg withdrawls for OrderByTotalValueDesc-MaxRefill=' + Math.floor(withdrawCount / repeat));
        }).not.toThrow();
    });

});
