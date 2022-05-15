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

function refillTest(withdrawStratety: WithdrawStrategy, refillStrategy: RefillStrategy): void {
    const atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
    atm.refill();
    const maxWithdraw = 10000;
    const refillAndRepeat = 1000;
    const amountsWithdrawn: string[] = [];

    let withdrawCount = 0;
    let i = refillAndRepeat;
    while (i > 0) {
        while (true) {
            const atmBalances = atm.getBalances();
            if (Object.values(atmBalances).some(count => count ===  0)) {
                break;
            }
            const atmBalance = atm.getBalanceValue();
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
    console.log(`avg withdrawls for refillTestAnyEmpty ${withdrawStratety.constructor.name}-${refillStrategy.constructor.name} = `
        + Math.floor(withdrawCount / refillAndRepeat)
        // + '\n' + amountsWithdrawn.join(', ')
        );
}

describe('refillTestAnyEmpty', () => {

    it('avg iterations test Normalized-MaxRefill', () => {
        expect(() => {
            refillTest(new Normalized(), new MaxRefill());
        }).not.toThrow();
    });

    it('avg iterations test OrderByDenominationValueDesc-MaxRefill', () => {
        expect(() => {
            refillTest(new OrderByDenominationValueDesc(), new MaxRefill());
        }).not.toThrow();
    });

    it('avg iterations test OrderByTotalValueDesc-MaxRefill', () => {
        expect(() => {
            refillTest(new OrderByTotalValueDesc(), new MaxRefill());
        }).not.toThrow();
    });

});
