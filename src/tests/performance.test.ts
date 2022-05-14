import { NullLogger } from '../logger/nullLogger';
import { Atm } from '../models/atm';
import { WithdrawStatus } from '../models/enums';
import { getRandomIntInclusive } from '../services/utils';
import { EqualAmountsRefill } from '../strategy/refill/equalAmountsRefill';
import { MaxRefill } from '../strategy/refill/maxRefill';
import { RefillStrategy } from '../strategy/refill/refillStrategy';
import { Normalized } from '../strategy/withdraw/normalized';
import { OrderByDenominationValueDesc } from '../strategy/withdraw/orderByDenominationValueDesc';
import { OrderByTotalValueDesc } from '../strategy/withdraw/orderByTotalValueDesc';
import { WithdrawStrategy } from '../strategy/withdraw/withdrawStrategy';

function performanceTest(withdrawStratety: WithdrawStrategy, refillStrategy: RefillStrategy): void {
    const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
    atm.refill();
    const maxWithdraw = 10000;
    let withdrawCount = 0;
    const refillAndRepeat = 1000;
    let i = refillAndRepeat;
    const amountsWithdrawn: string[] = [];

    while (i > 0) {
        while (true) {
            const atmBalance = atm.getBalanceValue();
            if (atmBalance === 0) {
                break;
            }
            const amount = getRandomIntInclusive(1, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
            let amountWithdrawn = amount.toString();
            const withdraw = atm.withDraw(amount);
            if (withdraw.status === WithdrawStatus.Success) {
                withdrawCount++;
            } else {
                amountWithdrawn += '(' + atm.getBalanceValue() + ')';
            }
            amountsWithdrawn.push(amountWithdrawn);
        }
        i--;
        atm.refill();
    }
    console.log(`avg withdrawls for ${withdrawStratety.constructor.name}-${refillStrategy.constructor.name} = `
        + Math.floor(withdrawCount / refillAndRepeat)
        // + '\n' + amountsWithdrawn.join(', ')
        );
}

describe('performanceTest', () => {

    it('avg iterations test Normalized-MaxRefill', () => {
        expect(() => {
            performanceTest(new Normalized(), new MaxRefill());
        }).not.toThrow();
    });

    it('avg iterations test OrderByDenominationValueDesc-MaxRefill', () => {
        expect(() => {
            performanceTest(new OrderByDenominationValueDesc(), new MaxRefill());
        }).not.toThrow();
    });

    it('avg iterations test OrderByTotalValueDesc-MaxRefill', () => {
        expect(() => {
            performanceTest(new OrderByTotalValueDesc(), new MaxRefill());
        }).not.toThrow();
    });

});
