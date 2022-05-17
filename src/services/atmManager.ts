import { AtmInterface } from '../models/atm/atmInterface';
import { FileLogger } from '../logger/fileLogger';
import { Atm } from '../models/atm/atm';
import { EqualAmountsRefill } from '../strategy/refill/equalAmountsRefill';
import { MaxRefill } from '../strategy/refill/maxRefill';
import { RandomRefill } from '../strategy/refill/randomRefill';
import { Normalized } from '../strategy/withdraw/normalized';
import { OrderByDenominationValueDesc } from '../strategy/withdraw/orderByDenominationValueDesc';
import { OrderByTotalValueDesc } from '../strategy/withdraw/orderByTotalValueDesc';
import { WithdrawItems } from '../models/atm/withdrawItems';
import { WithdrawStatus } from '../models/enums';

export class AtmManager implements AtmInterface {
    private static Instance: Atm;

    constructor() {
        if (AtmManager.Instance === undefined) {
            // no DI because of time constraints
            const withdrawStratety = new OrderByDenominationValueDesc(); // available: Normalized | OrderByDenominationValueDesc | OrderByTotalValueDesc
            const refillStrategy = new MaxRefill(); // available: RandomRefill | MaxRefill | EqualAmountsRefill

            AtmManager.Instance = new Atm(withdrawStratety, refillStrategy, new FileLogger());
            AtmManager.Instance.refill();
        }
    }

    public refill(): void {
        AtmManager.Instance.refill();
    }

    public getBalances(): WithdrawItems {
        return AtmManager.Instance.getBalances();
    }

    public getBalanceValue(): number {
        return AtmManager.Instance.getBalanceValue();
    }

    public withDraw(requestedAmount: number): { status: WithdrawStatus; dispensed?: WithdrawItems; } {
        return AtmManager.Instance.withDraw(requestedAmount);
    }

}
