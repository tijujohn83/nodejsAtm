import { AtmInterface } from '../models/atm/atmInterface';
import { FileLogger } from '../logger/fileLogger';
import { Atm } from '../models/atm/atm';
import { EqualAmountsRefill } from '../strategy/refill/equalAmountsRefill';
import { MaxRefill } from '../strategy/refill/maxRefill';
import { RandomRefill } from '../strategy/refill/randomRefill';
import { Normalized } from '../strategy/withdraw/normalized';
import { OrderByDenominationValueDesc } from '../strategy/withdraw/orderByDenominationValueDesc';
import { OrderByTotalValueDesc } from '../strategy/withdraw/orderByTotalValueDesc';

export class AtmService {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            // no DI because of time constraints
            const withdrawStratety = new OrderByDenominationValueDesc(); // available: Normalized | OrderByDenominationValueDesc | OrderByTotalValueDesc
            const refillStrategy = new MaxRefill(); // available: RandomRefill | MaxRefill | EqualAmountsRefill

            AtmService.Instance = new Atm(withdrawStratety, refillStrategy, new FileLogger());
            AtmService.Instance.refill();
        }
    }

    public getInstance(): AtmInterface {
        return AtmService.Instance;
    }

}
